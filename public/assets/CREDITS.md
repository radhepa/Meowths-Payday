## Nine-region update

The active roster has 180 businesses and 185 generation-verified Pokémon. All current manager portrait sources and contributor histories are listed in [regional credits](regions/SOURCES.md), all real Kanto emotion assets in [story credits](story/SOURCES.md), and regional story expressions in [regional story credits](story-regions/SOURCES.md). The eighty additional shopkeepers retain their pinned sources and upstream credit logs in [expansion credits](expansion/SOURCES.md). Older cached assets below are retained for source provenance.

Twenty-one pixel landscapes accompany the game: nine region markets, four Kanto chapter variants and eight regional landmarks. Exact prompts and the inspected sprite style basis are in [original background prompts](backgrounds/PROMPTS.json) and [regional landmark prompts](backgrounds/REGIONAL-STORY-PROMPTS.json). No Pokémon or item sprites were generated or altered.

# Asset credits

## Story campaign

The Coinleaf Chronicles uses unmodified PMD Collab emotion portraits for all 25 speaking Pokémon, PokeAPI pixel sprites for the full-body cast, and original generated pixel scenery. The complete 402-portrait source, attribution and license records are retained in [story/SOURCES.md](story/SOURCES.md). Original fan-game story and dialogue are application content.

## PMD Collab / SpriteCollab manager portraits

Every manager card and shop-counter portrait uses the unmodified `Normal.png` portrait from [PMD Collab](https://sprites.pmdcollab.org/). The local `portraits/sources.json` records exact URLs; each `{id}-credits.txt` retains the full upstream history. `portraits/credit-names.txt` retains the upstream creator-name mapping.

| Manager    | Contributors credited for the current Normal portrait | Source                                                                                            |
| ---------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Persian    | CHUNSOFT, baronessfaron                               | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0053/Normal.png) |
| Shuckle    | CHUNSOFT, Emmuffin                                    | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0213/Normal.png) |
| Gengar     | CHUNSOFT                                              | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0094/Normal.png) |
| Alakazam   | CHUNSOFT                                              | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0065/Normal.png) |
| Metagross  | CHUNSOFT                                              | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0376/Normal.png) |
| Butterfree | CHUNSOFT, Emmuffin                                    | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0012/Normal.png) |
| Magikarp   | CHUNSOFT, JemDragons                                  | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0129/Normal.png) |
| Jigglypuff | CHUNSOFT, Mojo, Emboarger                             | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0039/Normal.png) |
| Flaaffy    | CHUNSOFT,                                             | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0180/Normal.png) |
| Miltank    | CHUNSOFT, Vex, Emboarger                              | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0241/Normal.png) |
| Eevee      | CHUNSOFT                                              | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0133/Normal.png) |
| Lapras     | CHUNSOFT, C_Pariah                                    | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0131/Normal.png) |
| Dragonite  | CHUNSOFT                                              | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0149/Normal.png) |
| Chansey    | CHUNSOFT, Mojo                                        | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0113/Normal.png) |
| Ditto      | CHUNSOFT,                                             | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0132/Normal.png) |
| Snorlax    | CHUNSOFT                                              | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0143/Normal.png) |
| Tyranitar  | CHUNSOFT                                              | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0248/Normal.png) |
| Ampharos   | CHUNSOFT                                              | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0181/Normal.png) |
| Porygon2   | CHUNSOFT, Blanca                                      | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0233/Normal.png) |
| Rayquaza   | CHUNSOFT                                              | [Normal portrait](https://github.com/PMDCollab/SpriteCollab/blob/master/portrait/0384/Normal.png) |

PMD Collab contributions use [Creative Commons Attribution–NonCommercial 4.0 International](https://creativecommons.org/licenses/by-nc/4.0/). See the [repository terms and disclaimer](https://github.com/PMDCollab/SpriteCollab/blob/master/LICENSE.md). Portraits are unmodified and scaled through CSS. Pokémon artwork rights are separate from the application source.

## PokeAPI

Walking customers, business mascot sprites, item art, and Meowth's official artwork come from [PokeAPI](https://pokeapi.co/) and [PokeAPI/sprites](https://github.com/PokeAPI/sprites). Exact Pokémon endpoint, static sprite, and animation URLs are retained in `pokemon/sources.json`. Item endpoint and sprite URLs are in `goods/expansion-sources.json` and `goods/upgrade-sources.json`. Every business and upgrade illustration uses authentic PokeAPI item sprites, composited at integer 1× and 2× scales with original pixel backdrops and pixelated image rendering. No generated item images are used.

The original goods use the item endpoints for slowpoke-tail, berry-juice, coin-case, amulet-coin, and master-ball. New goods include garden seeds, rods, cookies, batteries, MooMoo Milk, evolution stones, cruise souvenirs, air mail, potions, candy, snacks, polished stones, beacon kits, digital upgrades, and sky plates.

PokeAPI sprites are unmodified, layered together through SVG layout and scaled at integer sizes. The grid-aligned pixel backdrops are original application art. PMD portraits remain unmodified. The storefronts and coin icon are original application SVG/CSS. Fictional customer tastes and dialogue are game content; Pokémon types come from PokeAPI.

Pokémon names and artwork belong to their respective Pokémon/Nintendo/Game Freak/Creatures rights holders. UI icons are Lucide (ISC license).

## Handheld-style interface

- Meowth's battle-stage sprites (`pokemon/52.gif`, `pokemon/52.png`) and the region badge images (`badges/region-1.png` … `region-9.png`, PokeAPI badge sprites 1, 9, 17, 25, 33, 41, 49, 57 and 65) come from [PokeAPI/sprites](https://github.com/PokeAPI/sprites).
- Interface fonts `fonts/power-green.ttf` and `fonts/power-clear.ttf` are the community "Power" fonts distributed with [Pokémon Essentials](https://github.com/Maruno17/pokemon-essentials/tree/master/Fonts). `fonts/pokemon-solid.ttf` is the fan-made "Pokémon Solid" logo font.
- Windows, buttons, HP-style bars, the coin pouch and the town map are original CSS/SVG made for this fan game, styled after the handheld Pokémon games.

## Meowth Mint logo

The app and launcher use Meowth Mint, a mint tile framing the original Meowth Happy portrait. Source and attribution are in [branding/CREDITS.md](branding/CREDITS.md).
