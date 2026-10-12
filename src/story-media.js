import kanto from "./story-assets.json" with { type: "json" };
import regional from "./regional-story-assets.json" with { type: "json" };
import kantoFrames from "./story-sprite-frames.json" with { type: "json" };
import regionalFrames from "./regional-story-sprite-frames.json" with { type: "json" };
export const storyAssets = {
  bodies: { ...kanto.bodies, ...regional.bodies },
  portraits: { ...kanto.portraits, ...regional.portraits },
};
export const spriteFrames = { ...kantoFrames, ...regionalFrames };
