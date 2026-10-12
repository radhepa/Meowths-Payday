import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import {
  STORY_GROUND,
  groundPosition,
  actorPosition,
  actorFacing,
} from "./story-stage.js";
import {
  SCENES,
  CAST,
  CHAPTERS,
  syncStory,
  storyCheckpoint,
  finishStory,
  restoreStory,
  requirementLabel,
  nextAutomaticScene,
  scenesForRegion,
} from "./story.js";
import {
  newGame,
  BUSINESSES,
  UPGRADES,
  restoreGame,
  buyBusiness,
  startBusiness,
  advance,
  payDay,
} from "./game.js";
import { storyAssets, spriteFrames } from "./story-media.js";
import { REGIONS, storyBackground } from "./regions.js";
const load = (path) =>
  JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));

test("every story sprite has measured visible bounds and only actual Flying types can hover", () => {
  const frames = spriteFrames;
  const pokemon = load("./region-pokemon.json");
  const assets = storyAssets;
  assert.deepEqual(Object.keys(frames).sort(), Object.keys(CAST).sort());
  for (const [id, frame] of Object.entries(frames)) {
    const png = readFileSync(
      new URL(`../public${assets.bodies[id]}`, import.meta.url),
    );
    assert.equal(frame.canvasWidth, png.readUInt32BE(16));
    assert.equal(frame.canvasHeight, png.readUInt32BE(20));
    assert.ok(frame.left >= 0 && frame.top >= 0);
    assert.ok(frame.width > 0 && frame.height > 0);
    assert.ok(frame.left + frame.width <= frame.canvasWidth);
    assert.ok(frame.top + frame.height <= frame.canvasHeight);
    assert.equal(
      frame.flying,
      pokemon.find((p) => p.id === Number(id)).types.includes("flying"),
    );
  }
});

test("all 130 casts stay on the same foreground path when backgrounds crop responsively", () => {
  const viewports = [
    [796, 286],
    [650, 226],
    [330, 226],
    [288, 226],
    [796, 196],
    [288, 196],
  ];
  for (const scene of SCENES) {
    const setting = CHAPTERS[scene.chapter].setting;
    const ground = STORY_GROUND[setting];
    const png = readFileSync(
      new URL(`../public${storyBackground(setting)}`, import.meta.url),
    );
    assert.equal(ground.width, png.readUInt32BE(16));
    assert.equal(ground.height, png.readUInt32BE(20));
    for (const [width, height] of viewports) {
      const position = groundPosition(setting, width, height);
      const scale = Math.max(width / ground.width, height / ground.height);
      const cropTop = ground.height * scale - height;
      assert.ok(
        position.y > 80 && position.y < height - 25,
        `${scene.id}: visible path at ${width}×${height}`,
      );
      assert.ok(
        Math.abs((position.y + cropTop) / scale - ground.y * ground.height) <
          1e-8,
      );
      const slots = scene.cast.map((_, i) =>
        actorPosition(i, scene.cast.length),
      );
      assert.ok(slots.every((x) => x >= 26 && x <= 74));
      assert.equal(new Set(slots).size, scene.cast.length);
    }
  }
});

test("all 130 authored scenes have valid Pokémon, real emotion portraits and locally cached body sprites", () => {
  assert.equal(SCENES.length, 130);
  assert.equal(CHAPTERS.length, 21);
  assert.equal(new Set(SCENES.map((s) => s.id)).size, 130);
  const portraits = load("../public/assets/story/portrait-manifest.json");
  const bodies = load("../public/assets/story/full-body-manifest.json");
  assert.deepEqual(load("./story-assets.json"), { portraits, bodies });
  for (const [i, s] of SCENES.entries()) {
    const region = REGIONS[s.region - 1];
    assert.ok(s.cast.every((id) => id >= region.first && id <= region.last));
    assert.equal(new Set(s.cast).size, s.cast.length);
    assert.equal(CHAPTERS[s.chapter].region, s.region);
    assert.ok(!["resets", "reopen", "new-cycle"].includes(s.requirement.kind));
    assert.equal(s.number, i + 1);
    assert.equal(
      s.chapter,
      s.region === 1
        ? Math.floor(i / 10)
        : 5 + (s.region - 2) * 2 + Math.floor((s.regionNumber - 1) / 5),
    );
    assert.ok(requirementLabel(s.requirement).length > 5);
    assert.ok(s.lines.length >= 6);
    assert.ok(s.title && s.synopsis && s.cast.length >= 2);
    for (const id of s.cast)
      assert.ok(
        CAST[id] &&
          existsSync(
            new URL(`../public${storyAssets.bodies[id]}`, import.meta.url),
          ),
        `body ${id}`,
      );
    for (const line of s.lines) {
      assert.ok(s.cast.includes(line.speaker), `speaker present: ${s.id}`);
      const local = storyAssets.portraits[line.speaker]?.emotions[line.emotion];
      assert.ok(local, `${s.id}: ${line.speaker} ${line.emotion}`);
      assert.ok(existsSync(new URL(`../public${local}`, import.meta.url)));
      assert.ok(line.text.trim().length > 0);
    }
  }
});

test("story unlocks in order without granting money and survives every Kanto milestone and travel", () => {
  const fresh = newGame(0);
  assert.deepEqual(fresh.story.unlocked, ["scene-01"]);
  const clicked = syncStory(payDay(fresh));
  assert.deepEqual(clicked.story.unlocked, ["scene-01", "scene-02"]);
  assert.equal(clicked.balance, 1);
  let rich = syncStory({
    ...fresh,
    balance: 1e14,
    lifetime: 1e14,
    runEarnings: 1e14,
    regionEarnings: [1e14, ...Array(8).fill(0)],
    clicks: 1,
    businesses: fresh.businesses.map((b) => ({
      ...b,
      quantity: 1,
      manager: true,
      elapsed: 0,
      completedCycles: 30,
    })),
    upgrades: UPGRADES.map((u) => u.id),
  });
  assert.equal(rich.story.unlocked.length, 50);
  rich = finishStory(storyCheckpoint(rich, "scene-03", 2), "scene-03");
  assert.equal(rich.story.checkpoint, null);
  assert.equal(rich.balance, 1e14);
  const traveled = syncStory({ ...rich, region: 2, unlockedRegion: 2 });
  assert.equal(traveled.story.unlocked.length, 59);
  assert.deepEqual(
    restoreGame(JSON.parse(JSON.stringify(traveled)), 0),
    traveled,
  );
});

test("legacy empire migration, malformed story data and checkpoints never damage financial progress", () => {
  const raw = { ...newGame(0), balance: 19, lifetime: 19, clicks: 19 };
  delete raw.story;
  const migrated = restoreGame(raw, 0);
  assert.equal(migrated.balance, 19);
  assert.equal(migrated.story.unlocked.length, 2);
  const corrupt = restoreGame(
    {
      ...raw,
      story: {
        unlocked: ["scene-01", "bad-id", "scene-09"],
        seen: ["bad-id"],
        checkpoint: { sceneId: "scene-01", lineIndex: 100 },
        autoPlay: false,
      },
    },
    0,
  );
  assert.equal(corrupt.balance, 19);
  assert.equal(corrupt.story.checkpoint, null);
  assert.equal(corrupt.story.autoPlay, true);
  let checkpoint = storyCheckpoint(migrated, "scene-02", 3);
  checkpoint = {
    ...checkpoint,
    story: { ...checkpoint.story, autoPlay: false },
  };
  assert.deepEqual(
    restoreGame(JSON.parse(JSON.stringify(checkpoint)), 0).story,
    checkpoint.story,
  );
  assert.equal(storyCheckpoint(checkpoint, "scene-50", 0), checkpoint);
  assert.equal(storyCheckpoint(checkpoint, "scene-02", -1), checkpoint);
  assert.equal(finishStory(checkpoint, "scene-50"), checkpoint);
});

test("locked prerequisites do not get bypassed and latched milestones cannot relock", () => {
  let g = newGame(0);
  g = {
    ...g,
    businesses: g.businesses.map((b) => ({
      ...b,
      quantity: 1,
      manager: true,
      elapsed: 0,
      completedCycles: 1,
    })),
  };
  assert.equal(syncStory(g).story.unlocked.length, 1);
  g = syncStory({ ...g, clicks: 1 });
  assert.equal(g.story.unlocked.length, 45);
  const latched = syncStory({
    ...g,
    businesses: newGame(0).businesses,
    clicks: 0,
  });
  assert.equal(latched.story.unlocked.length, 45);
  const repaired = restoreStory({
    unlocked: ["scene-01", "scene-03"],
    seen: ["scene-03"],
  });
  assert.deepEqual(repaired.unlocked, ["scene-01"]);
  assert.deepEqual(repaired.seen, []);
});

test("all regions unlock an independent ordered story without borrowing another region's earnings", () => {
  for (const region of REGIONS.slice(1)) {
    let game = {
      ...newGame(0),
      region: region.id,
      unlockedRegion: region.id,
      balance: 1e25,
      lifetime: 1e25,
      runEarnings: 1e25,
      clicks: 0,
    };
    game = syncStory(game);
    const scenes = scenesForRegion(region.id);
    assert.equal(scenes.length, 10);
    assert.ok(game.story.unlocked.includes(scenes[0].id));
    assert.ok(!game.story.unlocked.includes(scenes[1].id));
    const indices = BUSINESSES.map((b, i) => ({ b, i }))
      .filter(({ b }) => b.region === region.id)
      .sort((a, b) => a.b.baseCost - b.b.baseCost);
    game = syncStory(buyBusiness(game, indices[0].i, 1));
    assert.ok(game.story.unlocked.includes(scenes[1].id));
    assert.ok(!game.story.unlocked.includes(scenes[2].id));
    game = syncStory({
      ...game,
      businesses: game.businesses.map((b, i) =>
        BUSINESSES[i].region === region.id
          ? { ...b, quantity: 1, manager: true, elapsed: 0, completedCycles: 5 }
          : b,
      ),
    });
    assert.ok(game.story.unlocked.includes(scenes[8].id));
    assert.ok(!game.story.unlocked.includes(scenes[9].id));
    const beforeMilestone = game.balance;
    const earned = [...game.regionEarnings];
    earned[region.id - 1] = region.earningsGoal;
    game = syncStory({ ...game, regionEarnings: earned });
    assert.ok(game.story.unlocked.includes(scenes[9].id));
    assert.equal(game.balance, beforeMilestone);
    assert.deepEqual(restoreGame(JSON.parse(JSON.stringify(game)), 0), game);
  }
});
test("automatic queues prioritize the current region, resume checkpoints and permit new milestones after dismissal", () => {
  let game = syncStory({
    ...newGame(0),
    region: 2,
    unlockedRegion: 2,
    balance: 1e15,
    lifetime: 1e15,
    runEarnings: 1e15,
  });
  assert.deepEqual(nextAutomaticScene(game), {
    id: "region-2-01",
    lineIndex: 0,
  });
  game = storyCheckpoint(game, "region-2-01", 4);
  assert.deepEqual(nextAutomaticScene(game), {
    id: "region-2-01",
    lineIndex: 4,
  });
  assert.equal(nextAutomaticScene(game, game.story.unlocked), null);
  const dismissed = [...game.story.unlocked];
  const index = BUSINESSES.findIndex(
    (b) => b.region === 2 && b.managerPokemonId === 152,
  );
  game = syncStory(buyBusiness(game, index, 1));
  assert.deepEqual(nextAutomaticScene(game, dismissed), {
    id: "region-2-02",
    lineIndex: 0,
  });
  game = finishStory(storyCheckpoint(game, "region-2-02", 1), "region-2-02");
  assert.equal(nextAutomaticScene(game, dismissed), null);
  game = syncStory({ ...game, region: 3, unlockedRegion: 3 });
  assert.deepEqual(nextAutomaticScene(game), {
    id: "region-3-01",
    lineIndex: 0,
  });
  assert.equal(nextAutomaticScene({ ...game, region: 2 }).id, "region-2-01");
});
test("all dialogue beats turn angled bodies toward their conversation partner", () => {
  const directions = new Set();
  for (const scene of SCENES)
    for (let beat = 0; beat < scene.lines.length; beat++)
      for (const id of scene.cast) {
        const native = spriteFrames[id].nativeFacing;
        assert.ok(["left", "right", "front"].includes(native));
        const pose = actorFacing(scene, beat, id, native);
        assert.ok(scene.cast.includes(pose.partner) && pose.partner !== id);
        const expected =
          scene.cast.indexOf(pose.partner) > scene.cast.indexOf(id)
            ? "right"
            : "left";
        assert.equal(pose.facing, expected);
        if (native !== "front")
          assert.equal(
            pose.flip ? (native === "left" ? "right" : "left") : native,
            expected,
          );
        directions.add(pose.facing);
      }
  assert.deepEqual([...directions].sort(), ["left", "right"]);
});
test("legacy autoplay migration happens once and new explicit preferences survive refresh", () => {
  assert.equal(restoreStory({ autoPlay: false }).autoPlay, true);
  assert.equal(restoreStory({ schema: 2, autoPlay: false }).autoPlay, false);
  const migrated = restoreGame(
    {
      ...newGame(0),
      region: 9,
      unlockedRegion: 9,
      story: { unlocked: ["scene-01"], autoPlay: false },
    },
    0,
  );
  assert.equal(migrated.story.schema, 2);
  assert.equal(migrated.story.autoPlay, true);
  assert.deepEqual(nextAutomaticScene(migrated), {
    id: "region-9-01",
    lineIndex: 0,
  });
});
