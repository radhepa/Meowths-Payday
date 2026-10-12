import { useState } from "react";
import { REGIONS, regionInfo } from "./regions";
import { regionalProgress } from "./game";
import { money } from "./format";

const BADGE_LABEL = {
  earned: "earned",
  progress: "in progress",
  empty: "not earned yet",
};

export function Badge({ region, state, reduced = false }) {
  return (
    <span className={`pk-badge ${state}`} title={`${region.name} badge`}>
      <img
        className={state === "progress" && !reduced ? "pulse" : ""}
        src={`/assets/badges/region-${region.id}.png`}
        alt={`${region.name} badge, ${BADGE_LABEL[state]}`}
      />
    </span>
  );
}

function LockIcon() {
  return (
    <svg
      className="pk-lock"
      width="34"
      height="40"
      viewBox="0 0 10 12"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path
        d="M3 0h4v1h1v1h1v3h1v7h-10v-7h1v-3h1v-1h1zM3 2v3h4v-3z"
        fill="#f8f8f8"
      />
      <path d="M4 7h2v3h-2z" fill="#283048" />
    </svg>
  );
}

export default function RegionPanel({ game, onVisit, onTravel, onStory }) {
  const [pick, setPick] = useState(game.region);
  const frontier = regionInfo(game.unlockedRegion);
  const progress = regionalProgress(game);
  const complete = game.unlockedRegion === 9 && progress.ready;
  const chosen = regionInfo(pick);
  const chosenOpen = pick <= game.unlockedRegion;
  const chosenStats = regionalProgress(game, pick);
  const requirements = [
    {
      label: `Open ${progress.total} ${frontier.name} shops`,
      current: progress.owned,
      total: progress.total,
      tone: "hp",
    },
    {
      label: `Hire ${progress.requiredManagers} local managers`,
      current: progress.managers,
      total: progress.requiredManagers,
      tone: "exp",
    },
    {
      label: `Unlock ${progress.storyTotal} story scenes`,
      current: progress.storyUnlocked,
      total: progress.storyTotal,
      tone: "story",
    },
    {
      label: `Earn ${money(progress.goal, true)} in ${frontier.name}`,
      current: progress.earnings,
      total: progress.goal,
      detail: money(progress.earnings, true),
      tone: "coin",
    },
  ];
  const badgeState = (id) =>
    id < game.unlockedRegion || complete
      ? "earned"
      : id === game.unlockedRegion
        ? "progress"
        : "empty";
  const earned = REGIONS.filter((r) => badgeState(r.id) === "earned").length;

  return (
    <div className="pk-map">
      <div className="pk-map-left">
        <div className="pk-map-grid">
          {REGIONS.map((info) => {
            const unlocked = info.id <= game.unlockedRegion;
            const here = info.id === game.region;
            return (
              <button
                key={info.id}
                className={`pk-tile ${pick === info.id ? "sel" : ""} ${unlocked ? "" : "locked"}`}
                onClick={() => setPick(info.id)}
                aria-pressed={pick === info.id}
                aria-label={`${info.name}, ${here ? "you are here" : unlocked ? "unlocked" : "locked"}`}
                style={{ "--region-color": info.color }}
              >
                <img src={info.background} alt="" loading="lazy" />
                <span className="pk-tile-num lit">{info.id}</span>
                {!unlocked && <LockIcon />}
                <span className="pk-tile-name">
                  <span className="lit t-m">
                    {unlocked ? info.name.toUpperCase() : "???"}
                  </span>
                  {here && <span className="lit t-s here">HERE</span>}
                </span>
              </button>
            );
          })}
        </div>
        <div className="pk-win pk-map-info">
          <div className="pk-map-info-copy">
            <div className="pk-map-info-title">
              <span className="ink t-xl">
                {chosenOpen ? chosen.name : `??? ${chosen.name}`}
              </span>
              <span className="ink t-s dim">
                REGION {chosen.id} · GENERATION {chosen.id}
              </span>
            </div>
            <span className="ink t-m">{chosen.subtitle}</span>
            <span className="ink t-s dim">
              Native Pokémon #{chosen.first}–{chosen.last} ·{" "}
              {chosenStats.total} native businesses
            </span>
          </div>
          {pick === game.region ? (
            <span className="pk-here ink t-m">YOU ARE HERE</span>
          ) : chosenOpen ? (
            <button className="pk-big blue" onClick={() => onVisit(pick)}>
              <span className="lit t-l">VISIT ▶</span>
            </button>
          ) : (
            <span className="pk-locked-note t-s">
              LOCKED
              <br />
              Reach {REGIONS[pick - 2].name} first
            </span>
          )}
        </div>
      </div>

      <div className="pk-map-right">
        <div className="pk-badge-case">
          <div className="pk-badge-case-head">
            <span className="lit t-m pk-gold">REGION BADGES</span>
            <span className="lit t-s">
              {earned}/{REGIONS.length}
            </span>
          </div>
          <div className="pk-badge-grid">
            {REGIONS.map((r) => (
              <Badge key={r.id} region={r} state={badgeState(r.id)} />
            ))}
          </div>
          <p className="lit t-s pk-badge-note">
            Complete a region to earn its badge
          </p>
        </div>

        <div className="pk-win pk-horizon">
          <span className="ink t-s pk-gold-ink">
            {complete ? "A WORLD OF FRIENDS" : "YOUR NEXT HORIZON"}
          </span>
          <h2 className="ink t-l">
            {complete
              ? "Nine regions. One empire."
              : game.unlockedRegion === 9
                ? "Complete your Paldea empire"
                : `${frontier.name} ▶ ${regionInfo(game.unlockedRegion + 1).name}`}
          </h2>
          {requirements.map(({ label, current, total, detail, tone }) => (
            <div className="pk-req" key={label}>
              <div className="pk-req-line">
                <span className="ink t-s">
                  {current >= total ? "★ " : ""}
                  {label}
                </span>
                <span className="ink t-s dim">
                  {detail || `${Math.min(current, total)}/${total}`}
                </span>
              </div>
              <span className="pk-track">
                <span
                  className={`pk-fill ${tone}`}
                  style={{
                    width: `${Math.max(2, Math.min(100, (current / total) * 100))}%`,
                  }}
                />
              </span>
            </div>
          ))}
          <div className="pk-horizon-actions">
            {game.region !== game.unlockedRegion ? (
              <button
                className="pk-big blue"
                onClick={() => onVisit(game.unlockedRegion)}
              >
                <span className="lit t-m">RETURN TO {frontier.name.toUpperCase()}</span>
              </button>
            ) : game.unlockedRegion < 9 ? (
              <button
                className="pk-big red"
                disabled={!progress.ready}
                onClick={onTravel}
              >
                <span className="lit t-m">
                  TRAVEL TO {regionInfo(game.unlockedRegion + 1).name.toUpperCase()}
                </span>
              </button>
            ) : (
              <p className="ink t-s">
                {complete
                  ? "Every region has a place to belong. Keep growing your worldwide empire!"
                  : "Paldea is your final destination. Finish its milestones to complete the world tour."}
              </p>
            )}
            {!progress.storyReady && (
              <button className="pk-link" onClick={onStory}>
                View {frontier.name}'s next story milestone ▶
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
