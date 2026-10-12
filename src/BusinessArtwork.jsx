import { BUSINESSES } from "./catalog";
// Compose unmodified PokeAPI item sprites with original, grid-aligned pixel art.
// SVG is only the layout canvas: no smooth paths, filters, or painted imagery.
const ART = {
  tails: { scene: "stall", prop: "quick-claw", color: "#ee95ae" },
  berries: { scene: "cafe", prop: "moomoo-milk", color: "#ae9cf3" },
  rocket: { scene: "arcade", prop: "amulet-coin", color: "#e48176" },
  silph: { scene: "exchange", prop: "air-mail", color: "#89b5f5" },
  balls: { scene: "factory", prop: "up-grade", color: "#ad91e9" },
  garden: { scene: "garden", prop: "light-clay", color: "#9bcf83" },
  fishing: { scene: "dock", prop: "mystic-water", color: "#ecab73" },
  cafe: { scene: "cafe", prop: "berry-juice", color: "#eaa3c5" },
  power: { scene: "factory", prop: "light-clay", color: "#f2d679" },
  dairy: { scene: "cafe", prop: "berry-juice", color: "#e5b6b0" },
  evolution: { scene: "boutique", prop: "mystic-water", color: "#ddb68b" },
  cruise: { scene: "ship", prop: "air-mail", color: "#82cee1" },
  courier: { scene: "mail", prop: "town-map", color: "#edbf7f" },
  clinic: { scene: "clinic", prop: "rare-candy", color: "#f0acc3" },
  daycare: { scene: "play", prop: "lava-cookie", color: "#bca1e8" },
  resort: { scene: "hotel", prop: "berry-juice", color: "#92beb2" },
  quarry: { scene: "mine", prop: "light-clay", color: "#aac48d" },
  lighthouse: { scene: "beacon", prop: "cell-battery", color: "#e9d47e" },
  tech: { scene: "terminal", prop: "exp-share", color: "#abadea" },
  skyport: { scene: "skyport", prop: "master-ball", color: "#83cbb1" },
};
export const itemSize = (item) => (item === "air-mail" ? 24 : 30);

function PixelBackdrop({ scene, color }) {
  // Every coordinate is an integer on a 40px grid, displayed at exactly 2×.
  if (scene === "garden")
    return (
      <>
        <path d="M4 29h32v6H4zM6 24h28v5H6z" fill="#66503b" />
        <path
          d="M6 30h4v3H6zm8 0h4v3h-4zm8 0h4v3h-4zm8 0h4v3h-4z"
          fill="#a77c4b"
        />
        <path d="M6 17h2v9H6zm24-5h2v14h-2z" fill="#5a8247" />
        <path d="M3 14h7v4H3zm26-5h7v4h-7zM8 20h5v3H8z" fill={color} />
      </>
    );
  if (scene === "dock" || scene === "ship")
    return (
      <>
        <path d="M3 25h34v11H3z" fill="#28516b" />
        <path d="M5 28h6v2H5zm10 4h8v2h-8zm11-5h8v2h-8z" fill="#5d9db8" />
        {scene === "dock" ? (
          <>
            <path d="M3 25h24v4H3zm3 4h3v6H6zm14 0h3v6h-3z" fill="#977049" />
            <path d="M3 24h24v1H3z" fill="#d1b58b" />
          </>
        ) : (
          <>
            <path d="M5 24h31l-5 7H10z" fill="#c6d8d8" />
            <path d="M12 19h18v5H12zm7-7h3v7h-3z" fill={color} />
            <path d="M5 24h31v2H5z" fill="#527690" />
          </>
        )}
      </>
    );
  if (scene === "mine")
    return (
      <>
        <path d="M3 26h4v-7h5v-7h10v4h6v6h5v7h4v7H3z" fill="#596457" />
        <path d="M12 12h10v4H12zm16 10h5v4h-5zM6 29h6v3H6z" fill={color} />
        <path d="M14 25h12v11H14z" fill="#27302b" />
        <path d="M12 22h16v3H12zm1 3h3v11h-3zm12 0h3v11h-3z" fill="#927247" />
        <path d="M8 35h25v2H8z" fill="#c3ae83" />
      </>
    );
  if (scene === "skyport")
    return (
      <>
        <path d="M3 29h34v4H3zm6 4h3v4H9zm19 0h3v4h-3z" fill="#5e7286" />
        <path d="M7 27h26v2H7z" fill={color} />
        <path d="M6 8h2v2H6zm26 3h2v2h-2zM28 6h2v2h-2z" fill="#e8dda0" />
        <path d="M5 34h6v1H5zm25 0h6v1h-6z" fill="#c8dbe0" />
      </>
    );
  if (scene === "beacon")
    return (
      <>
        <path d="M13 14h14v21H13zm-2 21h18v3H11z" fill="#ced3c3" />
        <path d="M13 22h14v4H13zM11 11h18v4H11z" fill={color} />
        <path d="M15 6h10v5H15z" fill="#39443b" />
        <path d="M17 7h6v3h-6zM4 7h6v2H4zm26 0h6v2h-6z" fill="#ffe592" />
      </>
    );
  if (scene === "arcade" || scene === "terminal")
    return (
      <>
        <path d="M8 6h25v24H8zM5 30h31v5H5z" fill="#425064" />
        <path d="M10 8h21v15H10z" fill="#162834" />
        <path d="M10 23h21v2H10zm-1 8h24v2H9z" fill={color} />
        <path d="M11 27h3v2h-3zm15 0h3v2h-3zM13 12h4v2h-4z" fill="#e9d47e" />
        {scene === "terminal" && (
          <path d="M18 12h9v1h-9zm-5 5h14v1H13z" fill="#86b9a6" />
        )}
      </>
    );
  if (scene === "factory")
    return (
      <>
        <path d="M5 17h30v17H5zm3-9h5v9H8zm19-4h5v13h-5z" fill="#536171" />
        <path d="M3 32h34v5H3z" fill="#333b49" />
        <path
          d="M7 34h4v1H7zm8 0h4v1h-4zm8 0h4v1h-4zm8 0h4v1h-4z"
          fill={color}
        />
        <path d="M8 17h24v2H8zm1-7h3v4H9z" fill="#97a7aa" />
        <path d="M28 2h3v2h-3zM8 6h4v2H8z" fill="#72888b" />
      </>
    );
  if (scene === "exchange" || scene === "mail")
    return (
      <>
        <path d="M6 9h28v24H6z" fill="#596a7b" />
        <path d="M8 11h24v19H8z" fill="#c7cbbe" />
        <path d="M8 11h24v3H8zM4 32h32v4H4z" fill={color} />
        <path d="M10 17h8v2h-8zm0 5h16v2H10zM8 35h5v1H8z" fill="#637f84" />
      </>
    );
  // Pixel shelves, a striped awning, and themed details for neighborhood shops.
  return (
    <>
      <path d="M6 14h28v19H6z" fill="#455251" />
      <path d="M4 9h32v6H4z" fill={color} />
      <path d="M8 9h4v6H8zm8 0h4v6h-4zm8 0h4v6h-4z" fill="#ead9bc" />
      <path d="M8 18h24v11H8z" fill="#222f31" />
      <path d="M4 30h32v5H4zm3 5h3v3H7zm23 0h3v3h-3z" fill="#b28c62" />
      <path d="M6 30h28v1H6z" fill="#e1c096" />
      {scene === "clinic" && (
        <path d="M29 16h3v8h-3zm-2 2h7v3h-7z" fill="#efacb8" />
      )}
      {scene === "farm" && <path d="M4 9l16-6 16 6z" fill="#b37778" />}
      {scene === "boutique" && (
        <path d="M28 19h4v3h-4zm1-1h2v5h-2z" fill="#e9cd7b" />
      )}
      {scene === "play" && <path d="M7 25h4v4H7zm4-4h4v4h-4z" fill="#bd99d4" />}
      {scene === "hotel" && <path d="M7 23h6v4H7zm0 4h6v1H7z" fill="#aac6b5" />}
    </>
  );
}

export default function BusinessArtwork({ type, businessId, label }) {
  const item = type.slice("item-".length);
  const b = BUSINESSES.find((b) => b.id === businessId);
  const art =
    ART[businessId] ||
    (businessId === "dragonair-skyport"
      ? ART.skyport
      : b?.artScene
        ? { scene: b.artScene, prop: b.artProp, color: b.color }
        : null);
  const size = itemSize(item);
  if (!art)
    return (
      <img
        className="item-sprite"
        src={`/assets/goods/${item}.png`}
        alt={item.replaceAll("-", " ")}
        style={{ width: size * 2, height: size * 2 }}
        draggable="false"
      />
    );
  const propSize = itemSize(art.prop) / 2;
  return (
    <svg
      className="pixel-vignette"
      viewBox="0 0 40 40"
      role="img"
      aria-label={`${label} pixel art`}
      shapeRendering="crispEdges"
    >
      <title>
        {label}: {item.replaceAll("-", " ")} with{" "}
        {art.prop.replaceAll("-", " ")}
      </title>
      <PixelBackdrop scene={art.scene} color={art.color} />
      <image
        className="pixel-item-layer"
        href={`/assets/goods/${item}.png`}
        x={Math.floor((40 - size) / 2) - 2}
        y={size === 24 ? 8 : 2}
        width={size}
        height={size}
      />
      <image
        className="pixel-item-layer"
        href={`/assets/goods/${art.prop}.png`}
        x="23"
        y="22"
        width={propSize}
        height={propSize}
      />
    </svg>
  );
}
