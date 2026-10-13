import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  LockKeyhole,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  X,
} from "lucide-react";
import {
  CAST,
  CHAPTERS,
  SCENES,
  requirementLabel,
  scenesForRegion,
} from "./story";
import { storyAssets } from "./story-media";
import CutsceneStage from "./CutsceneStage";
import "./story.css";
const { portraits, bodies } = storyAssets;
import { regionInfo, storyBackground } from "./regions";

export function StoryBackdrop({ setting }) {
  return (
    <img
      className="story-landscape"
      src={storyBackground(setting)}
      alt=""
      aria-hidden="true"
    />
  );
}

export function StoryJournal({ story, region = 1, onOpen, onToggle }) {
  const regionalScenes = scenesForRegion(region);
  const chapters = CHAPTERS.map((c, index) => ({ ...c, index })).filter(
    (c) => c.region === region,
  );
  const [chapter, setChapter] = useState(chapters[0].index);
  const watched = regionalScenes.filter((s) =>
    story.seen.includes(s.id),
  ).length;
  const pending = regionalScenes.find(
    (s) => story.unlocked.includes(s.id) && !story.seen.includes(s.id),
  );
  const continuation =
    regionalScenes.find((s) => s.id === story.checkpoint?.sceneId) ?? pending;
  const next = regionalScenes.find((s) => !story.unlocked.includes(s.id));
  const info = CHAPTERS[chapter];
  return (
    <div className="story-journal">
      <section className="story-banner">
        <StoryBackdrop setting={info.setting} />
        <div className="story-banner-copy">
          <span className="eyebrow">
            {regionInfo(region).name.toUpperCase()} CHRONICLES
          </span>
          <h2>A fortune worth sharing.</h2>
          <p>
            {regionalScenes.length} {regionInfo(region).name} moments of
            adventure, kindness, and finding a place to belong.
          </p>
        </div>
        <img
          className="journal-meowth"
          src={bodies[regionalScenes[0].cast[0]]}
          alt={`${CAST[regionalScenes[0].cast[0]]}, your local story companion`}
        />
      </section>
      <div className="story-summary">
        <div>
          <BookOpen size={18} />
          <strong>
            {watched} / {regionalScenes.length}
          </strong>
          <span>scenes watched</span>
        </div>
        <button
          className="story-auto"
          onClick={onToggle}
          aria-pressed={story.autoPlay}
        >
          {story.autoPlay ? <Play size={14} /> : <Pause size={14} />}Auto
          cutscenes: {story.autoPlay ? "On" : "Off"}
        </button>
      </div>
      {continuation && (
        <button
          className="story-continue"
          onClick={() => onOpen(continuation.id)}
        >
          <span>
            <span className="eyebrow">YOUR NEXT MOMENT</span>
            <strong>
              {story.checkpoint?.sceneId === continuation.id
                ? "Resume"
                : "Watch"}
              : {continuation.title}
            </strong>
          </span>
          <ArrowRight size={20} />
        </button>
      )}
      {next && (
        <div className="story-next-goal">
          <LockKeyhole size={15} />
          <span>
            Next milestone:{" "}
            <strong>{requirementLabel(next.requirement)}</strong>
          </span>
        </div>
      )}
      <div className="chapter-tabs" role="group" aria-label="Story chapters">
        {chapters.map((c) => (
          <button
            key={c.index}
            aria-pressed={chapter === c.index}
            onClick={() => setChapter(c.index)}
          >
            <span>{String(c.number).padStart(2, "0")}</span>
            <span>{c.title}</span>
          </button>
        ))}
      </div>
      <div className="chapter-intro">
        <span className="eyebrow gold-text">
          CHAPTER {String(info.number).padStart(2, "0")} · {info.location}
        </span>
        <h2>{info.title}</h2>
        <p>{info.subtitle}</p>
      </div>
      <div className="story-scene-list">
        {SCENES.filter((s) => s.chapter === chapter).map((s) => {
          const unlocked = story.unlocked.includes(s.id),
            seen = story.seen.includes(s.id);
          return (
            <article
              key={s.id}
              className={`story-scene-card ${unlocked ? "unlocked" : "locked"}`}
            >
              <span className="scene-number">
                {String(s.regionNumber).padStart(2, "0")}
              </span>
              <div>
                <h3>
                  {s.title}
                  {seen && <Check size={14} />}
                </h3>
                <p>
                  {unlocked
                    ? s.synopsis
                    : `${s.regionNumber > regionalScenes.filter((s) => story.unlocked.includes(s.id)).length + 1 ? "Continue the earlier story, then " : ""}${requirementLabel(s.requirement)}`}
                </p>
              </div>
              <button
                disabled={!unlocked}
                aria-label={`${seen ? "Replay" : "Watch"} ${s.title}`}
                onClick={() => onOpen(s.id)}
              >
                {unlocked ? (
                  <>
                    {seen ? <RotateCcw size={14} /> : <Play size={14} />}
                    <span>{seen ? "Replay" : "Watch"}</span>
                  </>
                ) : (
                  <>
                    <LockKeyhole size={14} />
                    <span>Locked</span>
                  </>
                )}
              </button>
            </article>
          );
        })}
      </div>
      <p className="story-journal-note">
        All {SCENES.length} scenes stay with you as you travel. New milestones play
        automatically. Return to town to save your place, or skip a scene and
        replay later.
      </p>
    </div>
  );
}

export default function StoryPlayer({ active, onMove, onFinish, onClose }) {
  const scene = SCENES.find((s) => s.id === active.id);
  const chapter = CHAPTERS[scene.chapter];
  const line = scene.lines[active.lineIndex];
  const panel = useRef(null),
    forward = useRef(null);
  const controls = useRef(null);
  const [shown, setShown] = useState(0);
  const complete = shown >= line.text.length;
  const reduced = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  controls.current = { onClose, onMove, onFinish, complete, line, active };
  useEffect(() => {
    setShown(reduced.current ? line.text.length : 0);
    if (reduced.current) return;
    const timer = setInterval(
      () =>
        setShown((n) => {
          const count = Math.min(line.text.length, n + 2);
          if (count === line.text.length) clearInterval(timer);
          return count;
        }),
      22,
    );
    return () => clearInterval(timer);
  }, [scene.id, active.lineIndex, line.text]);
  function next() {
    if (!complete) {
      setShown(line.text.length);
      return;
    }
    if (active.lineIndex === scene.lines.length - 1) onFinish();
    else onMove(active.lineIndex + 1);
  }
  forward.current = next;
  useEffect(() => {
    const prior = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current.focus();
    const key = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        controls.current.onClose();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        forward.current();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        controls.current.onMove(controls.current.active.lineIndex - 1);
      }
      if ((e.key === " " || e.key === "Enter") && e.target === panel.current) {
        e.preventDefault();
        forward.current();
      }
      if (e.key === "Tab") {
        const buttons = [...panel.current.querySelectorAll("button")].filter(
          (b) => !b.disabled,
        );
        const first = buttons[0],
          last = buttons.at(-1);
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === panel.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (
          !e.shiftKey &&
          (document.activeElement === last ||
            document.activeElement === panel.current)
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      prior?.focus();
    };
  }, []);
  const portrait = portraits[line.speaker].emotions[line.emotion];
  return (
    <div className="story-overlay">
      <section
        ref={panel}
        className="cutscene-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cutscene-title"
        tabIndex={-1}
      >
        <header className="cutscene-header">
          <div>
            <span className="eyebrow">
              {regionInfo(scene.region).name.toUpperCase()} · CHAPTER{" "}
              {String(chapter.number).padStart(2, "0")} · SCENE{" "}
              {String(scene.regionNumber).padStart(2, "0")} /{" "}
              {scenesForRegion(scene.region).length}
            </span>
            <h2 id="cutscene-title">{scene.title}</h2>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Return to town and save scene"
          >
            <X size={20} />
          </button>
        </header>
        <CutsceneStage scene={scene} chapter={chapter} line={line} />
        <div className="dialogue-box">
          <div className="dialogue-portrait">
            <img
              src={portrait}
              alt={`${CAST[line.speaker]} — ${line.emotion} PMD portrait`}
              draggable="false"
            />
          </div>
          <div className="dialogue-copy">
            <div className="dialogue-speaker">
              <h3>{CAST[line.speaker]}</h3>
              <span>{line.emotion}</span>
            </div>
            <p className="dialogue-text" aria-hidden="true">
              {line.text.slice(0, shown)}
              <span className="dialogue-cursor">{complete ? "▾" : "▌"}</span>
            </p>
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {CAST[line.speaker]}: {line.text}
            </p>
          </div>
        </div>
        <div
          className="dialogue-progress"
          aria-label={`Dialogue ${active.lineIndex + 1} of ${scene.lines.length}`}
        >
          {scene.lines.map((_, i) => (
            <span className={i <= active.lineIndex ? "filled" : ""} key={i} />
          ))}
        </div>
        <footer className="cutscene-controls">
          <div>
            <button
              className="scene-back"
              onClick={() => onMove(active.lineIndex - 1)}
              disabled={!active.lineIndex}
            >
              <ArrowLeft size={15} />
              <span>Back</span>
            </button>
            <button
              className="scene-skip"
              aria-label="Skip scene"
              onClick={onFinish}
            >
              <SkipForward size={15} />
              <span>Skip scene</span>
            </button>
          </div>
          <button className="scene-next" onClick={next}>
            {!complete
              ? "Show dialogue"
              : active.lineIndex === scene.lines.length - 1
                ? "Finish scene"
                : "Next"}
            <ChevronRight size={18} />
          </button>
        </footer>
        <div className="cutscene-hint">
          ← → to navigate · Esc returns to town · {active.lineIndex + 1} /{" "}
          {scene.lines.length}
        </div>
      </section>
    </div>
  );
}
