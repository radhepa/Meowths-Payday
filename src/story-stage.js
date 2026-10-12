// Foreground paths inspected in each background. Coordinates refer
// to the original artwork, so responsive cropping cannot move feet off the path.
export const STORY_GROUND = {
  market: { width: 1672, height: 940, y: 0.84 },
  square: { width: 1672, height: 941, y: 0.84 },
  harbor: { width: 1672, height: 941, y: 0.85 },
  storm: { width: 1672, height: 941, y: 0.81 },
  sky: { width: 1672, height: 941, y: 0.83 },
  "region-2-market": { width: 1672, height: 941, y: 0.78 },
  "region-2-landmark": { width: 1672, height: 941, y: 0.85 },
  "region-3-market": { width: 1672, height: 941, y: 0.78 },
  "region-3-landmark": { width: 1672, height: 941, y: 0.85 },
  "region-4-market": { width: 1672, height: 941, y: 0.78 },
  "region-4-landmark": { width: 1672, height: 941, y: 0.85 },
  "region-5-market": { width: 1672, height: 941, y: 0.77 },
  "region-5-landmark": { width: 1672, height: 941, y: 0.85 },
  "region-6-market": { width: 1672, height: 941, y: 0.81 },
  "region-6-landmark": { width: 1672, height: 941, y: 0.85 },
  "region-7-market": { width: 1672, height: 941, y: 0.8 },
  "region-7-landmark": { width: 1672, height: 941, y: 0.85 },
  "region-8-market": { width: 1672, height: 941, y: 0.8 },
  "region-8-landmark": { width: 1672, height: 941, y: 0.85 },
  "region-9-market": { width: 1672, height: 941, y: 0.84 },
  "region-9-landmark": { width: 1672, height: 941, y: 0.85 },
};

export function groundPosition(setting, width, height) {
  const ground = STORY_GROUND[setting];
  const scale = Math.max(width / ground.width, height / ground.height);
  // object-fit: cover, object-position: center bottom; the bottom is never cropped.
  const bottom = ground.height * scale * (1 - ground.y);
  return { bottom, y: height - bottom };
}

export function actorPosition(index, count) {
  // This clear central stretch avoids shrubs, lamps and rocks at the path edges.
  return count === 1 ? 50 : 26 + (48 * index) / (count - 1);
}

// Aim listeners at the speaking Pokémon; the speaker anticipates the next reply.
// Mirror the cropped visible body, so transparent sprite padding cannot shift feet.
export function actorFacing(scene, lineIndex, id, nativeFacing) {
  const index = scene.cast.indexOf(id);
  const speaker = scene.lines[lineIndex].speaker;
  const partner =
    id !== speaker
      ? speaker
      : (scene.lines.slice(lineIndex + 1).find((l) => l.speaker !== id)
          ?.speaker ??
        [...scene.lines.slice(0, lineIndex)]
          .reverse()
          .find((l) => l.speaker !== id)?.speaker ??
        scene.cast.find((other) => other !== id));
  const facing = scene.cast.indexOf(partner) > index ? "right" : "left";
  return {
    facing,
    partner,
    flip: nativeFacing !== "front" && nativeFacing !== facing,
  };
}
