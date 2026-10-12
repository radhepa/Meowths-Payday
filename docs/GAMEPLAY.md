# Meowth's Pay Day Empire

The offline Windows edition is documented in [DESKTOP.md](../DESKTOP.md). Run `npm run desktop:pack` to build a portable executable and an installer. Settings includes save export/import to move progress between the web game and desktop app.

A single-page React 19 + Tailwind CSS 4 incremental game with 100 businesses across nine regions, 130 scenes across nine regional stories, authentic Pokémon sprites and generated pixel landscapes. Vite bundles the assets locally; gameplay does not depend on either asset API responding.

## Run locally

```sh
npm install
npm run dev
npm test
npm run build
```

## Regional progression

Start in Kanto and travel sequentially through Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar and Paldea. Regional Pokémon membership is verified with PokeAPI species.generation. Each region shows only its native managers, customers and shops. Meowth remains your traveling clicker partner.

Kanto has 20 businesses and each later region has 10. Rayquaza's skyport is in Hoenn; Kanto's final skyport belongs to Dragonair. Region identity is separate from stable business IDs so older ownership migrates correctly.

To leave Kanto, open its 20 businesses, hire all 20 managers, unlock all 50 story scenes and earn ₽50T in Kanto. Each later region requires all 10 shops, five managers, its 10 story milestones and ten times the preceding region's earnings target. The Regions tab tracks these milestones. Paldea's final milestones complete the world tour.

Travel does not spend money or clear businesses, upgrades, managers, likes or story progress. Managers in unlocked earlier regions keep working and earn for their home region. Visit any unlocked region to manage it. Pay Day contributes to your current region. No prestige action or repeat-reset currency exists.

## Economy and saves

- Pay Day begins at ₽1 per click, with floating coins and optional sound.
- The original five shops retain their requested base costs, yields and cycle durations.
- Units add income linearly. The next costs BaseCost × 1.15^quantity; bulk buys sum the geometric series.
- Manual progress bars run one cycle. One-time Pokémon managers restart cycles automatically.
- 105 upgrades improve clicks, an individual shop, or all businesses.
- Customers walk in, wait for an actual completed cycle, purchase goods and react. Hearts and visits persist; customer checkout does not award income a second time.
- Saves use the existing meowth.payday-empire.v1 storage key and schema version 3, once per second. Offline automation catches up for at most two hours per absence, including imports and resuming after sleep. Active play continues earning normally.
- Trainer Card → Options → Delete progress starts a fresh Kanto empire after confirmation and clears the local import backup. Exported save files remain available.
- Version 1/2 money, upgrades, ownership, managers and customer stats migrate by stable IDs. Old future-region shops are retained but wait until that region unlocks. Previously earned income bonuses become a fixed founder bonus; no new reset bonuses accrue. Earlier run earnings seed Kanto's regional ledger during migration. Invalid optional story data is repaired without deleting financial progress.

## Stories across nine regions

Kanto retains the original Coinleaf Chronicles: five chapters and 50 six-beat scenes. Johto through Paldea each add two chapters and 10 original six-beat scenes, with their own generation-exclusive cast and a linked community adventure. There are 130 scenes and 21 settings in total.

Arrival, purchases, hires, completed income cycles and regional earnings unlock scenes in regional order. New scenes play automatically in the current region, including after traveling. Earlier unread stories do not interrupt a later region. The journal offers optional replay and resume. Closing a scene saves its dialogue checkpoint and holds the currently available queue; newly unlocked milestones can still open. Revisiting a region clears that temporary hold. Blocking panels defer playback until they close. Skip marks a scene watched, and earnings continue throughout.

Saves retain existing Kanto IDs and checkpoints. Optional story schema 2 enables world autoplay once for legacy saves; subsequent explicit autoplay pause preferences are preserved. Arrow keys navigate/reveal, Escape returns to town, and reduced motion shows full dialogue immediately.

Speakers use authentic PMD emotion portraits. All 105 sprite orientations were visually inspected. Angled bodies turn toward their conversation partner when the speaker changes; centered artwork stays neutral. Portrait expressions absent upstream use the actual Normal portrait. Original artwork is not painted over.

## Artwork and source

Twenty-one pixel landscapes accompany the adventure. Nine region markets, four additional Kanto chapter settings and eight regional landmarks use hard pixel clusters and pixelated display. PNGs and the complete prompt set are in public/assets/backgrounds/PROMPTS.json, REGIONAL-STORY-PROMPTS.json and the adjacent image files.

PokeAPI supplies item sprites and 105 generation-verified Pokémon with cached static/animated bodies and actual types. Item illustrations combine unmodified sprites with grid-aligned shop props. All managers use authentic cached 40×40 PMD portraits. Exact upstream URLs, per-expression contributors and licenses are retained in public/assets/regions/SOURCES.md and public/assets/story/SOURCES.md and public/assets/story-regions/SOURCES.md; Settings links the credits. Pokémon assets belong to their original rights holders. This is an unofficial fan game.

src/catalog.js defines economics and regional shops; regions.js defines the map; game.js contains pure economy, migration and travel; useGame.js persists and simulates; RegionPanel.jsx and App.jsx render the map and game, styled by pokemon-ui.css (handheld Pokémon windows, Poké Mart, party, bag, town map and trainer card); CustomerScene.jsx and market.js drive local crowds; story.js, regional-story.js, useStory.js and StoryPlayer.jsx handle the nine regional stories. CutsceneStage.jsx uses measured alpha bounds in story-sprite-frames.json and regional-story-sprite-frames.json to anchor visible feet on the foreground paths defined in story-stage.js. Speaking never lifts a grounded Pokémon; only actual Flying types hover. Responsive size limits keep larger bodies within their own slots. Bottom-aligned artwork and resize observation keep feet on the same path during responsive cropping. Swap mascot/sound URLs in assets.js, region backgrounds in regions.js and sprite paths in the JSON manifests. If swapping a cutscene body or background, update its measured bounds or dimensions and inspect its ground anchor. Empty sound URLs use a synthesized chime.

## Business roster

| Region | Businesses | Generation |
| ------ | ---------: | ---------: |
| Kanto  |         20 |          1 |
| Johto  |         10 |          2 |
| Hoenn  |         10 |          3 |
| Sinnoh |         10 |          4 |
| Unova  |         10 |          5 |
| Kalos  |         10 |          6 |
| Alola  |         10 |          7 |
| Galar  |         10 |          8 |
| Paldea |         10 |          9 |

| Region | Business                        | Manager     |             Base cost |                Yield | Cycle |
| ------ | ------------------------------- | ----------- | --------------------: | -------------------: | ----: |
| Kanto  | Slowpoke Tail Stand             | Persian     |                    15 |                    4 |    1s |
| Kanto  | Caterpie Community Garden       | Butterfree  |                    35 |                   10 |    2s |
| Kanto  | Victreebel Berry Smoothie Kiosk | Victreebel  |                   100 |                   32 |    3s |
| Kanto  | Magikarp Fishing Shack          | Magikarp    |                   250 |                   60 |    4s |
| Kanto  | Jigglypuff Melody Café          | Jigglypuff  |                   650 |                  160 |    5s |
| Kanto  | Team Rocket Game Corner         | Gengar      |                  1100 |                  260 |    6s |
| Kanto  | Electabuzz Power Station        | Electabuzz  |                  7500 |                  900 |    8s |
| Kanto  | Silph Co. Stock Portfolio       | Alakazam    |                 12000 |                 1400 |   12s |
| Kanto  | Kangaskhan Picnic Kitchen       | Kangaskhan  |                 35000 |                 4200 |   15s |
| Kanto  | Machamp Master Ball Factory     | Machamp     |                130000 |                14000 |   24s |
| Kanto  | Eevee Evolution Boutique        | Eevee       |                230000 |                24000 |   18s |
| Kanto  | Lapras Luxury Cruises           | Lapras      |               1400000 |               150000 |   30s |
| Kanto  | Dragonite Express Courier       | Dragonite   |               9000000 |               950000 |   40s |
| Kanto  | Chansey Care Clinic             | Chansey     |              55000000 |              6000000 |   45s |
| Kanto  | Ditto Discovery Daycare         | Ditto       |             330000000 |             38000000 |   60s |
| Kanto  | Snorlax Snooze Resort           | Snorlax     |            2000000000 |            240000000 |   75s |
| Kanto  | Rhydon Stoneworks               | Rhydon      |           12000000000 |           1500000000 |   90s |
| Kanto  | Raichu Beacon Network           | Raichu      |           75000000000 |          10000000000 |  105s |
| Kanto  | Porygon Digital Labs            | Porygon     |          460000000000 |          64000000000 |  120s |
| Kanto  | Dragonair Starwind Skyport      | Dragonair   |         2800000000000 |         400000000000 |  150s |
| Johto  | Chikorita Seed Nursery          | Chikorita   |                  1500 |                  400 |    2s |
| Johto  | Cyndaquil Charcoal Forge        | Cyndaquil   |                 11000 |                 2600 |    4s |
| Johto  | Totodile River Tours            | Totodile    |                 75000 |                 9000 |    8s |
| Johto  | Shuckle Juice Cellar            | Shuckle     |                350000 |                42000 |   12s |
| Johto  | Flaaffy Wool & Watts            | Flaaffy     |               2300000 |               240000 |   18s |
| Johto  | Miltank MooMoo Dairy            | Miltank     |              14000000 |              1500000 |   24s |
| Johto  | Heracross Timber Depot          | Heracross   |             550000000 |             60000000 |   40s |
| Johto  | Tyranitar Gem Quarry            | Tyranitar   |           20000000000 |           2400000000 |   60s |
| Johto  | Ampharos Lighthouse             | Ampharos    |          750000000000 |         100000000000 |   90s |
| Johto  | Porygon2 Radio Network          | Porygon2    |        28000000000000 |        4000000000000 |  150s |
| Hoenn  | Treecko Canopy Nursery          | Treecko     |                 15000 |                 4000 |    2s |
| Hoenn  | Torchic Sunrise Bakery          | Torchic     |                110000 |                26000 |    4s |
| Hoenn  | Mudkip Harbor Supplies          | Mudkip      |                750000 |                90000 |    8s |
| Hoenn  | Ludicolo Tropical Smoothies     | Ludicolo    |               3500000 |               420000 |   12s |
| Hoenn  | Sableye Treasure Bazaar         | Sableye     |              23000000 |              2400000 |   18s |
| Hoenn  | Altaria Cloud Couriers          | Altaria     |             140000000 |             15000000 |   24s |
| Hoenn  | Absol Weather Service           | Absol       |            5500000000 |            600000000 |   40s |
| Hoenn  | Metagross Assembly Works        | Metagross   |          200000000000 |          24000000000 |   60s |
| Hoenn  | Jirachi Wish Observatory        | Jirachi     |         7500000000000 |        1000000000000 |   90s |
| Hoenn  | Rayquaza Orbital Skyport        | Rayquaza    |       280000000000000 |       40000000000000 |  150s |
| Sinnoh | Turtwig Orchard Gardens         | Turtwig     |                150000 |                40000 |    2s |
| Sinnoh | Chimchar Hearth Forge           | Chimchar    |               1100000 |               260000 |    4s |
| Sinnoh | Piplup Pier Supplies            | Piplup      |               7500000 |               900000 |    8s |
| Sinnoh | Pachirisu Battery Bank          | Pachirisu   |              35000000 |              4200000 |   12s |
| Sinnoh | Buizel Water Taxi               | Buizel      |             230000000 |             24000000 |   18s |
| Sinnoh | Roserade Florist                | Roserade    |            1400000000 |            150000000 |   24s |
| Sinnoh | Lucario Adventure Gear          | Lucario     |           55000000000 |           6000000000 |   40s |
| Sinnoh | Rotom Appliance Works           | Rotom       |         2000000000000 |         240000000000 |   60s |
| Sinnoh | Empoleon Ice Harbor             | Empoleon    |        75000000000000 |       10000000000000 |   90s |
| Sinnoh | Garchomp Express Freight        | Garchomp    |      2800000000000000 |      400000000000000 |  150s |
| Unova  | Snivy City Greenhouse           | Snivy       |               1500000 |               400000 |    2s |
| Unova  | Tepig Brick Oven Bakery         | Tepig       |              11000000 |              2600000 |    4s |
| Unova  | Oshawott Dockside Tackle        | Oshawott    |              75000000 |              9000000 |    8s |
| Unova  | Audino Neighborhood Clinic      | Audino      |             350000000 |             42000000 |   12s |
| Unova  | Whimsicott Textile Mill         | Whimsicott  |            2300000000 |            240000000 |   18s |
| Unova  | Trubbish Recycling Center       | Trubbish    |           14000000000 |           1500000000 |   24s |
| Unova  | Joltik Power Grid               | Joltik      |          550000000000 |          60000000000 |   40s |
| Unova  | Chandelure Lantern Works        | Chandelure  |        20000000000000 |        2400000000000 |   60s |
| Unova  | Golurk Heavy Foundry            | Golurk      |       750000000000000 |      100000000000000 |   90s |
| Unova  | Braviary Air Cargo              | Braviary    |     28000000000000000 |     4000000000000000 |  150s |
| Kalos  | Chespin Garden Market           | Chespin     |              15000000 |              4000000 |    2s |
| Kalos  | Fennekin Tea Salon              | Fennekin    |             110000000 |             26000000 |    4s |
| Kalos  | Froakie Water Couriers          | Froakie     |             750000000 |             90000000 |    8s |
| Kalos  | Skiddo Hillside Ranch           | Skiddo      |            3500000000 |            420000000 |   12s |
| Kalos  | Furfrou Grooming Salon          | Furfrou     |           23000000000 |           2400000000 |   18s |
| Kalos  | Sylveon Ribbon Boutique         | Sylveon     |          140000000000 |          15000000000 |   24s |
| Kalos  | Hawlucha Training Gear          | Hawlucha    |         5500000000000 |         600000000000 |   40s |
| Kalos  | Carbink Crystal Atelier         | Carbink     |       200000000000000 |       24000000000000 |   60s |
| Kalos  | Goodra Rain Gardens             | Goodra      |      7500000000000000 |     1000000000000000 |   90s |
| Kalos  | Klefki Keyworks                 | Klefki      |    280000000000000000 |    40000000000000000 |  150s |
| Alola  | Rowlet Island Post              | Rowlet      |             150000000 |             40000000 |    2s |
| Alola  | Litten Beach Cookout            | Litten      |            1100000000 |            260000000 |    4s |
| Alola  | Popplio Seaside Shows           | Popplio     |            7500000000 |            900000000 |    8s |
| Alola  | Oricorio Dance Café             | Oricorio    |           35000000000 |           4200000000 |   12s |
| Alola  | Mudbray Island Transport        | Mudbray     |          230000000000 |          24000000000 |   18s |
| Alola  | Salandit Apothecary             | Salandit    |         1400000000000 |         150000000000 |   24s |
| Alola  | Bounsweet Smoothie Hut          | Bounsweet   |        55000000000000 |        6000000000000 |   40s |
| Alola  | Oranguru Community Library      | Oranguru    |      2000000000000000 |      240000000000000 |   60s |
| Alola  | Mimikyu Craft Cottage           | Mimikyu     |     75000000000000000 |    10000000000000000 |   90s |
| Alola  | Kommo-o Sound Forge             | Kommo-o     |   2800000000000000000 |   400000000000000000 |  150s |
| Galar  | Grookey Music Nursery           | Grookey     |            1500000000 |            400000000 |    2s |
| Galar  | Scorbunny Sports Shop           | Scorbunny   |           11000000000 |           2600000000 |    4s |
| Galar  | Sobble Waterworks               | Sobble      |           75000000000 |           9000000000 |    8s |
| Galar  | Wooloo Wool Mill                | Wooloo      |          350000000000 |          42000000000 |   12s |
| Galar  | Yamper Battery Depot            | Yamper      |         2300000000000 |         240000000000 |   18s |
| Galar  | Cramorant Fish Dock             | Cramorant   |        14000000000000 |        1500000000000 |   24s |
| Galar  | Toxtricity Music Studio         | Toxtricity  |       550000000000000 |       60000000000000 |   40s |
| Galar  | Alcremie Celebration Bakery     | Alcremie    |     20000000000000000 |     2400000000000000 |   60s |
| Galar  | Corviknight Taxi Network        | Corviknight |    750000000000000000 |   100000000000000000 |   90s |
| Galar  | Dragapult Express Routes        | Dragapult   |  28000000000000000000 |  4000000000000000000 |  150s |
| Paldea | Sprigatito Herb Market          | Sprigatito  |           15000000000 |           4000000000 |    2s |
| Paldea | Fuecoco Hearth Kitchen          | Fuecoco     |          110000000000 |          26000000000 |    4s |
| Paldea | Quaxly Marina Rentals           | Quaxly      |          750000000000 |          90000000000 |    8s |
| Paldea | Pawmi Charging Stations         | Pawmi       |         3500000000000 |         420000000000 |   12s |
| Paldea | Fidough Dough House             | Fidough     |        23000000000000 |        2400000000000 |   18s |
| Paldea | Smoliv Olive Press              | Smoliv      |       140000000000000 |       15000000000000 |   24s |
| Paldea | Tinkaton Metalworks             | Tinkaton    |      5500000000000000 |      600000000000000 |   40s |
| Paldea | Gholdengo Coin Exchange         | Gholdengo   |    200000000000000000 |    24000000000000000 |   60s |
| Paldea | Cetitan Cold Cargo              | Cetitan     |   7500000000000000000 |  1000000000000000000 |   90s |
| Paldea | Miraidon Transit Network        | Miraidon    | 280000000000000000000 | 40000000000000000000 |  150s |
