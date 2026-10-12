import { test } from "node:test";
import assert from "node:assert/strict";
import { syncStory } from "./story.js";
import {
  serveCustomer,
  BUSINESSES,
  BUSINESS_ORDER,
  UPGRADES,
  advance,
  regionalProgress,
  travel,
  visitRegion,
  passiveRate,
  buyBusiness,
  buyUpgrade,
  businessYield,
  hireManager,
  maxAffordable,
  newGame,
  OFFLINE_LIMIT,
  payDay,
  purchaseCost,
  restoreGame,
  startBusiness,
} from "./game.js";

test("Pay Day adds exactly one Pokédollar and counts earned income", () => {
  const game = payDay(newGame(0));
  assert.equal(game.balance, 1);
  assert.equal(game.lifetime, 1);
  assert.equal(game.runEarnings, 1);
  assert.equal(game.clicks, 1);
});
test("purchases use 15% exponential pricing, including bulk boundaries", () => {
  assert.ok(Math.abs(purchaseCost(0, 0) - 15) < 1e-9);
  assert.ok(Math.abs(purchaseCost(0, 1) - 17.25) < 1e-9);
  const total = 15 + 17.25 + 19.8375;
  let game = { ...newGame(0), balance: total, lifetime: total };
  assert.equal(maxAffordable(game, 0), 3);
  game = buyBusiness(game, 0, 3);
  assert.equal(game.businesses[0].quantity, 3);
  assert.ok(game.balance < 1e-8);
  assert.equal(maxAffordable({ ...game, balance: 0 }, 0), 0);
  assert.equal(buyBusiness(game, 0, 10), game);
});
test("manual timers pay once, then wait for another start", () => {
  let game = buyBusiness({ ...newGame(0), balance: 15, lifetime: 15 }, 0, 1);
  game = advance(game, 5000);
  assert.equal(game.balance, 0);
  game = startBusiness(game, 0);
  game = advance(game, 5500);
  assert.equal(game.businesses[0].elapsed, 500);
  assert.equal(game.balance, 0);
  game = advance(game, 15000);
  assert.equal(game.balance, 4);
  assert.equal(game.businesses[0].elapsed, null);
  assert.equal(advance(game, 30000).balance, 4);
});
test("managers immediately start and catch up every completed cycle", () => {
  let game = buyBusiness(
    { ...newGame(0), balance: 1000, lifetime: 1000 },
    1,
    2,
  );
  game = { ...game, balance: 1000 };
  game = hireManager(game, 1);
  assert.equal(game.businesses[1].elapsed, 0);
  game = advance(game, 10000);
  assert.equal(game.balance, 192);
  assert.equal(game.businesses[1].elapsed, 1000);
});
test("business yields honor quantities, individual and global boosts", () => {
  let game = {
    ...newGame(0),
    balance: 1000000,
    lifetime: 1000000,
    founderBonus: 0.04,
    businesses: newGame(0).businesses.map((b) => ({ ...b, quantity: 2 })),
  };
  assert.equal(businessYield(game, 4), 29120);
  game = buyUpgrade(game, "all-2");
  game = buyUpgrade(game, "balls-2");
  assert.equal(businessYield(game, 4), 116480);
  assert.equal(businessYield(game, 0), 16.64);
});
test("offline payouts cap at two hours and preserve fractional cycle progress", () => {
  assert.equal(OFFLINE_LIMIT, 2 * 60 * 60 * 1000);
  let game = newGame(0);
  game.businesses[0] = { ...game.businesses[0], quantity: 1, manager: true, elapsed: 250 };
  game = advance(game, 24 * 60 * 60 * 1000, OFFLINE_LIMIT);
  assert.equal(game.balance, 28800);
  assert.equal(game.businesses[0].elapsed, 250);
  assert.equal(game.savedAt, 24 * 60 * 60 * 1000);
  assert.equal(advance(game, game.savedAt).balance, 28800);
  assert.equal(advance(game, game.savedAt + 1000).balance, 28804);
});

test("resuming a suspended app uses the same two-hour cap without limiting active play", () => {
  let game = newGame(0);
  game.businesses[0] = { ...game.businesses[0], quantity: 1, manager: true, elapsed: 0 };
  assert.equal(advance(game, 24 * 60 * 60 * 1000).balance, 28800);
  for (let hour = 1; hour <= 3; hour++) game = advance(game, hour * 60 * 60 * 1000);
  assert.equal(game.balance, 43200);
});
test("travel advances sequentially and preserves the whole empire", () => {
  let game = syncStory({
    ...newGame(0),
    balance: 1e25,
    lifetime: 1e25,
    runEarnings: 1e25,
    regionEarnings: Array(9).fill(1e23),
    clicks: 1,
    upgrades: [
      "click-2",
      "all-2",
      "balls-2",
      "garden-2",
      "tails-2",
      "berries-2",
      "cafe-2",
      "power-2",
    ],
    businesses: newGame(0).businesses.map((b) => ({
      ...b,
      quantity: 2,
      manager: true,
      elapsed: 200,
      completedCycles: 30,
      likes: 2,
      customers: 3,
      shownCycles: 3,
    })),
  });
  const before = JSON.stringify(game.businesses),
    balance = game.balance;
  assert.equal(regionalProgress(game).ready, true);
  for (let region = 2; region <= 9; region++) {
    game = travel(game);
    assert.equal(game.region, region);
    assert.equal(game.unlockedRegion, region);
    assert.equal(game.balance, balance);
    assert.equal(JSON.stringify(game.businesses), before);
    assert.deepEqual(game.upgrades, [
      "click-2",
      "all-2",
      "balls-2",
      "garden-2",
      "tails-2",
      "berries-2",
      "cafe-2",
      "power-2",
    ]);
    assert.equal(game.story.unlocked.length, 50 + 10 * (region - 1));
  }
  assert.equal(travel(game), game);
  const visited = visitRegion(game, 1);
  assert.equal(visited.region, 1);
  assert.equal(visited.unlockedRegion, 9);
  assert.equal(travel(visited), visited);
  assert.equal(visitRegion(game, 10), game);
  assert.equal(visitRegion(game, 0), game);
  assert.deepEqual(restoreGame(JSON.parse(JSON.stringify(game)), 0), game);
});
test("regional gates reject locked purchases, upgrades, skipped travel, and inactive regions", () => {
  const fresh = { ...newGame(0), balance: 1e25, lifetime: 1e25 };
  const future = BUSINESSES.findIndex((b) => b.region === 2);
  assert.equal(buyBusiness(fresh, future, 1), fresh);
  assert.equal(hireManager(fresh, future), fresh);
  assert.equal(startBusiness(fresh, future), fresh);
  assert.equal(buyUpgrade(fresh, BUSINESSES[future].id + "-2"), fresh);
  assert.equal(travel(fresh), fresh);
  assert.equal(visitRegion(fresh, 2), fresh);
  assert.equal(buyBusiness(fresh, -1, 1), fresh);
  assert.equal(regionalProgress(fresh).ready, false);
});
test("earlier regions keep earning and income is attributed to each shop's home region", () => {
  let g = { ...newGame(0), region: 2, unlockedRegion: 2 };
  const johto = BUSINESSES.findIndex((b) => b.region === 2);
  const hoenn = BUSINESSES.findIndex((b) => b.region === 3);
  for (const i of [0, johto, hoenn])
    g.businesses[i] = {
      ...g.businesses[i],
      quantity: 1,
      manager: true,
      elapsed: 0,
    };
  assert.equal(
    passiveRate(g),
    4 + BUSINESSES[johto].baseYield / BUSINESSES[johto].seconds,
  );
  g = advance(g, 2000);
  assert.equal(g.regionEarnings[0], 8);
  assert.equal(g.regionEarnings[1], BUSINESSES[johto].baseYield);
  assert.equal(g.businesses[hoenn].completedCycles, 0);
  assert.equal(g.regionEarnings[2], 0);
  const clicked = payDay(g);
  assert.equal(clicked.regionEarnings[1], g.regionEarnings[1] + 1);
});
test("version-two saves relocate Rayquaza safely and retain previously earned bonuses", () => {
  const legacy = {
    ...newGame(0),
    version: 2,
    balance: 100,
    lifetime: 400000,
    runEarnings: 1000,
    amuletCoins: 2,
    resets: 1,
    businesses: newGame(0).businesses.slice(0, 20),
  };
  legacy.businesses[19] = {
    ...legacy.businesses[19],
    quantity: 1,
    manager: true,
    elapsed: 500,
  };
  const g = restoreGame(legacy, 0);
  assert.equal(g.region, 1);
  assert.equal(g.unlockedRegion, 1);
  assert.equal(g.founderBonus, 0.04);
  assert.equal(g.businesses[19].id, "skyport");
  assert.equal(BUSINESSES[19].region, 3);
  assert.equal(g.businesses[19].quantity, 1);
  assert.equal(
    g.businesses.find((b) => b.id === "dragonair-skyport").quantity,
    0,
  );
  assert.equal(advance(g, 1000000).balance, 100);
  assert.equal("amuletCoins" in g, false);
  assert.equal("resets" in g, false);
});

test("saved progress restores cleanly and rejects corrupt economy data", () => {
  const game = syncStory(payDay(newGame(100)));
  assert.deepEqual(restoreGame(JSON.parse(JSON.stringify(game)), 200), game);
  assert.throws(() => restoreGame({ ...game, balance: -1 }));
  assert.throws(() => restoreGame({ ...game, balance: Infinity }));
  assert.throws(() => restoreGame({ ...game, region: 10 }));
  assert.throws(() =>
    restoreGame({ ...game, regionEarnings: [-1, ...Array(8).fill(0)] }),
  );
  assert.throws(() => restoreGame({ ...game, businesses: [] }));
});

test("customer checkout acknowledges income without awarding it twice", () => {
  let game = buyBusiness({ ...newGame(0), balance: 15, lifetime: 15 }, 0, 1);
  assert.equal(serveCustomer(game, 0, true), game);
  game = advance(startBusiness(game, 0), 1000);
  assert.equal(game.balance, 4);
  game = serveCustomer(game, 0, true);
  assert.equal(game.balance, 4);
  assert.equal(game.businesses[0].customers, 1);
  assert.equal(game.businesses[0].likes, 1);
  assert.equal(serveCustomer(game, 0, true), game);
  game = advance(startBusiness(game, 0), 2000);
  game = serveCustomer(game, 0, false);
  assert.equal(game.balance, 8);
  assert.equal(game.businesses[0].customers, 2);
  assert.equal(game.businesses[0].likes, 1);
});

test("old saves migrate customer stats without losing a hired manager", () => {
  const legacy = {
    ...newGame(100),
    version: 1,
    balance: 100,
    lifetime: 1000,
    runEarnings: 1000,
  };
  legacy.businesses = legacy.businesses.slice(0, 5).map((b, i) => ({
    quantity: i === 0 ? 2 : 0,
    manager: i === 0,
    elapsed: i === 0 ? 0 : null,
  }));
  const restored = restoreGame(legacy, 200);
  assert.equal(restored.balance, 100);
  assert.equal(restored.businesses[0].quantity, 2);
  assert.equal(restored.businesses[0].manager, true);
  assert.equal(restored.businesses[0].customers, 0);
  assert.equal(restored.businesses[0].likes, 0);
  assert.equal(restored.version, 3);
  assert.equal(restored.businesses.length, 100);
  assert.equal(restored.businesses[5].quantity, 0);
});

test("customer likes survive refresh, reject invalid counts, and remain intact when visiting other regions", () => {
  const game = { ...newGame(0), lifetime: 100000, runEarnings: 100000 };
  game.businesses[0] = {
    ...game.businesses[0],
    quantity: 1,
    completedCycles: 3,
    shownCycles: 2,
    customers: 2,
    likes: 2,
    lastPayout: 4,
  };
  const restored = restoreGame(JSON.parse(JSON.stringify(game)), 100);
  assert.equal(restored.businesses[0].likes, 2);
  const invalid = {
    ...game,
    businesses: game.businesses.map((b, i) =>
      i === 0 ? { ...b, likes: 3 } : b,
    ),
  };
  assert.throws(() => restoreGame(invalid, 100));
  assert.equal(
    visitRegion({ ...restored, unlockedRegion: 2 }, 2).businesses[0].likes,
    2,
  );
});

test("expanded ventures purchase, automate, upgrade and serve at their own rates", () => {
  for (let i = 5; i < BUSINESSES.length; i++) {
    const business = BUSINESSES[i];
    const funding =
      business.baseCost + business.managerCost + business.baseCost * 5;
    let game = buyBusiness(
      {
        ...newGame(0),
        region: business.region,
        unlockedRegion: 9,
        balance: funding,
        lifetime: funding,
      },
      i,
      1,
    );
    game = hireManager(game, i);
    game = buyUpgrade(game, `${business.id}-2`);
    game = advance(game, business.seconds * 2000 + 500);
    assert.equal(game.balance, business.baseYield * 4, business.name);
    assert.equal(game.businesses[i].elapsed, 500);
    assert.equal(game.businesses[i].completedCycles, 2);
    game = serveCustomer(game, i, true);
    assert.equal(game.businesses[i].customers, 1);
    assert.equal(game.balance, business.baseYield * 4);
    const restored = restoreGame(
      JSON.parse(JSON.stringify(game)),
      game.savedAt,
    );
    assert.deepEqual(restored, game);
  }
});

test("save IDs preserve ownership when display or stored order changes", () => {
  const game = newGame(100);
  game.businesses[5] = {
    ...game.businesses[5],
    quantity: 3,
    manager: true,
    elapsed: 100,
  };
  const reversed = { ...game, businesses: [...game.businesses].reverse() };
  assert.deepEqual(restoreGame(reversed, 100), game);
  const duplicate = {
    ...game,
    businesses: [...game.businesses.slice(1), game.businesses[1]],
  };
  assert.throws(() => restoreGame(duplicate));
  assert.throws(() =>
    restoreGame({
      ...game,
      businesses: [{ ...game.businesses[0], id: "unknown" }],
    }),
  );
  const partial = restoreGame(
    { ...game, businesses: game.businesses.slice(0, 5) },
    100,
  );
  assert.equal(partial.businesses.length, 100);
  assert.equal(partial.businesses[5].quantity, 0);
  assert.equal(BUSINESS_ORDER[1], 5);
});

test("every venture has complete shop artwork, PMD portrait, upgrade and unique identity", async () => {
  const { existsSync } = await import("node:fs");
  assert.equal(new Set(BUSINESSES.map((b) => b.id)).size, 100);
  const fs = await import("node:fs");
  const portraits = JSON.parse(
    fs.readFileSync(
      new URL("./region-portraits.json", import.meta.url),
      "utf8",
    ),
  );
  const pokemon = JSON.parse(
    fs.readFileSync(new URL("./region-pokemon.json", import.meta.url), "utf8"),
  );
  assert.equal(pokemon.length, 105);
  for (const b of BUSINESSES) {
    assert.ok(
      existsSync(
        new URL(`../public${portraits[b.managerPokemonId]}`, import.meta.url),
      ),
      b.manager,
    );
    assert.equal(
      pokemon.find((p) => p.id === b.managerPokemonId).generation,
      b.region,
      b.name,
    );
    assert.ok(
      existsSync(
        new URL(`../public/assets/goods/${b.shop.good}.png`, import.meta.url),
      ),
      b.shop.good,
    );
    assert.ok(
      b.shop.product &&
        b.shop.loved &&
        b.shop.neutral &&
        b.shop.preferred.length,
    );
    assert.ok(UPGRADES.some((u) => u.type === b.id && u.name));
  }
  assert.equal(UPGRADES.length, 105);
});
