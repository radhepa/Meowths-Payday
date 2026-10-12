import { useEffect, useRef, useState } from "react";
import { CAST } from "./story";
import { storyBackground } from "./regions";
import { actorFacing, actorPosition, groundPosition } from "./story-stage";
import { storyAssets as assets, spriteFrames as frames } from "./story-media";

export default function CutsceneStage({ scene, chapter, line }) {
  const stage = useRef(null);
  const [layout, setLayout] = useState(null);
  useEffect(() => {
    const position = () => {
      const { clientWidth, clientHeight } = stage.current;
      setLayout({
        width: clientWidth,
        height: clientHeight,
        ...groundPosition(chapter.setting, clientWidth, clientHeight),
      });
    };
    position();
    const observer = new ResizeObserver(position);
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, [chapter.setting]);

  return (
    <div
      ref={stage}
      className={`cutscene-stage setting-${chapter.setting}`}
      style={{
        "--ground-bottom": layout == null ? "20%" : `${layout.bottom}px`,
      }}
    >
      <img
        className="story-landscape"
        src={storyBackground(chapter.setting)}
        alt=""
        aria-hidden="true"
      />
      <span className="cutscene-location">{chapter.location}</span>
      <div className="cutscene-cast">
        {scene.cast.map((id, index) => {
          const frame = frames[id];
          const speaking = line.speaker === id;
          const orientation = actorFacing(
            scene,
            scene.lines.indexOf(line),
            id,
            frame.nativeFacing,
          );
          const fit = layout
            ? Math.min(
                (layout.width * 0.21 * frame.canvasWidth) / frame.width,
                (Math.max(24, layout.y - 40 - (frame.flying ? 20 : 0)) *
                  frame.canvasWidth) /
                  frame.height,
              )
            : 128;
          return (
            <div
              key={id}
              data-pokemon={id}
              data-grounded={!frame.flying}
              data-facing={orientation.facing}
              data-native-facing={frame.nativeFacing}
              data-partner={orientation.partner}
              className={`scene-actor ${frame.flying ? "airborne" : "grounded"} ${speaking ? "speaking" : ""}`}
              style={{
                left: `${actorPosition(index, scene.cast.length)}%`,
                "--sprite-size": `min(var(--default-sprite-size), ${fit}px)`,
                "--face-scale": orientation.flip ? -1 : 1,
                "--body-width": `calc(var(--sprite-size) * ${frame.width / frame.canvasWidth})`,
                "--body-height": `calc(var(--sprite-size) * ${frame.height / frame.canvasWidth})`,
                "--image-height": `calc(var(--sprite-size) * ${frame.canvasHeight / frame.canvasWidth})`,
                "--image-left": `calc(var(--sprite-size) * ${-frame.left / frame.canvasWidth})`,
                "--image-top": `calc(var(--sprite-size) * ${-frame.top / frame.canvasWidth})`,
              }}
            >
              <span className="actor-shadow" aria-hidden="true" />
              {/* Layout clips only transparent padding; the original sprite is untouched. */}
              <div className="actor-body">
                <img src={assets.bodies[id]} alt={CAST[id]} draggable="false" />
              </div>
              <span className="actor-name">{CAST[id]}</span>
              {speaking && (
                <span className="actor-speech" aria-hidden="true">
                  {["Surprised", "Worried"].includes(line.emotion)
                    ? "!"
                    : line.emotion === "Sad"
                      ? "…"
                      : line.emotion === "Joyous"
                        ? "♪"
                        : "•••"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
