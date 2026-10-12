import { useCallback, useEffect, useRef, useState } from "react";
import { syncStory, storyCheckpoint, finishStory } from "./story";
import {
  BACKUP_KEY,
  deleteProgress as deleteStoredProgress,
  parseSave,
  prepareImport,
  serializeSave,
} from "./save-transfer";
import {
  advance,
  newGame,
  OFFLINE_LIMIT,
  restoreGame,
  SAVE_KEY,
  payDay,
  buyBusiness,
  startBusiness,
  hireManager,
  buyUpgrade,
  travel,
  visitRegion,
  serveCustomer,
} from "./game";

export function useGame() {
  const [notice, setNotice] = useState("");
  const initialNotice = useRef("");
  const [game, setGame] = useState(() => {
    try {
      const stored = localStorage.getItem(SAVE_KEY);
      if (!stored) return newGame();
      const restored = restoreGame(JSON.parse(stored));
      const next = advance(restored, Date.now(), OFFLINE_LIMIT);
      if (next.balance > restored.balance)
        initialNotice.current = `Your empire earned ₽${(next.balance - restored.balance).toLocaleString(undefined, { maximumFractionDigits: 2 })} while you were away.`;
      return next;
    } catch {
      initialNotice.current =
        "Your save could not be loaded. A fresh empire is ready.";
      return newGame();
    }
  });
  const latest = useRef(game);
  latest.current = game;
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  useEffect(() => {
    if (initialNotice.current) setNotice(initialNotice.current);
  }, []);
  const save = useCallback(() => {
    try {
      localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(advance(latest.current, Date.now())),
      );
      setSaved(true);
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }, []);
  useEffect(() => {
    const timer = setInterval(
      () => setGame((prev) => advance(prev, Date.now())),
      100,
    );
    const saver = setInterval(save, 1000);
    window.addEventListener("pagehide", save);
    window.addEventListener("beforeunload", save);
    return () => {
      clearInterval(timer);
      clearInterval(saver);
      window.removeEventListener("pagehide", save);
      window.removeEventListener("beforeunload", save);
    };
  }, [save]);
  const act = useCallback(
    (fn, ...args) =>
      setGame((prev) => syncStory(fn(advance(prev, Date.now()), ...args))),
    [],
  );
  const importSave = useCallback((incoming) => {
    const next = prepareImport(incoming);
    // Write both files before replacing live state; failed storage cannot lose progress.
    localStorage.setItem(BACKUP_KEY, serializeSave(latest.current));
    localStorage.setItem(SAVE_KEY, JSON.stringify(next));
    latest.current = next;
    setGame(next);
    setSaved(true);
    setSaveError(false);
  }, []);
  const restoreBackup = useCallback(() => {
    const text = localStorage.getItem(BACKUP_KEY);
    if (!text)
      throw new Error("No previous empire is available on this device.");
    importSave(parseSave(text));
  }, [importSave]);
  const deleteProgress = useCallback(() => {
    const fresh = deleteStoredProgress(localStorage);
    // Replace the autosave ref immediately so an old timer cannot revive progress.
    latest.current = fresh;
    setGame(fresh);
    setNotice("");
    setSaved(true);
    setSaveError(false);
  }, []);
  return {
    game,
    notice,
    setNotice,
    saved,
    saveError,
    save,
    exportSave: () => serializeSave(latest.current),
    importSave,
    restoreBackup,
    deleteProgress,
    actions: {
      click: () => act(payDay),
      buy: (i, n) => act(buyBusiness, i, n),
      start: (i) => act(startBusiness, i),
      hire: (i) => act(hireManager, i),
      upgrade: (id) => act(buyUpgrade, id),
      travel: () => act(travel),
      visit: (region) => act(visitRegion, region),
      serve: (i, liked) => act(serveCustomer, i, liked),
      storyCheckpoint: (id, line) => act(storyCheckpoint, id, line),
      storyFinish: (id) => act(finishStory, id),
      storyAuto: () =>
        setGame((prev) => ({
          ...prev,
          story: { ...prev.story, autoPlay: !prev.story.autoPlay },
        })),
      sound: () => setGame((prev) => ({ ...prev, sound: !prev.sound })),
    },
  };
}
