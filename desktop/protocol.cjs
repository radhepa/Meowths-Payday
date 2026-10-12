const path = require("node:path");

// Keep the desktop origin stable for localStorage; never expose arbitrary files.
function resolveAppPath(requestUrl, root) {
  const url = new URL(requestUrl);
  if (
    url.protocol !== "meowth:" ||
    url.host !== "empire" ||
    url.username ||
    url.password
  )
    throw new Error("Unknown app origin");
  const pathname = decodeURIComponent(url.pathname);
  if (pathname.includes("\\") || pathname.includes("\0"))
    throw new Error("Invalid path");
  const file = path.resolve(
    root,
    "." + (pathname === "/" || !pathname ? "/index.html" : pathname),
  );
  const relative = path.relative(root, file);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative))
    throw new Error("Path outside application");
  return file;
}
module.exports = { resolveAppPath };
