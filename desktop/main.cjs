const {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  Menu,
  net,
  protocol,
  session,
  shell,
} = require("electron");
const fs = require("node:fs/promises");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { resolveAppPath } = require("./protocol.cjs");

const APP_URL = "meowth://empire/";
const smoke = process.argv.includes("--smoke-test");
const smokeProfile = process.env.MEOWTH_SMOKE_PROFILE;
app.setName("Meowth's Pay Day Empire");
app.setAppUserModelId("fan.meowth.paydayempire");
app.setPath(
  "userData",
  smoke && smokeProfile
    ? smokeProfile
    : path.join(app.getPath("appData"), "Meowth Pay Day Empire"),
);
protocol.registerSchemesAsPrivileged([
  {
    scheme: "meowth",
    privileges: { standard: true, secure: true, supportFetchAPI: true },
  },
]);

let mainWindow;
if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on("second-instance", () => {
    mainWindow?.restore();
    mainWindow?.show();
    mainWindow?.focus();
  });
  app
    .whenReady()
    .then(start)
    .catch(async (error) => {
      if (smoke) {
        console.error(error);
        app.exit(1);
      } else {
        await dialog.showMessageBox({
          type: "error",
          title: "Empire could not start",
          message: error.message,
        });
        app.quit();
      }
    });
}

async function start() {
  const root = path.join(__dirname, "..", "dist");
  protocol.handle("meowth", async (request) => {
    try {
      if (request.method !== "GET")
        return new Response("Method not allowed", { status: 405 });
      const file = resolveAppPath(request.url, root);
      if (!(await fs.stat(file)).isFile())
        return new Response("Not found", { status: 404 });
      const response = await net.fetch(pathToFileURL(file).toString());
      const headers = new Headers(response.headers);
      if (file.endsWith(".html"))
        headers.set(
          "Content-Security-Policy",
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; media-src 'self' blob:; object-src 'none'; base-uri 'none'; frame-src 'none'",
        );
      return new Response(response.body, { status: response.status, headers });
    } catch {
      return new Response("Not found", { status: 404 });
    }
  });
  // Gameplay cannot use the network. Credits open externally only after a click.
  session.defaultSession.webRequest.onBeforeRequest(
    { urls: ["http://*/*", "https://*/*", "ws://*/*", "wss://*/*"] },
    (_details, callback) => callback({ cancel: true }),
  );
  session.defaultSession.setPermissionRequestHandler(
    (_contents, _permission, callback) => callback(false),
  );

  mainWindow = new BrowserWindow({
    title: "Meowth's Pay Day Empire",
    width: 1440,
    height: 940,
    minWidth: 1050,
    minHeight: 680,
    backgroundColor: "#101215",
    show: !smoke,
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
    },
  });
  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (url !== APP_URL) event.preventDefault();
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https:\/\//.test(url)) shell.openExternal(url);
    else if (url.startsWith(APP_URL + "assets/") && /\.md$/.test(url)) {
      dialog.showMessageBox(mainWindow, {
        type: "info",
        title: "Asset credits",
        message:
          "Credits are bundled with this app. Use File → Open asset credits to view them offline.",
      });
    }
    return { action: "deny" };
  });
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: "File",
        submenu: [
          {
            label: "Open asset credits",
            click: async () => {
              const text = await fs.readFile(
                path.join(root, "assets", "CREDITS.md"),
                "utf8",
              );
              await dialog.showMessageBox(mainWindow, {
                title: "Artwork credits",
                message: "Meowth's Pay Day Empire — unofficial fan game",
                detail: text,
              });
            },
          },
          { type: "separator" },
          { role: "quit" },
        ],
      },
      {
        label: "View",
        submenu: [
          { role: "resetZoom" },
          { role: "zoomIn" },
          { role: "zoomOut" },
          { type: "separator" },
          { role: "togglefullscreen" },
        ],
      },
    ]),
  );
  ipcMain.handle("empire:export-save", async (event, payload) => {
    if (
      event.sender !== mainWindow.webContents ||
      event.senderFrame?.url !== APP_URL ||
      typeof payload?.text !== "string" ||
      Buffer.byteLength(payload.text) > 2 * 1024 * 1024 ||
      !/^meowth-empire-[\w.-]+\.json$/.test(payload.filename)
    )
      throw new Error("Invalid save export");
    const parsed = JSON.parse(payload.text);
    if (
      parsed.format !== "meowth-pay-day-empire" ||
      parsed.fileVersion !== 1 ||
      !parsed.game
    )
      throw new Error("Invalid save export");
    const result = await dialog.showSaveDialog(mainWindow, {
      title: "Export your empire",
      defaultPath: path.join(app.getPath("documents"), payload.filename),
      filters: [{ name: "Meowth save", extensions: ["json"] }],
    });
    if (!result.canceled && result.filePath)
      await fs.writeFile(result.filePath, payload.text, "utf8");
    return { canceled: result.canceled };
  });

  if (smoke) {
    const { runSmoke } = require("./smoke.cjs");
    await mainWindow.loadURL(APP_URL);
    try {
      await runSmoke({
        app,
        window: mainWindow,
        net,
        root,
        fs,
        profile: app.getPath("userData"),
      });
      app.exit(0);
    } catch (error) {
      console.error(error);
      app.exit(1);
    }
  } else await mainWindow.loadURL(APP_URL);
}

app.on("window-all-closed", () => {
  session.defaultSession.flushStorageData();
  app.quit();
});
