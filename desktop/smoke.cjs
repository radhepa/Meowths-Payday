const path = require("node:path");
const { session } = require("electron");

// An isolated, hidden test window checks the same packaged renderer and origin.
// It never opens or modifies the player's real profile.
async function runSmoke({ window, net, root, fs, profile }) {
  const phase = process.env.MEOWTH_SMOKE_PHASE || "write";
  const report = {
    phase,
    packaged: require("electron").app.isPackaged,
    runtime: process.versions.electron,
    assets: 0,
    errors: [],
  };
  const failed = [];
  window.webContents.on("console-message", (_event, level, message) => {
    if (level >= 3) failed.push(message);
  });
  // loadURL has completed; allow React's effects to mount the automatic scene.
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const dom = await window.webContents.executeJavaScript(
    `({ title: document.title, text: document.body.innerText, images: [...document.images].map(i => ({src:i.getAttribute('src'),ok:i.complete&&i.naturalWidth>0})), scene: !!document.querySelector(".cutscene-panel"), desktop: !!window.empireDesktop, node: typeof window.require })`,
  );
  if (
    !dom.text.includes("Pay Day") ||
    !dom.scene ||
    !dom.desktop ||
    dom.node !== "undefined"
  )
    throw new Error(
      "Desktop renderer did not load correctly: " + JSON.stringify(dom),
    );
  if (dom.images.some((image) => !image.ok))
    throw new Error("A visible image did not load offline");
  report.renderer = {
    title: dom.title,
    visibleImages: dom.images.length,
    sandbox: true,
    automaticScene: true,
  };
  const entries = await fs.readdir(path.join(root, "assets"), {
    recursive: true,
    withFileTypes: true,
  });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const file = path.join(entry.parentPath || entry.path, entry.name);
    const relative = path.relative(root, file).split(path.sep).join("/");
    const response = await net.fetch("meowth://empire/" + relative);
    if (!response.ok || !(await response.arrayBuffer()).byteLength)
      throw new Error("Offline asset failed: " + relative);
    report.assets++;
  }
  let blocked = false;
  try {
    await net.fetch("https://pokeapi.co/api/v2/pokemon/52/");
  } catch {
    blocked = true;
  }
  if (!blocked) throw new Error("Network lock did not block a remote request");
  report.networkBlocked = true;
  const result = await window.webContents.executeJavaScript(`(() => {
    const key='meowth.desktop-smoke.v1';
    const prior=localStorage.getItem(key);
    if (${JSON.stringify(phase)} === 'write') localStorage.setItem(key,'offline-persistence-ok');
    const game=JSON.parse(localStorage.getItem('meowth.payday-empire.v1'));
    return {prior, marker:localStorage.getItem(key), gameSaved: game?.version===3, shops:game?.businesses.length};
  })()`);
  if (
    result.marker !== "offline-persistence-ok" ||
    !result.gameSaved ||
    result.shops !== 100
  )
    throw new Error("Autosave failed");
  if (phase === "read" && result.prior !== "offline-persistence-ok")
    throw new Error("Save did not survive restarting the app");
  report.persistence = result;
  report.errors = failed;
  session.defaultSession.flushStorageData();
  await window.webContents
    .capturePage()
    .then((image) =>
      fs.writeFile(path.join(profile, "desktop-smoke.png"), image.toPNG()),
    );
  await fs.writeFile(
    path.join(profile, `report-${phase}.json`),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report));
}
module.exports = { runSmoke };
