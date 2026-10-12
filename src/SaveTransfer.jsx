import { useRef, useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, RotateCcw } from "lucide-react";
import {
  BACKUP_KEY,
  MAX_SAVE_BYTES,
  parseSave,
  saveFilename,
} from "./save-transfer";
import { regionInfo } from "./regions";
import { money } from "./format";

export default function SaveTransfer({
  exportSave,
  importSave,
  restoreBackup,
}) {
  const input = useRef(null);
  const [candidate, setCandidate] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [backup, setBackup] = useState(() => {
    try {
      return Boolean(localStorage.getItem(BACKUP_KEY));
    } catch {
      return false;
    }
  });
  const report = (text, failed = false) => {
    setMessage(text);
    setError(failed);
  };

  async function download() {
    setBusy(true);
    try {
      const text = exportSave();
      const filename = saveFilename();
      if (window.empireDesktop) {
        const result = await window.empireDesktop.exportSave({
          text,
          filename,
        });
        if (!result.canceled)
          report(
            "Save exported. Keep this file to move or back up your empire.",
          );
      } else {
        const url = URL.createObjectURL(
          new Blob([text], { type: "application/json" }),
        );
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.append(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        report("Save exported. Keep this file to move or back up your empire.");
      }
    } catch {
      report(
        "Could not export your save. Try again or choose another folder.",
        true,
      );
    } finally {
      setBusy(false);
    }
  }

  async function choose(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setCandidate(null);
    try {
      if (file.size > MAX_SAVE_BYTES)
        throw new Error("Choose a Meowth save smaller than 2 MB.");
      setCandidate({ game: parseSave(await file.text()), name: file.name });
      report("");
    } catch (e) {
      report(e.message, true);
    }
  }

  function confirm() {
    try {
      importSave(candidate.game);
      setBackup(true);
      setCandidate(null);
      report("Empire imported. Your previous progress is available below.");
    } catch {
      report(
        "Could not store this save. Your current empire has not been changed.",
        true,
      );
    }
  }

  return (
    <section className="save-transfer" aria-label="Transfer your save">
      <h3>Take your empire with you</h3>
      <p>
        Export here, then import the file in the desktop app. Save files work
        offline.
      </p>
      <div className="save-transfer-buttons">
        <button className="outline-button" onClick={download} disabled={busy}>
          <ArrowDownToLine size={15} /> Export save
        </button>
        <button
          className="outline-button"
          onClick={() => input.current.click()}
        >
          <ArrowUpFromLine size={15} /> Import save
        </button>
      </div>
      <input
        ref={input}
        type="file"
        accept=".json,application/json"
        onChange={choose}
        hidden
        tabIndex={-1}
      />
      {candidate && (
        <div className="save-import-preview">
          <strong>
            Import {regionInfo(candidate.game.region).name} empire?
          </strong>
          <p>
            {money(candidate.game.balance)} ·{" "}
            {candidate.game.businesses.reduce((n, b) => n + b.quantity, 0)}{" "}
            shops owned · {candidate.game.story.seen.length} stories watched
          </p>
          <p>
            This replaces your current progress. A local backup is kept so you
            can undo the import.
          </p>
          <div className="save-transfer-buttons">
            <button className="solid-button" onClick={confirm}>
              Replace with this save
            </button>
            <button
              className="outline-button"
              onClick={() => setCandidate(null)}
            >
              Cancel import
            </button>
          </div>
        </div>
      )}
      {backup && !candidate && (
        <button
          className="save-backup-button"
          onClick={() => {
            try {
              restoreBackup();
              report(
                "Previous empire restored. The other save is now your backup.",
              );
            } catch (e) {
              report(e.message, true);
            }
          }}
        >
          <RotateCcw size={13} /> Restore previous empire
        </button>
      )}
      {message && (
        <p
          className={error ? "save-transfer-error" : "save-transfer-message"}
          role={error ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </section>
  );
}
