import { useEffect, useRef, useState } from "react";
import {
  ArrowDownToLine,
  BookOpen,
  CircleHelp,
  IdCard,
  Info,
  Trash2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { ASSETS } from "./assets";
import {
  businessYield,
  BUSINESSES,
  BUSINESS_ORDER,
  clickValue,
  maxAffordable,
  multiplier,
  passiveRate,
  purchaseCost,
  UPGRADES,
} from "./game";
import { useGame } from "./useGame";
import CustomerScene from "./CustomerScene";
import BusinessArtwork from "./BusinessArtwork";
import { fieldSprite } from "./market";
import StoryPlayer, { StoryJournal } from "./StoryPlayer";
import { useStory } from "./useStory";
import RegionPanel, { Badge } from "./RegionPanel";
import { REGIONS, regionInfo } from "./regions";
import { regionBusinessIndices } from "./catalog";
import { SCENES } from "./story";
import { money } from "./format";
import SaveTransfer from "./SaveTransfer";
import "./pokemon-ui.css";

const VENTURE_FILTERS = [
  { id: "all", label: "ALL VENTURES" },
  { id: "owned", label: "OWNED" },
  { id: "street", label: "STREET SHOPS" },
  { id: "city", label: "CITY BUSINESSES" },
  { id: "global", label: "GLOBAL EMPIRE" },
];
const POCKETS = [
  { id: "all", label: "ALL", match: () => true },
  { id: "click", label: "PAY DAY", match: (u) => u.type === "click" },
  {
    id: "shop",
    label: "SHOP BOOSTS",
    match: (u) => u.type !== "click" && u.type !== "all",
  },
  { id: "empire", label: "EMPIRE", match: (u) => u.type === "all" },
];
const UPGRADE_KIND = {
  click: { label: "PAY DAY", chip: "#e8483c", tint: "#fbd6d0" },
  all: { label: "ALL BUSINESSES", chip: "#7858c8", tint: "#e0d8fb" },
  shop: { label: "BUSINESS BOOST", chip: "#48a058", tint: "#d6edcc" },
};
const upgradeKind = (u) => UPGRADE_KIND[u.type] ?? UPGRADE_KIND.shop;
const goodSprite = (icon) => `/assets/goods/${icon.replace(/^item-/, "")}.png`;

function useReducedMotion() {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(
    () => window.matchMedia(query).matches,
  );
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setReduced(list.matches);
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, []);
  return reduced;
}

function PokeBall({ size = 30, open = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path
        d="M5 0h6v1h2v1h1v2h1v2h1v4h-1v2h-1v2h-1v1h-2v1h-6v-1h-2v-1h-1v-2h-1v-2h-1v-4h1v-2h1v-2h1v-1h2z"
        fill="#202028"
      />
      <path
        d="M5 1h6v1h2v2h1v3h-4v-1h-4v1h-4v-3h1v-2h2z"
        fill={open ? "#f04838" : "#8890a0"}
      />
      <path
        d="M2 9h4v1h4v-1h4v1h-1v2h-1v1h-2v1h-4v-1h-2v-1h-1v-2h-1z"
        fill="#f8f8f8"
      />
      <path d="M7 6h2v1h1v2h-1v1h-2v-1h-1v-2h1z" fill="#f8f8f8" />
    </svg>
  );
}

function BackArrow() {
  return (
    <svg
      width="26"
      height="22"
      viewBox="0 0 14 12"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path
        d="M6 0h2v2h-2v2h8v4h-8v2h2v2h-2v-2h-2v-2h-2v-2h-2v-2h2v-2h2v-2h2z"
        fill="currentColor"
      />
    </svg>
  );
}

function Bar({ value, tone = "hp", thin = false }) {
  return (
    <span className={`pk-track ${thin ? "thin" : ""}`}>
      <span
        className={`pk-fill ${tone}`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </span>
  );
}

function Screen({ title, tone, icon, info, onBack, children }) {
  return (
    <section className={`pk-screen tone-${tone}`} aria-label={title}>
      <header className="pk-screen-head">
        <div className="pk-screen-title">
          {icon}
          <h1 className="lit">{title}</h1>
          {info && <span className="pk-chip">{info}</span>}
        </div>
        <button className="pk-back" onClick={onBack}>
          <BackArrow />
          <span>BACK</span>
        </button>
      </header>
      <div className="pk-screen-body">{children}</div>
    </section>
  );
}

function Toggle({ on, onClick, label }) {
  return (
    <button
      className="pk-toggle"
      onClick={onClick}
      aria-pressed={on}
      aria-label={label}
    >
      <span className="arrow">◀</span>
      <span className={on ? "on" : "off"}>{on ? "ON" : "OFF"}</span>
      <span className="arrow">▶</span>
    </button>
  );
}

function Modal({ title, children, close }) {
  const panel = useRef(null);
  const closeRef = useRef(close);
  closeRef.current = close;
  // Keep the focus trap stable while the economy re-renders every 100 ms.
  useEffect(() => {
    const prior = document.activeElement;
    const el = panel.current;
    el?.querySelector("button")?.focus();
    const key = (e) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab") {
        const buttons = [...el.querySelectorAll("button, a, input")].filter(
          (node) => !node.disabled,
        );
        if (e.shiftKey && document.activeElement === buttons[0]) {
          e.preventDefault();
          buttons.at(-1)?.focus();
        }
        if (!e.shiftKey && document.activeElement === buttons.at(-1)) {
          e.preventDefault();
          buttons[0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      prior?.focus();
    };
  }, []);
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="modal-panel pk-win"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="pk-modal-head">
          <h2>{title}</h2>
          <button
            className="pk-icon-btn"
            onClick={close}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const {
    game,
    actions,
    notice,
    setNotice,
    saved,
    saveError,
    save,
    exportSave,
    importSave,
    restoreBackup,
    deleteProgress,
  } = useGame();
  const reduced = useReducedMotion();
  const [tab, setTab] = useState("businesses");
  const [buyMode, setBuyMode] = useState("1");
  const [ventureFilter, setVentureFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [pocket, setPocket] = useState(0);
  const [bagPick, setBagPick] = useState(null);
  const [floats, setFloats] = useState([]);
  const [modal, setModal] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const storyViewer = useStory(game, actions, Boolean(modal));
  const [toast, setToast] = useState("");
  const floatId = useRef(0);
  const audio = useRef(null);
  const owned = game.businesses.reduce((sum, b) => sum + b.quantity, 0);
  const managers = game.businesses.filter((b) => b.manager).length;
  const regionalIndices = regionBusinessIndices(game.region);
  const currentRegion = regionInfo(game.region);
  const regionalOrder = BUSINESS_ORDER.filter(
    (i) => BUSINESSES[i].region === game.region,
  );
  const regionalManagers = regionalIndices.filter(
    (i) => game.businesses[i].manager,
  ).length;
  const regionalOpen = regionalIndices.filter(
    (i) => game.businesses[i].quantity > 0,
  ).length;
  const activeUpgrades = UPGRADES.filter(
    (u) =>
      ["click", "all"].includes(u.type) ||
      BUSINESSES.find((b) => b.id === u.type)?.region === game.region,
  );
  const unboughtUpgrades = activeUpgrades.filter(
    (u) => !game.upgrades.includes(u.id),
  ).length;
  const matchesFilter = (index, filter) =>
    BUSINESSES[index].region === game.region &&
    (filter === "all" ||
      (filter === "owned"
        ? game.businesses[index].quantity > 0
        : BUSINESSES[index].district === filter));
  const visibleVentures = BUSINESS_ORDER.filter((index) =>
    matchesFilter(index, ventureFilter),
  );
  const sel =
    selected !== null && BUSINESSES[selected].region === game.region
      ? selected
      : (visibleVentures[0] ?? regionalOrder[0]);
  const selBusiness = BUSINESSES[sel];
  const selState = game.businesses[sel];
  const payDayValue = clickValue(game);
  const seenScenes = game.story.seen.length;

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (!floats.length) return;
    const timer = setInterval(
      () => setFloats((prev) => prev.filter((f) => Date.now() - f.at < 1100)),
      300,
    );
    return () => clearInterval(timer);
  }, [floats.length > 0]);
  useEffect(() => {
    if (notice) {
      setToast(notice);
      setNotice("");
    }
  }, [notice, setNotice]);

  function chime(url = ASSETS.payDaySoundUrl) {
    if (!game.sound) return;
    if (url) {
      new Audio(url).play().catch(() => {});
      return;
    }
    try {
      audio.current ??= new (
        window.AudioContext || window.webkitAudioContext
      )();
      const ctx = audio.current;
      ctx.resume();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(988, ctx.currentTime);
      oscillator.frequency.setValueAtTime(1319, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.17);
    } catch {
      /* Audio is optional; browsers may block it until a gesture. */
    }
  }
  function click() {
    actions.click();
    chime();
    setFloats((prev) => [
      ...prev.slice(-15),
      {
        id: floatId.current++,
        at: Date.now(),
        x: 30 + Math.random() * 40,
        value: payDayValue,
      },
    ]);
  }
  function purchase(i, n) {
    actions.buy(i, n);
    chime(ASSETS.purchaseSoundUrl);
  }
  const go = (next) => {
    setTab(next);
    window.scrollTo({ top: 0 });
  };
  const home = () => go("businesses");

  /* ------------------------------ Market ------------------------------ */
  const filterIndex = VENTURE_FILTERS.findIndex((f) => f.id === ventureFilter);
  const stepFilter = (d) =>
    setVentureFilter(
      VENTURE_FILTERS[
        (filterIndex + d + VENTURE_FILTERS.length) % VENTURE_FILTERS.length
      ].id,
    );
  const market = (
    <div className="pk-market">
      <div className="pk-stage-col">
        <section className="pk-scene" aria-label={`${currentRegion.name} market`}>
          <img
            className="pk-scene-bg"
            src={currentRegion.background}
            alt={`${currentRegion.name} market, a pixel-art town square`}
          />
          <div className="pk-sign">
            <svg
              width="30"
              height="30"
              viewBox="0 0 14 14"
              shapeRendering="crispEdges"
              aria-hidden="true"
            >
              <path
                d="M5 0h4v1h2v1h1v2h1v6h-1v2h-1v1h-2v1h-4v-1h-2v-1h-1v-2h-1v-6h1v-2h1v-1h2z"
                fill="#a06830"
              />
              <path
                d="M5 1h4v1h2v2h1v6h-1v2h-2v1h-4v-1h-2v-2h-1v-6h1v-2h2z"
                fill="#f8c838"
              />
              <path
                d="M6 3h3v1h-2v2h2v1h-2v1h2v1h-2v1h-1z"
                fill="#a06830"
              />
            </svg>
            <div>
              <div className="ink t-l">{currentRegion.name} Market</div>
              <div className="ink t-s sign-sub">
                REGION {game.region} · {currentRegion.subtitle}
              </div>
            </div>
          </div>
          <div className="pk-plate">
            <div className="plate-top">
              <span className="ink t-l">
                MEOWTH <span className="male">♂</span>
              </span>
              <span className="ink t-s">No.052</span>
            </div>
            <div className="plate-row">
              <span className="plate-tag">SHOPS</span>
              <Bar value={(regionalOpen / regionalIndices.length) * 100} />
            </div>
            <div className="ink t-s plate-count">
              {regionalOpen}/{regionalIndices.length}
            </div>
            <div className="plate-row">
              <span className="plate-tag">TEAM</span>
              <Bar
                value={(regionalManagers / regionalIndices.length) * 100}
                tone="exp"
                thin
              />
            </div>
          </div>
          <span className="pk-platform" aria-hidden="true" />
          <button
            className="pk-meowth"
            onClick={click}
            aria-label={`Use Meowth's Pay Day to earn ${money(payDayValue)}`}
          >
            <img
              src={fieldSprite(52, reduced)}
              alt="Meowth, your ambitious business partner"
              draggable="false"
            />
          </button>
          {floats.map((f) => (
            <span
              className="pk-coin-float lit"
              key={f.id}
              style={{ left: `${f.x}%` }}
            >
              +{money(f.value)}
            </span>
          ))}
        </section>

        <section className="pk-command" aria-label="Actions">
          <div className="pk-win pk-dialog">
            <p className="ink t-l">
              What will
              <br />
              MEOWTH do?
            </p>
            <p className="ink t-s dim">
              Tap Meowth or use Pay Day for +{money(payDayValue)}
            </p>
          </div>
          <div className="pk-cmd-grid">
            <button className="pk-cmd red" onClick={click}>
              <span className="lit t-l">PAY DAY</span>
              <span className="lit t-s pk-gold">+{money(payDayValue)}</span>
            </button>
            <button
              className="pk-cmd yellow"
              onClick={() => go("upgrades")}
              aria-label={
                unboughtUpgrades > 0
                  ? `Bag, upgrades, ${unboughtUpgrades} not bought yet`
                  : "Bag, upgrades"
              }
            >
              <span className="lit t-l">BAG</span>
              <span className="lit t-s">Upgrades</span>
              {unboughtUpgrades > 0 && (
                <span className="pk-count">{unboughtUpgrades}</span>
              )}
            </button>
            <button className="pk-cmd green" onClick={() => go("managers")}>
              <span className="lit t-l">TEAM</span>
              <span className="lit t-s">Managers</span>
            </button>
            <button className="pk-cmd blue" onClick={() => go("regions")}>
              <span className="lit t-l">MAP</span>
              <span className="lit t-s">Regions</span>
            </button>
          </div>
        </section>

        <section className="pk-win pk-shopwindow" aria-label="Shop window">
          <div className="pk-shopwindow-head">
            <span className="ink t-s">
              {selBusiness.shop.sign} · {selBusiness.name}
            </span>
            <span className="ink t-s dim">
              ♥ {selState.likes ?? 0} · VISITS {selState.customers ?? 0}
            </span>
          </div>
          {selState.quantity > 0 ? (
            <CustomerScene
              key={sel}
              business={selState}
              index={sel}
              onServe={actions.serve}
            />
          ) : (
            <p className="pk-shopwindow-empty ink t-s">
              Open this shop and customers will start lining up.
            </p>
          )}
        </section>
        {regionalIndices
          .filter((i) => i !== sel && game.businesses[i].quantity > 0)
          .map((i) => (
            <CustomerScene
              key={`bg-${i}`}
              business={game.businesses[i]}
              index={i}
              onServe={actions.serve}
              headless
            />
          ))}
      </div>

      <section className="pk-mart" aria-label="Poké Mart">
        <header className="pk-mart-head">
          <PokeBall size={32} />
          <span className="lit t-l">POKé MART</span>
          <span className="pk-chip dark">
            {currentRegion.name.toUpperCase()} {game.region}/9
          </span>
        </header>
        <div className="pk-win pk-money">
          <span className="ink t-s dim">MONEY</span>
          <span className="ink t-l right" data-testid="balance">
            {money(game.balance, true)}
          </span>
          <span className="ink t-s dim">INCOME</span>
          <span className="ink t-s right income">
            {money(passiveRate(game), true)} / sec
          </span>
        </div>
        <div className="pk-win pk-list-win">
          <div className="pk-list-tools">
            <div className="pk-switch" role="group" aria-label="Filter ventures">
              <button onClick={() => stepFilter(-1)} aria-label="Previous filter">
                ◀
              </button>
              <span className="ink t-s">
                {VENTURE_FILTERS[filterIndex].label}{" "}
                <span className="dim">{visibleVentures.length}</span>
              </span>
              <button onClick={() => stepFilter(1)} aria-label="Next filter">
                ▶
              </button>
            </div>
            <div className="pk-qty" role="group" aria-label="Buy amount">
              {["1", "10", "max"].map((mode) => (
                <button
                  className={buyMode === mode ? "on" : ""}
                  onClick={() => setBuyMode(mode)}
                  key={mode}
                  aria-label={`Buy ${mode === "max" ? "maximum affordable" : mode} businesses`}
                  aria-pressed={buyMode === mode}
                >
                  {mode === "max" ? "MAX" : `×${mode}`}
                </button>
              ))}
            </div>
          </div>
          <div className="pk-list">
            {visibleVentures.length === 0 && (
              <p className="ink t-s pk-empty">
                Nothing here yet. Switch to ALL VENTURES to open a business.
              </p>
            )}
            {visibleVentures.map((i) => {
              const business = BUSINESSES[i];
              const b = game.businesses[i];
              const count =
                buyMode === "max" ? maxAffordable(game, i) : Number(buyMode);
              const cost = purchaseCost(i, b.quantity, Math.max(1, count));
              const affordable = count > 0 && game.balance + 1e-8 >= cost;
              const running = b.elapsed !== null;
              const progress = running
                ? (b.elapsed / (business.seconds * 1000)) * 100
                : 0;
              const left = running
                ? Math.max(0, business.seconds - b.elapsed / 1000).toFixed(1)
                : 0;
              return (
                <div
                  className={`pk-row ${sel === i ? "sel" : ""} ${b.quantity ? "" : "unowned"}`}
                  key={business.id}
                >
                  <span className="pk-cursor" aria-hidden="true">
                    ▶
                  </span>
                  <button
                    className="pk-row-icon"
                    style={{ "--tint": business.color }}
                    onClick={() => setSelected(i)}
                    aria-label={`Show details for ${business.name}`}
                  >
                    <img src={`/assets/goods/${business.shop.good}.png`} alt="" />
                  </button>
                  <div className="pk-row-main">
                    <div className="pk-row-name">
                      <span className="ink t-s name">{business.name}</span>
                      {b.quantity > 0 && (
                        <span className="ink t-s dim">×{b.quantity}</span>
                      )}
                      {b.manager && (
                        <img
                          className="pk-row-mgr"
                          src={fieldSprite(business.managerPokemonId, reduced)}
                          alt={`${business.manager} manages this shop`}
                        />
                      )}
                    </div>
                    <button
                      className="pk-row-bar"
                      onClick={() => {
                        actions.start(i);
                        setSelected(i);
                      }}
                      disabled={!b.quantity || running}
                      aria-label={`Start ${business.name} income cycle`}
                    >
                      <span
                        className={`pk-tag ${!b.quantity ? "none" : b.manager ? "auto" : running ? "run" : "go"}`}
                      >
                        {!b.quantity
                          ? "---"
                          : b.manager
                            ? "AUTO"
                            : running
                              ? `${left}s`
                              : "GO"}
                      </span>
                      <Bar value={progress} />
                    </button>
                  </div>
                  <button
                    disabled={!affordable}
                    className="pk-buy"
                    onClick={() => {
                      purchase(i, count);
                      setSelected(i);
                    }}
                    aria-label={`Buy ${count || 1} ${business.name} for ${money(cost)}`}
                  >
                    <span>
                      {b.quantity ? "BUY" : "OPEN"} ×{count || 1}
                    </span>
                    <strong>{money(cost, true)}</strong>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pk-win-dark pk-desc">
          <div className="pk-desc-art">
            <BusinessArtwork
              type={selBusiness.icon}
              businessId={selBusiness.id}
              label={selBusiness.name}
            />
          </div>
          <div className="pk-desc-copy">
            <span className="lit t-s pk-gold">{selBusiness.name.toUpperCase()}</span>
            <span className="lit t-s">{selBusiness.description}</span>
            <span className="t-s soft">
              YIELD{" "}
              {money(
                selState.quantity
                  ? businessYield(game, sel)
                  : selBusiness.baseYield * multiplier(game, selBusiness.id),
                true,
              )}{" "}
              / {selBusiness.seconds}s ·{" "}
              {selState.manager
                ? `${selBusiness.manager.toUpperCase()} ON DUTY`
                : "NO MANAGER"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );

  /* ------------------------------ Team ------------------------------ */
  const team = (
    <Screen
      title="TEAM"
      tone="green"
      icon={<img className="pk-head-icon" src="/assets/goods/exp-share.png" alt="" />}
      info={`${currentRegion.name.toUpperCase()} MANAGERS ${regionalManagers}/${regionalIndices.length}`}
      onBack={home}
    >
      <div className="pk-party">
        {regionalOrder.map((i) => {
          const business = BUSINESSES[i];
          const b = game.businesses[i];
          const can = b.quantity > 0 && !b.manager && game.balance >= business.managerCost;
          const state = b.manager
            ? "hired"
            : !b.quantity
              ? "lock"
              : can
                ? "ready"
                : "wait";
          const progress =
            b.elapsed !== null ? (b.elapsed / (business.seconds * 1000)) * 100 : 0;
          return (
            <article className={`pk-slot ${state}`} key={business.id}>
              <span className="pk-slot-ball">
                <PokeBall size={28} open={b.manager} />
              </span>
              <div className="pk-slot-sprite">
                <img
                  src={fieldSprite(business.managerPokemonId, reduced)}
                  alt={business.manager}
                />
              </div>
              <div className="pk-slot-copy">
                <div className="pk-slot-name">
                  <span className="lit t-l">{business.manager.toUpperCase()}</span>
                  <span className="lit t-s">
                    No.{String(business.managerPokemonId).padStart(3, "0")}
                  </span>
                </div>
                <span className="lit t-s ellipsis">{business.name}</span>
                <div className="plate-row">
                  <span className="plate-tag">
                    {b.manager ? "AUTO" : `${business.seconds}s`}
                  </span>
                  <Bar value={progress} />
                </div>
              </div>
              <div className="pk-slot-action">
                {b.manager ? (
                  <span className="lit t-l">ON DUTY</span>
                ) : b.quantity ? (
                  <button
                    className="pk-hire"
                    disabled={!can}
                    onClick={() => {
                      actions.hire(i);
                      setToast(`${business.manager} is on the job!`);
                      chime(ASSETS.purchaseSoundUrl);
                    }}
                    aria-label={`Hire ${business.manager} for ${money(business.managerCost)}`}
                  >
                    <span>HIRE</span>
                    <span>{money(business.managerCost, true)}</span>
                  </button>
                ) : (
                  <span className="lit t-s">
                    OPEN SHOP
                    <br />
                    FIRST
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <div className="pk-win pk-message">
        <span className="ink t-m">
          Managers keep shops running, even while you're away: up to 2 hours
          of offline earnings when you return.
        </span>
      </div>
    </Screen>
  );

  /* ------------------------------ Bag ------------------------------ */
  const pocketList = [...activeUpgrades]
    .filter(POCKETS[pocket].match)
    .sort((a, b) => a.cost - b.cost);
  const bagItem =
    pocketList.find((u) => u.id === bagPick) ??
    pocketList.find((u) => !game.upgrades.includes(u.id)) ??
    pocketList[0];
  const bagOwned = bagItem && game.upgrades.includes(bagItem.id);
  const bagCan = bagItem && !bagOwned && game.balance >= bagItem.cost;
  const stepPocket = (d) => {
    setPocket((p) => (p + d + POCKETS.length) % POCKETS.length);
    setBagPick(null);
  };
  const bag = (
    <Screen
      title="BAG"
      tone="orange"
      icon={<img className="pk-head-icon" src="/assets/goods/rare-candy.png" alt="" />}
      info={`OWNED ${activeUpgrades.length - unboughtUpgrades}/${activeUpgrades.length}`}
      onBack={home}
    >
      <div className="pk-bag">
        <div className="pk-bag-side">
          <div className="pk-pocket">
            <button onClick={() => stepPocket(-1)} aria-label="Previous pocket">
              ◀
            </button>
            <span className="lit t-l">{POCKETS[pocket].label}</span>
            <button onClick={() => stepPocket(1)} aria-label="Next pocket">
              ▶
            </button>
          </div>
          <div className="pk-pocket-dots" aria-hidden="true">
            {POCKETS.map((p, i) => (
              <span key={p.id} className={i === pocket ? "on" : ""} />
            ))}
          </div>
          <div className="pk-pouch">
            <svg
              className={reduced ? "" : "sway"}
              viewBox="0 0 32 32"
              shapeRendering="crispEdges"
              role="img"
              aria-label="Meowth's coin pouch"
            >
              <path d="M12 3h8v1h1v2h-1v1h2v1h2v2h1v2h1v3h1v4h1v6h-1v2h-1v1h-2v1h-18v-1h-2v-1h-1v-2h-1v-6h1v-4h1v-3h1v-2h1v-2h2v-1h2v-1h-1v-2h1z" fill="#3a2010" />
              <path d="M13 4h6v2h-6z" fill="#e0a048" />
              <path d="M12 7h8v1h2v2h1v2h1v3h1v4h1v6h-1v2h-2v1h-16v-1h-2v-2h-1v-6h1v-4h1v-3h1v-2h1v-2h2z" fill="#c87830" />
              <path d="M12 7h8v1h2v2h-14v-2h2z" fill="#9a5420" />
              <path d="M7 12h3v3h-1v4h-1v6h-2v-6h1v-4h1z" fill="#e8a058" />
              <path d="M8 10h16v2h-16z" fill="#f8d040" />
              <path d="M8 11h16v1h-16z" fill="#b07818" />
              <path d="M13 15h6v1h2v2h1v4h-1v2h-2v1h-6v-1h-2v-2h-1v-4h1v-2h2z" fill="#7a5410" />
              <path d="M13 16h6v1h1v1h1v4h-1v1h-1v1h-6v-1h-1v-1h-1v-4h1v-1h1z" fill="#f8d040" />
              <path d="M13 16h3v1h-2v1h-1v2h-1v-2h1z" fill="#fff0a0" />
              <path d="M14 18h3v1h1v1h-1v1h-2v1h-1zM15 19h2v1h-2z" fill="#b07818" />
            </svg>
          </div>
          {bagItem && (
            <div className="pk-win-dark pk-bag-desc">
              <div className="pk-bag-desc-top">
                <span className="pk-item-frame">
                  <img src={goodSprite(bagItem.icon)} alt="" />
                </span>
                <div>
                  <span className="lit t-l pk-gold">{bagItem.name}</span>
                  <span
                    className="pk-kind"
                    style={{ background: upgradeKind(bagItem).chip }}
                  >
                    {upgradeKind(bagItem).label}
                  </span>
                </div>
              </div>
              <p className="lit t-m">{bagItem.description}</p>
            </div>
          )}
        </div>
        <div className="pk-bag-main">
          <div className="pk-win pk-bag-list">
            <div className="pk-bag-list-head">
              <span className="ink t-l">UPGRADES</span>
              <span className="ink t-s dim">{money(game.balance, true)}</span>
            </div>
            <div className="pk-list">
              {pocketList.map((u) => {
                const purchased = game.upgrades.includes(u.id);
                const afford = game.balance >= u.cost;
                return (
                  <button
                    key={u.id}
                    className={`pk-item ${bagItem?.id === u.id ? "sel" : ""} ${purchased ? "owned" : ""}`}
                    onClick={() => setBagPick(u.id)}
                    aria-label={`${u.name}, ${purchased ? "owned" : money(u.cost)}`}
                  >
                    <span className="pk-cursor" aria-hidden="true">
                      ▶
                    </span>
                    <span
                      className="pk-row-icon"
                      style={{ "--tint": upgradeKind(u).tint }}
                    >
                      <img src={goodSprite(u.icon)} alt="" />
                    </span>
                    <span className="ink t-m name">{u.name}</span>
                    <span
                      className={`ink t-m price ${purchased ? "ok" : afford ? "" : "short"}`}
                    >
                      {purchased ? "OWNED" : money(u.cost, true)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="pk-bag-actions">
            <div className="pk-win pk-message">
              <span className="ink t-s">
                {!bagItem
                  ? "This pocket is empty."
                  : bagOwned
                    ? "You already own this. It never wears out."
                    : bagCan
                      ? "Buy it? It's a one-time investment."
                      : "Not enough Pokédollars yet."}
              </span>
            </div>
            <button
              className="pk-big red"
              disabled={!bagCan}
              onClick={() => {
                actions.upgrade(bagItem.id);
                setToast(`${bagItem.name} unlocked!`);
                chime(ASSETS.purchaseSoundUrl);
              }}
            >
              <span className="lit t-l">
                {bagOwned ? "OWNED" : `BUY ${bagItem ? money(bagItem.cost, true) : ""}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Screen>
  );

  /* ------------------------------ Map ------------------------------ */
  const map = (
    <Screen
      title="TOWN MAP"
      tone="blue"
      icon={<img className="pk-head-icon" src="/assets/goods/town-map.png" alt="" />}
      info={`UNLOCKED ${game.unlockedRegion}/9`}
      onBack={home}
    >
      <RegionPanel
        game={game}
        onVisit={(region) => {
          actions.visit(region);
          setVentureFilter("all");
          setSelected(null);
          go("businesses");
          setToast("Welcome to " + regionInfo(region).name + "!");
        }}
        onTravel={() => {
          actions.travel();
          setVentureFilter("all");
          setSelected(null);
          go("businesses");
          setToast(
            "Next stop: " +
              regionInfo(game.region + 1).name +
              ". Your empire keeps growing!",
          );
        }}
        onStory={() => {
          actions.visit(game.unlockedRegion);
          go("stories");
        }}
      />
    </Screen>
  );

  /* ------------------------------ Story ------------------------------ */
  const stories = (
    <Screen
      title="STORY"
      tone="pink"
      icon={<img className="pk-head-icon face" src="/assets/story/portraits/52/Normal.png" alt="" />}
      info={`${currentRegion.name.toUpperCase()} CHRONICLES`}
      onBack={home}
    >
      <div className="pk-win pk-journal">
        <StoryJournal
          key={game.region}
          region={game.region}
          story={game.story}
          onOpen={storyViewer.open}
          onToggle={storyViewer.toggleAuto}
        />
      </div>
    </Screen>
  );

  /* ------------------------------ Trainer card ------------------------------ */
  const regionsDone = game.unlockedRegion - 1;
  const stats = [
    ["MONEY", money(game.balance, true), true],
    ["LIFETIME EARNINGS", money(game.lifetime, true)],
    [`${currentRegion.name.toUpperCase()} EARNED`, money(game.regionEarnings[game.region - 1], true)],
    ["BUSINESSES OWNED", owned],
    ["MANAGERS", `${managers} / ${BUSINESSES.length}`],
    ["PAY DAY POWER", `×${multiplier(game, "click")}`],
    ["STORY SCENES", `${seenScenes} / ${SCENES.length}`],
  ];
  const trainer = (
    <Screen
      title="TRAINER CARD"
      tone="gold"
      icon={<IdCard size={34} className="pk-head-lucide" aria-hidden="true" />}
      info={`REGION ${game.region} · ${currentRegion.name.toUpperCase()}`}
      onBack={home}
    >
      <div className="pk-trainer">
        <div className="pk-card">
          {!reduced && <span className="pk-card-shine" aria-hidden="true" />}
          <div className="pk-card-head">
            <span className="lit t-l">TRAINER CARD</span>
            <span className="lit t-m">IDNo. 00052</span>
          </div>
          <div className="pk-card-body">
            <div className="pk-card-stats">
              <div className="pk-stat">
                <span className="ink t-l label">NAME</span>
                <span className="ink t-l">MEOWTH</span>
              </div>
              {stats.map(([label, value, big]) => (
                <div className="pk-stat" key={label}>
                  <span className={`ink ${big ? "t-l" : "t-s"} label`}>{label}</span>
                  <span className={`ink ${big ? "t-l" : "t-s"}`}>{value}</span>
                </div>
              ))}
            </div>
            <div className="pk-card-photo">
              <img
                className="photo-body"
                src={fieldSprite(52, reduced)}
                alt="Meowth"
              />
              <img
                className="photo-face"
                src="/assets/story/portraits/52/Joyous.png"
                alt="Meowth looking joyous"
              />
            </div>
          </div>
          <div className="pk-badge-case">
            <div className="pk-badge-case-head">
              <span className="lit t-s pk-gold">REGION BADGES</span>
              <span className="lit t-s">
                {regionsDone}/{REGIONS.length}
              </span>
            </div>
            <div className="pk-badge-row">
              {REGIONS.map((r) => (
                <Badge
                  key={r.id}
                  region={r}
                  state={
                    r.id < game.unlockedRegion
                      ? "earned"
                      : r.id === game.unlockedRegion
                        ? "progress"
                        : "empty"
                  }
                  reduced={reduced}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="pk-win pk-options">
          <h2 className="ink t-xl">OPTIONS</h2>
          <div className="pk-opt">
            <div>
              <span className="ink t-l">COIN SOUND</span>
              <span className="ink t-s dim">A little chime for big ambitions.</span>
            </div>
            <Toggle on={game.sound} onClick={actions.sound} label="Toggle coin sounds" />
          </div>
          <div className="pk-opt">
            <div>
              <span className="ink t-l">STORY AUTO</span>
              <span className="ink t-s dim">New scenes play when unlocked.</span>
            </div>
            <Toggle
              on={game.story.autoPlay}
              onClick={storyViewer.toggleAuto}
              label="Toggle automatic story cutscenes"
            />
          </div>
          <div className="pk-opt">
            <div>
              <span className="ink t-l">SAVE</span>
              <span className="ink t-s dim">Saved on this device every second.</span>
            </div>
            <button
              className="pk-small"
              onClick={() => {
                save();
                setToast("MEOWTH saved the game.");
              }}
            >
              <ArrowDownToLine size={16} /> SAVE NOW
            </button>
          </div>
          <SaveTransfer
            exportSave={exportSave}
            importSave={importSave}
            restoreBackup={restoreBackup}
          />
          <p className="ink t-s dim pk-note">
            <Info size={15} /> Progress is stored on this device. Keep an
            exported save before clearing app or browser data.
          </p>
          <div className="pk-opt pk-delete-progress">
            <div>
              <span className="ink t-l">DELETE PROGRESS</span>
              <span className="ink t-s dim">Start a fresh empire in Kanto.</span>
            </div>
            <button
              className="pk-small pk-danger-button"
              onClick={() => {
                setDeleteError("");
                setModal("delete-progress");
              }}
            >
              <Trash2 size={16} /> DELETE PROGRESS
            </button>
          </div>
          <div className="ink t-s pk-credits">
            Pokémon artwork:{" "}
            <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
              PokeAPI
            </a>
            . Manager and story emotion portraits: CHUNSOFT and community
            artists via{" "}
            <a href="https://sprites.pmdcollab.org/" target="_blank" rel="noreferrer">
              PMD Collab
            </a>
            ,{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noreferrer"
            >
              CC BY-NC 4.0
            </a>
            . An unofficial fan game.{" "}
            <a href="/assets/CREDITS.md" target="_blank" rel="noreferrer">
              Full asset credits ↗
            </a>
            {" · "}
            <a href="/assets/story/SOURCES.md" target="_blank" rel="noreferrer">
              Kanto portrait credits ↗
            </a>
            {" · "}
            <a
              href="/assets/story-regions/SOURCES.md"
              target="_blank"
              rel="noreferrer"
            >
              Regional portrait credits ↗
            </a>
          </div>
        </div>
      </div>
    </Screen>
  );

  const screens = {
    businesses: market,
    upgrades: bag,
    managers: team,
    regions: map,
    stories,
    trainer,
  };

  return (
    <div className="pk-app">
      <header className="pk-topbar">
        <a
          className="pk-logo"
          href="#"
          aria-label="Meowth's Pay Day Empire home"
          onClick={(e) => {
            e.preventDefault();
            home();
          }}
        >
          <img className="pk-logo-icon" src={ASSETS.logoUrl} alt="" />
          <span className="logo-small">Meowth’s</span>
          <span className="logo-big">Pay Day Empire</span>
        </a>
        <div className="pk-topbar-actions">
          <span className="pk-chip dark">
            {money(passiveRate(game), true)}/s
          </span>
          <button
            className="pk-icon-btn"
            onClick={actions.sound}
            aria-label={game.sound ? "Mute sound" : "Enable sound"}
            title={game.sound ? "Mute sound" : "Enable sound"}
          >
            {game.sound ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button
            className={`pk-icon-btn ${tab === "stories" ? "on" : ""}`}
            onClick={() => go("stories")}
            aria-label={
              storyViewer.pending
                ? "Story journal, new scene ready"
                : "Story journal"
            }
            title="Story journal"
          >
            <BookOpen size={20} />
            {storyViewer.pending && <span className="pk-dot" />}
          </button>
          <button
            className={`pk-icon-btn ${tab === "trainer" ? "on" : ""}`}
            onClick={() => go("trainer")}
            aria-label="Trainer card and settings"
            title="Trainer card and settings"
          >
            <IdCard size={20} />
          </button>
          <button
            className="pk-icon-btn"
            onClick={() => setModal("help")}
            aria-label="How to play"
            title="How to play"
          >
            <CircleHelp size={20} />
          </button>
        </div>
      </header>

      <main className="pk-main">{screens[tab]}</main>

      <footer className="pk-footer">
        <span className={saveError ? "save-error" : ""}>
          <span className="pk-save-dot" />
          {saveError
            ? "Saving unavailable. Check browser storage."
            : saved
              ? "Progress saved automatically"
              : "Starting your empire…"}
        </span>
        <span>An unofficial fan game · Pokémon © Nintendo / Creatures / GAME FREAK</span>
      </footer>

      {toast && (
        <div className="pk-toast pk-win" role="status">
          <span className="ink t-m">{toast}</span>
          <span className="pk-toast-arrow" aria-hidden="true">
            ▼
          </span>
          <button onClick={() => setToast("")} aria-label="Dismiss message">
            <X size={16} />
          </button>
        </div>
      )}
      {storyViewer.active && (
        <StoryPlayer
          key={storyViewer.active.id}
          active={storyViewer.active}
          onMove={storyViewer.move}
          onFinish={storyViewer.finish}
          onClose={storyViewer.close}
        />
      )}
      {modal === "delete-progress" && (
        <Modal title="Delete all progress?" close={() => setModal(null)}>
          <p className="ink t-m pk-delete-warning">
            This clears your money, shops, managers, upgrades, likes, regions,
            story progress, and local import backup. You will start again in
            Kanto. This cannot be undone here.
          </p>
          <p className="ink t-s dim pk-delete-warning">
            Export a save first if you want to keep your empire. Exported files
            will remain on your computer.
          </p>
          {deleteError && <p className="ink t-s pk-delete-error" role="alert">{deleteError}</p>}
          <div className="pk-delete-actions">
            <button className="pk-small" onClick={() => setModal(null)}>CANCEL</button>
            <button
              className="pk-small pk-danger-button"
              onClick={() => {
                try {
                  deleteProgress();
                  storyViewer.reset();
                  setVentureFilter("all");
                  setSelected(null);
                  setBuyMode("1");
                  setPocket(0);
                  setBagPick(null);
                  setFloats([]);
                  home();
                  setModal(null);
                  setToast("Progress deleted. A fresh Kanto empire is ready.");
                } catch {
                  setDeleteError("Could not delete progress. Your current empire has not been changed. Try again.");
                }
              }}
            >
              <Trash2 size={16} /> YES, DELETE ALL PROGRESS
            </button>
          </div>
        </Modal>
      )}
      {modal === "help" && (
        <Modal title="Your first steps to an empire" close={() => setModal(null)}>
          <ol className="pk-help">
            <li>
              <span>1</span>
              <div>
                <h3>Make it rain</h3>
                <p>
                  Tap Meowth or PAY DAY to earn Pokédollars. Start by saving
                  ₽15 for your first Tail Stand.
                </p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h3>Open for business</h3>
                <p>
                  Buy a shop in the Poké Mart, then press its GO bar to start
                  earning. Each purchase adds another unit of income; the next
                  price grows by 15%.
                </p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h3>Build your team</h3>
                <p>
                  Hire managers in TEAM for automatic cycles and offline
                  earnings. Spend on BAG upgrades to multiply your returns.
                </p>
              </div>
            </li>
            <li>
              <span>4</span>
              <div>
                <h3>Explore the next region</h3>
                <p>
                  Build Kanto’s 20 shops, hire its team, and finish the story
                  milestones. The TOWN MAP tracks your path to Johto and all
                  the way to Paldea. Your cash, upgrades, and earlier shops stay
                  with you.
                </p>
              </div>
            </li>
          </ol>
          <button className="pk-big red wide" onClick={() => setModal(null)}>
            <span className="lit t-l">LET'S GET TO WORK!</span>
          </button>
        </Modal>
      )}
    </div>
  );
}
