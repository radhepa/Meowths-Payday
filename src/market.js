import pokemonData from "./region-pokemon.json";
import portraits from "./region-portraits.json";
import { BUSINESSES } from "./catalog.js";

// A growing crowd includes every manager species, using PokeAPI animations.
export const CUSTOMERS = pokemonData;
const pools = Object.fromEntries(
  Array.from({ length: 9 }, (_, i) => [
    i + 1,
    CUSTOMERS.filter((p) => p.generation === i + 1),
  ]),
);
export const regionalCustomers = (region) => pools[region] || pools[1];
export const SHOPS = BUSINESSES.map((business) => business.shop);
// Fictional in-game tastes use the Pokémon's actual PokeAPI types.
export function customerReaction(pokemon, index) {
  const shop = SHOPS[index];
  const liked = pokemon.types.some((type) => shop.preferred.includes(type));
  return { liked, text: liked ? shop.loved : shop.neutral };
}
export const pokemonName = (p) => p.name[0].toUpperCase() + p.name.slice(1);
// All manager appearances use locally cached, unmodified PMD Collab portraits.
export const managerSprite = (id) => portraits[String(id)];
// Black/White field sprites for party slots and the market stage.
const MEOWTH = { animated: "/assets/pokemon/52.gif", sprite: "/assets/pokemon/52.png" };
export function fieldSprite(id, still = false) {
  const p = id === 52 ? MEOWTH : CUSTOMERS.find((c) => c.id === id);
  return p ? p[still ? "sprite" : "animated"] : managerSprite(id);
}
