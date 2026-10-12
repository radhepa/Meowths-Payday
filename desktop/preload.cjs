const { contextBridge, ipcRenderer } = require("electron");

// The renderer gets a single native capability, never Node or filesystem access.
contextBridge.exposeInMainWorld(
  "empireDesktop",
  Object.freeze({
    exportSave: (payload) => ipcRenderer.invoke("empire:export-save", payload),
  }),
);
