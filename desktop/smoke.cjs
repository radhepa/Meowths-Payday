const path = require("node:path");
const { session } = require("electron");

// An isolated, hidden test window checks the same packaged renderer and origin.
// It never opens or modifies the player's real profile.
async function runSmoke({ window, net, root, fs, profile }) {
  window.webContents.setBackgroundThrottling(false);
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
    if (['write','regions'].includes(${JSON.stringify(phase)})) localStorage.setItem(key,'offline-persistence-ok');
    const game=JSON.parse(localStorage.getItem('meowth.payday-empire.v1'));
    return {prior, marker:localStorage.getItem(key), gameSaved: game?.version===3, shops:game?.businesses.length};
  })()`);
  if (
    result.marker !== "offline-persistence-ok" ||
    !result.gameSaved ||
    result.shops !== 180
  )
    throw new Error("Autosave failed");
  if (phase === "read" && result.prior !== "offline-persistence-ok")
    throw new Error("Save did not survive restarting the app");
  report.persistence = result;
  if (phase === "regions") {
    // Exercise new scenes through the real renderer's saved-state/autoplay path.
    // The smoke-only profile is isolated from the player's real progress.
    report.regions = [];
    for (let region = 2; region <= 9; region++) {
      // Scene 12 uses the market; scene 18 uses the landmark.
      for (const stableNumber of [12, 18]) {
        const id = `region-${region}-${stableNumber}`;
        await window.webContents.executeJavaScript(`(() => {
          const key='meowth.payday-empire.v1';
          const game=JSON.parse(localStorage.getItem(key));
          game.region=${region};game.unlockedRegion=9;
          game.balance=1e26;game.lifetime=1e26;game.runEarnings=1e26;
          game.regionEarnings=Array(9).fill(1e24);game.clicks=1;
          game.businesses=game.businesses.map(b=>({...b,quantity:1,manager:true,elapsed:0,completedCycles:30,shownCycles:0,customers:0,likes:0,lastPayout:0}));
          const old=Array.from({length:10},(_,i)=>'region-${region}-'+String(i+1).padStart(2,'0'));
          const added=Array.from({length:15},(_,i)=>'region-${region}-'+String(i+11).padStart(2,'0'));
          game.story={schema:3,unlocked:[...old,...added],seen:[...old,...added.slice(0,${stableNumber - 11})],autoPlay:true,checkpoint:{sceneId:${JSON.stringify(id)},lineIndex:3}};
          // Production autosave writes on unload. Install this test fixture
          // after those handlers so the next real renderer receives it intact.
          const writeFixture=()=>{game.savedAt=Date.now();localStorage.setItem(key,JSON.stringify(game));};
          writeFixture();
          window.addEventListener('beforeunload',writeFixture,{once:true});
          window.addEventListener('pagehide',writeFixture,{once:true});
        })()`);
        await window.loadURL("meowth://empire/");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await window.webContents.executeJavaScript(`(async()=>{
          await document.fonts.ready;
          await Promise.all([...document.images].map(i=>i.decode()));
        })()`);
        // A hidden test window needs a compositor frame before its first capture.
        await window.webContents.capturePage(undefined, { stayHidden: true, stayAwake: true });
        await new Promise((resolve) => setTimeout(resolve, 200));
        const view = await window.webContents.executeJavaScript(`(() => {
          const stage=document.querySelector('.cutscene-stage');
          const rect=e=>{const b=e.getBoundingClientRect();return {left:b.left,right:b.right,top:b.top,bottom:b.bottom}};
          return {scene:!!document.querySelector('.cutscene-panel'),shops:document.querySelectorAll('.pk-row').length,
            location:document.querySelector('.cutscene-location')?.textContent,
            images:[...document.images].every(i=>i.complete&&i.naturalWidth>0),
            checkpoint:JSON.parse(localStorage.getItem('meowth.payday-empire.v1')).story.checkpoint,
            stage:stage?rect(stage):null,
            cast:[...document.querySelectorAll('.scene-actor')].map(e=>({id:Number(e.dataset.pokemon),grounded:e.dataset.grounded==='true',facing:e.dataset.facing,partner:Number(e.dataset.partner),box:rect(e.querySelector('.actor-body'))}))};
        })()`);
        if (!view.scene || view.shops !== 20 || !view.images || view.checkpoint?.sceneId !== id || view.checkpoint?.lineIndex !== 3)
          throw new Error(`Regional autoplay failed: ${id} ${JSON.stringify(view)}`);
        for (const actor of view.cast) {
          const partner=view.cast.find((other)=>other.id===actor.partner);
          if (!partner || actor.facing !== (partner.box.left>actor.box.left?'right':'left') || actor.box.top<view.stage.top || actor.box.bottom>view.stage.bottom)
            throw new Error(`Regional staging failed: ${id} ${JSON.stringify(actor)}`);
        }
        report.regions.push({region,scene:id,shops:view.shops,location:view.location,cast:view.cast.map(({box,...actor})=>actor)});
        await window.webContents.capturePage(undefined, { stayHidden: true, stayAwake: true }).then((image)=>fs.writeFile(path.join(profile,`${id}.png`),image.toPNG()));
      }
    }
  }
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
