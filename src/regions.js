// Region membership is verified against PokeAPI's species.generation field.
export const REGIONS = [
  ["Kanto", "A little town. A big promise.", 1, 151, "#eebc67"],
  ["Johto", "Tradition meets a new adventure.", 152, 251, "#bcba75"],
  ["Hoenn", "Follow the tide beyond the clouds.", 252, 386, "#79cfc1"],
  ["Sinnoh", "Build beneath the snowy peaks.", 387, 493, "#9fbbeb"],
  ["Unova", "Big city lights. Bigger dreams.", 494, 649, "#bda4d1"],
  ["Kalos", "A little elegance in every venture.", 650, 721, "#e9abc7"],
  ["Alola", "Island sunshine and community spirit.", 722, 809, "#e4cd77"],
  ["Galar", "A new team for the next big league.", 810, 905, "#98bda9"],
  ["Paldea", "One last region. Endless possibilities.", 906, 1025, "#dc9b76"],
].map(([name, subtitle, first, last, color], i) => ({
  id: i + 1,
  name,
  subtitle,
  first,
  last,
  color,
  background: `/assets/backgrounds/region-${i + 1}.png`,
  earningsGoal: 5e13 * 10 ** i,
}));
export const regionInfo = (id) => REGIONS[id - 1];
export function storyBackground(setting) {
  const regional = /^region-([2-9])-(market|landmark)$/.exec(setting);
  if (regional) return regional[2] === "market" ? regionInfo(Number(regional[1])).background :
    `/assets/backgrounds/story-region-${regional[1]}-landmark.png`;
  return setting === "market" ? REGIONS[0].background : `/assets/backgrounds/kanto-${setting}.png`;
}
