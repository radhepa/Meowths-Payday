import test from "node:test";
import { syncStory, storyCheckpoint } from "./story.js";
import assert from "node:assert/strict";
import {
  newGame,
  payDay,
  buyBusiness,
  hireManager,
  OFFLINE_LIMIT,
} from "./game.js";
import {
  MAX_SAVE_BYTES,
  BACKUP_KEY,
  deleteProgress,
  parseSave,
  prepareImport,
  serializeSave,
} from "./save-transfer.js";

test("portable saves preserve money, purchases, managers and story checkpoints", () => {
  let game = newGame(100);
  for (let i = 0; i < 1500; i++) game = payDay(game);
  game = hireManager(buyBusiness(game, 0, 3), 0);
  game = storyCheckpoint(syncStory(game), "scene-01", 3);
  assert.deepEqual(parseSave(serializeSave(game, 100), 100), game);
});
test("raw legacy/current saves also import, invalid files cannot mutate a game", () => {
  const game = newGame(100);
  assert.deepEqual(parseSave(JSON.stringify(game), 100), game);
  const before = JSON.stringify(game);
  for (const text of [
    "not JSON",
    "null",
    "{}",
    JSON.stringify({ format: "other-game", game }),
    JSON.stringify({ format: "meowth-pay-day-empire", fileVersion: 99, game }),
    JSON.stringify({ ...game, balance: -1 }),
    "x".repeat(MAX_SAVE_BYTES + 1),
  ])
    assert.throws(() => parseSave(text, 100));
  assert.equal(JSON.stringify(game), before);
});
test("import awards at most two hours of managed offline income and never awards it twice", () => {
  let game = newGame(100);
  for (let i = 0; i < 1500; i++) game = payDay(game);
  game = hireManager(buyBusiness(game, 0, 1), 0);
  const next = prepareImport(game, 100 + OFFLINE_LIMIT * 3);
  assert.equal(next.balance - game.balance, 28800);
  assert.equal(next.balance - game.balance, (4 * OFFLINE_LIMIT) / 1000);
  assert.equal(next.savedAt, 100 + OFFLINE_LIMIT * 3);
  assert.deepEqual(prepareImport(next, next.savedAt), next);
});

function memoryStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
}

test("delete progress persists a fresh Kanto empire and removes the import backup", async () => {
  const { SAVE_KEY, restoreGame } = await import("./game.js");
  const old = { ...newGame(100), balance: 500000, lifetime: 500000, unlockedRegion: 9, region: 9 };
  old.businesses[0] = { ...old.businesses[0], quantity: 25, manager: true, elapsed: 0 };
  old.upgrades = ["click-2", "all-2"];
  old.story.seen = ["scene-01"];
  const storage = memoryStorage({ [SAVE_KEY]: JSON.stringify(old), [BACKUP_KEY]: serializeSave(old, 100), unrelated: "keep" });
  const fresh = deleteProgress(storage, 1000);
  assert.deepEqual(fresh, newGame(1000));
  assert.equal(storage.getItem(BACKUP_KEY), null);
  assert.equal(storage.getItem("unrelated"), "keep");
  assert.deepEqual(restoreGame(JSON.parse(storage.getItem(SAVE_KEY)), 1000), fresh);
  assert.equal(prepareImport(fresh, 1000 + OFFLINE_LIMIT * 4).balance, 0);
});

test("failed progress deletion preserves the existing save and backup", async () => {
  const { SAVE_KEY } = await import("./game.js");
  for (const failure of ["write", "remove"]) {
    const storage = memoryStorage({ [SAVE_KEY]: "original", [BACKUP_KEY]: "backup" });
    if (failure === "write") storage.setItem = () => { throw new Error("Storage unavailable"); };
    else storage.removeItem = () => { throw new Error("Storage unavailable"); };
    assert.throws(() => deleteProgress(storage, 1000));
    assert.equal(storage.getItem(SAVE_KEY), "original");
    assert.equal(storage.getItem(BACKUP_KEY), "backup");
  }
});
