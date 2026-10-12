const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { resolveAppPath } = require("./protocol.cjs");
const root = path.resolve("test-app", "dist");
test("stable desktop origin serves bundled absolute asset paths", () => {
  assert.equal(
    resolveAppPath("meowth://empire/", root),
    path.join(root, "index.html"),
  );
  assert.equal(
    resolveAppPath("meowth://empire/assets/story/52/Normal.png", root),
    path.join(root, "assets/story/52/Normal.png"),
  );
});
test("app protocol cannot escape the asset directory or serve another origin", () => {
  for (const url of [
    "file:///C:/Windows/win.ini",
    "https://empire/assets/foo",
    "meowth://other/assets/foo",
    "meowth://empire/%2e%2e%2f%2e%2e%2fsecret",
    "meowth://empire/%5c..%5csecret",
    "meowth://empire/%00foo",
    "meowth://empire/%zz",
  ])
    assert.throws(() => resolveAppPath(url, root));
});
