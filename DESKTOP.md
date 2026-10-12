# Meowth's Pay Day Empire — Windows desktop edition

## Play

Run **Meowth-Pay-Day-Empire-1.1.3-x64-portable.exe**. It needs no installation, browser, account, Node.js, or internet connection. All 100 businesses, nine regions, 130 automatic cutscenes, 21 backgrounds, sprites, items, and emotion portraits are included.

Alternatively, run the **Meowth-Pay-Day-Empire-1.1.3-x64-Setup.exe** installer for Start menu and desktop shortcuts. Both editions share the same save profile.

## Move your current web empire

1. In the web game, open **Settings → Export save**.
2. Open the desktop app, close the opening scene if needed, and choose **Settings → Import save**.
3. Choose the JSON file, review the empire preview, then click **Replace with this save**.

A backup of the replaced empire is retained. **Restore previous empire** swaps it back. Web and desktop saves do not sync automatically; use export/import to move them.

## Saves and offline play

Progress saves every second under `%APPDATA%\Meowth Pay Day Empire` in your Windows account. The portable app saves here too, so moving or replacing its executable does not reset progress. Export a JSON backup before switching computers or clearing app data.

Managers generate up to two hours of income while the app is closed or suspended. The same limit applies when importing a save. The game remains playable indefinitely while disconnected. Asset-credit websites open only when you choose their links. Gameplay makes no requests to them.

Use **Trainer Card → Options → Delete progress** to start again in Kanto. Confirming clears all game progress and the local import backup. Export a save first if you want to keep it; exported files are not deleted.

## Controls

Use the mouse for Pay Day, shops, managers, upgrades, and travel. Dialogue supports Enter/Space and arrow keys. View → Full Screen and Ctrl +/− adjust the desktop display.

## Build from source

Requires Node.js and internet only for initial dependency/runtime downloads:

```powershell
npm ci
npm test
npm run desktop:start
npm run desktop:pack
```

Executables are written to `release/`. The app uses a local application protocol, a sandboxed renderer, and blocked remote gameplay requests. No updater or account is required. Native capabilities are limited to exporting a save through the Windows save dialog.

This is an unofficial, noncommercial fan game. Pokémon artwork belongs to its respective owners. PMD Collab community portraits are credited under CC BY-NC 4.0 in the bundled manifests. Generated scenery provenance is also included.
