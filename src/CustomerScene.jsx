import { useEffect, useRef, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import {
  regionalCustomers,
  customerReaction,
  managerSprite,
  pokemonName,
  SHOPS,
} from "./market";
import { BUSINESSES } from "./game";
import { regionInfo } from "./regions";

function Storefront({ index, managed }) {
  const shop = SHOPS[index];
  const vendor = BUSINESSES[index].managerPokemonId;
  return (
    <div className="market-storefront" aria-hidden="true">
      <svg viewBox="0 0 140 100">
        <rect
          x="24"
          y="21"
          width="92"
          height="65"
          rx="3"
          fill="#273537"
          stroke="#50635b"
          strokeWidth="2"
        />
        <rect x="30" y="29" width="80" height="9" fill="#122321" />
        <path d="M20 40h100l-8-18H28z" fill={shop.accent} />
        {[31, 51, 71, 91, 111].map((x, i) => (
          <path
            key={x}
            d={`M${x - 9} 22h10l${i - 2} 18H${x - 12}z`}
            fill="#f6ead1"
            opacity=".72"
          />
        ))}
        <path
          d="M20 40h100v6q-8 9-16 0-8 9-17 0-8 9-17 0-8 9-17 0-8 9-17 0-8 9-16 0z"
          fill={shop.accent}
        />
        <rect
          x="33"
          y="50"
          width="74"
          height="30"
          fill="#111f24"
          stroke="#42524b"
        />
        <rect x="28" y="79" width="84" height="8" rx="2" fill="#c5a277" />
        <path d="M35 87v10m70-10v10" stroke="#84684e" strokeWidth="4" />
        <circle cx="16" cy="87" r="8" fill="#547552" />
        <circle cx="123" cy="90" r="7" fill="#638461" />
      </svg>
      <span className="shop-sign">{shop.sign}</span>
      {managed ? (
        <img className="shop-vendor" src={managerSprite(vendor)} alt="" />
      ) : (
        <span className="shop-stock">
          <img src={`/assets/goods/${shop.good}.png`} alt="" />
          <img src={`/assets/goods/${shop.good}.png`} alt="" />
        </span>
      )}
    </div>
  );
}

// `headless` keeps a shop's customer clock (and its payouts to visit/like
// stats) running while another shop is shown in the market window.
export default function CustomerScene({ business, index, onServe, headless = false }) {
  const [visitor, setVisitor] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  const latest = useRef({ business, onServe });
  latest.current = { business, onServe };
  const session = useRef(null);
  const owned = business.quantity > 0;
  const pool = regionalCustomers(BUSINESSES[index].region);

  useEffect(() => {
    if (!owned) return;
    let serial = (latest.current.business.customers ?? 0) + index * 3;
    const spawn = (now) => {
      const pokemon = pool[serial++ % pool.length];
      session.current = {
        key: serial,
        pokemon,
        phase: "entering",
        started: now,
        amount: 0,
        reaction: customerReaction(pokemon, index),
      };
      setVisitor({ ...session.current });
    };
    spawn(Date.now());
    // This is only the visual visit clock. Financial payouts remain in game.js.
    const timer = setInterval(() => {
      if (document.hidden) return;
      const now = Date.now();
      const current = session.current;
      const age = now - current.started;
      const b = latest.current.business;
      let next = null;
      if (current.phase === "entering" && age >= 2200) next = "waiting";
      else if (
        current.phase === "waiting" &&
        (b.completedCycles ?? 0) > (b.shownCycles ?? 0)
      ) {
        next = "buying";
        current.amount = b.lastPayout;
        latest.current.onServe(index, current.reaction.liked);
      } else if (current.phase === "buying" && age >= 700) next = "reacting";
      else if (current.phase === "reacting" && age >= 1800) next = "leaving";
      else if (current.phase === "leaving" && age >= 2200) {
        spawn(now);
        return;
      }
      if (next) {
        session.current = { ...current, phase: next, started: now };
        setVisitor({ ...session.current });
      }
    }, 100);
    return () => {
      clearInterval(timer);
      session.current = null;
    };
  }, [owned, index]);

  if (!owned || !visitor || headless) return null;
  const shopping = ["buying", "reacting", "leaving"].includes(visitor.phase);
  const reacting = ["reacting", "leaving"].includes(visitor.phase);
  const active = business.elapsed !== null;
  const shop = SHOPS[index];
  const amount = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(visitor.amount);
  return (
    <div
      className="customer-scene"
      aria-label={`Live Pokémon customers at ${BUSINESSES[index].name}`}
      style={{
        "--shop-accent": shop.accent,
        "--region-background": `url(${regionInfo(BUSINESSES[index].region).background})`,
      }}
    >
      <div className="market-scene-heading">
        <span className="market-open">
          <span />
          {active ? "OPEN FOR BUSINESS" : "READY TO SERVE"}
        </span>
        <div>
          <span title="Customer visits">
            <ShoppingBag size={11} />
            {business.customers ?? 0}
          </span>
          <span title="Customer likes">
            <Heart size={11} fill="currentColor" />
            {business.likes ?? 0}
          </span>
        </div>
      </div>
      <div className="shop-path" />
      <div className="scene-lamp lamp-left" />
      <div className="scene-lamp lamp-right" />
      <Storefront index={index} managed={business.manager} />
      {business.quantity > 1 && business.manager && (
        <img
          className="queued-customer"
          src={
            pool[(visitor.key + 4) % pool.length][
              reducedMotion ? "sprite" : "animated"
            ]
          }
          alt="A Pokémon waiting in line"
        />
      )}
      <div
        key={`${visitor.key}-${visitor.phase}`}
        className={`customer-actor ${visitor.phase}`}
        data-phase={visitor.phase}
      >
        <img
          className="customer-sprite"
          src={visitor.pokemon[reducedMotion ? "sprite" : "animated"]}
          alt={`${pokemonName(visitor.pokemon)} ${visitor.phase === "entering" ? "walking into the shop" : visitor.phase === "leaving" ? "walking away with a purchase" : "shopping"}`}
          draggable="false"
        />
        {shopping && (
          <img
            className="purchased-good"
            src={`/assets/goods/${shop.good}.png`}
            alt={shop.good.replaceAll("-", " ")}
          />
        )}
        {visitor.phase === "waiting" && (
          <span className="customer-bubble waiting-bubble">
            {active ? "One, please!" : "Ready to order!"}
          </span>
        )}
        {visitor.phase === "buying" && (
          <span className="purchase-receipt">
            ₽{amount} paid <span>✦</span>
          </span>
        )}
        {reacting && (
          <span
            className={`customer-bubble reaction-bubble ${visitor.reaction.liked ? "liked" : ""}`}
          >
            {visitor.reaction.liked && <Heart size={12} fill="currentColor" />}
            {visitor.reaction.text}
          </span>
        )}
      </div>
      <p className="scene-caption" role="status">
        {visitor.phase === "waiting" && !active
          ? "Start an income cycle to serve your customer."
          : visitor.phase === "buying"
            ? `${pokemonName(visitor.pokemon)} bought ${shop.product}.`
            : reacting
              ? `${pokemonName(visitor.pokemon)}: “${visitor.reaction.text}”`
              : `${pokemonName(visitor.pokemon)} is ${visitor.phase === "entering" ? "visiting your shop" : "waiting for their order"}.`}
      </p>
    </div>
  );
}
