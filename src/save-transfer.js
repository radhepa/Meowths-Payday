import { advance, newGame, OFFLINE_LIMIT, restoreGame, SAVE_KEY } from "./game.js";

export const BACKUP_KEY = "meowth.payday-empire.before-import.v1";
export const MAX_SAVE_BYTES = 2 * 1024 * 1024;
const FORMAT = "meowth-pay-day-empire";

// A portable envelope keeps saves independent of the browser or desktop origin.
export function serializeSave(game, now = Date.now()) {
  return JSON.stringify(
    {
      format: FORMAT,
      fileVersion: 1,
      exportedAt: new Date(now).toISOString(),
      game: advance(game, now),
    },
    null,
    2,
  );
}

export function parseSave(text, now = Date.now()) {
  if (
    typeof text !== "string" ||
    new TextEncoder().encode(text).length > MAX_SAVE_BYTES
  )
    throw new Error("Choose a Meowth save smaller than 2 MB.");
  let raw;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new Error(
      "This file is not valid JSON. Choose an exported Meowth save.",
    );
  }
  if (
    raw?.format !== undefined &&
    (raw.format !== FORMAT || raw.fileVersion !== 1)
  )
    throw new Error("This is not a supported Meowth save file.");
  try {
    return restoreGame(raw?.format === FORMAT ? raw.game : raw, now);
  } catch {
    throw new Error(
      "This save has invalid progress. Your current empire has not been changed.",
    );
  }
}

export function prepareImport(game, now = Date.now()) {
  return advance(restoreGame(game, now), now, OFFLINE_LIMIT);
}

// Replace only this game's save and backup; leave unrelated device storage alone.
export function deleteProgress(storage, now = Date.now()) {
  const previous = storage.getItem(SAVE_KEY);
  const fresh = newGame(now);
  storage.setItem(SAVE_KEY, JSON.stringify(fresh));
  try {
    storage.removeItem(BACKUP_KEY);
  } catch (error) {
    // A failed backup deletion must not leave saved and live empires out of sync.
    if (previous === null) storage.removeItem(SAVE_KEY);
    else storage.setItem(SAVE_KEY, previous);
    throw error;
  }
  return fresh;
}

export function saveFilename(now = Date.now()) {
  return `meowth-empire-${new Date(now).toISOString().replace(/[:.]/g, "-")}.json`;
}
