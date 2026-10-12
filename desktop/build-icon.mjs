import fs from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";

// One Meowth Mint source supplies the app window and Windows launcher.
const svg = await fs.readFile(new URL("../public/assets/branding/meowth-mint.svg", import.meta.url), "utf8");
const sizes = [16, 24, 32, 48, 64, 128, 256];
const images = sizes.map((size) => new Resvg(svg, {
  fitTo: { mode: "width", value: size }, imageRendering: 1,
  font: { loadSystemFonts: false },
}).render().asPng());
await fs.writeFile(new URL("./icon.png", import.meta.url), images.at(-1));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const entry = 6 + i * 16;
  header[entry] = size === 256 ? 0 : size;
  header[entry + 1] = header[entry];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(images[i].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += images[i].length;
});
await fs.writeFile(new URL("./icon.ico", import.meta.url), Buffer.concat([header, ...images]));
