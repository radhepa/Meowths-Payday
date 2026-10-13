# Meowth's Pay Day Empire

The offline Windows edition is documented in [DESKTOP.md](../DESKTOP.md). Run `npm run desktop:pack` to build a portable executable and an installer. Settings includes save export/import to move progress between the web game and desktop app.

A single-page React 19 + Tailwind CSS 4 incremental game with 180 businesses across nine regions, 250 scenes across nine regional stories, authentic Pokémon sprites and generated pixel landscapes. Vite bundles the assets locally; gameplay does not depend on either asset API responding.

## Run locally

```sh
npm install
npm run dev
npm test
npm run build
```

## Regional progression

Start in Kanto and travel sequentially through Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar and Paldea. Regional Pokémon membership is verified with PokeAPI species.generation. Each region shows only its native managers, customers and shops. Meowth remains your traveling clicker partner.

Every region has 20 businesses. Rayquaza's skyport is in Hoenn; Kanto's final skyport belongs to Dragonair. Region identity is separate from stable business IDs so older ownership migrates correctly.

To leave Kanto, open its 20 businesses, hire all 20 managers, unlock all 50 story scenes and earn ₽50T in Kanto. Each later region requires all 20 shops, ten managers, its 25 story milestones and ten times the preceding region's earnings target. The Regions tab tracks these milestones. Paldea's final milestones complete the world tour.

Travel does not spend money or clear businesses, upgrades, managers, likes or story progress. Managers in unlocked earlier regions keep working and earn for their home region. Visit any unlocked region to manage it. Pay Day contributes to your current region. No prestige action or repeat-reset currency exists.

## Economy and saves

- Pay Day begins at ₽1 per click, with floating coins and optional sound.
- The original five shops retain their requested base costs, yields and cycle durations.
- Units add income linearly. The next costs BaseCost × 1.15^quantity; bulk buys sum the geometric series.
- Manual progress bars run one cycle. One-time Pokémon managers restart cycles automatically.
- 185 upgrades improve clicks, an individual shop, or all businesses.
- Customers walk in, wait for an actual completed cycle, purchase goods and react. Hearts and visits persist; customer checkout does not award income a second time.
- Saves use the existing meowth.payday-empire.v1 storage key and schema version 3, once per second. Offline automation catches up for at most two hours per absence, including imports and resuming after sleep. Active play continues earning normally.
- Trainer Card → Options → Delete progress starts a fresh Kanto empire after confirmation and clears the local import backup. Exported save files remain available.
- Version 1/2 money, upgrades, ownership, managers and customer stats migrate by stable IDs. Old future-region shops are retained but wait until that region unlocks. Previously earned income bonuses become a fixed founder bonus; no new reset bonuses accrue. Earlier run earnings seed Kanto's regional ledger during migration. Invalid optional story data is repaired without deleting financial progress.

## Stories across nine regions

Kanto retains the original Coinleaf Chronicles: five chapters and 50 six-beat scenes. Johto through Paldea each have five chapters and 25 original six-beat scenes, with their own generation-exclusive cast and a linked community adventure. There are 250 scenes, 45 chapters and 21 settings in total. New neighborhood arcs play before each region's original farewell; historical scene IDs, watched scenes and dialogue checkpoints remain valid.

Arrival, purchases, hires, completed income cycles and regional earnings unlock scenes in regional order. New scenes play automatically in the current region, including after traveling. Earlier unread stories do not interrupt a later region. The journal offers optional replay and resume. Closing a scene saves its dialogue checkpoint and holds the currently available queue; newly unlocked milestones can still open. Revisiting a region clears that temporary hold. Blocking panels defer playback until they close. Skip marks a scene watched, and earnings continue throughout.

Saves retain existing scene IDs and checkpoints. Optional story schema 3 preserves historical farewells when new scenes are inserted, along with explicit autoplay pause preferences from schema 2. Arrow keys navigate/reveal, Escape returns to town, and reduced motion shows full dialogue immediately.

Speakers use authentic PMD emotion portraits. All 105 speaking-cast sprite orientations were visually inspected. Angled bodies turn toward their conversation partner when the speaker changes; centered artwork stays neutral. Portrait expressions absent upstream use the actual Normal portrait. Original artwork is not painted over.

## Artwork and source

Twenty-one pixel landscapes accompany the adventure. Nine region markets, four additional Kanto chapter settings and eight regional landmarks use hard pixel clusters and pixelated display. PNGs and the complete prompt set are in public/assets/backgrounds/PROMPTS.json, REGIONAL-STORY-PROMPTS.json and the adjacent image files.

PokeAPI supplies item sprites and 185 generation-verified Pokémon with cached static/animated bodies and actual types. Item illustrations combine unmodified sprites with grid-aligned shop props. All managers use authentic cached 40×40 PMD portraits. Exact upstream URLs, per-expression contributors and licenses are retained in public/assets/regions/SOURCES.md and public/assets/story/SOURCES.md and public/assets/story-regions/SOURCES.md; Settings links the credits. Pokémon assets belong to their original rights holders. This is an unofficial fan game.

src/catalog.js defines economics and regional shops; regions.js defines the map; game.js contains pure economy, migration and travel; useGame.js persists and simulates; RegionPanel.jsx and App.jsx render the map and game, styled by pokemon-ui.css (handheld Pokémon windows, Poké Mart, party, bag, town map and trainer card); CustomerScene.jsx and market.js drive local crowds; story.js, regional-story.js, useStory.js and StoryPlayer.jsx handle the nine regional stories. CutsceneStage.jsx uses measured alpha bounds in story-sprite-frames.json and regional-story-sprite-frames.json to anchor visible feet on the foreground paths defined in story-stage.js. Speaking never lifts a grounded Pokémon; only actual Flying types hover. Responsive size limits keep larger bodies within their own slots. Bottom-aligned artwork and resize observation keep feet on the same path during responsive cropping. Swap mascot/sound URLs in assets.js, region backgrounds in regions.js and sprite paths in the JSON manifests. If swapping a cutscene body or background, update its measured bounds or dimensions and inspect its ground anchor. Empty sound URLs use a synthesized chime.

## Business roster

| Region | Business | Manager | Base cost (₽) | Base yield (₽) | Cycle |
| --- | --- | --- | ---: | ---: | ---: |
| Kanto | Slowpoke Tail Stand | Persian | 15 | 4 | 1s |
| Kanto | Caterpie Community Garden | Butterfree | 35 | 10 | 2s |
| Kanto | Victreebel Berry Smoothie Kiosk | Victreebel | 100 | 32 | 3s |
| Kanto | Magikarp Fishing Shack | Magikarp | 250 | 60 | 4s |
| Kanto | Jigglypuff Melody Café | Jigglypuff | 650 | 160 | 5s |
| Kanto | Team Rocket Game Corner | Gengar | 1100 | 260 | 6s |
| Kanto | Electabuzz Power Station | Electabuzz | 7500 | 900 | 8s |
| Kanto | Silph Co. Stock Portfolio | Alakazam | 12000 | 1400 | 12s |
| Kanto | Kangaskhan Picnic Kitchen | Kangaskhan | 35000 | 4200 | 15s |
| Kanto | Machamp Master Ball Factory | Machamp | 130000 | 14000 | 24s |
| Kanto | Eevee Evolution Boutique | Eevee | 230000 | 24000 | 18s |
| Kanto | Lapras Luxury Cruises | Lapras | 1400000 | 150000 | 30s |
| Kanto | Dragonite Express Courier | Dragonite | 9000000 | 950000 | 40s |
| Kanto | Chansey Care Clinic | Chansey | 55000000 | 6000000 | 45s |
| Kanto | Ditto Discovery Daycare | Ditto | 330000000 | 38000000 | 60s |
| Kanto | Snorlax Snooze Resort | Snorlax | 2000000000 | 240000000 | 75s |
| Kanto | Rhydon Stoneworks | Rhydon | 12000000000 | 1500000000 | 90s |
| Kanto | Raichu Beacon Network | Raichu | 75000000000 | 10000000000 | 105s |
| Kanto | Porygon Digital Labs | Porygon | 460000000000 | 64000000000 | 120s |
| Kanto | Dragonair Starwind Skyport | Dragonair | 2800000000000 | 400000000000 | 150s |
| Johto | Hoothoot Night Watch | Hoothoot | 750 | 200 | 1s |
| Johto | Chikorita Seed Nursery | Chikorita | 1500 | 400 | 2s |
| Johto | Lanturn Canal Ferries | Lanturn | 4060 | 1020 | 3s |
| Johto | Cyndaquil Charcoal Forge | Cyndaquil | 11000 | 2600 | 4s |
| Johto | Togepi Lucky Gift Shop | Togepi | 28700 | 4840 | 6s |
| Johto | Totodile River Tours | Totodile | 75000 | 9000 | 8s |
| Johto | Xatu Sundial Studio | Xatu | 162000 | 19400 | 10s |
| Johto | Shuckle Juice Cellar | Shuckle | 350000 | 42000 | 12s |
| Johto | Bellossom Petal Perfumes | Bellossom | 897000 | 100000 | 15s |
| Johto | Flaaffy Wool & Watts | Flaaffy | 2300000 | 240000 | 18s |
| Johto | Sudowoodo Garden Sculptures | Sudowoodo | 5670000 | 600000 | 21s |
| Johto | Miltank MooMoo Dairy | Miltank | 14000000 | 1500000 | 24s |
| Johto | Aipom Basket Weavers | Aipom | 87700000 | 9490000 | 32s |
| Johto | Heracross Timber Depot | Heracross | 550000000 | 60000000 | 40s |
| Johto | Sunflora Sunseed Farm | Sunflora | 3320000000 | 379000000 | 50s |
| Johto | Tyranitar Gem Quarry | Tyranitar | 20000000000 | 2400000000 | 60s |
| Johto | Wooper Wetland Rangers | Wooper | 122000000000 | 15500000000 | 75s |
| Johto | Ampharos Lighthouse | Ampharos | 750000000000 | 100000000000 | 90s |
| Johto | Delibird Winter Parcels | Delibird | 4580000000000 | 632000000000 | 120s |
| Johto | Porygon2 Radio Network | Porygon2 | 28000000000000 | 4000000000000 | 150s |
| Hoenn | Ralts Welcome Center | Ralts | 7500 | 2000 | 1s |
| Hoenn | Treecko Canopy Nursery | Treecko | 15000 | 4000 | 2s |
| Hoenn | Breloom Trail Provisions | Breloom | 40600 | 10200 | 3s |
| Hoenn | Torchic Sunrise Bakery | Torchic | 110000 | 26000 | 4s |
| Hoenn | Slaking Hammock Lodge | Slaking | 287000 | 48400 | 6s |
| Hoenn | Mudkip Harbor Supplies | Mudkip | 750000 | 90000 | 8s |
| Hoenn | Ninjask Rush Deliveries | Ninjask | 1620000 | 194000 | 10s |
| Hoenn | Ludicolo Tropical Smoothies | Ludicolo | 3500000 | 420000 | 12s |
| Hoenn | Exploud Harbor Announcements | Exploud | 8970000 | 1000000 | 15s |
| Hoenn | Sableye Treasure Bazaar | Sableye | 23000000 | 2400000 | 18s |
| Hoenn | Mawile Tool Atelier | Mawile | 56700000 | 6000000 | 21s |
| Hoenn | Altaria Cloud Couriers | Altaria | 140000000 | 15000000 | 24s |
| Hoenn | Aggron Breakwater Works | Aggron | 877000000 | 94900000 | 32s |
| Hoenn | Absol Weather Service | Absol | 5500000000 | 600000000 | 40s |
| Hoenn | Wailmer Bay Excursions | Wailmer | 33200000000 | 3790000000 | 50s |
| Hoenn | Metagross Assembly Works | Metagross | 200000000000 | 24000000000 | 60s |
| Hoenn | Castform Forecast Desk | Castform | 1220000000000 | 155000000000 | 75s |
| Hoenn | Jirachi Wish Observatory | Jirachi | 7500000000000 | 1000000000000 | 90s |
| Hoenn | Kecleon Trading Post | Kecleon | 45800000000000 | 6320000000000 | 120s |
| Hoenn | Rayquaza Orbital Skyport | Rayquaza | 280000000000000 | 40000000000000 | 150s |
| Sinnoh | Kricketune Alpine Music | Kricketune | 75000 | 20000 | 1s |
| Sinnoh | Turtwig Orchard Gardens | Turtwig | 150000 | 40000 | 2s |
| Sinnoh | Luxray Trail Lanterns | Luxray | 406000 | 102000 | 3s |
| Sinnoh | Chimchar Hearth Forge | Chimchar | 1100000 | 260000 | 4s |
| Sinnoh | Burmy Cloak Tailors | Burmy | 2870000 | 484000 | 6s |
| Sinnoh | Piplup Pier Supplies | Piplup | 7500000 | 900000 | 8s |
| Sinnoh | Combee Honey Pantry | Combee | 16200000 | 1940000 | 10s |
| Sinnoh | Pachirisu Battery Bank | Pachirisu | 35000000 | 4200000 | 12s |
| Sinnoh | Cherrim Conservatory | Cherrim | 89700000 | 10000000 | 15s |
| Sinnoh | Buizel Water Taxi | Buizel | 230000000 | 24000000 | 18s |
| Sinnoh | Shellos Hot Spring Baths | Shellos | 567000000 | 60000000 | 21s |
| Sinnoh | Roserade Florist | Roserade | 1400000000 | 150000000 | 24s |
| Sinnoh | Drifblim Balloon Post | Drifblim | 8770000000 | 949000000 | 32s |
| Sinnoh | Lucario Adventure Gear | Lucario | 55000000000 | 6000000000 | 40s |
| Sinnoh | Lopunny Summit Outfitters | Lopunny | 332000000000 | 37900000000 | 50s |
| Sinnoh | Rotom Appliance Works | Rotom | 2000000000000 | 240000000000 | 60s |
| Sinnoh | Bronzong Snow Bell Works | Bronzong | 12200000000000 | 1550000000000 | 75s |
| Sinnoh | Empoleon Ice Harbor | Empoleon | 75000000000000 | 10000000000000 | 90s |
| Sinnoh | Snover Snowfruit Orchard | Snover | 458000000000000 | 63200000000000 | 120s |
| Sinnoh | Garchomp Express Freight | Garchomp | 2800000000000000 | 400000000000000 | 150s |
| Unova | Lillipup Corner Grocer | Lillipup | 750000 | 200000 | 1s |
| Unova | Snivy City Greenhouse | Snivy | 1500000 | 400000 | 2s |
| Unova | Pansage Rooftop Produce | Pansage | 4060000 | 1020000 | 3s |
| Unova | Tepig Brick Oven Bakery | Tepig | 11000000 | 2600000 | 4s |
| Unova | Munna Dream Pillow Shop | Munna | 28700000 | 4840000 | 6s |
| Unova | Oshawott Dockside Tackle | Oshawott | 75000000 | 9000000 | 8s |
| Unova | Blitzle Cycle Couriers | Blitzle | 162000000 | 19400000 | 10s |
| Unova | Audino Neighborhood Clinic | Audino | 350000000 | 42000000 | 12s |
| Unova | Drilbur Subway Repairs | Drilbur | 897000000 | 100000000 | 15s |
| Unova | Whimsicott Textile Mill | Whimsicott | 2300000000 | 240000000 | 18s |
| Unova | Petilil Community Tea | Petilil | 5670000000 | 600000000 | 21s |
| Unova | Trubbish Recycling Center | Trubbish | 14000000000 | 1500000000 | 24s |
| Unova | Basculin River Freight | Basculin | 87700000000 | 9490000000 | 32s |
| Unova | Joltik Power Grid | Joltik | 550000000000 | 60000000000 | 40s |
| Unova | Ducklett Canal Cleaners | Ducklett | 3320000000000 | 379000000000 | 50s |
| Unova | Chandelure Lantern Works | Chandelure | 20000000000000 | 2400000000000 | 60s |
| Unova | Vanillite Frozen Treats | Vanillite | 122000000000000 | 15500000000000 | 75s |
| Unova | Golurk Heavy Foundry | Golurk | 750000000000000 | 100000000000000 | 90s |
| Unova | Litwick Night Café | Litwick | 4580000000000000 | 632000000000000 | 120s |
| Unova | Braviary Air Cargo | Braviary | 28000000000000000 | 4000000000000000 | 150s |
| Kalos | Fletchling Garden Post | Fletchling | 7500000 | 2000000 | 1s |
| Kalos | Chespin Garden Market | Chespin | 15000000 | 4000000 | 2s |
| Kalos | Vivillon Pattern House | Vivillon | 40600000 | 10200000 | 3s |
| Kalos | Fennekin Tea Salon | Fennekin | 110000000 | 26000000 | 4s |
| Kalos | Flabébé Flower Cart | Flabébé | 287000000 | 48400000 | 6s |
| Kalos | Froakie Water Couriers | Froakie | 750000000 | 90000000 | 8s |
| Kalos | Pancham Picnic Club | Pancham | 1620000000 | 194000000 | 10s |
| Kalos | Skiddo Hillside Ranch | Skiddo | 3500000000 | 420000000 | 12s |
| Kalos | Espurr Quiet Bookshop | Espurr | 8970000000 | 1000000000 | 15s |
| Kalos | Furfrou Grooming Salon | Furfrou | 23000000000 | 2400000000 | 18s |
| Kalos | Honedge Cutlery Smith | Honedge | 56700000000 | 6000000000 | 21s |
| Kalos | Sylveon Ribbon Boutique | Sylveon | 140000000000 | 15000000000 | 24s |
| Kalos | Swirlix Patisserie | Swirlix | 877000000000 | 94900000000 | 32s |
| Kalos | Hawlucha Training Gear | Hawlucha | 5500000000000 | 600000000000 | 40s |
| Kalos | Inkay Illumination Studio | Inkay | 33200000000000 | 3790000000000 | 50s |
| Kalos | Carbink Crystal Atelier | Carbink | 200000000000000 | 24000000000000 | 60s |
| Kalos | Helioptile Solar Atelier | Helioptile | 1220000000000000 | 155000000000000 | 75s |
| Kalos | Goodra Rain Gardens | Goodra | 7500000000000000 | 1000000000000000 | 90s |
| Kalos | Noibat Echo Guides | Noibat | 45800000000000000 | 6320000000000000 | 120s |
| Kalos | Klefki Keyworks | Klefki | 280000000000000000 | 40000000000000000 | 150s |
| Alola | Pikipek Timber Crafts | Pikipek | 75000000 | 20000000 | 1s |
| Alola | Rowlet Island Post | Rowlet | 150000000 | 40000000 | 2s |
| Alola | Cutiefly Blossom Tours | Cutiefly | 406000000 | 102000000 | 3s |
| Alola | Litten Beach Cookout | Litten | 1100000000 | 260000000 | 4s |
| Alola | Rockruff Trail Club | Rockruff | 2870000000 | 484000000 | 6s |
| Alola | Popplio Seaside Shows | Popplio | 7500000000 | 900000000 | 8s |
| Alola | Wishiwashi Lagoon Rides | Wishiwashi | 16200000000 | 1940000000 | 10s |
| Alola | Oricorio Dance Café | Oricorio | 35000000000 | 4200000000 | 12s |
| Alola | Dewpider Water Carriers | Dewpider | 89700000000 | 10000000000 | 15s |
| Alola | Mudbray Island Transport | Mudbray | 230000000000 | 24000000000 | 18s |
| Alola | Morelull Night Gardens | Morelull | 567000000000 | 60000000000 | 21s |
| Alola | Salandit Apothecary | Salandit | 1400000000000 | 150000000000 | 24s |
| Alola | Stufful Cushion Workshop | Stufful | 8770000000000 | 949000000000 | 32s |
| Alola | Bounsweet Smoothie Hut | Bounsweet | 55000000000000 | 6000000000000 | 40s |
| Alola | Comfey Lei Atelier | Comfey | 332000000000000 | 37900000000000 | 50s |
| Alola | Oranguru Community Library | Oranguru | 2000000000000000 | 240000000000000 | 60s |
| Alola | Wimpod Shore Cleanup | Wimpod | 12200000000000000 | 1550000000000000 | 75s |
| Alola | Mimikyu Craft Cottage | Mimikyu | 75000000000000000 | 10000000000000000 | 90s |
| Alola | Pyukumuku Beach Stewards | Pyukumuku | 458000000000000000 | 63200000000000000 | 120s |
| Alola | Kommo-o Sound Forge | Kommo-o | 2800000000000000000 | 400000000000000000 | 150s |
| Galar | Skwovet Pantry Market | Skwovet | 750000000 | 200000000 | 1s |
| Galar | Grookey Music Nursery | Grookey | 1500000000 | 400000000 | 2s |
| Galar | Gossifleur Garden Flags | Gossifleur | 4060000000 | 1020000000 | 3s |
| Galar | Scorbunny Sports Shop | Scorbunny | 11000000000 | 2600000000 | 4s |
| Galar | Chewtle Canal Locks | Chewtle | 28700000000 | 4840000000 | 6s |
| Galar | Sobble Waterworks | Sobble | 75000000000 | 9000000000 | 8s |
| Galar | Rolycoly Stove Works | Rolycoly | 162000000000 | 19400000000 | 10s |
| Galar | Wooloo Wool Mill | Wooloo | 350000000000 | 42000000000 | 12s |
| Galar | Applin Orchard Tearoom | Applin | 897000000000 | 100000000000 | 15s |
| Galar | Yamper Battery Depot | Yamper | 2300000000000 | 240000000000 | 18s |
| Galar | Sizzlipede Grill Cart | Sizzlipede | 5670000000000 | 600000000000 | 21s |
| Galar | Cramorant Fish Dock | Cramorant | 14000000000000 | 1500000000000 | 24s |
| Galar | Sinistea Antique Teashop | Sinistea | 87700000000000 | 9490000000000 | 32s |
| Galar | Toxtricity Music Studio | Toxtricity | 550000000000000 | 60000000000000 | 40s |
| Galar | Hatenna Calm Corner | Hatenna | 3320000000000000 | 379000000000000 | 50s |
| Galar | Alcremie Celebration Bakery | Alcremie | 20000000000000000 | 2400000000000000 | 60s |
| Galar | Snom Winter Knitwear | Snom | 122000000000000000 | 15500000000000000 | 75s |
| Galar | Corviknight Taxi Network | Corviknight | 750000000000000000 | 100000000000000000 | 90s |
| Galar | Cufant Rail Repairs | Cufant | 4580000000000000000 | 632000000000000000 | 120s |
| Galar | Dragapult Express Routes | Dragapult | 28000000000000000000 | 4000000000000000000 | 150s |
| Paldea | Lechonk Picnic Pantry | Lechonk | 7500000000 | 2000000000 | 1s |
| Paldea | Sprigatito Herb Market | Sprigatito | 15000000000 | 4000000000 | 2s |
| Paldea | Tarountula Canvas Shop | Tarountula | 40600000000 | 10200000000 | 3s |
| Paldea | Fuecoco Hearth Kitchen | Fuecoco | 110000000000 | 26000000000 | 4s |
| Paldea | Nacli Salt Kitchen | Nacli | 287000000000 | 48400000000 | 6s |
| Paldea | Quaxly Marina Rentals | Quaxly | 750000000000 | 90000000000 | 8s |
| Paldea | Charcadet Cookware Forge | Charcadet | 1620000000000 | 194000000000 | 10s |
| Paldea | Pawmi Charging Stations | Pawmi | 3500000000000 | 420000000000 | 12s |
| Paldea | Tadbulb Pond Lanterns | Tadbulb | 8970000000000 | 1000000000000 | 15s |
| Paldea | Fidough Dough House | Fidough | 23000000000000 | 2400000000000 | 18s |
| Paldea | Wattrel Coastal Couriers | Wattrel | 56700000000000 | 6000000000000 | 21s |
| Paldea | Smoliv Olive Press | Smoliv | 140000000000000 | 15000000000000 | 24s |
| Paldea | Shroodle Sign Studio | Shroodle | 877000000000000 | 94900000000000 | 32s |
| Paldea | Tinkaton Metalworks | Tinkaton | 5500000000000000 | 600000000000000 | 40s |
| Paldea | Toedscool Woodland Guides | Toedscool | 33200000000000000 | 3790000000000000 | 50s |
| Paldea | Gholdengo Coin Exchange | Gholdengo | 200000000000000000 | 24000000000000000 | 60s |
| Paldea | Capsakid Spice Market | Capsakid | 1220000000000000000 | 155000000000000000 | 75s |
| Paldea | Cetitan Cold Cargo | Cetitan | 7500000000000000000 | 1000000000000000000 | 90s |
| Paldea | Varoom Cart Workshop | Varoom | 45800000000000000000 | 6320000000000000000 | 120s |
| Paldea | Miraidon Transit Network | Miraidon | 280000000000000000000 | 40000000000000000000 | 150s |
