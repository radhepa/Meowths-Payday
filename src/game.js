import { REGIONS, regionInfo } from "./regions.js";
import { BUSINESSES, LEGACY_IDS, regionBusinessIndices } from "./catalog.js";
import {
  emptyStory,
  restoreStory,
  syncStory,
  scenesForRegion,
} from "./story.js";
export { BUSINESSES, BUSINESS_ORDER } from "./catalog.js";
// All economy rules are pure functions, shared by the React hook and tests.
export const SAVE_KEY = "meowth.payday-empire.v1";
export const OFFLINE_LIMIT = 2 * 60 * 60 * 1000;
export const UPGRADES = [
  {
    id: "click-2",
    name: "Sharper claws",
    description: "Pay Day earns 2× as much.",
    cost: 100,
    type: "click",
    multiplier: 2,
    icon: "item-quick-claw",
  },
  ...BUSINESSES.map((b) => ({
    id: `${b.id}-2`,
    name: b.upgradeName,
    description: `${b.name} income ×2.`,
    cost: b.baseCost * 5,
    type: b.id,
    multiplier: 2,
    icon: b.icon,
  })),
  {
    id: "click-5",
    name: "Golden touch",
    description: "Pay Day earns another 5× as much.",
    cost: 1250,
    type: "click",
    multiplier: 5,
    icon: "item-amulet-coin",
  },
  {
    id: "all-2",
    name: "Empire expansion",
    description: "Double income from every business.",
    cost: 5000,
    type: "all",
    multiplier: 2,
    icon: "item-exp-share",
  },
  {
    id: "all-5",
    name: "Regional franchise network",
    description: "Triple income from every business.",
    cost: 25000000,
    type: "all",
    multiplier: 3,
    icon: "item-town-map",
  },
  {
    id: "all-10",
    name: "Worldwide Pokémon brand",
    description: "Multiply every business's income by 5.",
    cost: 25000000000,
    type: "all",
    multiplier: 5,
    icon: "item-amulet-coin",
  },
];

function blankBusiness(id) {
  return {
    id,
    quantity: 0,
    manager: false,
    elapsed: null,
    completedCycles: 0,
    shownCycles: 0,
    lastPayout: 0,
    customers: 0,
    likes: 0,
  };
}
export function newGame(now = Date.now()) {
  return {
    version: 3,
    balance: 0,
    lifetime: 0,
    runEarnings: 0,
    region: 1,
    unlockedRegion: 1,
    regionEarnings: Array(9).fill(0),
    founderBonus: 0,
    clicks: 0,
    upgrades: [],
    businesses: BUSINESSES.map((b) => blankBusiness(b.id)),
    savedAt: now,
    sound: false,
    story: { ...emptyStory(), unlocked: ["scene-01"] },
  };
}
export function multiplier(game, type) {
  const upgrades = UPGRADES.filter(
    (u) =>
      game.upgrades.includes(u.id) &&
      (u.type === type || (type !== "click" && u.type === "all")),
  ).reduce((m, u) => m * u.multiplier, 1);
  return upgrades * (type === "click" ? 1 : 1 + game.founderBonus);
}
export const clickValue = (game) => multiplier(game, "click");
export const businessYield = (game, index) =>
  BUSINESSES[index].baseYield *
  game.businesses[index].quantity *
  multiplier(game, BUSINESSES[index].id);
export const passiveRate = (game) =>
  BUSINESSES.reduce(
    (sum, b, i) =>
      sum +
      (b.region <= game.unlockedRegion && game.businesses[i].manager
        ? businessYield(game, i) / b.seconds
        : 0),
    0,
  );
export function purchaseCost(index, owned, count = 1) {
  if (count === 1) return BUSINESSES[index].baseCost * Math.pow(1.15, owned);
  return (
    (BUSINESSES[index].baseCost *
      Math.pow(1.15, owned) *
      (Math.pow(1.15, count) - 1)) /
    0.15
  );
}
export function maxAffordable(game, index) {
  const first =
    BUSINESSES[index].baseCost *
    Math.pow(1.15, game.businesses[index].quantity);
  let count = Math.max(
    0,
    Math.floor(Math.log1p((game.balance * 0.15) / first) / Math.log(1.15)),
  );
  // Correct floating-point rounding at exact geometric-sum boundaries.
  while (
    count > 0 &&
    purchaseCost(index, game.businesses[index].quantity, count) >
      game.balance + 1e-8
  )
    count--;
  while (
    purchaseCost(index, game.businesses[index].quantity, count + 1) <=
    game.balance + 1e-8
  )
    count++;
  return count;
}
function credit(game, amount, regional = null) {
  const regionEarnings = [...game.regionEarnings];
  if (regional) regional.forEach((earned, i) => (regionEarnings[i] += earned));
  else regionEarnings[game.region - 1] += amount;
  return {
    ...game,
    regionEarnings,
    balance: game.balance + amount,
    lifetime: game.lifetime + amount,
    runEarnings: game.runEarnings + amount,
  };
}
export const payDay = (game) => ({
  ...credit(game, clickValue(game)),
  clicks: game.clicks + 1,
});
export function buyBusiness(game, index, count) {
  if (!canOperate(game, index) || !Number.isInteger(count) || count < 1)
    return game;
  const cost = purchaseCost(index, game.businesses[index].quantity, count);
  if (!Number.isFinite(cost) || game.balance + 1e-8 < cost) return game;
  return {
    ...game,
    balance: Math.max(0, game.balance - cost),
    businesses: game.businesses.map((b, i) =>
      i === index ? { ...b, quantity: b.quantity + count } : b,
    ),
  };
}
export function startBusiness(game, index) {
  if (!canOperate(game, index)) return game;
  if (
    !game.businesses[index].quantity ||
    game.businesses[index].elapsed !== null
  )
    return game;
  return {
    ...game,
    businesses: game.businesses.map((b, i) =>
      i === index ? { ...b, elapsed: 0 } : b,
    ),
  };
}
export function hireManager(game, index) {
  if (!canOperate(game, index)) return game;
  const business = game.businesses[index];
  if (
    business.manager ||
    !business.quantity ||
    game.balance < BUSINESSES[index].managerCost
  )
    return game;
  return {
    ...game,
    balance: game.balance - BUSINESSES[index].managerCost,
    businesses: game.businesses.map((b, i) =>
      i === index ? { ...b, manager: true, elapsed: b.elapsed ?? 0 } : b,
    ),
  };
}
export function buyUpgrade(game, id) {
  const upgrade = UPGRADES.find((u) => u.id === id);
  const business = BUSINESSES.find((b) => b.id === upgrade?.type);
  if (
    !upgrade ||
    (business && business.region > game.unlockedRegion) ||
    game.upgrades.includes(id) ||
    game.balance < upgrade.cost
  )
    return game;
  return {
    ...game,
    balance: game.balance - upgrade.cost,
    upgrades: [...game.upgrades, id],
  };
}
// Timestamp-based simulation catches up accurately after throttled/hidden tabs.
// Manual businesses complete once; managers repeat every full cycle.
export function advance(game, now, cap = OFFLINE_LIMIT) {
  const delta = Math.min(cap, Math.max(0, now - game.savedAt));
  let earnings = 0;
  const regional = Array(9).fill(0);
  const businesses = game.businesses.map((business, i) => {
    if (
      BUSINESSES[i].region > game.unlockedRegion ||
      !business.quantity ||
      business.elapsed === null
    )
      return business;
    const duration = BUSINESSES[i].seconds * 1000;
    const elapsed = business.elapsed + delta;
    const cycles = Math.floor(elapsed / duration);
    if (!cycles) return { ...business, elapsed };
    const completed = business.manager ? cycles : 1;
    const payout = businessYield(game, i);
    earnings += payout * completed;
    regional[BUSINESSES[i].region - 1] += payout * completed;
    return {
      ...business,
      elapsed: business.manager ? elapsed % duration : null,
      completedCycles: (business.completedCycles ?? 0) + completed,
      lastPayout: payout,
    };
  });
  return syncStory({
    ...credit(game, earnings, regional),
    businesses,
    savedAt: now,
  });
}
// A visible customer acknowledges a paid cycle; it never credits money twice.
// shownCycles also prevents replaying old purchases after a tab switch/refresh.
export function serveCustomer(game, index, liked) {
  if (!canOperate(game, index)) return game;
  const b = game.businesses[index];
  if (!b.quantity || (b.completedCycles ?? 0) <= (b.shownCycles ?? 0))
    return game;
  return {
    ...game,
    businesses: game.businesses.map((business, i) =>
      i === index
        ? {
            ...business,
            shownCycles: business.completedCycles,
            customers: (business.customers ?? 0) + 1,
            likes: (business.likes ?? 0) + (liked ? 1 : 0),
          }
        : business,
    ),
  };
}

// Travel opens the next region without spending cash or resetting an empire.
function canOperate(game, index) {
  return (
    Number.isInteger(index) &&
    BUSINESSES[index]?.region === game.region &&
    game.region <= game.unlockedRegion
  );
}
export function regionalProgress(game, region = game.unlockedRegion) {
  const info = regionInfo(region);
  const indices = regionBusinessIndices(region);
  const owned = indices.filter((i) => game.businesses[i].quantity > 0).length;
  const managers = indices.filter((i) => game.businesses[i].manager).length;
  const requiredManagers = region === 1 ? indices.length : 5;
  const earnings = game.regionEarnings[region - 1];
  const scenes = scenesForRegion(region);
  const storyUnlocked = scenes.filter((s) =>
    game.story.unlocked.includes(s.id),
  ).length;
  const storyTotal = scenes.length;
  const storyReady = storyUnlocked === storyTotal;
  const ready =
    owned === indices.length &&
    managers >= requiredManagers &&
    earnings >= info.earningsGoal &&
    storyReady;
  return {
    owned,
    total: indices.length,
    managers,
    requiredManagers,
    earnings,
    goal: info.earningsGoal,
    storyReady,
    storyUnlocked,
    storyTotal,
    ready,
  };
}
export function travel(game) {
  if (
    game.region !== game.unlockedRegion ||
    game.unlockedRegion >= REGIONS.length ||
    !regionalProgress(game).ready
  )
    return game;
  return syncStory({
    ...game,
    region: game.region + 1,
    unlockedRegion: game.unlockedRegion + 1,
  });
}
export function visitRegion(game, region) {
  if (
    !Number.isInteger(region) ||
    region < 1 ||
    region > game.unlockedRegion ||
    region === game.region
  )
    return game;
  return { ...game, region };
}

// Stable IDs migrate old shops even when their regional location changes.
export function restoreGame(raw, now = Date.now()) {
  const fresh = newGame(now);
  const finite = (v) =>
    typeof v === "number" && Number.isFinite(v) && v >= 0 && v < 1e100;
  if (
    !raw ||
    ![1, 2, 3].includes(raw.version) ||
    !Array.isArray(raw.businesses) ||
    !raw.businesses.length ||
    raw.businesses.length > BUSINESSES.length ||
    (raw.version === 1 && ![5, 20].includes(raw.businesses.length))
  )
    throw new Error("Invalid save");
  for (const key of ["balance", "lifetime", "runEarnings", "clicks", "savedAt"])
    if (!finite(raw[key])) throw new Error("Invalid save");
  if (raw.lifetime < raw.balance || raw.runEarnings > raw.lifetime)
    throw new Error("Invalid economy");
  const legacy = raw.version < 3;
  if (
    legacy &&
    (!finite(raw.amuletCoins ?? 0) ||
      (raw.amuletCoins ?? 0) > Math.floor(Math.sqrt(raw.lifetime / 100000)))
  )
    throw new Error("Invalid legacy bonus");
  const region = legacy ? 1 : raw.region;
  const unlockedRegion = legacy ? 1 : raw.unlockedRegion;
  const founderBonus = legacy
    ? (raw.amuletCoins ?? 0) * 0.02
    : raw.founderBonus;
  const regionEarnings = legacy
    ? [raw.runEarnings, ...Array(8).fill(0)]
    : raw.regionEarnings;
  if (
    !Number.isInteger(region) ||
    !Number.isInteger(unlockedRegion) ||
    region < 1 ||
    unlockedRegion > 9 ||
    unlockedRegion < region ||
    !finite(founderBonus) ||
    !Array.isArray(regionEarnings) ||
    regionEarnings.length !== 9 ||
    !regionEarnings.every(finite) ||
    regionEarnings.reduce((a, b) => a + b, 0) >
      raw.lifetime * (1 + 1e-12) + 1e-8
  )
    throw new Error("Invalid regional progress");
  const byId = new Map();
  raw.businesses.forEach((b, position) => {
    const id = raw.version === 1 ? LEGACY_IDS[position] : b?.id;
    const i = BUSINESSES.findIndex((v) => v.id === id);
    if (!b || i < 0 || byId.has(id)) throw new Error("Invalid business ID");
    if (
      !Number.isInteger(b.quantity) ||
      b.quantity < 0 ||
      b.quantity > 10000 ||
      typeof b.manager !== "boolean" ||
      (b.manager && !b.quantity) ||
      (b.elapsed !== null &&
        (!finite(b.elapsed) || b.elapsed >= BUSINESSES[i].seconds * 1000))
    )
      throw new Error("Invalid business");
    const market = Object.fromEntries(
      ["completedCycles", "shownCycles", "customers", "likes"].map((key) => {
        const value = b[key] ?? 0;
        if (!finite(value) || !Number.isInteger(value))
          throw new Error("Invalid customer stats");
        return [key, value];
      }),
    );
    const lastPayout = b.lastPayout ?? 0;
    if (
      !finite(lastPayout) ||
      market.shownCycles > market.completedCycles ||
      market.likes > market.customers
    )
      throw new Error("Invalid customer stats");
    byId.set(id, {
      id,
      quantity: b.quantity,
      manager: b.manager,
      elapsed: b.quantity ? (b.manager ? (b.elapsed ?? 0) : b.elapsed) : null,
      ...market,
      lastPayout,
    });
  });
  return syncStory({
    ...fresh,
    balance: raw.balance,
    lifetime: raw.lifetime,
    runEarnings: raw.runEarnings,
    region,
    unlockedRegion,
    regionEarnings: [...regionEarnings],
    founderBonus,
    businesses: fresh.businesses.map((b) => byId.get(b.id) ?? b),
    upgrades: [
      ...new Set(
        (Array.isArray(raw.upgrades) ? raw.upgrades : []).filter((id) =>
          UPGRADES.some((u) => u.id === id),
        ),
      ),
    ],
    clicks: Math.floor(raw.clicks),
    sound: raw.sound === true,
    savedAt: Math.min(now, raw.savedAt),
    story: restoreStory(raw.story, unlockedRegion),
  });
}
