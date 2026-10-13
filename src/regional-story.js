import { BUSINESSES } from "./catalog.js";
import { regionInfo } from "./regions.js";
import assets from "./regional-story-assets.json" with { type: "json" };
import { REGIONAL_STORY_EXPANSION } from "./regional-story-expansion.js";

// Original regional adventures. Every on-stage cast belongs to its generation.
// Six beats give each neighbor a voice; unavailable PMD expressions use Normal.
const moment = (title, cast, dialogue, synopsis) => ({
  title,
  cast,
  synopsis: synopsis ?? dialogue[0],
  lines: dialogue.map((text, i) => {
    const speaker = cast[i % cast.length];
    const wanted = [
      "Happy",
      "Normal",
      "Surprised",
      "Determined",
      "Happy",
      "Joyous",
    ][i];
    return {
      speaker,
      emotion: assets.portraits[speaker].emotions[wanted] ? wanted : "Normal",
      text,
    };
  }),
});

export const REGIONAL_ARCS = [
  {
    region: 2,
    chapters: [
      {
        title: "A bell waiting to ring",
        subtitle:
          "New roots, old traditions, and a festival without a bell rope.",
        location: "Bellroot Market",
      },
      {
        title: "A light for every traveler",
        subtitle: "Carry the market's promise into the lantern grove.",
        location: "Bellroot Lantern Grove",
      },
    ],
    scenes: [
      moment(
        "Welcome beneath the maples",
        [152, 155, 158],
        [
          "Welcome to Johto! Meowth sent a letter about our new market partner. I tucked it under my leaf for safekeeping.",
          "Bellroot's lantern festival is nearly here. Trouble is, our stalls have been quiet all season.",
          "And the bell rope snapped! I tried pulling it very carefully. With my teeth.",
          "Then we'll grow a market and fix a festival. One little seed at a time!",
          "I'll keep the cooking fires gentle. No singed invitations this year.",
          "I'll handle deliveries! And absolutely no more rope biting. Probably.",
        ],
      ),
      moment(
        "The leaf that started it",
        [152, 213, 155],
        [
          "Our first herb stall is open! These leaves smell like the morning after rain.",
          "A pinch of berry juice makes a lovely dressing. My shell has been steeping a batch all week.",
          "All week? My first soup took three minutes and one extremely nervous sneeze.",
          "Slow recipes deserve a place here too. Let's write the ingredients where everyone can read them.",
          "Then even a hurried traveler can choose something they like.",
          "First customer! I'll warm the bowl. You two keep me away from the paper menus.",
        ],
      ),
      moment(
        "Roots with a routine",
        [152, 180, 158],
        [
          "I've become the herb stall's manager! Water, harvest, greet, repeat. That's a rhythm I can remember.",
          "My wool makes a tiny spark when the next order arrives. Shall I make you an order bell?",
          "Yes! Then Chikorita can take a break without the whole market stopping.",
          "A manager doesn't have to do everything alone. Let's share the busy hours.",
          "One gentle spark, coming up. Not the sort that makes your leaf stand straight up.",
          "Ding! Delivery ready! Oh, that was me. I'm practicing.",
        ],
      ),
      moment(
        "A picnic with three doors",
        [241, 155, 158],
        [
          "Three shops! Milk, warm snacks, and cool drinks. That's a picnic waiting to happen.",
          "But everyone keeps joining my queue first. The soup will be gone before the drinks arrive.",
          "What if I carry little order tokens between stalls? No one has to queue three times.",
          "I'll put a picnic blanket by the path. Customers can settle in while we prepare their basket.",
          "Good thinking! I'll save a warm portion for the last Pokémon in line.",
          "Three doors, one welcome. And I get to splash the empty cups clean!",
        ],
      ),
      moment(
        "The missing festival thread",
        [214, 213, 152],
        [
          "Our fifth shop opened, and I found the old bell rope in its storeroom. The middle is all frayed.",
          "Berry juice won't mend it. I checked. It did make the rope deliciously purple.",
          "We need something strong enough to hold, but soft enough for little paws to pull.",
          "My horn can brace the knot while we braid new fibers. Nobody needs to lift the bell itself.",
          "I'll bring clean fibers from the market. Unseasoned ones this time.",
          "Meet us in the grove after closing. This festival belongs to everyone!",
        ],
      ),
      moment(
        "Three lantern keepers",
        [180, 181, 233],
        [
          "Three managers on duty! Now we can bring our lanterns to the grove without leaving the stalls unattended.",
          "I'll light the path with my tail. A steady glow, so even the shy travelers can find us.",
          "Route recorded. Reminder: an efficient path should include places to rest.",
          "Let's put lanterns at those resting spots. Nobody should hurry just to keep up.",
          "And a final light beside the repaired rope. That's where we'll gather.",
          "Festival schedule updated: first, arrive together. Second, enjoy being together.",
        ],
      ),
      moment(
        "A giant's careful knot",
        [248, 214, 152],
        [
          "I heard the eighth shop was ready. I brought a stone anchor for your bell rope. Is it too large?",
          "Only a little! If we set it beside the tower, the knot won't drag across the path.",
          "Everyone thought we needed the strongest pull. We really needed the steadiest support.",
          "Then I'll hold it steady. My claws can be gentle when the job needs them to be.",
          "There! A braid, a knot, and a place for every paw.",
          "Thank you, Tyranitar. Even the biggest neighbor can help with the smallest details.",
        ],
      ),
      moment(
        "The rhythm of the grove",
        [152, 241, 213],
        [
          "Five harvests already! The stall's rhythm has followed us all the way to the grove.",
          "My warm milk is ready just as your herbs arrive. Customers keep smiling at the timing.",
          "And my juice is finally steeped. A slow recipe can join a quick celebration after all.",
          "Let's leave a little between orders for listening. A good routine has room for a friend.",
          "Especially a friend who needs an extra cup and a quiet seat.",
          "I've saved both. The seat won't need to steep.",
        ],
      ),
      moment(
        "Ten stalls, one bell",
        [158, 214, 181],
        [
          "Our first ten stalls are open! The whole market sent someone to pull the rope.",
          "Little paws in front, big paws behind. We'll pull on three, together.",
          "I'll dim my tail so we can see every lantern answer the bell.",
          "One, two, three! Ding! Hey, the grove sounds happy!",
          "The rope held because everyone helped braid it. That's the part I want to remember.",
          "Then we'll tell that story at every festival. A light shared never gets smaller.",
        ],
      ),
      moment(
        "A lantern for the sea",
        [152, 155, 233],
        [
          "The market has reached its travel goal. I made a little lantern for the journey to Hoenn.",
          "No flame inside! A warm-colored stone is safer for a boat. I learned that after the paper-menu incident.",
          "Destination plotted: Hoenn. Bellroot managers will continue the market routine.",
          "Take our welcome with you. Plant it wherever a new neighbor needs a place.",
          "And come back for the next festival. I'll have a soup that tastes like autumn.",
          "Farewell route ready. Friendship route: always open.",
        ],
      ),
    ],
  },
  {
    region: 3,
    chapters: [
      {
        title: "Orders on the ocean breeze",
        subtitle: "A coastal market learns to work with the tide.",
        location: "Skycurrent Market",
      },
      {
        title: "The parcel above the clouds",
        subtitle: "A weather lantern guides an unlikely delivery team.",
        location: "Skycurrent Launch Quay",
      },
    ],
    scenes: [
      moment(
        "A welcome washed ashore",
        [252, 255, 258],
        [
          "Hoenn, at last! The Johto lantern arrived with you. I'll hang it where the sea breeze can find it.",
          "Our market needs a courier route before the rainy season. I could run the parcels, if I had longer legs.",
          "I can read the tide! Though my first forecast was 'rather wet.' Everyone already knew.",
          "Then we'll combine our talents. High paths, warm parcels, and a tide chart.",
          "I'll start with breakfast. A courier shouldn't set off on an empty stomach.",
          "And I'll check the water before anyone splashes into the wrong route!",
        ],
      ),
      moment(
        "Leaves against the drizzle",
        [252, 272, 258],
        [
          "The first stall is open! I've folded leaf covers for the parcels. Rain can slide right off.",
          "I'll test them with a rain dance! A little rhythm, a little drizzle, a lot of enthusiasm!",
          "Wait! Test one parcel first. The whole stock doesn't need a bath.",
          "Good catch. Even a clever idea deserves a small trial.",
          "One tiny rain dance, coming right up. Tiny for me, anyway!",
          "Dry inside! Damp outside! That's a forecast I can be proud of.",
        ],
      ),
      moment(
        "The courier's clipboard",
        [252, 302, 255],
        [
          "I'm managing the leaf stall now. Each order gets a route mark before it leaves.",
          "I can spot tiny stones glowing beneath the path. Shall I mark the tricky bends with them?",
          "Yes, please. My last delivery followed a shiny shell in entirely the wrong direction.",
          "Route marks first, interesting shells later. Let's make the path easy to follow.",
          "I'll use ordinary stones, too. Not everyone sees a gemstone the way I do.",
          "Then even a distracted Torchic can bring breakfast to the right doorstep!",
        ],
      ),
      moment(
        "The order that crossed the bay",
        [258, 272, 334],
        [
          "Three shops are serving customers! But this parcel needs to reach the far side of the bay.",
          "I can pack it snugly. My dance steps have taught me which baskets wobble.",
          "I'll carry it above the waves. Tell me where to land, and leave a clear place on the quay.",
          "I'll mark the safe landing spot after high tide. No guessing from the air.",
          "Basket tied! Snack included! Courier snack included separately!",
          "Thank you. A delivery feels lighter when someone has thought about the one carrying it.",
        ],
      ),
      moment(
        "Absol's weather warning",
        [359, 302, 252],
        [
          "Your fifth shop is ready. So is a storm beyond the headland. The wind changed before dawn.",
          "Everyone went quiet when you arrived. They thought you brought the storm with you.",
          "Warnings help us prepare. Absol is our neighbor, not our weather problem.",
          "Then please move the parcels inland and check the quay ropes. We still have time.",
          "I'll light the route stones. No customer will need to wander in the rain.",
          "We'll listen, plan, and keep the market safe. Meet us at the launch quay!",
        ],
      ),
      moment(
        "A forecast everyone can read",
        [376, 359, 334],
        [
          "Three managers can keep the shops running while we prepare. Wind calculations are now on this board.",
          "Could you draw clouds beside the numbers? Young couriers may not know what a falling pressure means.",
          "And show safe resting places. Strong wings still need shelter.",
          "Agreed. Precision should make a warning clearer, not harder to understand.",
          "There. A dark cloud for waiting, a clear sky for travel. Everyone can read that.",
          "Then we'll wait together until the sky gives us a safe invitation.",
        ],
      ),
      moment(
        "A wish needs a plan",
        [385, 258, 255],
        [
          "Eight shops! I could wish all their parcels across the bay. Would that solve everything?",
          "Maybe today. Tomorrow we'd still need a safe route and somewhere to land.",
          "And the customers might get breakfast in their hats. Wishes need addresses.",
          "Then my wish is for everyone to have a good plan. Can I help draw the stars on it?",
          "Please do! A star over each safe harbor, and a little fish by the tide chart.",
          "Now that's a wish we can work toward. I'll pack breakfast for the planning team.",
        ],
      ),
      moment(
        "Five trips, one lesson",
        [252, 359, 272],
        [
          "Five delivery cycles without a wet parcel! We followed the forecast instead of racing it.",
          "The storm is passing. My warning doesn't need to be a secret anymore.",
          "I'll make it part of the market rhythm: pack, check the sky, then go!",
          "And thank the neighbor who noticed the clouds before we did.",
          "That would mean a great deal. I want to help, even when the news is difficult.",
          "Then there's a place for you in our dance. Right here, where everyone can see you!",
        ],
      ),
      moment(
        "Permission from the sky",
        [384, 334, 376],
        [
          "Ten shops send parcels from this quay now. I have watched your couriers wait through the storm.",
          "We wanted to prove we could fly anywhere. Then we learned that waiting can be brave too.",
          "Forecast: clear. Ropes: secure. Landing places: confirmed. No part of the journey is left to pride.",
          "Then the high route is open. Follow the clear air, and leave room for those with smaller wings.",
          "I'll guide the first flight. Everyone will know where to rest and where to return.",
          "A successful delivery includes a safe homecoming. Route approved.",
        ],
      ),
      moment(
        "The parcel marked friendship",
        [252, 258, 385],
        [
          "Our earnings goal is reached. This parcel is bound for Sinnoh, with a leaf cover and a weather chart.",
          "I added a warm scarf. Mountains are wetter than you'd think, and much colder than my puddle.",
          "I put one tiny wish inside: that the next market finds friends as good as these.",
          "Keep our lantern on the quay. Its light will welcome every returning courier.",
          "And I'll keep reading the tide. 'Rather wet' has become a very detailed forecast!",
          "Next stop, snowy peaks! The best wishes travel with someone who cares.",
        ],
      ),
    ],
  },
  {
    region: 4,
    chapters: [
      {
        title: "Warmth beneath the peaks",
        subtitle: "A snowbound market prepares supplies for the mountain pass.",
        location: "Snowbell Market",
      },
      {
        title: "No traveler left in the snow",
        subtitle: "Clear a path together, then share the view.",
        location: "Snowbell Pass",
      },
    ],
    scenes: [
      moment(
        "A scarf from the shore",
        [387, 390, 393],
        [
          "Welcome to Sinnoh! Hoenn sent a scarf with your parcel. I'll wrap it around the smallest saplings.",
          "Snowbell needs supply baskets for the pass. I can warm them, but I can't carry them all.",
          "I'll organize the baskets! One for every traveler, with the labels perfectly straight.",
          "Let's start a market sturdy enough to outlast a snowstorm.",
          "And friendly enough to make a chilly neighbor smile.",
          "Then our first rule is simple: nobody climbs hungry!",
        ],
      ),
      moment(
        "A stubborn little sprout",
        [387, 417, 390],
        [
          "Our first stall opened, but my seedling hasn't grown at all. Maybe the mountain dislikes it.",
          "The soil is frozen! I hid a nut beside it and needed both paws to get it back.",
          "I'll warm the pot from a safe distance. A little warmth, not a dramatic blaze.",
          "I'll loosen the soil and give it time. Small things don't have to grow on our schedule.",
          "Look! One green tip! It's smaller than my nut, but it's trying.",
          "Then we'll celebrate a tiny success with a tiny flame. Very tiny.",
        ],
      ),
      moment(
        "The mountain's morning list",
        [387, 418, 393],
        [
          "I'm managing the stall now. The first task each morning is checking the pass, before checking the till.",
          "I'll bring news from the river. If the ice starts moving, the lower route may be safer.",
          "I'll keep two supply lists ready. A good plan can change without becoming a bad plan.",
          "Exactly. Our customers need safe supplies more than they need a perfect timetable.",
          "River report coming! And I promise not to shake water onto the lists.",
          "Thank you. I have only just made the labels straight again.",
        ],
      ),
      moment(
        "Tea for the last customer",
        [417, 407, 390],
        [
          "Three shops are open! Roserade, your tea queue goes all the way around the corner!",
          "Then let us carry a cup to the last customer. A long queue should not mean a lonely wait.",
          "I can keep it warm. But first, shall we ask whether they would prefer it cool?",
          "That's what a market is for: asking what a neighbor needs instead of guessing.",
          "I will bring a seat and a fresh cup. Tea is lovelier when there is a comfortable place to drink it.",
          "Welcome to Snowbell! I saved a little warmth just for you.",
        ],
      ),
      moment(
        "Footprints without a traveler",
        [448, 417, 387],
        [
          "Your fifth shop is open. I found footprints heading into the pass, but none coming back yet.",
          "Could the snow have covered the return prints? It has been falling all morning.",
          "We should check before worrying everyone. I'll pack food and mark where our search begins.",
          "I'll listen for their presence. Nobody goes ahead alone, and we follow the marked path.",
          "I'll leave bright ribbons at each turn. Small paws can still make a clear trail.",
          "Then let's go together. A mountain is no place to prove you're better on your own.",
        ],
      ),
      moment(
        "Lights through the snowfall",
        [479, 448, 417],
        [
          "Three managers at work! Bzzzt! I borrowed a lantern casing and made it blink toward the safe path.",
          "A traveler is waiting beyond the arch. They took shelter instead of forcing a way through.",
          "I'll carry a warm cup there! And a ribbon, so they know how to follow us back.",
          "Blink, blink, welcome home! I can keep the lamps steady even while the shops are busy.",
          "Good. A rescue begins with a calm voice and a visible way back.",
          "Then I'll say it calmly: we found you, and we brought enough tea for everyone.",
        ],
      ),
      moment(
        "A proud bow in the snow",
        [395, 393, 417],
        [
          "Eight shops can supply the pass now. I will direct the welcome party. With appropriate dignity.",
          "I can make the labels! Perfectly straight. Perhaps a little bow on the largest basket?",
          "The traveler mostly needs dry socks. Dignity is lovely, but soggy toes aren't.",
          "Quite right. Practical kindness first. The ceremonial bow can wait until everyone is warm.",
          "I'll put the socks at the top. Straight labels, useful baskets. Both can matter.",
          "And I brought a nut for the trip home. This one was never hidden anywhere!",
        ],
      ),
      moment(
        "Five shoots of spring",
        [387, 417, 479],
        [
          "Five harvest cycles! My stubborn sprout has become a little shelter for the smaller seedlings.",
          "The mountain didn't dislike it. It just needed us to notice the frozen soil.",
          "Bzzzt! Garden lamp set to gentle warmth. No surprise lightning for the roots.",
          "We learned to look closer instead of giving up. The same goes for a quiet customer.",
          "I'll ask whether they need a seat before I hand them a basket.",
          "And I'll light the seat as well as the sign. Kindness should be easy to find.",
        ],
      ),
      moment(
        "A path wide enough for friends",
        [445, 418, 448],
        [
          "Ten shops are open. I can clear the last drift, but my claws might scrape the old stones.",
          "I'll soften the snow with river water at the edge. Keep the old arch safe.",
          "And I'll guide travelers along the cleared side. Fast doesn't mean rushing past those who need help.",
          "Then small strokes, carefully. These stones have welcomed more travelers than any of us.",
          "The path is clear! We can see the market lanterns from here.",
          "A mountain crossed together leaves more than footprints. It leaves a way for the next friend.",
        ],
      ),
      moment(
        "Warmth for the city lights",
        [387, 390, 393],
        [
          "Our travel goal is reached. Unova is next, with tall buildings instead of tall snowy peaks.",
          "I'll send a warming basket. Cities can feel chilly too, especially when nobody knows your name.",
          "And a supply list! With space at the bottom for whatever the new neighbors need.",
          "Leave that space. The best welcome has room for an answer.",
          "Snowbell will keep the path lit. Come back whenever you need a warm bowl and a familiar grin.",
          "Next stop, Unova! Labels straight, baskets ready, friendship packed at the very top!",
        ],
      ),
    ],
  },
  {
    region: 5,
    chapters: [
      {
        title: "A small welcome in a big city",
        subtitle: "Find the neighbors between the bright windows.",
        location: "Gearbridge Market",
      },
      {
        title: "The train that brings us home",
        subtitle: "A crowded terminal discovers a gentler rhythm.",
        location: "Gearbridge Terminal",
      },
    ],
    scenes: [
      moment(
        "More windows than stars",
        [495, 498, 501],
        [
          "Welcome to Unova. Gearbridge has many windows, but far too few places where a stranger feels welcome.",
          "Then let's make a snack stall with a really big welcome! The Sinnoh basket already smells delicious.",
          "I can guide customers from the terminal. If I stand tall, perhaps I won't look lost myself.",
          "You can ask for directions and still be a guide. Let's learn the city together.",
          "First stop, breakfast! Second stop, everybody else's breakfast!",
          "Right! A brave guide starts by finding out where the good snacks are.",
        ],
      ),
      moment(
        "A leaf in the concrete",
        [495, 547, 498],
        [
          "The first stall is open. I've put a green leaf by the door so customers can find us among the signs.",
          "I can scatter a thousand leaves! A magnificent green surprise in every street!",
          "Maybe one sign is enough. Yesterday I followed three signs and arrived at a wall.",
          "A clear welcome beats a confusing spectacle. One leaf, one path, one friendly voice.",
          "Then I'll make that one leaf especially splendid. Without hiding anyone's doorway.",
          "And I'll put the snacks where the sign actually points!",
        ],
      ),
      moment(
        "Listening above the bustle",
        [495, 531, 501],
        [
          "I'm managing the stall. I can hear orders over the street, but I keep missing the quiet customers.",
          "Try leaving a little pause. Some Pokémon need a moment before they can ask.",
          "I know that feeling. I practiced my directions six times before speaking to anyone.",
          "Then I'll ask once, wait, and listen. A busy counter can still be a gentle place.",
          "There. That customer wanted a smaller portion, and now they don't have to shout.",
          "I'll practice pausing too. Directions are easier when someone gives you time to hear them.",
        ],
      ),
      moment(
        "A second life for a box",
        [568, 595, 498],
        [
          "Three shops! That's a lot of empty packing boxes. Please don't leave them across the pavement.",
          "I can tie the clean ones together with thread. Little baskets for customers to borrow!",
          "Then nobody has to carry a hot snack loose. Trubbish, you've solved two problems at once.",
          "I like things other Pokémon throw away. That doesn't mean I like a messy home.",
          "Borrow a basket, return a basket. I'll stitch a little return mark into each handle.",
          "And I'll put the return place right beside the welcome sign. Easy to find, easy to help!",
        ],
      ),
      moment(
        "The clock that hurried everyone",
        [623, 501, 531],
        [
          "Your fifth shop is open. The terminal clock is running fast. Travelers are sprinting toward trains that aren't ready.",
          "I hurried so much I dropped my directions. Now I'm not sure which route is mine.",
          "Let's slow down first. We can fix a clock more easily than we can comfort a frightened crowd.",
          "I'll hold the clock panel steady while someone checks the gears.",
          "I'll walk customers to the terminal. Walk, not race.",
          "And I'll bring a calm voice. Gearbridge deserves a rhythm everyone can follow.",
        ],
      ),
      moment(
        "Small sparks, steady signals",
        [595, 609, 623],
        [
          "Three managers keep the market moving! I found a loose clock wire behind the panel.",
          "I'll light your work. My flame can be quiet when a delicate job needs concentration.",
          "Panel secure. Take your time. Strong hands are most useful when they help small hands work.",
          "There! A neat little connection. No thunderbolt needed.",
          "The clock has stopped racing. Now we can change the platform lamps one at a time.",
          "Then every traveler will see a clear signal, and nobody has to guess.",
        ],
      ),
      moment(
        "The view from above",
        [628, 547, 501],
        [
          "Eight shops can serve the terminal now. From above, I can see which queues are blocking the crossings.",
          "I'll guide customers with a breeze! A soft one. Last time my directions blew away.",
          "I'll make a map with wider waiting spots. The fastest route isn't always the best place to stand.",
          "Good. I'll land before sharing my report, so nobody has to crane their neck to listen.",
          "And I'll keep my feet on the path while giving directions. No dramatic windy entrances today.",
          "A map, a clear crossing, and a welcome. I'm beginning to feel like a real guide.",
        ],
      ),
      moment(
        "Five orders and a name",
        [495, 531, 568],
        [
          "Five serving cycles. I remember the regular orders, but today I learned the customers' names too.",
          "That makes a city feel smaller in the nicest way. A familiar greeting can steady a long day.",
          "Someone thanked me for the borrowing baskets. They even brought a clean box back.",
          "Then put your name on the basket stand. Good work deserves to be seen.",
          "And I'll save a quiet corner for anyone who needs a pause between trains.",
          "A corner for resting, a place for returning, a name for welcoming. I like this city now.",
        ],
      ),
      moment(
        "The platform of a hundred welcomes",
        [623, 609, 628],
        [
          "Our first ten shops are open. The terminal clock agrees with the trains, and the crossing is clear.",
          "I'll light the last platform lamp. Not too bright for tired travelers.",
          "The evening train is arriving. Its passengers will see the market before they see the tallest tower.",
          "Then they'll know where to ask for help. That is a better landmark than height alone.",
          "A little flame, a steady clock, and a thousand windows. Gearbridge feels warm tonight.",
          "I'll greet the train on the ground. A welcome should be at eye level whenever it can be.",
        ],
      ),
      moment(
        "A ticket to a garden",
        [495, 498, 501],
        [
          "Travel goal reached. Kalos is next. I hear its gardens have room for a very stylish leaf.",
          "I'll send recipes with the ticket. A fancy plate should still hold enough for a hungry friend.",
          "And a map! I drew all the places to rest instead of only the shortest route.",
          "Leave a space for new directions. Every region can teach us a better way to welcome.",
          "Gearbridge managers will keep the snacks warm and the baskets ready.",
          "Next stop, Kalos! This time I know where I'm going, and I'm happy to ask when I don't.",
        ],
      ),
    ],
  },
  {
    region: 6,
    chapters: [
      {
        title: "Beauty with room for everyone",
        subtitle: "A garden market learns who its invitations should welcome.",
        location: "Prismgarden Market",
      },
      {
        title: "The gate without a golden key",
        subtitle: "A celebration blooms beyond the conservatory doors.",
        location: "Prismgarden Terrace",
      },
    ],
    scenes: [
      moment(
        "An invitation under a leaf",
        [650, 653, 656],
        [
          "Welcome to Kalos! Unova sent recipes, a map, and a leaf so fancy I nearly wore it.",
          "Prismgarden is planning a garden supper. The invitations look lovely, but hardly anyone has answered.",
          "Perhaps they're worried about saying the wrong thing. I stayed behind a fountain until you waved.",
          "Then our market can begin with a wave, not a test of manners.",
          "And our supper can begin with something warm, not a list of rules.",
          "I'd answer that invitation. Even from behind a fountain.",
        ],
      ),
      moment(
        "The imperfect first pastry",
        [650, 672, 653],
        [
          "The first shop is open! My pastry is a bit lopsided, but it smells wonderful.",
          "I brought fresh herbs. They don't grow in perfectly straight rows either.",
          "Then taste matters more than symmetry. Let's ask the first customer what they think.",
          "They asked for another one! Perhaps a crooked edge can be our special signature.",
          "I'll supply the herbs. A good garden feeds its neighbors before impressing them.",
          "And I'll write that on our invitation: come hungry, come as you are.",
        ],
      ),
      moment(
        "A greeting without a script",
        [650, 676, 656],
        [
          "I'm managing the counter! I memorized a grand greeting, then forgot it the moment someone arrived.",
          "Try a simpler one. I look polished, but I still appreciate 'good morning' more than a speech.",
          "I could make little wave signs. Quiet customers wouldn't have to announce themselves.",
          "Good morning, welcome, what would you like? There. I can remember that.",
          "And I can keep the entrance neat without making anyone feel untidy.",
          "I'll put a wave by the fountain too. Just in case another shy neighbor is waiting there.",
        ],
      ),
      moment(
        "A ribbon with no guest list",
        [700, 701, 653],
        [
          "Three shops have joined the supper! I'll tie ribbons along the path so everyone knows the way.",
          "I'll make a spectacular entrance through the ribbons! Shall I leap over the table?",
          "After the soup is cleared, perhaps. First we need seats for customers who can't leap anywhere.",
          "Then the ribbons will point to seats, not divide invited guests from everyone else.",
          "I can help carry the seats. A useful entrance is still an entrance worth making.",
          "Wonderful. Our first event can be a table arriving safely on the terrace.",
        ],
      ),
      moment(
        "The key nobody should need",
        [707, 703, 650],
        [
          "The fifth shop is ready, but the conservatory gate is locked. I have many keys, and none of them fit.",
          "Some customers thought that meant the supper was only for important guests.",
          "Then we'll put the tables outside, where the path is open. A locked gate can't decide who belongs.",
          "I'll keep looking for its key, but nobody has to wait to be welcomed.",
          "I'll bring gentle crystal lights. The terrace can be beautiful on its own.",
          "Meet us there. A garden is bigger than the doors we build around it.",
        ],
      ),
      moment(
        "A light that doesn't dazzle",
        [703, 700, 676],
        [
          "Three managers keep our shops serving while we decorate. Are my crystals too bright for the table?",
          "Just soften them a little. We want guests to see each other's faces, not only the decorations.",
          "I'll place the cushions where tired paws can find them. Elegance includes being comfortable.",
          "There. A glow instead of a glare. The whole garden seems calmer.",
          "And the ribbons lead to every seat. Nobody needs a golden invitation.",
          "Then the terrace is ready for the guests who thought they weren't guests at all.",
        ],
      ),
      moment(
        "The raincoat at the fancy supper",
        [706, 672, 656],
        [
          "Eight shops are ready! I tried to look elegant, but I left damp footprints all the way here.",
          "Those footprints brought herbs and fresh water. The garden is glad to see them.",
          "I left wet footprints too. Shall we put a mat by the tables and laugh about it together?",
          "I'd like that. I worried my welcome would wash away if I couldn't stay perfectly dry.",
          "A welcome isn't made of paper. Come sit where the herbs smell nicest.",
          "I'll bring towels. One practical little detail can make a shy guest feel much better.",
        ],
      ),
      moment(
        "Five batches, one new recipe",
        [650, 653, 706],
        [
          "Five batches sold! A customer asked whether we could make a softer pastry for their little sibling.",
          "Let's try. A recipe becomes better when it listens to the one eating it.",
          "I can help knead gently. My paws are softer than they look.",
          "Then our next batch will be a little different, and a little more welcoming.",
          "I'll warm it slowly so the outside doesn't harden too much.",
          "They smiled! That's the loveliest review I've ever seen, fancy plate or no fancy plate.",
        ],
      ),
      moment(
        "The garden beyond the gate",
        [707, 701, 700],
        [
          "Our first ten shops are open, and I found the gate key! But everyone has already gathered on the terrace.",
          "Then open it for anyone who wants to explore. The party doesn't have to move just because a door does.",
          "Look at the tables. Different paws, different recipes, one very long ribbon of friends.",
          "I'll keep the gate open. A key should make an invitation possible, not make a neighbor prove anything.",
          "And now that the soup is cleared, may I make one small, graceful leap?",
          "One small leap! Then come back and help us carry the plates.",
        ],
      ),
      moment(
        "A ribbon for the islands",
        [650, 653, 656],
        [
          "Our travel goal is reached. Alola is next! I'll send a ribbon long enough to welcome a whole island.",
          "And the soft pastry recipe. Warmth travels well when you share how to make it.",
          "I'll add a little wave sign. Somewhere, another neighbor may be waiting behind a fountain.",
          "Prismgarden will keep its gate open. Come as you are, whenever you return.",
          "The managers have the recipes and the routines. Our welcome can keep growing while we travel.",
          "Next stop, Alola! I think I can wave first this time.",
        ],
      ),
    ],
  },
  {
    region: 7,
    chapters: [
      {
        title: "A market on island time",
        subtitle: "Prepare a moonlit celebration without rushing the tide.",
        location: "Moonpetal Market",
      },
      {
        title: "The song beneath the disguise",
        subtitle: "At the cove, every neighbor gets a part in the welcome.",
        location: "Moonpetal Cove",
      },
    ],
    scenes: [
      moment(
        "A ribbon on the sea breeze",
        [722, 725, 728],
        [
          "Welcome to Alola! Kalos sent a ribbon, a recipe, and a wave. I may have napped on the recipe.",
          "Our market is planning a moonlit supper by the cove. Please don't nap on the invitations too.",
          "I'll make bubbles to carry the invitations! Small bubbles. Large ones keep bursting on the roof.",
          "I'll deliver them before my next nap. Probably an excellent reason to start a market.",
          "We'll work with the island's rhythm. Enough time for cooking, helping, and resting.",
          "And a song for the cove! Every good welcome deserves a chorus.",
        ],
      ),
      moment(
        "The first sleepy customer",
        [722, 761, 725],
        [
          "The first stall is open! Oh. My first customer is asleep. Perhaps they thought the counter was a pillow.",
          "I brought fragrant fruit. The smell might wake them more gently than a shout.",
          "Then let them wake slowly. A tired traveler can buy breakfast after they've found their paws.",
          "I'll leave a shaded seat and a fresh bowl. Now that sounds like my kind of shop.",
          "They're smiling! I'll keep the fruit cool while they finish resting.",
          "A patient welcome. We should put that on the invitation, right beneath 'no hurry.'",
        ],
      ),
      moment(
        "An alarm made of friends",
        [722, 765, 728],
        [
          "I'm managing the stall now. I need an order reminder that won't startle every napping customer.",
          "A soft chime, perhaps. A good routine should guide attention, not chase it.",
          "I can tap a little shell whenever a basket is ready. Like the quiet beginning of a song.",
          "Perfect! I'll listen for the shell, and ask a friend to cover my own rest time.",
          "Then the manager is part of the community, rather than the one who never stops.",
          "Ting! First basket ready. That was quiet enough even for a Rowlet-shaped pillow.",
        ],
      ),
      moment(
        "A dance with space between steps",
        [741, 749, 728],
        [
          "Three shops can supply our supper! I'll lead a dance down to the cove. Everyone follow my steps!",
          "My steps are rather different. If I copy yours, the baskets may tip.",
          "Then we'll leave room for everyone's rhythm. I'll sing the beat instead of demanding the same dance.",
          "Yes! A sway, a sturdy walk, a little bounce. Three ways to reach the same celebration.",
          "I'll carry the heavy baskets. Slowly enough that the fruit stays where it belongs.",
          "And I'll sing the easy parts twice, so nobody feels left behind.",
        ],
      ),
      moment(
        "The invitation under the cloth",
        [778, 757, 725],
        [
          "Your fifth shop is open. I found an invitation beside my door. Is it really meant for me?",
          "Of course. I helped deliver them. Your doorway was just difficult to spot in the shade.",
          "There's a seat for you at the cove. You don't have to change your disguise to deserve it.",
          "I wanted to come, but I worried everyone would ask what was underneath.",
          "Then we'll ask whether you'd like fruit, tea, or a place near the music. Useful questions.",
          "Bring yourself. The supper is brighter when every neighbor can feel safe there.",
        ],
      ),
      moment(
        "The tide has its own timetable",
        [765, 749, 722],
        [
          "Three managers keep our stalls serving. Before we set tables at the cove, let's read the tide marks.",
          "The water reached this stone yesterday. I'll keep every basket above it.",
          "I'll mark the dry sand. A moonlit view is lovely, but a floating dinner would be inconvenient.",
          "We can respect the tide without hurrying the celebration. The sea isn't late; it has its own rhythm.",
          "Tables on the high sand. Heavy supplies on the clear path. Safe and steady.",
          "And one shaded resting spot. Planning has made me pleasantly sleepy.",
        ],
      ),
      moment(
        "Armor with a gentle beat",
        [784, 741, 778],
        [
          "Eight shops are ready. I can sound the opening beat with my scales. Will it frighten the quieter guests?",
          "Start gently, and let them answer. Music is a conversation too.",
          "I could tap this little shell. I practiced, but only when nobody was listening.",
          "Then I'll listen now. Your small sound deserves room beside my larger one.",
          "One soft beat, one shell answer. There! The cove has found its rhythm.",
          "You heard me. Maybe I can play the next part where everyone can hear it too.",
        ],
      ),
      moment(
        "Five baskets and a quiet seat",
        [722, 761, 757],
        [
          "Five serving cycles! Some customers want music, and some just want a peaceful cup by the water.",
          "I'll take fruit to both places. A party doesn't have to sound the same everywhere.",
          "And I'll guide the late arrivals along the lantern path. No mysterious shortcuts through the dark.",
          "Thank you. Everyone can choose where they feel comfortable.",
          "That customer asked for a quiet seat beside a friend. I'll bring two cushions.",
          "Two cushions, one clear path. Sometimes the smallest arrangements make the biggest welcome.",
        ],
      ),
      moment(
        "The cove answers back",
        [728, 778, 784],
        [
          "Our first ten shops are open! Shall we begin the welcome song? Mimikyu, your shell has the first note.",
          "Mine? All right. Ting... There. I did it without hiding behind the table.",
          "I heard it all the way across the cove. Now my scales can answer, gently.",
          "And I'll sing between your notes. One song with room for every voice!",
          "I thought I needed a different face to belong here. I only needed someone to listen.",
          "Then we'll keep listening after the music ends. That's the strongest part of our welcome.",
        ],
      ),
      moment(
        "A shell for the next rhythm",
        [722, 725, 728],
        [
          "Travel goal reached. Galar is next! I packed a little shell chime and an enormous amount of fruit.",
          "Leave some for the market. The managers will keep our routines steady while we travel.",
          "I'll send the welcome song too. It can sound different there and still mean the same thing.",
          "Then let it find a new rhythm. I hear Galar has trains instead of tides.",
          "Both deserve a sensible timetable, and everyone deserves a rest between journeys.",
          "Next stop, Galar! One quiet shell, one traveling song, and a cove full of friends behind us.",
        ],
      ),
    ],
  },
  {
    region: 8,
    chapters: [
      {
        title: "A team beyond the scoreboard",
        subtitle: "A railway market prepares for its busiest match day.",
        location: "Copperwhistle Market",
      },
      {
        title: "Everybody catches the train",
        subtitle: "A station learns that a good team brings everyone along.",
        location: "Copperwhistle Station",
      },
    ],
    scenes: [
      moment(
        "The whistle and the shell",
        [810, 813, 816],
        [
          "Welcome to Galar! Alola sent a shell chime. It has a lovely little beat beside our station whistle.",
          "Match day is coming! Copperwhistle needs a market fast enough to serve every fan before the train leaves.",
          "Every fan? That's a lot of voices. I might need a quiet counter near the edge.",
          "Then let's make one. A great team has a part for every kind of player.",
          "I'll run the deliveries, and stop when a teammate needs a hand.",
          "I can check the orders carefully. Quiet doesn't mean I have nothing to offer.",
        ],
      ),
      moment(
        "A beat for the first stall",
        [810, 831, 813],
        [
          "The first stall is open! I'll tap a gentle beat when an order is ready.",
          "Gentle, please. I rolled toward the wrong queue when the station whistle surprised me.",
          "I'll make a clear waiting line. No dribbling customers between counters, even if I'm tempted.",
          "There. A steady beat and a steady queue. Everyone can find their turn.",
          "I feel much better with my paws on the path. Rolling is fun when I choose it.",
          "Then I'll save the fancy footwork for after the baskets are delivered!",
        ],
      ),
      moment(
        "The teammate who notices",
        [810, 835, 816],
        [
          "I'm managing the stall. Yamper, could you tell me when customers are waiting outside my view?",
          "Absolutely! I can follow the queue and bring back a friendly little bark.",
          "And I'll watch for anyone who looks overwhelmed. The quiet counter is ready.",
          "Thank you. A manager can set the rhythm without seeing every corner alone.",
          "Team signal ready! One bark for a customer, two for a lost basket. Three if I am the lost basket.",
          "Then I'll draw you a map too. Carefully. With a very large picture of the stall.",
        ],
      ),
      moment(
        "The order Cramorant forgot",
        [845, 813, 831],
        [
          "Three shops are serving fans! I brought a delivery. I definitely remember there was something to deliver.",
          "Was it this basket behind you? Perhaps an order tag would help next time.",
          "I'll sew bright tags to the handles. Then no one has to remember everything in their head.",
          "Basket! Yes! A tag would be wonderful. Could mine have a picture instead of tiny writing?",
          "Of course. Clear signals help every teammate do their part.",
          "A picture tag and a sturdy handle. That's a match-day kit worth cheering for.",
        ],
      ),
      moment(
        "The loudest welcome isn't the only one",
        [849, 816, 810],
        [
          "The fifth shop is ready! I'll play an opening chord so loud the whole station knows we're here.",
          "Could you start softly? Some of us need a moment before a crowd feels exciting.",
          "Let's make two welcomes: music by the platform, and a quiet path beside the garden.",
          "I hadn't thought about that. I can turn the sound down without turning the fun off.",
          "Then I can help carry the invitations instead of hiding from them.",
          "Meet us at the station. A team's cheer works best when everyone gets to join their own way.",
        ],
      ),
      moment(
        "Cream before the whistle",
        [869, 835, 813],
        [
          "Three managers keep the stalls running! I'll prepare match-day treats, but the cream needs time to set.",
          "I'll keep customers away from the cooling shelf. A friendly queue is easier than a knocked-over tray.",
          "I wanted every delivery to be the fastest. Maybe this one needs to be the steadiest.",
          "Exactly. A lovely treat can't hurry through every step.",
          "Queue checked, shelf safe, customers smiling. We have time to do this properly.",
          "Then I'll carry it with both paws. No trick shots with the dessert!",
        ],
      ),
      moment(
        "A courier lands to listen",
        [823, 887, 816],
        [
          "Eight shops can supply the station now. I'll carry the last parcel above the crowded road.",
          "I can guide it quickly through the air! Very quickly. Perhaps too quickly for the label.",
          "Please stop so I can check the address. Speed won't help if it reaches the wrong platform.",
          "I'll land and wait. A small voice deserves as much attention as a station announcement.",
          "And I'll keep my delivery on the ground until the route is confirmed. My shortcuts can wait.",
          "Thank you. Correct platform, clear landing spot, every order accounted for. Now you're ready.",
        ],
      ),
      moment(
        "Five rounds, no substitutes",
        [810, 831, 849],
        [
          "Five serving cycles! We rotated jobs so every teammate could rest without leaving a counter empty.",
          "I helped at the quiet queue. Customers liked a guide who didn't hurry them.",
          "And I played a softer tune. More neighbors joined in when they could hear their own voices.",
          "Then nobody is a substitute here. Every role changes how the whole market feels.",
          "Even the role that mostly involves standing still beside a clear sign.",
          "Especially that role. A good rhythm needs a steady beat as much as a loud chord.",
        ],
      ),
      moment(
        "The winning platform",
        [813, 816, 835],
        [
          "Our first ten shops are open! The train is ready. I could run ahead and be the first passenger aboard.",
          "One customer's basket strap broke. They need help before they can reach the platform.",
          "I'll bring a spare strap. Keep the path clear, and let the station know we're on our way.",
          "Then I'll be the last runner, carrying their basket. A win means the whole team arrives.",
          "We made it! The order list is complete, and nobody had to be left behind.",
          "One happy bark for the team! Two for the train! Three because I remembered where I am!",
        ],
      ),
      moment(
        "A team scarf for the final region",
        [810, 813, 816],
        [
          "Travel goal reached. Paldea is next, the final stop on our world route. I'll send our team scarf.",
          "And a basket strap! Every journey needs a few practical victories as well as a cheer.",
          "I'll send the careful order list. With a quiet welcome drawn at the top.",
          "Copperwhistle managers know the rhythm now. Our market will keep playing as a team.",
          "Come back on match day! First, last, fast, slow—there'll be a place for you on our platform.",
          "Next stop, Paldea. I can say that out loud now, and it feels wonderful.",
        ],
      ),
    ],
  },
  {
    region: 9,
    chapters: [
      {
        title: "The treasure between neighbors",
        subtitle: "A new market begins the final leg of the world journey.",
        location: "Starlight Market",
      },
      {
        title: "Nine regions, one promise",
        subtitle: "Bring every lesson to an academy terrace under the stars.",
        location: "Starlight Academy Terrace",
      },
    ],
    scenes: [
      moment(
        "A scarf and a treasure map",
        [906, 909, 912],
        [
          "Welcome to Paldea! Galar sent a team scarf. It makes an excellent place for a very dignified cat to nap.",
          "I heard we're finding a treasure! Is it a mountain of snacks? Please let it be snacks.",
          "Starlight is building a market for the academy's welcome supper. Perhaps our treasure starts there.",
          "Then I'll keep my paws on the map instead of sleeping on it. Nine regions deserve a proper finale.",
          "I'll cook! Quietly? I sing when I cook. That may become relevant.",
          "You can sing. I'll keep the place settings straight and leave room for every guest.",
        ],
      ),
      moment(
        "A leaf in the first ledger",
        [906, 928, 909],
        [
          "The first stall is open! I pressed a leaf into our ledger to remember the day we began.",
          "I brought a little oil for the bread. A small harvest can still make a whole table brighter.",
          "And I warmed the bread while singing. It came out in tune! Mostly.",
          "Then the ledger should remember more than coins. I'll write down who helped make the first sale.",
          "May I write my name carefully? I've never put it in a market book before.",
          "Of course! I'll hum while you write. A quiet hum. Mostly.",
        ],
      ),
      moment(
        "The paws behind the counter",
        [906, 921, 912],
        [
          "I'm managing the stall now. The team scarf reminds me to share the jobs instead of hoarding them.",
          "I can bring gentle sparks to the order lamp. Not every signal needs to light the whole street.",
          "I'll check that customers can see the lamp from the waiting seats. A neat sign needs a useful place.",
          "Then our routine has three pairs of paws. Four, whenever a customer shows us a better idea.",
          "First order! One little glow, one big smile.",
          "And one straight row of ready baskets. This market is beginning to feel like home.",
        ],
      ),
      moment(
        "The dough that wouldn't rise",
        [926, 928, 909],
        [
          "Three shops are serving! But my dough won't rise. I have been encouraging it very politely.",
          "Maybe the bowl needs a warmer place. Even an enthusiastic dough has to have the right conditions.",
          "I can warm the air beside it. Not the bowl directly! I remember the lesson about tiny flames.",
          "There it goes! Kind words helped me wait, and good conditions helped the dough.",
          "I'll bring oil for the finished loaf. Every small ingredient can have an important job.",
          "And I'll save a slice for the one who waited. That's you, Fidough!",
        ],
      ),
      moment(
        "The hammer and the little hinge",
        [959, 906, 912],
        [
          "The fifth shop is ready! I can make an enormous welcome gate for the academy supper. Enormous!",
          "Could you start with the little hinge on our basket stand? It squeaks whenever a small customer reaches up.",
          "And perhaps lower that shelf. A grand entrance isn't useful if guests can't reach their dinner.",
          "A tiny hinge? All right. I can use a big hammer carefully if I pay attention.",
          "Perfect. The best treasure might be a small problem someone finally noticed.",
          "Meet us on the terrace. We'll make the welcome easy to reach, one thoughtful detail at a time.",
        ],
      ),
      moment(
        "A coin with a familiar shine",
        [1000, 921, 906],
        [
          "Three managers keep the market serving. I found a coin tucked into the academy's old welcome book.",
          "It looks like the charm from Meowth's Kanto letter! Has it traveled farther than any of us?",
          "Maybe. But the book says its luck comes from what its holder chooses to share.",
          "Then I'll put it beside the supper ledger. Not in a locked chest where nobody can see it.",
          "I'll light it gently. A little shine for a very long journey.",
          "And we'll ask every guest what made them feel welcome. That is treasure worth keeping.",
        ],
      ),
      moment(
        "Room for the largest guest",
        [975, 959, 926],
        [
          "Eight shops are ready. I want to join the supper, but I might block the whole terrace if I sit in the middle.",
          "Then I'll widen the table arrangement. No neighbor should have to become smaller to deserve a seat.",
          "I'll bring a basket sized for you. A little loaf would be rather a little dinner.",
          "Thank you. I worried this warm region had no room for someone from the snow.",
          "Snowbell taught us to leave a clear path. We'll put yours beside the table, with room to turn.",
          "And I will save a warm loaf for when you arrive. A welcome can fit every size.",
        ],
      ),
      moment(
        "Five pages of little treasures",
        [906, 928, 912],
        [
          "Five serving cycles, and our ledger already holds more stories than prices.",
          "A customer called the fresh bread their treasure. Another said it was the seat in the shade.",
          "Mine is a table where I don't have to worry that one crooked plate will spoil the evening.",
          "Then we'll leave a blank page for tomorrow. No treasure hunt should run out of things to notice.",
          "I'll write down the names of the gardeners who brought our ingredients.",
          "And I'll straighten just enough plates to help, then sit down with my friends.",
        ],
      ),
      moment(
        "The road returns a welcome",
        [1008, 1000, 959],
        [
          "Our first ten shops are open. I followed the world route and found a different welcome at every stop.",
          "A lantern from Johto, a weather chart from Hoenn, a scarf from Sinnoh. They're all on the terrace tonight.",
          "And baskets from Unova, ribbons from Kalos, a shell from Alola, and Galar's team scarf! I'll build a careful little display.",
          "Leave space for Kanto's promise too. No Pokémon left behind. It belongs beside every one of those gifts.",
          "The old coin can hold the page open. Its shine means more when it lights someone else's story.",
          "Display ready! No enormous gate needed. Just a clear path, a shared table, and room for one more friend.",
        ],
      ),
      moment(
        "An empire with room for tomorrow",
        [906, 909, 912],
        [
          "Our final earnings goal is reached. Nine regions, one world route, and a ledger full of names.",
          "The treasure was snacks! And friends. Mostly friends. The snacks helped us meet them.",
          "Then this isn't the last supper. The managers can keep every market welcoming while we visit our neighbors again.",
          "I'll send Meowth a letter: your promise reached Paldea. The mountain of coins has become a world of places to belong.",
          "And I'll keep cooking for the next traveler. Somewhere, a new friend is still on the road.",
          "Leave one more seat. The journey has a home in every region—and tomorrow still has room at our table.",
        ],
      ),
    ],
  },
];

// Regional milestone order follows shop cost, not catalog insertion order.
// Rayquaza retains its historical save ID while living at the end of Hoenn.
export const REGIONAL_CHAPTERS = REGIONAL_ARCS.flatMap((arc) =>
  [...arc.chapters, ...REGIONAL_STORY_EXPANSION[arc.region].chapters].map((c, i) => ({
    ...c,
    region: arc.region,
    number: i + 1,
    setting: `region-${arc.region}-${c.setting ?? (i === 0 ? "market" : "landmark")}`,
  })),
);
export const REGIONAL_CAST = Object.fromEntries(
  Object.entries(assets.portraits).map(([id, p]) => [id, p.name]),
);
export const REGIONAL_SCENES = REGIONAL_ARCS.flatMap((arc) => {
  const shops = BUSINESSES.filter((b) => b.region === arc.region && !b.expansion).sort(
    (a, b) => a.baseCost - b.baseCost,
  );
  const requirements = [
    { kind: "always" },
    { kind: "own", id: shops[0].id, quantity: 1 },
    { kind: "hire", id: shops[0].id },
    { kind: "regional-owned", region: arc.region, amount: 3 },
    { kind: "own", id: shops[4].id, quantity: 1 },
    { kind: "managers", region: arc.region, amount: 3 },
    { kind: "own", id: shops[7].id, quantity: 1 },
    { kind: "cycles", id: shops[0].id, amount: 5 },
    { kind: "regional-owned", region: arc.region, amount: 10 },
    {
      kind: "lifetime",
      region: arc.region,
      amount: regionInfo(arc.region).earningsGoal,
    },
  ];
  const expanded = REGIONAL_STORY_EXPANSION[arc.region].scenes.map((s) =>
    moment(s.title, s.cast, s.dialogue),
  );
  const newShops = BUSINESSES.filter((b) => b.region === arc.region && b.expansion);
  const expandedRequirements = [
    ...newShops.map((b) => ({ kind: "own", id: b.id, quantity: 1 })),
    { kind: "regional-owned", region: arc.region, amount: 15 },
    { kind: "managers", region: arc.region, amount: 10 },
    { kind: "cycles", id: shops[0].id, amount: 20 },
    { kind: "regional-owned", region: arc.region, amount: 20 },
    { kind: "lifetime", region: arc.region, amount: regionInfo(arc.region).earningsGoal / 2 },
  ];
  // Keep all ten historical IDs. Insert the neighborhood arc before the farewell
  // rather than replaying a departure halfway through the expanded adventure.
  const ordered = [
    ...arc.scenes.slice(0, 9).map((s, i) => ({ ...s, stableNumber: i + 1, requirement: requirements[i] })),
    ...expanded.map((s, i) => ({ ...s, stableNumber: i + 11, requirement: expandedRequirements[i] })),
    { ...arc.scenes[9], stableNumber: 10, requirement: requirements[9] },
  ];
  return ordered.map(({ stableNumber, ...s }, i) => ({
    ...s,
    id: `region-${arc.region}-${String(stableNumber).padStart(2, "0")}`,
    region: arc.region,
    number: 51 + (arc.region - 2) * 25 + i,
    regionNumber: i + 1,
    chapter: 5 + (arc.region - 2) * 5 + Math.floor(i / 5),
  }));
});
