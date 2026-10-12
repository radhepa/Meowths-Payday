import { useEffect, useRef, useState } from "react";
import { SCENES, nextAutomaticScene, scenesForRegion } from "./story";

// UI queue is regional; saved dialogue checkpoints survive refresh and travel.
export function useStory(game, actions, blocked) {
  const [active, setActive] = useState(null);
  const [suppression, setSuppression] = useState({
    region: game.region,
    ids: [],
  });
  const latest = useRef({ game, actions });
  latest.current = { game, actions };
  const suppressed = suppression.region === game.region ? suppression.ids : [];
  const candidate = nextAutomaticScene(game, suppressed);
  const pending = candidate?.id;
  const lineIndex = candidate?.lineIndex ?? 0;
  useEffect(() => {
    setSuppression({ region: game.region, ids: [] });
    setActive((current) =>
      current && SCENES.find((s) => s.id === current.id)?.region !== game.region
        ? null
        : current,
    );
  }, [game.region]);
  useEffect(() => {
    if (blocked || active || !game.story.autoPlay || !pending) return;
    setActive({ id: pending, lineIndex });
    latest.current.actions.storyCheckpoint(pending, lineIndex);
  }, [pending, lineIndex, game.region, game.story.autoPlay, active, blocked]);
  function open(id) {
    if (!game.story.unlocked.includes(id)) return;
    const lineIndex =
      game.story.checkpoint?.sceneId === id
        ? game.story.checkpoint.lineIndex
        : 0;
    setActive({ id, lineIndex });
    actions.storyCheckpoint(id, lineIndex);
  }
  function move(lineIndex) {
    if (!active) return;
    const scene = SCENES.find((s) => s.id === active.id);
    if (lineIndex < 0 || lineIndex >= scene.lines.length) return;
    setActive({ ...active, lineIndex });
    actions.storyCheckpoint(active.id, lineIndex);
  }
  function finish() {
    if (!active) return;
    actions.storyFinish(active.id);
    setActive(null);
  }
  function close() {
    // Hold the currently available queue, without suppressing future milestones.
    setSuppression({
      region: game.region,
      ids: scenesForRegion(game.region)
        .filter((s) => game.story.unlocked.includes(s.id))
        .map((s) => s.id),
    });
    setActive(null);
  }
  function toggleAuto() {
    if (!game.story.autoPlay) setSuppression({ region: game.region, ids: [] });
    actions.storyAuto();
  }
  function reset() {
    setActive(null);
    setSuppression({ region: 1, ids: [] });
  }
  return { active, open, move, finish, close, pending, toggleAuto, reset };
}
