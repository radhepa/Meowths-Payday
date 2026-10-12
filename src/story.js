import { BUSINESSES } from "./catalog.js";
import { regionInfo } from "./regions.js";
import {
  REGIONAL_CAST,
  REGIONAL_CHAPTERS,
  REGIONAL_SCENES,
} from "./regional-story.js";

// Stable Kanto IDs preserve the original fifty-scene adventure and its saves.
const KANTO_CHAPTERS = [
  {
    title: "A little town, a big promise",
    subtitle: "A market stall. A mysterious coin. A place to belong.",
    location: "Coinleaf Market",
    setting: "market",
  },
  {
    title: "The team behind the dream",
    subtitle: "Every Pokémon has something only they can give.",
    location: "Lantern Square",
    setting: "square",
  },
  {
    title: "Beyond the familiar shore",
    subtitle: "New routes, an unlikely rival, and a gathering storm.",
    location: "Ripple Harbor",
    setting: "harbor",
  },
  {
    title: "When the lights go out",
    subtitle: "An empire discovers what it was really built for.",
    location: "Coinleaf Valley",
    setting: "storm",
  },
  {
    title: "A wish above the clouds",
    subtitle: "Follow the wind. Bring everyone home.",
    location: "Starwind Skyport",
    setting: "sky",
  },
];
const KANTO_CAST = {
  12: "Butterfree",
  25: "Pikachu",
  26: "Raichu",
  35: "Clefairy",
  36: "Clefable",
  39: "Jigglypuff",
  52: "Meowth",
  53: "Persian",
  65: "Alakazam",
  68: "Machamp",
  71: "Victreebel",
  79: "Slowpoke",
  94: "Gengar",
  112: "Rhydon",
  113: "Chansey",
  115: "Kangaskhan",
  125: "Electabuzz",
  129: "Magikarp",
  131: "Lapras",
  132: "Ditto",
  133: "Eevee",
  137: "Porygon",
  143: "Snorlax",
  148: "Dragonair",
  149: "Dragonite",
};
const KANTO_SCENES = [
  {
    id: "scene-01",
    number: 1,
    chapter: 0,
    title: "One coin and a dream",
    synopsis:
      "Meowth arrives in Coinleaf with empty pockets and a very full imagination.",
    requirement: {
      kind: "always",
    },
    cast: [52, 53, 79],
    lines: [
      {
        speaker: 52,
        emotion: "Inspired",
        text: "Someday this sleepy square will sparkle with shops! And I’ll have a mountain of shiny coins. Meow!",
      },
      {
        speaker: 53,
        emotion: "Normal",
        text: "A mountain starts with one pebble. What will your first customer need?",
      },
      {
        speaker: 79,
        emotion: "Worried",
        text: "Um… lunch? I was going to suggest that yesterday.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Lunch it is! A little Pay Day, a little tail stand, and we’re in business!",
      },
      {
        speaker: 53,
        emotion: "Determined",
        text: "Then make me a promise. No Pokémon gets left behind when this town grows.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "A promise sealed with a pawprint. Coinleaf, here we come!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-02",
    number: 2,
    chapter: 0,
    title: "The sound of possibility",
    synopsis: "The first Pay Day lands in the dust.",
    requirement: {
      kind: "clicks",
      amount: 1,
    },
    cast: [52, 25, 53],
    lines: [
      {
        speaker: 52,
        emotion: "Surprised",
        text: "Did you hear that? Ting! The sweetest sound in the world!",
      },
      {
        speaker: 25,
        emotion: "Happy",
        text: "Pika! It sounded like a tiny bell. Is there a festival?",
      },
      {
        speaker: 53,
        emotion: "Happy",
        text: "There could be, if our new shopkeeper remembers to open a shop.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Fifteen Pokédollars for a stand. One shiny coin at a time!",
      },
      {
        speaker: 25,
        emotion: "Inspired",
        text: "I’ll tell everyone! A new neighbor is making something happen.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Heh. That sounds even better than ting.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-03",
    number: 3,
    chapter: 0,
    title: "The slowest grand opening",
    synopsis: "Slowpoke has a special rule for the new tail stand.",
    requirement: {
      kind: "own",
      id: "tails",
      quantity: 1,
    },
    cast: [52, 79, 53],
    lines: [
      {
        speaker: 52,
        emotion: "Joyous",
        text: "Open for business! Fresh Slowpoke tails! Form an orderly queue!",
      },
      {
        speaker: 79,
        emotion: "Normal",
        text: "Naturally shed tails only. I wrote that on the sign. Slowly.",
      },
      {
        speaker: 53,
        emotion: "Determined",
        text: "Good. Our neighbors are partners, not ingredients to chase.",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "Of course! A happy Slowpoke is our most important supplier.",
      },
      {
        speaker: 79,
        emotion: "Happy",
        text: "I’m very happy. Oh… I think the first customer arrived a minute ago.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Right! Tap that income bar. Let’s serve our first meal!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-04",
    number: 4,
    chapter: 0,
    title: "A mysterious lucky charm",
    synopsis: "The first sale reveals something tucked beneath the counter.",
    requirement: {
      kind: "cycles",
      id: "tails",
      amount: 1,
    },
    cast: [52, 53, 79],
    lines: [
      {
        speaker: 52,
        emotion: "Happy",
        text: "First sale! I’m keeping this coin forever. Unless I really need change.",
      },
      {
        speaker: 79,
        emotion: "Surprised",
        text: "There was another coin under the counter. This one glows.",
      },
      {
        speaker: 53,
        emotion: "Worried",
        text: "A lucky compass coin… and a little compass mark. My old guild used that symbol.",
      },
      {
        speaker: 52,
        emotion: "Inspired",
        text: "A treasure map? A secret vault? A snack discount?",
      },
      {
        speaker: 53,
        emotion: "Normal",
        text: "They said it points toward a place where wishes find their way home.",
      },
      {
        speaker: 79,
        emotion: "Happy",
        text: "Then my wish is for seconds. We should start close to home.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-05",
    number: 5,
    chapter: 0,
    title: "Seeds for everyone",
    synopsis: "Butterfree turns an empty lot into a neighborhood garden.",
    requirement: {
      kind: "own",
      id: "garden",
      quantity: 1,
    },
    cast: [52, 12, 79],
    lines: [
      {
        speaker: 12,
        emotion: "Worried",
        text: "I can carry pollen all day, but nobody planted anything here.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Then we’ll build you a garden. Best Miracle Seeds in the valley!",
      },
      {
        speaker: 79,
        emotion: "Normal",
        text: "I can water them. The water arrives exactly when I finish thinking.",
      },
      {
        speaker: 12,
        emotion: "Joyous",
        text: "Look! The first little sprout is waving at us!",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Garden rule: sell some, share some, and save seeds for tomorrow.",
      },
      {
        speaker: 12,
        emotion: "Inspired",
        text: "Tomorrow will have flowers. That’s a lovely thing to promise.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-06",
    number: 6,
    chapter: 0,
    title: "A pair of capable paws",
    synopsis: "Persian accepts the keys to the stall.",
    requirement: {
      kind: "hire",
      id: "tails",
    },
    cast: [52, 53, 79],
    lines: [
      {
        speaker: 52,
        emotion: "Worried",
        text: "I can’t count coins and turn the grill and chase the menu down the street!",
      },
      {
        speaker: 53,
        emotion: "Happy",
        text: "Give me the keys. Give Slowpoke the menu. Give yourself a breath.",
      },
      {
        speaker: 79,
        emotion: "Determined",
        text: "I shall chase it. Eventually.",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "You’d really manage the stand for me?",
      },
      {
        speaker: 53,
        emotion: "Determined",
        text: "For us. A team is how small paws do big things.",
      },
      {
        speaker: 52,
        emotion: "Joyous",
        text: "Then you’re hired! And the grill never needs to wait for me again!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-07",
    number: 7,
    chapter: 0,
    title: "A recipe with a twist",
    synopsis: "Victreebel’s smoothie secret is patience.",
    requirement: {
      kind: "own",
      id: "berries",
      quantity: 1,
    },
    cast: [52, 71, 25],
    lines: [
      {
        speaker: 71,
        emotion: "Normal",
        text: "Please don’t bump my pitcher. The berries are still settling.",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "You’re the blender?!",
      },
      {
        speaker: 71,
        emotion: "Normal",
        text: "A careful blender. But taste this.",
      },
      {
        speaker: 25,
        emotion: "Joyous",
        text: "Pikaaa! Sweet, sour, then a little zing!",
      },
      {
        speaker: 52,
        emotion: "Inspired",
        text: "We’ll call it the Coinleaf Sunrise. Every customer gets a sip of morning.",
      },
      {
        speaker: 71,
        emotion: "Normal",
        text: "Then I’ll save the very best berries for cloudy days.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-08",
    number: 8,
    chapter: 0,
    title: "The coin points north",
    synopsis: "A berry-stained compass begins to stir.",
    requirement: {
      kind: "cycles",
      id: "berries",
      amount: 1,
    },
    cast: [52, 71, 53],
    lines: [
      {
        speaker: 71,
        emotion: "Normal",
        text: "Your lucky coin is humming next to the berry jar.",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "The compass mark moved! North… toward the old lighthouse?",
      },
      {
        speaker: 53,
        emotion: "Worried",
        text: "That tower has been dark since the Starwind routes disappeared.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Then we’ll light it someday. After we can afford more than one ladder.",
      },
      {
        speaker: 71,
        emotion: "Normal",
        text: "I’ll pack a smoothie for the climb. Two, if it’s a very tall ladder.",
      },
      {
        speaker: 53,
        emotion: "Inspired",
        text: "Good neighbors first. Great adventures after.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-09",
    number: 9,
    chapter: 0,
    title: "Splash into business",
    synopsis: "Magikarp has enthusiasm, an Old Rod, and one small difficulty.",
    requirement: {
      kind: "own",
      id: "fishing",
      quantity: 1,
    },
    cast: [52, 129, 79],
    lines: [
      {
        speaker: 129,
        emotion: "Determined",
        text: "Welcome to my fishing shack! I have practiced my grand entrance!",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "You just splashed me with the entire pond!",
      },
      {
        speaker: 129,
        emotion: "Worried",
        text: "Too grand?",
      },
      {
        speaker: 79,
        emotion: "Happy",
        text: "The garden needed water. Very efficient.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "We’ll rent rods and teach catch-and-release. No customer leaves without a story.",
      },
      {
        speaker: 129,
        emotion: "Joyous",
        text: "I can do stories! Especially the one about the very impressive splash!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-10",
    number: 10,
    chapter: 0,
    title: "A song and a stranger",
    synopsis: "Jigglypuff’s opening-night song attracts a glittering visitor.",
    requirement: {
      kind: "own",
      id: "cafe",
      quantity: 1,
    },
    cast: [52, 39, 35],
    lines: [
      {
        speaker: 39,
        emotion: "Inspired",
        text: "A café needs something warm in the oven and something warm in the heart.",
      },
      {
        speaker: 52,
        emotion: "Worried",
        text: "And customers who stay awake long enough to pay.",
      },
      {
        speaker: 39,
        emotion: "Angry",
        text: "That only happened twice! …This morning.",
      },
      {
        speaker: 35,
        emotion: "Happy",
        text: "Lovely song. Lovelier coin on that counter. Mind if I take a peek?",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Paws off the lucky charm, gem-eyes! Who are you?",
      },
      {
        speaker: 35,
        emotion: "Inspired",
        text: "Clefairy. Treasure finder. And you, little shopkeeper, found my next adventure.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-11",
    number: 11,
    chapter: 1,
    title: "The butterfly post",
    synopsis: "The garden becomes Coinleaf’s first message board.",
    requirement: {
      kind: "hire",
      id: "garden",
    },
    cast: [52, 12, 35],
    lines: [
      {
        speaker: 12,
        emotion: "Happy",
        text: "I can watch the garden and carry messages between shops. Wings are handy!",
      },
      {
        speaker: 35,
        emotion: "Normal",
        text: "Can you carry one that says: please return my ancient treasure?",
      },
      {
        speaker: 52,
        emotion: "Angry",
        text: "It’s not yours just because it’s shiny!",
      },
      {
        speaker: 12,
        emotion: "Determined",
        text: "Our notice board needs requests, not arguments. Write what you actually need.",
      },
      {
        speaker: 35,
        emotion: "Worried",
        text: "…I need to find the Starwind path. Someone is waiting at the other end.",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "Someone? That’s a very different kind of treasure.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-12",
    number: 12,
    chapter: 1,
    title: "The patient specialist",
    synopsis: "Victreebel joins the team and notices a useful pattern.",
    requirement: {
      kind: "hire",
      id: "berries",
    },
    cast: [52, 71, 35],
    lines: [
      {
        speaker: 71,
        emotion: "Normal",
        text: "I’ve made a schedule. Berries in, smoothies out, every three seconds.",
      },
      {
        speaker: 52,
        emotion: "Joyous",
        text: "That’s my kind of poetry!",
      },
      {
        speaker: 35,
        emotion: "Worried",
        text: "The coin only glows when somebody helps somebody else. I tested it.",
      },
      {
        speaker: 71,
        emotion: "Normal",
        text: "Did you test it by helping?",
      },
      {
        speaker: 35,
        emotion: "Surprised",
        text: "…I polished it. Does that count?",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Good news, Clefairy. We’ve got plenty of ways to try again.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-13",
    number: 13,
    chapter: 1,
    title: "A captain at the pond",
    synopsis: "Magikarp finds a job that suits an excellent splash.",
    requirement: {
      kind: "hire",
      id: "fishing",
    },
    cast: [52, 129, 25],
    lines: [
      {
        speaker: 129,
        emotion: "Worried",
        text: "I can’t hold a rod with fins. Maybe I’m the wrong Pokémon for this.",
      },
      {
        speaker: 25,
        emotion: "Happy",
        text: "But you know every safe spot in the pond!",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "You’re our guide. Beginners get your advice, and the fish get their pond back.",
      },
      {
        speaker: 129,
        emotion: "Surprised",
        text: "I can be the captain? Even without a boat?",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Especially without a boat. Yours keeps becoming a bucket.",
      },
      {
        speaker: 129,
        emotion: "Inspired",
        text: "Captain Magikarp reporting! First lesson: Splash is always an option!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-14",
    number: 14,
    chapter: 1,
    title: "Please applaud quietly",
    synopsis: "Jigglypuff discovers the perfect shift for a lullaby singer.",
    requirement: {
      kind: "hire",
      id: "cafe",
    },
    cast: [52, 39, 143],
    lines: [
      {
        speaker: 39,
        emotion: "Sad",
        text: "Everyone naps through my best note. Maybe they don’t like my singing.",
      },
      {
        speaker: 143,
        emotion: "Happy",
        text: "Mmm. Best note. Best nap. Five stars.",
      },
      {
        speaker: 52,
        emotion: "Inspired",
        text: "A morning café and an evening lullaby corner! Two menus, one wonderful voice.",
      },
      {
        speaker: 39,
        emotion: "Surprised",
        text: "You mean… falling asleep can be the compliment?",
      },
      {
        speaker: 143,
        emotion: "Normal",
        text: "I would applaud. But my paws are asleep too.",
      },
      {
        speaker: 39,
        emotion: "Joyous",
        text: "Then tonight’s special is a cookie and a very gentle encore!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-15",
    number: 15,
    chapter: 1,
    title: "Games in the shadows",
    synopsis: "Gengar reopens a dusty arcade with a fair-play promise.",
    requirement: {
      kind: "own",
      id: "rocket",
      quantity: 1,
    },
    cast: [52, 94, 35],
    lines: [
      {
        speaker: 94,
        emotion: "Happy",
        text: "Boo! Welcome to the Game Corner! No jump scares before breakfast.",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "What about that one?!",
      },
      {
        speaker: 94,
        emotion: "Normal",
        text: "That was the welcome scare. Completely different.",
      },
      {
        speaker: 35,
        emotion: "Happy",
        text: "I found a claw machine. It found my claws. We have a disagreement.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Games of skill, fair prizes, and no sneaky coin traps. Deal?",
      },
      {
        speaker: 94,
        emotion: "Happy",
        text: "Deal! The biggest prize will be having someone to play with.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-16",
    number: 16,
    chapter: 1,
    title: "An honest ghost",
    synopsis: "The arcade’s new manager has a confession.",
    requirement: {
      kind: "hire",
      id: "rocket",
    },
    cast: [52, 94, 25],
    lines: [
      {
        speaker: 25,
        emotion: "Worried",
        text: "The prize cabinet is empty! Did a ghost take everything?",
      },
      {
        speaker: 94,
        emotion: "Sad",
        text: "One did. Me. I thought nobody would come, so I hid the prizes for safekeeping.",
      },
      {
        speaker: 52,
        emotion: "Normal",
        text: "You don’t have to hide good things to keep them safe.",
      },
      {
        speaker: 94,
        emotion: "Surprised",
        text: "You’re still giving me the keys?",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Put the prizes back and show us we can trust you. Starting now.",
      },
      {
        speaker: 94,
        emotion: "Happy",
        text: "Then the first game is on me. No tricks. Well… card tricks, if you ask!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-17",
    number: 17,
    chapter: 1,
    title: "A spark for the square",
    synopsis: "Electabuzz powers the first lanterns.",
    requirement: {
      kind: "own",
      id: "power",
      quantity: 1,
    },
    cast: [52, 125, 25],
    lines: [
      {
        speaker: 125,
        emotion: "Worried",
        text: "My antennae keep making sparks. I was told to stay away from the market.",
      },
      {
        speaker: 25,
        emotion: "Determined",
        text: "Sparks can help! We just need a proper connection.",
      },
      {
        speaker: 52,
        emotion: "Inspired",
        text: "A power station! No more packing up when the sun goes down!",
      },
      {
        speaker: 125,
        emotion: "Surprised",
        text: "You want my electricity?",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "And your company. Coinleaf has room for every kind of bright idea.",
      },
      {
        speaker: 125,
        emotion: "Joyous",
        text: "Look at the lanterns! They look like little stars that stayed for dinner!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-18",
    number: 18,
    chapter: 1,
    title: "The rhythm of thunder",
    synopsis: "Electabuzz learns that power also means knowing when to rest.",
    requirement: {
      kind: "hire",
      id: "power",
    },
    cast: [52, 125, 53],
    lines: [
      {
        speaker: 125,
        emotion: "Determined",
        text: "I can keep every light on forever! Watch!",
      },
      {
        speaker: 53,
        emotion: "Worried",
        text: "Your wool is drooping. A manager needs breaks too.",
      },
      {
        speaker: 52,
        emotion: "Normal",
        text: "We’ll store extra power in Cell Batteries. Even stars get daylight off.",
      },
      {
        speaker: 125,
        emotion: "Happy",
        text: "Then I can sit with everyone when Jigglypuff sings?",
      },
      {
        speaker: 53,
        emotion: "Happy",
        text: "That is what the lights are for.",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "Hey… the lucky coin is glowing again. Brighter than before!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-19",
    number: 19,
    chapter: 1,
    title: "A spoonful of foresight",
    synopsis: "Alakazam studies the strange compass.",
    requirement: {
      kind: "own",
      id: "silph",
      quantity: 1,
    },
    cast: [52, 65, 35],
    lines: [
      {
        speaker: 65,
        emotion: "Normal",
        text: "Your portfolio is promising. Your handwriting is a small natural disaster.",
      },
      {
        speaker: 52,
        emotion: "Worried",
        text: "Those aren’t scratches. They’re… enthusiastic numbers.",
      },
      {
        speaker: 35,
        emotion: "Determined",
        text: "Forget the numbers. Can you read this coin?",
      },
      {
        speaker: 65,
        emotion: "Surprised",
        text: "A Starwind seal. It responds to bonds between Pokémon. Not wealth alone.",
      },
      {
        speaker: 52,
        emotion: "Normal",
        text: "So there’s no giant treasure chest?",
      },
      {
        speaker: 65,
        emotion: "Happy",
        text: "There might be something considerably more valuable. Try to stay interested.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-20",
    number: 20,
    chapter: 1,
    title: "A promise in the ledger",
    synopsis: "The team agrees what Coinleaf’s profits are for.",
    requirement: {
      kind: "hire",
      id: "silph",
    },
    cast: [52, 65, 53],
    lines: [
      {
        speaker: 65,
        emotion: "Determined",
        text: "I can manage investments. But the town needs a reserve for difficult days.",
      },
      {
        speaker: 52,
        emotion: "Worried",
        text: "A whole pile of coins we don’t immediately turn into more shops?",
      },
      {
        speaker: 53,
        emotion: "Normal",
        text: "A safe roof, a warm meal, a light on the road. Those are investments too.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "All right. Put a pawprint beside the reserve fund. A big one.",
      },
      {
        speaker: 65,
        emotion: "Happy",
        text: "Done. And perhaps a smaller pawprint beside the snack budget?",
      },
      {
        speaker: 52,
        emotion: "Joyous",
        text: "The team deserves snacks! That’s sound financial meow-nagement!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-21",
    number: 21,
    chapter: 2,
    title: "A picnic, far horizons",
    synopsis: "Kangaskhan packs a lunch and hears about a missing friend.",
    requirement: {
      kind: "own",
      id: "dairy",
      quantity: 1,
    },
    cast: [52, 115, 35],
    lines: [
      {
        speaker: 115,
        emotion: "Happy",
        text: "Picnic delivery! Fresh buns, berries, and enough lunch for every hungry neighbor.",
      },
      {
        speaker: 52,
        emotion: "Joyous",
        text: "The cafés will love this! And the cookies! And me!",
      },
      {
        speaker: 35,
        emotion: "Sad",
        text: "My friend always packed an extra lunch. We got separated when the sky routes closed.",
      },
      {
        speaker: 115,
        emotion: "Worried",
        text: "How long have they been missing?",
      },
      {
        speaker: 35,
        emotion: "Normal",
        text: "Since the last full moon. We used to watch the stars together. I promised I would find them.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Then we’ll find a route. And keep a mug warm until you do.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-22",
    number: 22,
    chapter: 2,
    title: "Room at the table",
    synopsis: "Kangaskhan makes the rival feel like a neighbor.",
    requirement: {
      kind: "hire",
      id: "dairy",
    },
    cast: [52, 115, 35],
    lines: [
      {
        speaker: 115,
        emotion: "Determined",
        text: "I’ll run the kitchen, and nobody skips breakfast on my watch.",
      },
      {
        speaker: 35,
        emotion: "Worried",
        text: "Even treasure thieves? Hypothetical treasure thieves.",
      },
      {
        speaker: 115,
        emotion: "Happy",
        text: "Especially Pokémon who are hungry enough to make poor decisions. Sit.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "You can pay by carrying crates instead of carrying off coins.",
      },
      {
        speaker: 35,
        emotion: "Surprised",
        text: "I can stay?",
      },
      {
        speaker: 115,
        emotion: "Joyous",
        text: "There’s always room for another cup at this table.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-23",
    number: 23,
    chapter: 2,
    title: "An impossible order",
    synopsis: "Machamp considers a curious request at the factory.",
    requirement: {
      kind: "own",
      id: "balls",
      quantity: 1,
    },
    cast: [52, 68, 25],
    lines: [
      {
        speaker: 68,
        emotion: "Normal",
        text: "Master Ball workshop ready! Four steady hands, every seam checked. What should we build first?",
      },
      {
        speaker: 25,
        emotion: "Worried",
        text: "Can you make something that catches a falling friend without trapping them?",
      },
      {
        speaker: 52,
        emotion: "Inspired",
        text: "A rescue capsule! Safe travel, with a latch you open from inside.",
      },
      {
        speaker: 68,
        emotion: "Normal",
        text: "A rescue capsule? That is a very good use for a strong pair of hands. Or two pairs!",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "The sky routes are dangerous. Let’s make sure every passenger has a way home.",
      },
      {
        speaker: 68,
        emotion: "Normal",
        text: "Then this workshop has found its purpose. Let’s make safe journeys for everyone.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-24",
    number: 24,
    chapter: 2,
    title: "Four hands and a kind heart",
    synopsis: "Machamp discovers why the smallest part matters.",
    requirement: {
      kind: "hire",
      id: "balls",
    },
    cast: [52, 68, 35],
    lines: [
      {
        speaker: 68,
        emotion: "Normal",
        text: "A capsule passed every strength test. Clefairy still looked worried.",
      },
      {
        speaker: 35,
        emotion: "Determined",
        text: "The inside is dark. A scared little Pokémon needs a window.",
      },
      {
        speaker: 52,
        emotion: "Normal",
        text: "A window! And a blanket. Small comforts make a big difference when you’re far from home.",
      },
      {
        speaker: 68,
        emotion: "Normal",
        text: "Then I’ll add a window and pad every seat. All four hands on deck!",
      },
      {
        speaker: 35,
        emotion: "Happy",
        text: "Now that’s a treasure worth making.",
      },
      {
        speaker: 68,
        emotion: "Normal",
        text: "I’ll look after the factory. Every traveler deserves a safe arrival.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-25",
    number: 25,
    chapter: 2,
    title: "Choose your own tomorrow",
    synopsis: "Eevee’s boutique celebrates every possible path.",
    requirement: {
      kind: "own",
      id: "evolution",
      quantity: 1,
    },
    cast: [52, 133, 35],
    lines: [
      {
        speaker: 133,
        emotion: "Worried",
        text: "Everyone asks which evolution I’ll choose. I’m not ready to decide.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Then don’t! Sell the stones, try the scarves, and take your time.",
      },
      {
        speaker: 35,
        emotion: "Normal",
        text: "Do you have a scarf with a pocket? A pocket for a little moon pebble?",
      },
      {
        speaker: 133,
        emotion: "Inspired",
        text: "I can sew one. For when your friend comes back.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Boutique rule: your future belongs to you.",
      },
      {
        speaker: 133,
        emotion: "Joyous",
        text: "Then my future today is a shop with friends in it!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-26",
    number: 26,
    chapter: 2,
    title: "The scarf with a pocket",
    synopsis: "Eevee gives Clefairy something to keep.",
    requirement: {
      kind: "hire",
      id: "evolution",
    },
    cast: [52, 133, 35],
    lines: [
      {
        speaker: 133,
        emotion: "Happy",
        text: "I finished the scarf. See the little star sewn by the pocket?",
      },
      {
        speaker: 35,
        emotion: "Surprised",
        text: "It’s beautiful. I… don’t have enough coins to pay.",
      },
      {
        speaker: 133,
        emotion: "Normal",
        text: "You helped carry the bolts of cloth. We’re even.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Aha! Honest work produces treasure. Write that one down.",
      },
      {
        speaker: 35,
        emotion: "Sad",
        text: "I wish I’d learned it before I went searching alone.",
      },
      {
        speaker: 133,
        emotion: "Determined",
        text: "You’re searching with us now. Keep the pocket ready.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-27",
    number: 27,
    chapter: 2,
    title: "A song across the water",
    synopsis: "Lapras knows a route beyond the horizon.",
    requirement: {
      kind: "own",
      id: "cruise",
      quantity: 1,
    },
    cast: [52, 131, 35],
    lines: [
      {
        speaker: 131,
        emotion: "Normal",
        text: "The tide remembers every traveler. Even the ones who forget the way back.",
      },
      {
        speaker: 35,
        emotion: "Worried",
        text: "Have you seen a little light drifting toward the sky?",
      },
      {
        speaker: 131,
        emotion: "Surprised",
        text: "I have. Past the reef, where the old lighthouse used to sing.",
      },
      {
        speaker: 52,
        emotion: "Inspired",
        text: "We have a harbor, a captain, and a clue!",
      },
      {
        speaker: 131,
        emotion: "Determined",
        text: "First, we learn the safe channels. The sea is a friend best treated with respect.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Then the grand cruise begins with a very sensible life jacket!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-28",
    number: 28,
    chapter: 2,
    title: "A captain’s weather eye",
    synopsis: "Lapras hears something troubling in the tide.",
    requirement: {
      kind: "hire",
      id: "cruise",
    },
    cast: [52, 131, 53],
    lines: [
      {
        speaker: 131,
        emotion: "Worried",
        text: "The currents are pulling the wrong way. A storm is turning over the valley.",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "But the sky looks clear!",
      },
      {
        speaker: 53,
        emotion: "Determined",
        text: "Then we prepare while it is clear. That is why we built a reserve.",
      },
      {
        speaker: 131,
        emotion: "Happy",
        text: "I’ll manage the harbor and keep the ferry routes open as long as it’s safe.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Nobody takes a cruise into trouble. Our first destination is home.",
      },
      {
        speaker: 131,
        emotion: "Normal",
        text: "A good captain always knows that destination.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-29",
    number: 29,
    chapter: 2,
    title: "Special delivery: courage",
    synopsis: "Dragonite arrives with a wind-torn letter.",
    requirement: {
      kind: "own",
      id: "courier",
      quantity: 1,
    },
    cast: [52, 149, 35],
    lines: [
      {
        speaker: 149,
        emotion: "Worried",
        text: "Delivery for Coinleaf! Sorry about the corners. The wind tried to sign it.",
      },
      {
        speaker: 35,
        emotion: "Surprised",
        text: "That star mark! It’s the same as my friend’s little glow!",
      },
      {
        speaker: 149,
        emotion: "Normal",
        text: "The letter says the Starwind beacon is fading. Travelers can’t find the route.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Then our town will send more than letters. We’ll send help.",
      },
      {
        speaker: 149,
        emotion: "Happy",
        text: "Point me toward a parcel. I’ve got wings and room for one more promise.",
      },
      {
        speaker: 35,
        emotion: "Inspired",
        text: "Keep flying, little light. We’re coming.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-30",
    number: 30,
    chapter: 2,
    title: "The first rescue route",
    synopsis: "The team maps a way through the gathering clouds.",
    requirement: {
      kind: "hire",
      id: "courier",
    },
    cast: [52, 149, 65],
    lines: [
      {
        speaker: 65,
        emotion: "Worried",
        text: "Roads may flood. Wings cannot reach everyone. We need ground and water routes too.",
      },
      {
        speaker: 149,
        emotion: "Determined",
        text: "I’ll carry the maps between teams. No one works without a route back.",
      },
      {
        speaker: 52,
        emotion: "Normal",
        text: "Pack the lunches. Charge the batteries. Tell Gengar the arcade is our gathering point.",
      },
      {
        speaker: 149,
        emotion: "Surprised",
        text: "You had all that ready?",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Persian said no Pokémon gets left behind. I finally understand how big that promise is.",
      },
      {
        speaker: 65,
        emotion: "Determined",
        text: "Then let us become big enough to keep it.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-31",
    number: 31,
    chapter: 3,
    title: "A light in the rain",
    synopsis: "Chansey opens a clinic as the first drops fall.",
    requirement: {
      kind: "own",
      id: "clinic",
      quantity: 1,
    },
    cast: [52, 113, 25],
    lines: [
      {
        speaker: 25,
        emotion: "Worried",
        text: "The little ones are scared of the thunder. One scraped a paw running here.",
      },
      {
        speaker: 113,
        emotion: "Determined",
        text: "Clean bandages, warm towels, and a friendly face. We have all three.",
      },
      {
        speaker: 52,
        emotion: "Worried",
        text: "What if we run out?",
      },
      {
        speaker: 113,
        emotion: "Happy",
        text: "Then we ask for help. Caring for others doesn’t mean carrying everything alone.",
      },
      {
        speaker: 25,
        emotion: "Inspired",
        text: "I’ll bring batteries from Electabuzz!",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "And I’ll make sure this clinic’s sign stays lit all night.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-32",
    number: 32,
    chapter: 3,
    title: "The bravest small voice",
    synopsis: "Chansey helps Meowth face a fear that Pay Day cannot fix.",
    requirement: {
      kind: "hire",
      id: "clinic",
    },
    cast: [52, 113, 79],
    lines: [
      {
        speaker: 52,
        emotion: "Sad",
        text: "I built an empire, but I can’t tell the storm to stop.",
      },
      {
        speaker: 113,
        emotion: "Normal",
        text: "You don’t have to. You can tell a frightened neighbor where to find shelter.",
      },
      {
        speaker: 79,
        emotion: "Happy",
        text: "That helped me. I was frightened since… a little before I noticed.",
      },
      {
        speaker: 52,
        emotion: "Worried",
        text: "Are you sure little things are enough?",
      },
      {
        speaker: 113,
        emotion: "Determined",
        text: "A bandage is little. A hand to hold is little. Together, they are how we get through.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Then you run the clinic. I’ll go hold a paw.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-33",
    number: 33,
    chapter: 3,
    title: "A hundred familiar faces",
    synopsis: "Ditto makes the daycare feel like home.",
    requirement: {
      kind: "own",
      id: "daycare",
      quantity: 1,
    },
    cast: [52, 132, 39],
    lines: [
      {
        speaker: 132,
        emotion: "Happy",
        text: "I can be a cushion! Or a ball! Or a slightly wobbly Meowth!",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "My ears do not wobble like that! Usually!",
      },
      {
        speaker: 39,
        emotion: "Worried",
        text: "The children miss their families. Games help, but they keep watching the door.",
      },
      {
        speaker: 132,
        emotion: "Determined",
        text: "Then I’ll sit by the door with them. I can just be Ditto.",
      },
      {
        speaker: 52,
        emotion: "Normal",
        text: "Being yourself sounds like the perfect job here.",
      },
      {
        speaker: 132,
        emotion: "Joyous",
        text: "Good! Wobbly Meowth was a lot of work!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-34",
    number: 34,
    chapter: 3,
    title: "The song everybody knows",
    synopsis: "The daycare turns thunder into a chorus.",
    requirement: {
      kind: "hire",
      id: "daycare",
    },
    cast: [52, 132, 39],
    lines: [
      {
        speaker: 39,
        emotion: "Worried",
        text: "My lullaby won’t reach over that thunder.",
      },
      {
        speaker: 132,
        emotion: "Inspired",
        text: "Then we sing together. A hundred little voices make a big one!",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "I know a song about shiny coins. It has… a lot of meows.",
      },
      {
        speaker: 39,
        emotion: "Happy",
        text: "Tonight we’ll sing about finding the way home. You can put one meow in.",
      },
      {
        speaker: 132,
        emotion: "Surprised",
        text: "Listen! They aren’t afraid of the door rattling anymore.",
      },
      {
        speaker: 52,
        emotion: "Joyous",
        text: "Best sound in the world. Even better than ting.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-35",
    number: 35,
    chapter: 3,
    title: "The biggest welcome mat",
    synopsis: "Snorlax offers shelter, with one structural problem.",
    requirement: {
      kind: "own",
      id: "resort",
      quantity: 1,
    },
    cast: [52, 143, 115],
    lines: [
      {
        speaker: 143,
        emotion: "Happy",
        text: "Plenty of beds. Plenty of snacks. Come in.",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "We would, but you’re asleep in the doorway!",
      },
      {
        speaker: 115,
        emotion: "Determined",
        text: "Breakfast delivery. Emergency portions.",
      },
      {
        speaker: 143,
        emotion: "Surprised",
        text: "Breakfast? Ah. Doorway cleared.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "We’re turning the resort into a shelter until the storm passes.",
      },
      {
        speaker: 143,
        emotion: "Normal",
        text: "Of course. A soft bed is better when everyone has one.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-36",
    number: 36,
    chapter: 3,
    title: "Nobody sleeps outside",
    synopsis: "Snorlax makes room for an unexpected guest.",
    requirement: {
      kind: "hire",
      id: "resort",
    },
    cast: [52, 143, 35],
    lines: [
      {
        speaker: 35,
        emotion: "Worried",
        text: "I can keep watch outside. I don’t really belong to your team.",
      },
      {
        speaker: 143,
        emotion: "Normal",
        text: "You carried crates. You read the maps. You worried about everyone.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "That sounds suspiciously like belonging to me.",
      },
      {
        speaker: 35,
        emotion: "Sad",
        text: "I tried to steal your coin.",
      },
      {
        speaker: 143,
        emotion: "Happy",
        text: "And then you helped. Rest now. You can keep helping tomorrow.",
      },
      {
        speaker: 35,
        emotion: "Happy",
        text: "…Could I have the bed by the window? I’m still watching for a little light.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-37",
    number: 37,
    chapter: 3,
    title: "A mountain that moves",
    synopsis: "Rhydon clears the blocked road carefully.",
    requirement: {
      kind: "own",
      id: "quarry",
      quantity: 1,
    },
    cast: [52, 112, 149],
    lines: [
      {
        speaker: 149,
        emotion: "Worried",
        text: "The valley road is buried. Some Pokémon are waiting on the other side.",
      },
      {
        speaker: 112,
        emotion: "Determined",
        text: "I can move mountains. But I don’t want to frighten anyone.",
      },
      {
        speaker: 52,
        emotion: "Normal",
        text: "Then we’ll tell them who’s coming. A friend with very big paws.",
      },
      {
        speaker: 112,
        emotion: "Worried",
        text: "They won’t run?",
      },
      {
        speaker: 149,
        emotion: "Happy",
        text: "They’ll cheer. I’m delivering the message right now.",
      },
      {
        speaker: 112,
        emotion: "Inspired",
        text: "Then one careful stone at a time. Let’s open their way home.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-38",
    number: 38,
    chapter: 3,
    title: "The gem we couldn’t sell",
    synopsis: "The quarry uncovers the beacon’s missing heart.",
    requirement: {
      kind: "hire",
      id: "quarry",
    },
    cast: [52, 112, 35],
    lines: [
      {
        speaker: 112,
        emotion: "Surprised",
        text: "There’s a crystal inside this old stone. It’s shaped like your coin’s compass.",
      },
      {
        speaker: 35,
        emotion: "Inspired",
        text: "The beacon heart! That would fetch a hundred carts of gems!",
      },
      {
        speaker: 52,
        emotion: "Worried",
        text: "Clefairy…",
      },
      {
        speaker: 35,
        emotion: "Determined",
        text: "I know. We’re not selling it. Someone needs its light more than I need its shine.",
      },
      {
        speaker: 112,
        emotion: "Happy",
        text: "I’ll run the quarry and cut a proper mount. No cracks in this promise.",
      },
      {
        speaker: 52,
        emotion: "Joyous",
        text: "Now that’s a treasure finder worth having on the team!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-39",
    number: 39,
    chapter: 3,
    title: "The last dark tower",
    synopsis: "Raichu waits beside the unlit lighthouse.",
    requirement: {
      kind: "own",
      id: "lighthouse",
      quantity: 1,
    },
    cast: [52, 26, 35],
    lines: [
      {
        speaker: 26,
        emotion: "Sad",
        text: "I’ve shone every night. My light never reaches the Starwind path anymore.",
      },
      {
        speaker: 35,
        emotion: "Determined",
        text: "Try it through this crystal. Please.",
      },
      {
        speaker: 26,
        emotion: "Surprised",
        text: "The beacon heart… You found it!",
      },
      {
        speaker: 52,
        emotion: "Inspired",
        text: "Our little garden, our careful quarry, our very stubborn friends. Everybody helped.",
      },
      {
        speaker: 26,
        emotion: "Worried",
        text: "Then I’ll need the town’s power. All of it, for one bright moment.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "We saved batteries for a cloudy day. This is the day.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-40",
    number: 40,
    chapter: 3,
    title: "A light that answers",
    synopsis: "Coinleaf’s lanterns become a single guiding star.",
    requirement: {
      kind: "hire",
      id: "lighthouse",
    },
    cast: [52, 26, 125],
    lines: [
      {
        speaker: 125,
        emotion: "Determined",
        text: "Batteries connected! From every shop in the square!",
      },
      {
        speaker: 26,
        emotion: "Inspired",
        text: "Then shine with me, Coinleaf. Not for coins. For everyone still finding the way.",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "The clouds… they’re opening!",
      },
      {
        speaker: 125,
        emotion: "Joyous",
        text: "There’s a trail of stars up there! A whole road!",
      },
      {
        speaker: 26,
        emotion: "Happy",
        text: "The Starwind path is answering. But a guide must open the far end.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Then we’ll take our promise all the way to the sky.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-41",
    number: 41,
    chapter: 4,
    title: "A route made of numbers",
    synopsis: "Porygon translates the beacon’s strange signal.",
    requirement: {
      kind: "own",
      id: "tech",
      quantity: 1,
    },
    cast: [52, 137, 65],
    lines: [
      {
        speaker: 137,
        emotion: "Normal",
        text: "Signal received. Pattern resembles a greeting. And thirteen thousand wind directions.",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "Can it resemble a map instead?",
      },
      {
        speaker: 65,
        emotion: "Determined",
        text: "We will solve it together. Your calculation, my foresight, Meowth’s… enthusiasm.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Very advanced enthusiasm!",
      },
      {
        speaker: 137,
        emotion: "Inspired",
        text: "Route assembled. Warning: path changes when travelers lose trust in one another.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Then nobody goes alone. That’s the one direction we already know.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-42",
    number: 42,
    chapter: 4,
    title: "The variable called friendship",
    synopsis: "Porygon finds something the map cannot measure.",
    requirement: {
      kind: "hire",
      id: "tech",
    },
    cast: [52, 137, 35],
    lines: [
      {
        speaker: 137,
        emotion: "Worried",
        text: "I have modeled every gust. I cannot model whether you will come back for a friend.",
      },
      {
        speaker: 35,
        emotion: "Normal",
        text: "Meowth came back for me before I was much of a friend.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Put that in your calculations.",
      },
      {
        speaker: 137,
        emotion: "Surprised",
        text: "A constant?",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "A promise. No Pokémon gets left behind.",
      },
      {
        speaker: 137,
        emotion: "Joyous",
        text: "Constant accepted. I believe this is what you call feeling ready.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-43",
    number: 43,
    chapter: 4,
    title: "The guardian of the upper wind",
    synopsis: "Dragonair appears above the new skyport.",
    requirement: {
      kind: "own",
      id: "dragonair-skyport",
      quantity: 1,
    },
    cast: [52, 148, 35],
    lines: [
      {
        speaker: 148,
        emotion: "Normal",
        text: "Who calls the old path with a small town’s lantern?",
      },
      {
        speaker: 52,
        emotion: "Worried",
        text: "Meowth. Shopkeeper. Occasional map holder. We’re looking for a lost friend.",
      },
      {
        speaker: 35,
        emotion: "Determined",
        text: "A little wandering light. They went into the clouds and never came back.",
      },
      {
        speaker: 148,
        emotion: "Surprised",
        text: "A Starwind traveler. They wait where the far beacon sleeps.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Then please show us the way. Our team can wake it.",
      },
      {
        speaker: 148,
        emotion: "Inspired",
        text: "You brought a town’s trust to my sky. That is a stronger offering than gold.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-44",
    number: 44,
    chapter: 4,
    title: "A ticket for everyone",
    synopsis: "Dragonair opens a route with an unusual condition.",
    requirement: {
      kind: "hire",
      id: "dragonair-skyport",
    },
    cast: [52, 148, 149],
    lines: [
      {
        speaker: 148,
        emotion: "Determined",
        text: "I will guard the route. Its first flight must carry more than a treasure seeker.",
      },
      {
        speaker: 149,
        emotion: "Happy",
        text: "Medicine, warm lunches, maps, blankets, and one very nervous Meowth. Ready!",
      },
      {
        speaker: 52,
        emotion: "Worried",
        text: "Could the nervous Meowth get a window seat near the floor?",
      },
      {
        speaker: 148,
        emotion: "Happy",
        text: "Even courage trembles. What matters is what it carries.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Then put every team’s name on the ticket. We made this together.",
      },
      {
        speaker: 149,
        emotion: "Joyous",
        text: "Destination: the other side of someday!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-45",
    number: 45,
    chapter: 4,
    title: "Twenty paws at the launchpad",
    synopsis: "Every manager sends something only they could give.",
    requirement: {
      kind: "managers",
      amount: 20,
    },
    cast: [52, 53, 133],
    lines: [
      {
        speaker: 53,
        emotion: "Inspired",
        text: "Twenty ventures. Twenty managers. One team. Look how far your first stand reached.",
      },
      {
        speaker: 133,
        emotion: "Happy",
        text: "The scarf is ready. Victreebel packed drinks. Gengar packed a very polite card trick.",
      },
      {
        speaker: 52,
        emotion: "Worried",
        text: "How do I thank everybody?",
      },
      {
        speaker: 53,
        emotion: "Normal",
        text: "Bring everyone home. Then have dinner with them.",
      },
      {
        speaker: 133,
        emotion: "Determined",
        text: "And remember: you don’t need to become someone else to do something brave.",
      },
      {
        speaker: 52,
        emotion: "Joyous",
        text: "Good. I’ve gotten pretty fond of being this Meowth.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-46",
    number: 46,
    chapter: 4,
    title: "Built to hold a promise",
    synopsis: "The team’s improvements become rescue equipment.",
    requirement: {
      kind: "upgrades",
      amount: 8,
    },
    cast: [52, 68, 137],
    lines: [
      {
        speaker: 68,
        emotion: "Normal",
        text: "Capsules fitted. Windows reinforced. Blankets secured.",
      },
      {
        speaker: 137,
        emotion: "Happy",
        text: "Navigation upgraded. Return route saved. Friendship constant remains stable.",
      },
      {
        speaker: 52,
        emotion: "Inspired",
        text: "Every upgrade we bought helped us get here. Even the cookie oven.",
      },
      {
        speaker: 68,
        emotion: "Normal",
        text: "Especially the cookie oven. Emergency morale supplies are important.",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Then let’s make a very well-equipped wish!",
      },
      {
        speaker: 137,
        emotion: "Inspired",
        text: "Launch when ready. The route is waiting for you.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-47",
    number: 47,
    chapter: 4,
    title: "The light in the pocket",
    synopsis: "The town finds Clefable waiting beside the far beacon.",
    requirement: {
      kind: "lifetime",
      amount: 5000000000000,
    },
    cast: [52, 35, 36],
    lines: [
      {
        speaker: 35,
        emotion: "Surprised",
        text: "There! By the far beacon! My friend’s moon pebble is glowing!",
      },
      {
        speaker: 36,
        emotion: "Worried",
        text: "Clefairy…? It’s me! I followed the moonlight into the clouds, but the way back went dark.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "Lucky coin, beacon heart, one town’s worth of wishes… Shine!",
      },
      {
        speaker: 35,
        emotion: "Joyous",
        text: "You’re safe! And your lucky pebble is still tucked in that little pocket!",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Not quite like before. This time you’ve both got a whole town to come home to.",
      },
      {
        speaker: 36,
        emotion: "Happy",
        text: "You brought a whole town’s wishes to find me. I think… my wish came true too.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-48",
    number: 48,
    chapter: 4,
    title: "A map to a new beginning",
    synopsis: "A letter from Johto opens a new horizon for Meowth’s team.",
    requirement: {
      kind: "cycles",
      id: "tails",
      amount: 10,
    },
    cast: [52, 53, 35],
    lines: [
      {
        speaker: 52,
        emotion: "Surprised",
        text: "A letter from Johto! They heard about Coinleaf and want us to open a market there!",
      },
      {
        speaker: 53,
        emotion: "Happy",
        text: "Then our little promise can travel. I’ll keep these shops running while you explore.",
      },
      {
        speaker: 35,
        emotion: "Inspired",
        text: "Clefable and I will tend the garden. You’ll always have a home to return to.",
      },
      {
        speaker: 52,
        emotion: "Worried",
        text: "A new region… Will the Pokémon there want to be part of our team?",
      },
      {
        speaker: 53,
        emotion: "Determined",
        text: "Listen to what they need. Every friendship starts with a small kindness.",
      },
      {
        speaker: 52,
        emotion: "Joyous",
        text: "Then let’s pack a map. Same paws. A whole new horizon!",
      },
    ],
    region: 1,
  },
  {
    id: "scene-49",
    number: 49,
    chapter: 4,
    title: "The familiar smell of lunch",
    synopsis: "Coinleaf gathers for one last meal before the ferry leaves.",
    requirement: {
      kind: "cycles",
      id: "tails",
      amount: 25,
    },
    cast: [79, 52, 25],
    lines: [
      {
        speaker: 79,
        emotion: "Happy",
        text: "Oh. You’re packing for a journey. I was still deciding what to order.",
      },
      {
        speaker: 52,
        emotion: "Surprised",
        text: "Slowpoke! You waited through the whole adventure?!",
      },
      {
        speaker: 79,
        emotion: "Normal",
        text: "I heard you made sure everyone came home. So I knew you would too.",
      },
      {
        speaker: 25,
        emotion: "Inspired",
        text: "The farewell lantern festival is tonight! Everybody’s bringing something!",
      },
      {
        speaker: 52,
        emotion: "Happy",
        text: "Then one last meal before the ferry is for the whole square.",
      },
      {
        speaker: 79,
        emotion: "Joyous",
        text: "Wonderful. I’ve had quite a while to decide what to order.",
      },
    ],
    region: 1,
  },
  {
    id: "scene-50",
    number: 50,
    chapter: 4,
    title: "An empire of belonging",
    synopsis:
      "Kanto celebrates its greatest treasure and sends Meowth toward Johto.",
    requirement: {
      kind: "lifetime",
      amount: 5000000000000,
    },
    cast: [52, 35, 53],
    lines: [
      {
        speaker: 52,
        emotion: "Inspired",
        text: "I used to dream about a mountain of coins. Look at all these lanterns instead.",
      },
      {
        speaker: 35,
        emotion: "Happy",
        text: "Clefable counted them. Then stayed up to watch every one sparkle.",
      },
      {
        speaker: 53,
        emotion: "Happy",
        text: "You kept your promise, Meowth. No Pokémon left behind. Your shops are in good paws.",
      },
      {
        speaker: 52,
        emotion: "Determined",
        text: "We kept it. Every wing, every fin, every paw in Kanto.",
      },
      {
        speaker: 35,
        emotion: "Joyous",
        text: "What will you build in Johto?",
      },
      {
        speaker: 52,
        emotion: "Joyous",
        text: "Something wonderful. A new market, new neighbors… and room for one more friend. Next stop, Johto! Meow!",
      },
    ],
    region: 1,
  },
];

export const CHAPTERS = [
  ...KANTO_CHAPTERS.map((c, i) => ({ ...c, region: 1, number: i + 1 })),
  ...REGIONAL_CHAPTERS,
];
export const CAST = { ...KANTO_CAST, ...REGIONAL_CAST };
export const SCENES = [
  ...KANTO_SCENES.map((s) => ({ ...s, regionNumber: s.number })),
  ...REGIONAL_SCENES,
];
export const scenesForRegion = (region) =>
  SCENES.filter((s) => s.region === region);
export const emptyStory = () => ({
  schema: 2,
  unlocked: [],
  seen: [],
  checkpoint: null,
  autoPlay: true,
});
const stateFor = (game, id) =>
  game.businesses[BUSINESSES.findIndex((b) => b.id === id)];
export function meetsRequirement(game, r) {
  const b = r.id ? stateFor(game, r.id) : null;
  const region = r.region ?? 1;
  switch (r.kind) {
    case "always":
      return true;
    case "clicks":
      return game.clicks >= r.amount;
    case "own":
      return b?.quantity >= r.quantity;
    case "hire":
      return b?.manager === true;
    case "cycles":
      return (b?.completedCycles ?? 0) >= r.amount;
    case "regional-owned":
      return (
        game.businesses.filter(
          (b, i) => BUSINESSES[i].region === region && b.quantity > 0,
        ).length >= r.amount
      );
    case "managers":
      return (
        game.businesses.filter(
          (b, i) => BUSINESSES[i].region === region && b.manager,
        ).length >= r.amount
      );
    case "upgrades":
      return (
        game.upgrades.filter((id) => {
          const business = BUSINESSES.find((b) => `${b.id}-2` === id);
          return !business || business.region === region;
        }).length >= r.amount
      );
    case "lifetime":
      return game.regionEarnings[region - 1] >= r.amount;
    default:
      return false;
  }
}
const shortMoney = (n) =>
  `₽${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n)}`;
export function requirementLabel(r) {
  const b = BUSINESSES.find((b) => b.id === r.id);
  const name = regionInfo(r.region ?? 1).name;
  switch (r.kind) {
    case "always":
      return "Arrive in the region";
    case "clicks":
      return "Use Pay Day once";
    case "own":
      return `Open ${b.name}`;
    case "hire":
      return `Hire ${b.manager}`;
    case "cycles":
      return `Complete ${r.amount} income cycle${r.amount === 1 ? "" : "s"} at ${b.name}`;
    case "regional-owned":
      return `Open ${r.amount} ${name} businesses`;
    case "managers":
      return `Hire ${r.region ? r.amount + " local" : "all " + r.amount} Pokémon managers`;
    case "upgrades":
      return `Purchase ${r.amount} upgrades`;
    case "lifetime":
      return `Earn ${shortMoney(r.amount)} in ${name}`;
    default:
      return "Continue your adventure";
  }
}

// Each region latches an independent prefix. Late-region arrivals never depend
// on watching old scenes, and income from earlier shops can unlock their milestones.
export function syncStory(game) {
  const story = game.story ?? emptyStory();
  const unlocked = new Set(story.unlocked);
  for (let region = 1; region <= game.unlockedRegion; region++) {
    for (const scene of scenesForRegion(region)) {
      if (unlocked.has(scene.id)) continue;
      if (!meetsRequirement(game, scene.requirement)) break;
      unlocked.add(scene.id);
    }
  }
  if (game.story && unlocked.size === story.unlocked.length) return game;
  return {
    ...game,
    story: {
      ...story,
      unlocked: SCENES.filter((s) => unlocked.has(s.id)).map((s) => s.id),
    },
  };
}

// Invalid story metadata is repaired separately; it must never erase an empire.
export function restoreStory(raw, unlockedRegion = 9) {
  const story = emptyStory();
  if (!raw || typeof raw !== "object") return story;
  const saved = new Set(Array.isArray(raw.unlocked) ? raw.unlocked : []);
  for (let region = 1; region <= unlockedRegion; region++) {
    for (const s of scenesForRegion(region)) {
      if (!saved.has(s.id)) break;
      story.unlocked.push(s.id);
    }
  }
  story.seen = [...new Set(Array.isArray(raw.seen) ? raw.seen : [])].filter(
    (id) => story.unlocked.includes(id),
  );
  // Enable the expanded world story once for legacy saves. New explicit
  // pause preferences remain respected after this migration.
  story.autoPlay = raw.schema === 2 ? raw.autoPlay !== false : true;
  const checkpoint = raw.checkpoint;
  const s = SCENES.find((s) => s.id === checkpoint?.sceneId);
  if (
    s &&
    story.unlocked.includes(s.id) &&
    Number.isInteger(checkpoint.lineIndex) &&
    checkpoint.lineIndex >= 0 &&
    checkpoint.lineIndex < s.lines.length
  )
    story.checkpoint = { sceneId: s.id, lineIndex: checkpoint.lineIndex };
  return story;
}
export function nextAutomaticScene(game, suppressed = []) {
  const omitted = new Set(suppressed);
  const checkpoint = SCENES.find(
    (s) => s.id === game.story.checkpoint?.sceneId,
  );
  if (
    checkpoint?.region === game.region &&
    game.story.unlocked.includes(checkpoint.id) &&
    !omitted.has(checkpoint.id)
  )
    return { id: checkpoint.id, lineIndex: game.story.checkpoint.lineIndex };
  const scene = scenesForRegion(game.region).find(
    (s) =>
      game.story.unlocked.includes(s.id) &&
      !game.story.seen.includes(s.id) &&
      !omitted.has(s.id),
  );
  return scene ? { id: scene.id, lineIndex: 0 } : null;
}
export function storyCheckpoint(game, sceneId, lineIndex) {
  const s = SCENES.find((s) => s.id === sceneId);
  if (
    !s ||
    !game.story.unlocked.includes(sceneId) ||
    !Number.isInteger(lineIndex) ||
    lineIndex < 0 ||
    lineIndex >= s.lines.length
  )
    return game;
  return {
    ...game,
    story: { ...game.story, checkpoint: { sceneId, lineIndex } },
  };
}
export function finishStory(game, sceneId) {
  if (!game.story.unlocked.includes(sceneId)) return game;
  return {
    ...game,
    story: {
      ...game.story,
      seen: [...new Set([...game.story.seen, sceneId])],
      checkpoint:
        game.story.checkpoint?.sceneId === sceneId
          ? null
          : game.story.checkpoint,
    },
  };
}
