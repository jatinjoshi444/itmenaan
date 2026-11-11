import type { ImgKey } from "./images";

export type Target = string; // route path, "book" or "enquire"
export type Link = [label: string, target: Target];
export type Block = { h: string; sub?: string; p: string[] };
export type Kind =
  | "standard"
  | "stay-index"
  | "exp-index"
  | "seasons"
  | "journeys"
  | "journal"
  | "contact"
  | "book";

export type PageData = {
  path: string;
  title: string;
  kind: Kind;
  nav: string;
  hero: {
    img: ImgKey;
    mode: "full" | "split";
    pos?: string;
    eyebrow: string;
    h1: string;
    lede: string[];
  };
  blocks: Block[];
  gallery?: ImgKey[];
  links?: Link[];
  cta?: { eyebrow?: string; h: string; p?: string; actions: Link[] };
  sticky?: Link;
};

export const BRAND = "Itmenaan Estate";

export const pages: PageData[] = [
  {
    path: "/the-lodge",
    title: "Itmenaan Estate | A Peaceful Mountain Retreat in Uttarakhand",
    kind: "standard",
    nav: "The Philosophy",
    hero: {
      img: "i10",
      mode: "split",
      eyebrow: "The philosophy of Itmenaan",
      h1: "A place that asks nothing of you.",
      lede: [
        "Somewhere between the mountains and the silence, life begins to feel wonderfully uncomplicated.",
        "There is a particular kind of happiness that comes from not having to look for it. It arrives without announcement, in ordinary moments that somehow become extraordinary.",
        "A long breakfast. An unexpected conversation. Sunlight on an old stone wall. The distant sound of village life across the valley.",
        "This is the spirit of Itmenaan.",
      ],
    },
    blocks: [
      {
        h: "Where contentment comes naturally.",
        p: [
          "Itmenaan is not an invitation to withdraw from life, but to rediscover its simplest pleasures.",
          "There are no expectations to fill your days. No elaborate rituals required to feel restored. The forests, the fresh mountain air, the warmth of our hosts and the unhurried rhythm of the place do most of the work.",
          "Here, you can walk for hours or sit for an afternoon.",
          "Both are considered time well spent.",
        ],
      },
      {
        h: "Rooted in Kumaon.",
        p: [
          "We believe the most memorable places are not designed to stand apart from their surroundings.",
          "They belong to them.",
          "Our architecture draws from Kumaoni building traditions. Our kitchen takes its cues from local ingredients and seasonal abundance. Our hosts bring the knowledge and warmth of nearby villages into every guest experience.",
          "The landscape is not simply our setting.",
          "It is our identity.",
        ],
      },
      {
        h: "The luxury of enough.",
        p: [
          "Luxury is often described through abundance. More space, more things to do, more ways to be entertained.",
          "At Itmenaan, we believe there is another kind.",
          "The luxury of quiet. Of privacy. Of being looked after without being interrupted. Of a meal made with care and a day that belongs entirely to you.",
          "Not the absence of comfort.",
          "The presence of contentment.",
        ],
      },
    ],
    gallery: ["i19", "i14"],
    links: [
      ["Discover Our Heritage", "/the-lodge/architecture"],
      ["Meet Our People", "/the-lodge/our-people"],
      ["Explore the Estate", "/stay"],
    ],
  },
  {
    path: "/the-lodge/architecture",
    title: "Architecture & Heritage | Itmenaan Estate, Kumaon",
    kind: "standard",
    nav: "Architecture & Heritage",
    hero: {
      img: "i4",
      mode: "split",
      eyebrow: "Stone. Timber. Memory.",
      h1: "Architecture that remembers where it belongs.",
      lede: [
        "A house built in the mountains should speak the language of its surroundings.",
        "At Itmenaan, the architecture does not seek to impress the landscape. It settles into it.",
        "Stone walls, timber beams, traditional roof forms and generous windows reflect an understanding of place developed across generations.",
        "The result is architecture that feels less like an intervention and more like a continuation.",
      ],
    },
    blocks: [
      {
        h: "An old house, another chapter.",
        p: [
          "At the heart of Itmenaan stands a traditional Kumaoni home, more than ninety years old.",
          "Its restoration was guided by respect for what already existed. The character of the original building was retained, while thoughtful comforts made it possible to welcome travellers into a new chapter of its life.",
          "The rooms still carry the intimacy of the old house. The stone walls, timber ceilings and architectural details give each space its own personality.",
          "They are reminders that comfort and character need never be at odds.",
        ],
      },
      {
        h: "Built with an understanding of place.",
        p: [
          "Traditional Kumaoni architecture makes intelligent use of what the mountains provide.",
          "Locally familiar stone, wood and slate respond to the climate, terrain and practical needs of mountain life. Techniques refined over generations create buildings that feel inseparable from their surroundings.",
          "The cottages at Itmenaan continue this relationship between architecture and landscape, offering privacy and comfort without losing their sense of origin.",
        ],
      },
      {
        h: "A quieter expression of luxury.",
        p: [
          "Nothing here needs to compete for your attention.",
          "The texture of stone. The warmth of wood. A window opening towards the valley. The particular comfort of a room that feels lived in, rather than displayed.",
          "The details invite you to linger.",
          "And perhaps that is the most meaningful achievement of architecture: to create a place where you wish to stay a little longer.",
        ],
      },
    ],
    gallery: ["i25", "i21"],
    links: [
      ["Explore Our Cottages & Rooms", "/stay"],
      ["Meet Our People", "/the-lodge/our-people"],
    ],
  },
  {
    path: "/the-lodge/our-people",
    title: "Our People | Itmenaan Estate, Kumaon",
    kind: "standard",
    nav: "Our People",
    hero: {
      img: "i22",
      mode: "split",
      eyebrow: "The heart of Itmenaan",
      h1: "The people who make you feel at home.",
      lede: [
        "Long after the journey has ended, it is often the smallest gestures we remember.",
        "A cup of tea arriving just when it is wanted. A story shared on a village walk. A familiar smile waiting at breakfast. Someone remembering how you like your coffee.",
        "At Itmenaan, hospitality lives in these moments.",
      ],
    },
    blocks: [
      {
        h: "Hosts. Neighbours. Custodians of place.",
        p: [
          "Our team comes from the villages surrounding the estate.",
          "They know these mountains not from maps or guidebooks, but from lives spent among them. They know the paths, the seasons, the local customs and the ingredients that make their way into our kitchen.",
          "Their understanding of Kumaon adds a depth to the guest experience that cannot be taught in a conventional hospitality handbook.",
          "They are not simply here to look after the estate.",
          "They are part of the place itself.",
        ],
      },
      {
        h: "Hospitality, without performance.",
        p: [
          "There is a warmth that comes from being welcomed into someone's world rather than simply receiving a service.",
          "It is unforced, generous and wonderfully personal.",
          "We believe that good hospitality should never make itself the centre of attention. It should create the conditions in which guests can feel entirely at ease.",
          "A little kindness, offered naturally, travels a long way.",
        ],
      },
      {
        h: "A relationship with the land.",
        p: [
          "The villages around Itmenaan are part of a living cultural landscape shaped by farming, food, craftsmanship, family and community.",
          "Our local relationships help keep the estate connected to this world. Through employment, sourcing and the sharing of local knowledge, the experience of Itmenaan remains grounded in the people who call Kumaon home.",
          "The mountains give Itmenaan its setting.",
          "Our people give it its soul.",
        ],
      },
    ],
    gallery: ["i11", "i13"],
    links: [
      ["Discover Village Life", "/experiences/village-walks"],
      ["The Kumaon Kitchen", "/the-kumaon-kitchen"],
    ],
  },
  {
    path: "/the-lodge/living-lightly",
    title: "Living Lightly | Itmenaan Estate, Kumaon",
    kind: "standard",
    nav: "Living Lightly",
    hero: {
      img: "i18",
      mode: "split",
      eyebrow: "Our relationship with the land",
      h1: "To belong is to care.",
      lede: [
        "Living in the mountains encourages an understanding that nothing exists in isolation.",
        "The forests, the fields, the villages, the food on our table and the people who look after us are part of the same landscape.",
        "At Itmenaan, our approach begins with a simple conviction: hospitality should remain connected to the place that sustains it.",
      ],
    },
    blocks: [
      {
        h: "Beginning with what already exists.",
        p: [
          "The restoration of the original Kumaoni house placed the value of existing architecture at the centre of the estate's development.",
          "Rather than erase the character of the old building, care was taken to preserve its relationship with traditional materials and building methods.",
          "This philosophy continues to shape the way we understand the estate.",
        ],
      },
      {
        h: "Close to home.",
        p: [
          "Our kitchen makes use of produce grown on the estate and ingredients sourced from local suppliers wherever possible.",
          "Our team is drawn from neighbouring communities. Local knowledge informs the walks, food and everyday experiences that guests enjoy.",
          "These relationships are part of the ordinary working life of Itmenaan.",
          "They also help us remember that the value of hospitality extends beyond the people staying in a room.",
        ],
      },
      {
        h: "Nature, treated with respect.",
        p: [
          "Forests, fields and village pathways are living environments.",
          "We encourage guests to approach them with curiosity, sensitivity and respect. A meaningful encounter with nature does not always require leaving a mark.",
          "Sometimes, the most rewarding thing we can do is simply pay attention.",
        ],
      },
      {
        h: "A practice, not a proclamation.",
        p: [
          "We do not believe that caring for a place should be reduced to a collection of fashionable promises.",
          "It is reflected in everyday decisions, in the people we work with, the ingredients we choose, the buildings we maintain and the way we welcome visitors into the landscape.",
          "There is always more to learn and more to improve.",
          "The important thing is to remain attentive to the responsibility of belonging.",
        ],
      },
    ],
    gallery: ["i4", "i17"],
    links: [
      ["Meet Our People", "/the-lodge/our-people"],
      ["Discover Our Architecture", "/the-lodge/architecture"],
    ],
  },
  {
    path: "/stay",
    title: "Cottages & Rooms in Kumaon | Itmenaan Estate",
    kind: "stay-index",
    nav: "Cottages & Rooms",
    hero: {
      img: "i9",
      mode: "full",
      eyebrow: "Your stay at Itmenaan",
      h1: "Rooms with a view of another life.",
      lede: [
        "Some rooms are designed to be admired. Others invite you to make yourself at home.",
        "At Itmenaan, our intimate collection of cottages and rooms offers the warmth of traditional mountain architecture, thoughtful comforts and an ever-present connection to nature.",
        "A window frames the valley. A quiet corner invites an afternoon of reading. Outside, the light changes slowly over forests and distant mountains.",
        "Nothing feels hurried.",
        "And that includes the pleasure of staying in.",
      ],
    },
    blocks: [
      {
        h: "A different view from every window.",
        p: [
          "Each cottage and room has its own relationship with the landscape. Some look towards the valley, some towards the forest, others towards distant mountains.",
          "Beyond the rooms, the estate offers open spaces, quiet corners and places to watch the day unfold.",
          "Whichever room you choose, the mountains are never far away.",
        ],
      },
    ],
    sticky: ["Check Availability", "book"],
    cta: {
      h: "Whichever room you choose, the mountains are never far away.",
      actions: [["Check Availability", "book"]],
    },
  },
  {
    path: "/stay/deodar-cottages",
    title: "Deodar Cottages | Itmenaan Estate, Kumaon",
    kind: "standard",
    nav: "Deodar Cottages",
    hero: {
      img: "i8",
      mode: "split",
      eyebrow: "Deodar Cottages",
      h1: "Space to lose yourself. And find yourself.",
      lede: [
        "Privacy has a particular pleasure in the mountains.",
        "A space of your own, a view that seems to stretch beyond the horizon, and the freedom to let the day unfold without interruption.",
        "Our Deodar Cottages are the most generous accommodation at Itmenaan Estate, thoughtfully positioned to make the surrounding landscape part of everyday life.",
      ],
    },
    blocks: [
      {
        h: "A room for the mountains.",
        p: [
          "Stone walls, timber details and comfortable interiors create a sense of warmth and belonging.",
          "Large windows invite the outdoors inside. The private sitting areas offer a place for morning tea, a leisurely meal or the simple pleasure of watching the changing light.",
          "Two of the cottages occupy a quiet corner of the estate, while the third extends over two levels, opening towards expansive valley and mountain views.",
          "Each offers its own expression of the Itmenaan experience.",
        ],
      },
      {
        h: "The luxury of your own time.",
        p: [
          "Wake slowly.",
          "Stay a little longer over breakfast. Read by the window. Take a walk when the mood arrives. Return to find the mountains exactly where you left them, though perhaps in an entirely different light.",
          "The best part of having space is the freedom to do very little with it.",
        ],
      },
    ],
    gallery: ["i21", "i19"],
    sticky: ["Check Availability", "book"],
    links: [
      ["Check Availability", "book"],
      ["Enquire About Your Stay", "enquire"],
      ["All Cottages & Rooms", "/stay"],
    ],
  },
  {
    path: "/stay/pine-cottages",
    title: "Private Pine Cottages | Itmenaan Estate",
    kind: "standard",
    nav: "Pine Cottages",
    hero: {
      img: "i5",
      mode: "full",
      eyebrow: "Pine Cottages",
      h1: "A quieter corner of the world.",
      lede: [
        "Some places invite a different kind of closeness.",
        "To nature. To a loved one. To the gentle rhythm of a day without plans.",
        "Our Pine Cottages offer a sense of privacy and independence within the intimate surroundings of Itmenaan Estate.",
      ],
    },
    blocks: [
      {
        h: "A little place to call your own.",
        p: [
          "The two cottages are individually positioned, each with a relationship to the landscape around it.",
          "One sits conveniently near the estate's central lounge. The other enjoys an outdoor sitting space overlooking the terraced fields and surrounding hills.",
          "Inside, comfortable and welcoming spaces reflect the warmth of mountain hospitality.",
          "Outside, the world moves at a gentler pace.",
        ],
      },
      {
        h: "Together, without distraction.",
        p: [
          "Begin with morning tea. Follow a forest path. Return for lunch and perhaps spend the afternoon watching the valley change colour.",
          "There are few greater pleasures than having somewhere beautiful to be and no particular reason to leave.",
        ],
      },
    ],
    gallery: ["i19", "i18"],
    sticky: ["Check Availability", "book"],
    links: [
      ["Check Availability", "book"],
      ["Discover Experiences", "/experiences"],
      ["All Cottages & Rooms", "/stay"],
    ],
  },
  {
    path: "/stay/oak-rooms",
    title: "Heritage Oak Rooms | Itmenaan Estate",
    kind: "standard",
    nav: "Oak Rooms",
    hero: {
      img: "i7",
      mode: "split",
      eyebrow: "Oak Rooms",
      h1: "A room with a memory.",
      lede: [
        "Old houses have a way of making us feel that we belong.",
        "Perhaps it is the texture of the walls. The warmth of timber overhead. Or the quiet assurance of a building that has weathered many mountain seasons.",
        "Our Oak Rooms occupy the original Kumaoni house at the heart of Itmenaan.",
      ],
    },
    blocks: [
      {
        h: "The character of another time.",
        p: [
          "The heritage structure has been carefully restored, preserving the architectural details that give the house its identity while introducing the comforts of a contemporary stay.",
          "Each Oak Room offers an intimate retreat within a building whose story is inseparable from the surrounding mountains.",
          "Here, history is not arranged behind glass.",
          "It is something you can live within.",
        ],
      },
      {
        h: "The pleasure of staying in.",
        p: [
          "A comfortable bed. A good book. A quiet afternoon.",
          "Beyond the room, the courtyard and common spaces invite conversations, meals and views of the surrounding landscape.",
          "There is a reassuring simplicity to being in a place where nothing needs to be more complicated than this.",
        ],
      },
    ],
    gallery: ["i25", "i4"],
    sticky: ["Check Availability", "book"],
    links: [
      ["Check Availability", "book"],
      ["Discover the Heritage House", "/the-lodge/architecture"],
      ["All Cottages & Rooms", "/stay"],
    ],
  },
  {
    path: "/stay/kafal-room",
    title: "Kafal Room | Itmenaan Estate",
    kind: "standard",
    nav: "Kafal Room",
    hero: {
      img: "i21",
      mode: "split",
      eyebrow: "Kafal Room",
      h1: "Just enough. And everything that matters.",
      lede: [
        "There is an uncommon luxury in simplicity.",
        "A beautiful place to rest. A welcoming room. Time to read, think, walk and enjoy the mountains.",
        "Our Kafal Room, set within the original Kumaoni house, is an intimate space for those who find that memorable journeys are rarely measured in square feet.",
      ],
    },
    blocks: [
      {
        h: "A quiet retreat.",
        p: [
          "Smaller than the other rooms at Itmenaan, the Kafal Room retains the character and warmth of the heritage building.",
          "It is particularly suited to a solo traveller or a couple seeking an uncomplicated mountain stay.",
          "The pleasures of Itmenaan lie just beyond the door: the courtyard, the forest paths, the changing light and the generous hospitality of our hosts.",
          "Sometimes, having a little less around you makes room for so much more.",
        ],
      },
    ],
    gallery: ["i7", "i19"],
    sticky: ["Check Availability", "book"],
    links: [
      ["Check Availability", "book"],
      ["Explore the Estate", "/the-lodge"],
      ["All Cottages & Rooms", "/stay"],
    ],
  },
  {
    path: "/the-kumaon-kitchen",
    title: "Kumaoni Cuisine & Dining | Itmenaan Estate",
    kind: "standard",
    nav: "Cuisine & Dining",
    hero: {
      img: "i13",
      mode: "full",
      eyebrow: "The Kumaon Kitchen",
      h1: "The goodness of what grows close to home.",
      lede: [
        "There is something profoundly satisfying about food that knows where it comes from.",
        "At Itmenaan, our kitchen takes its inspiration from the land around us. From the vegetables growing in the estate's gardens and the produce of nearby villages, to the culinary traditions that have nourished Kumaoni homes for generations.",
        "Nothing needs to travel unnecessarily far to become something wonderful.",
      ],
    },
    blocks: [
      {
        h: "From this land.",
        p: [
          "We believe that good cooking begins long before an ingredient reaches the kitchen.",
          "It begins in the soil, with the season, in the knowledge of farmers and in the patient rhythms of mountain agriculture.",
          "Our menus follow what is fresh and available, bringing together regional Kumaoni preparations, familiar Indian comforts and selected international dishes.",
          "The cooking is generous, thoughtful and guided by a simple respect for ingredients.",
        ],
      },
      {
        h: "A taste of Kumaon.",
        p: [
          "Kumaoni cuisine reflects the geography and daily life of the mountains.",
          "Grains, pulses, vegetables and seasonal ingredients find their way into nourishing preparations whose appeal lies in their honesty.",
          "A traditional Kumaoni meal is an opportunity to discover the region through taste, revealing stories of cultivation, climate and everyday life.",
          "These are not recipes invented for visitors.",
          "They belong to a living culinary culture.",
        ],
      },
      {
        h: "Breakfast is not in a hurry.",
        p: [
          "Morning is a wonderful time to be at Itmenaan.",
          "The valley slowly reveals itself, the first sunlight touches the hills, and breakfast arrives as a generous beginning to the day.",
          "Fresh fruit, homemade breads, comforting preparations and freshly brewed tea or coffee make a persuasive argument against rushing anywhere.",
          "There is time for another cup.",
          "There usually is.",
        ],
      },
      {
        h: "A table with a view.",
        p: [
          "Some meals belong around the welcoming table of the estate.",
          "Others are made memorable by the setting: a quiet corner of the estate, a sunlit courtyard, or an outdoor meal accompanied by the mountain air.",
          "Picnics and private dining arrangements can add another dimension to the experience, allowing the landscape to become part of the pleasure of eating.",
          "Food, after all, is as much about the moment as the meal.",
        ],
      },
      {
        h: "Made with care. Served with warmth.",
        p: [
          "Our kitchen is part of the same philosophy that guides life at Itmenaan.",
          "Take time. Use what is good. Welcome people generously.",
          "Sometimes, the most memorable thing about a meal is how beautifully uncomplicated it felt.",
        ],
      },
    ],
    gallery: ["i22", "i19", "i18", "i6"],
    links: [
      ["Explore Our Stays", "/stay"],
      ["Enquire About Dining Experiences", "enquire"],
    ],
  },
  {
    path: "/experiences",
    title: "Kumaon Experiences & Nature Walks | Itmenaan Estate",
    kind: "exp-index",
    nav: "Overview",
    hero: {
      img: "i6",
      mode: "full",
      eyebrow: "Experiences at Itmenaan",
      h1: "There is no hurry to see it all.",
      lede: [
        "Not every memorable experience requires a great adventure.",
        "Sometimes, it begins with following a path simply to see where it leads. With a conversation over tea. With the discovery of a bird whose song you have heard all morning but never quite recognised.",
        "And sometimes, it begins by deciding not to go anywhere at all.",
        "At Itmenaan, experiences are invitations to become a little more attentive to the world around you.",
        "There is no itinerary you must complete.",
        "Only possibilities.",
      ],
    },
    blocks: [
      {
        h: "Your pace. Your experience.",
        p: [
          "Some guests wish to explore every trail. Others prefer an afternoon in the courtyard.",
          "Our hosts can help shape your days around your interests, the season, available guides and the conditions of the surrounding landscape.",
          "The only thing we ask is that you allow yourself time to enjoy it.",
        ],
      },
    ],
    cta: {
      h: "Your pace. Your experience.",
      actions: [["Plan Your Stay", "enquire"]],
    },
  },
  {
    path: "/experiences/art-of-doing-nothing",
    title: "The Art of Doing Nothing | Itmenaan Estate",
    kind: "standard",
    nav: "The Art of Doing Nothing",
    hero: {
      img: "i23",
      mode: "full",
      eyebrow: "The signature Itmenaan experience",
      h1: "The Art of Itmenaan.",
      lede: [
        "When was the last time you spent an entire day without wondering what came next?",
        "Without looking at the clock. Without making plans. Without feeling that an afternoon must be filled to be worthwhile.",
        "At Itmenaan, doing nothing is something we take rather seriously.",
      ],
    },
    blocks: [
      {
        h: "An invitation to be.",
        p: [
          "Wake with the birds.",
          "Take your tea outside and watch the valley come slowly into focus. There may be a book waiting to be finished, a path you would like to follow or a comfortable chair that has been calling your name since breakfast.",
          "Nothing is expected of you.",
          "The day belongs entirely to your own sense of time.",
        ],
      },
      {
        h: "The restorative power of the ordinary.",
        p: [
          "We often travel in search of extraordinary experiences.",
          "Yet some of the most memorable moments are wonderfully ordinary.",
          "A meal enjoyed without hurry. The warmth of a fire. A conversation that continues long after the tea has gone cold. The pleasure of sitting together without feeling the need to speak.",
          "At Itmenaan, these moments are not interruptions between activities.",
          "They are the experience.",
        ],
      },
      {
        h: "Time, returned to you.",
        p: [
          "There are no prescribed rituals for finding peace here.",
          "The mountains offer their scale, the forests their quiet, and our hosts their natural warmth.",
          "What you choose to do with the time is entirely yours.",
          "Perhaps that is the greatest luxury of all.",
        ],
      },
    ],
    gallery: ["i19", "i22"],
    links: [
      ["Stay a Little Longer", "/stay"],
      ["Enquire About This Experience", "enquire"],
      ["All Experiences", "/experiences"],
    ],
  },
  {
    path: "/experiences/village-walks",
    title: "Guided Village Walks in Kumaon | Itmenaan Estate",
    kind: "standard",
    nav: "Village Life & Walks",
    hero: {
      img: "i11",
      mode: "full",
      eyebrow: "Village life & walks",
      h1: "A world best discovered on foot.",
      lede: [
        "A little beyond the estate, the landscape opens into another world.",
        "Narrow paths follow the contours of the hills. Terraced fields trace the mountainsides. Traditional houses stand among orchards, forests and small village courtyards.",
        "Life here follows a rhythm shaped by the seasons, the land and the relationships between people who call these hills home.",
        "The best way to encounter it is slowly.",
      ],
    },
    blocks: [
      {
        h: "Every path has a story.",
        p: [
          "Our village walks offer an introduction to the living culture of Kumaon.",
          "Accompanied by local hosts who know the surrounding paths, guests can explore the villages of Naugaon and Nayal, passing through terraced fields, woodland and traditional settlements.",
          "Along the way, there may be an opportunity to share tea, learn about local farming practices or simply enjoy a conversation.",
          "These are encounters with everyday life, approached with curiosity and respect.",
        ],
      },
      {
        h: "Naugaon. The beauty of the ordinary.",
        p: [
          "The walk towards Naugaon leads through a landscape of oak, pine and deodar trees, streams and cultivated terraces.",
          "Traditional homes reflect the building practices of the region, while the fields reveal the relationship between mountain life and the land.",
          "A village walk is not about collecting attractions.",
          "It is about noticing how a place is lived in.",
        ],
      },
      {
        h: "The knowledge of those who belong.",
        p: [
          "A local guide sees a landscape differently.",
          "A familiar tree carries a name and a memory. A path recalls an old journey. A crop tells the story of a season. A temple or family home becomes part of a larger understanding of Kumaon.",
          "Walking with someone who knows the mountains adds a dimension that no map can provide.",
        ],
      },
      {
        h: "Walk gently.",
        p: [
          "The villages around Itmenaan are home to communities whose lives continue independently of tourism.",
          "We encourage thoughtful encounters, respect for privacy and appreciation for the people who make these landscapes what they are.",
          "Some of the most rewarding journeys are those in which we learn to be good guests.",
        ],
      },
    ],
    gallery: ["i18", "i17"],
    links: [
      ["Enquire About Guided Village Walks", "enquire"],
      ["All Experiences", "/experiences"],
    ],
  },
  {
    path: "/experiences/forests-and-birdsong",
    title: "Birdwatching & Forest Walks in Kumaon | Itmenaan Estate",
    kind: "standard",
    nav: "Forests & Birdsong",
    hero: {
      img: "i12",
      mode: "full",
      eyebrow: "Forests & birdsong",
      h1: "The forest has its own conversation.",
      lede: [
        "Long before the day begins, the mountains are already awake.",
        "Birdsong travels through the trees. Light moves gradually across the slopes. The air carries the scent of woodland and the changing seasons.",
        "The natural world has a remarkable ability to draw our attention away from ourselves.",
        "All we have to do is listen.",
      ],
    },
    blocks: [
      {
        h: "A landscape alive with detail.",
        p: [
          "The forests around Itmenaan are home to oak, pine, rhododendron and a rich variety of mountain vegetation.",
          "Walks through these landscapes reveal the smaller details that are easy to overlook: a sudden movement among branches, a change in the forest floor, the call of a bird hidden somewhere overhead.",
          "There is no need to cover great distances.",
          "A little attention can make even a familiar path feel entirely new.",
        ],
      },
      {
        h: "Following birdsong.",
        p: [
          "Kumaon offers rewarding opportunities for birdwatching, whether you are an experienced enthusiast or someone who simply enjoys waking to the sounds of nature.",
          "Guided birding walks can be arranged according to availability, local conditions and the interests of our guests.",
          "The experience is less about completing a checklist and more about learning to observe.",
          "The forest rarely reveals everything at once.",
        ],
      },
      {
        h: "Walk towards the water.",
        p: [
          "Trails around the estate lead through woodland, terraces and streams towards a seasonal waterfall.",
          "Depending on conditions, the walk offers an opportunity to explore the surrounding landscape and spend time beside the water.",
          "There is a particular pleasure in reaching a beautiful place on foot.",
          "Even more so when there is no hurry to return.",
        ],
      },
      {
        h: "Nature, through the seasons.",
        p: [
          "Spring brings flowering rhododendrons and changing birdsong. Summer turns the hills a deeper green. The rains bring cloud and mist. Winter reveals distant Himalayan peaks with extraordinary clarity.",
          "Every season alters the landscape.",
          "Every visit offers a different way of seeing it.",
        ],
      },
    ],
    gallery: ["i14", "i18"],
    links: [
      ["Explore the Seasons", "/our-world/seasons"],
      ["Enquire About Nature Walks", "enquire"],
    ],
  },
  {
    path: "/experiences/sacred-landscape",
    title: "Jageshwar & Kumaon Temple Experiences | Itmenaan Estate",
    kind: "standard",
    nav: "The Sacred Landscape",
    hero: {
      img: "i16",
      mode: "split",
      eyebrow: "The sacred landscape of Kumaon",
      h1: "Where the mountains remember.",
      lede: [
        "In Kumaon, history and faith do not exist only in monuments.",
        "They live in the forests, in village traditions, in the ringing of temple bells and in the quiet rituals of everyday life.",
        "To travel through this landscape is to discover a relationship between people, memory and place that has endured across generations.",
      ],
    },
    blocks: [
      {
        h: "Jageshwar. A sanctuary of stone.",
        p: [
          "Set among towering deodar trees, the temple complex at Jageshwar is among Kumaon's most remarkable cultural landmarks.",
          "Ancient stone shrines rise from the forest, their carved forms carrying the artistic and spiritual traditions of centuries.",
          "There is a quiet grandeur to the setting.",
          "The trees, the stone and the atmosphere belong together so naturally that the temple complex seems inseparable from the landscape.",
          "A visit offers an opportunity to encounter both Kumaon's architectural heritage and its living traditions of worship.",
        ],
      },
      {
        h: "Chitai. The language of bells.",
        p: [
          "At the temple of Golu Devta, regarded locally as a deity of justice, countless bells bear witness to prayers, promises and gratitude.",
          "Some are small. Others are substantial. Together, they create an extraordinary expression of faith.",
          "The temple is a reminder that cultural meaning is found not merely in objects, but in the traditions and relationships that surround them.",
        ],
      },
      {
        h: "Sacred places, everyday life.",
        p: [
          "Village shrines, small temples and paths of pilgrimage are woven into the ordinary geography of Kumaon.",
          "They remain active places of devotion and community.",
          "When we visit them, we enter spaces that hold meaning for others. An attentive traveller comes not only to observe, but to understand and respect.",
        ],
      },
      {
        h: "Journeys of discovery.",
        p: [
          "Our hosts can help arrange visits to nearby cultural landmarks, according to guest interests and local conditions.",
          "There is much to see.",
          "And sometimes, the most meaningful part of a journey is the question it leaves with you.",
        ],
      },
    ],
    gallery: ["i17", "i11"],
    links: [
      ["Discover Kumaon", "/our-world"],
      ["Plan Your Excursion", "enquire"],
    ],
  },
  {
    path: "/our-world",
    title: "Discover Kumaon, Uttarakhand | Itmenaan Estate",
    kind: "standard",
    nav: "Discover Kumaon",
    hero: {
      img: "i17",
      mode: "full",
      eyebrow: "Beyond the estate",
      h1: "Kumaon. A world worth taking time for.",
      lede: [
        "There is another Himalaya beyond the familiar hill stations.",
        "One of terraced valleys, ancient temples, mountain villages, oak forests and extraordinary views. A place where culture is found not only in historic monuments, but in the quiet continuity of everyday life.",
        "This is Kumaon.",
        "And it rewards those who travel slowly.",
      ],
    },
    blocks: [
      {
        h: "The living mountains.",
        p: [
          "In Kumaon, the landscape is inseparable from the communities who inhabit it.",
          "Fields follow the contours of the hills. Paths connect villages and markets. Traditional houses reflect generations of architectural knowledge, while local food tells stories of seasons, agriculture and adaptation.",
          "The mountains are not simply a scenic backdrop.",
          "They are part of the way life is organised and understood.",
        ],
      },
      {
        h: "The beauty of small discoveries.",
        p: [
          "There are celebrated places here: the stone temples of Jageshwar, the wooded landscapes around Binsar, the old markets of Almora.",
          "But there are quieter discoveries too.",
          "A conversation in a village courtyard. A cup of tea overlooking the fields. An old doorway with beautifully worked timber. A trail that leads unexpectedly towards the sound of water.",
          "Sometimes, the smallest encounters reveal the greatest sense of place.",
        ],
      },
      {
        h: "Almora. A town of many stories.",
        p: [
          "Built along a mountain ridge, Almora carries the architectural and cultural influences of different periods of Kumaon's history.",
          "Its temples, markets, houses and everyday bustle offer another perspective on the region, complementing the quiet landscapes surrounding Itmenaan.",
          "A visit is an opportunity to discover the mountain town beyond its panoramic views.",
        ],
      },
      {
        h: "Binsar. The mountain forest.",
        p: [
          "The wooded landscapes around Binsar offer opportunities for nature observation, forest walks and the appreciation of Himalayan biodiversity.",
          "The experience changes with the season, the weather and the time of day.",
          "For those drawn to nature, it is a reminder that the most rewarding journeys often begin with patience.",
        ],
      },
      {
        h: "Jageshwar. Stone and sacred memory.",
        p: [
          "Ancient temples surrounded by forests create one of the region's most memorable cultural landscapes.",
          "Centuries of devotion, architecture and ritual are concentrated within a setting of remarkable natural beauty.",
          "It is a place that invites both curiosity and quiet reflection.",
        ],
      },
      {
        h: "Come with time.",
        p: [
          "Kumaon does not lend itself particularly well to a hurried checklist.",
          "Its pleasures are found in the spaces between destinations, in the conversations along the way and in the landscapes that persuade you to stop.",
          "We invite you to discover it without haste.",
        ],
      },
    ],
    gallery: ["i16", "i14", "i11", "i12"],
    links: [
      ["Explore Experiences", "/experiences"],
      ["Journeys Through Kumaon", "/journeys"],
      ["A Place for Every Season", "/our-world/seasons"],
    ],
  },
  {
    path: "/our-world/seasons",
    title: "Best Time to Visit Kumaon | Itmenaan Estate",
    kind: "seasons",
    nav: "A Place for Every Season",
    hero: {
      img: "i14",
      mode: "split",
      eyebrow: "The seasons at Itmenaan",
      h1: "The mountains are never quite the same.",
      lede: [
        "There is no single perfect time to experience the mountains.",
        "Every season brings its own light, its own colours and its own reasons to stay.",
        "At Itmenaan, the changing landscape is part of the pleasure of returning.",
      ],
    },
    blocks: [
      {
        h: "A reason to return.",
        p: [
          "The same room. The same familiar hospitality. An entirely different landscape.",
          "That is one of the great pleasures of the mountains.",
          "You never return to quite the same place.",
        ],
      },
    ],
    cta: {
      h: "You never return to quite the same place.",
      actions: [["Plan Your Stay", "book"]],
    },
  },
  {
    path: "/journeys",
    title: "Kumaon Retreats & Private Journeys | Itmenaan Estate",
    kind: "journeys",
    nav: "Curated Stays & Itineraries",
    hero: {
      img: "i24",
      mode: "full",
      eyebrow: "Curated stays & journeys",
      h1: "Stay a little longer.",
      lede: [
        "Some journeys are about seeing as much as possible.",
        "Others are about giving yourself enough time to feel somewhere deeply.",
        "Our curated stays bring together the pleasures of Itmenaan with experiences that invite a more personal relationship with the mountains, the people and the culture of Kumaon.",
        "Choose a few days of extraordinary quiet. Or allow the journey to lead you a little further.",
      ],
    },
    blocks: [
      {
        h: "Nothing hurried. Nothing unnecessary.",
        p: [
          "Our hosts can help you choose a stay that suits your interests, pace and preferred dates.",
          "Some experiences are seasonal. Others require advance arrangements or specialist guides.",
          "What matters most is that the journey feels like your own.",
        ],
      },
    ],
    cta: {
      h: "What matters most is that the journey feels like your own.",
      actions: [
        ["Enquire About a Journey", "enquire"],
        ["Check Availability", "book"],
      ],
    },
  },
  {
    path: "/journal",
    title: "Letters from Itmenaan | Stories from Kumaon",
    kind: "journal",
    nav: "Letters from Itmenaan",
    hero: {
      img: "i29",
      mode: "split",
      eyebrow: "Stories from the mountains",
      h1: "Letters from Itmenaan.",
      lede: [
        "Not everything worth remembering needs to become a great adventure.",
        "Some stories begin with the first rain after summer. Others with a conversation along a village path, an ingredient brought into the kitchen or a bird returning to the same branch each morning.",
        "Letters from Itmenaan is a collection of these moments.",
        "Observations from the mountains. Stories of people and place. Reflections on the pleasures of living a little more attentively.",
        "A little of Kumaon, wherever you may be reading.",
      ],
    },
    blocks: [],
  },
  {
    path: "/contact",
    title: "Contact & Directions | Itmenaan Estate",
    kind: "contact",
    nav: "Enquiries, Directions & Practical Information",
    hero: {
      img: "i25",
      mode: "split",
      pos: "78% 50%",
      eyebrow: "Contact & arrival",
      h1: "The journey is part of arriving.",
      lede: [
        "There is something satisfying about leaving the familiar behind.",
        "As the roads begin to climb, the landscape changes. The noise of the plains gives way to wooded hills, terraced valleys and the quieter rhythms of mountain life.",
        "And somewhere along the journey, anticipation begins to replace urgency.",
        "We look forward to welcoming you.",
      ],
    },
    blocks: [
      {
        h: "A little planning goes a long way.",
        p: [
          "As a mountain retreat, Itmenaan is intentionally removed from the bustle of major towns.",
          "We recommend confirming your travel arrangements in advance and allowing sufficient time to reach us comfortably.",
          "Our reservations team can share practical directions, arrival guidance and information about available transfer arrangements.",
        ],
      },
    ],
  },
  {
    path: "/book",
    title: "Book Your Stay | Itmenaan Estate",
    kind: "book",
    nav: "Check Availability",
    hero: {
      img: "i19",
      mode: "split",
      eyebrow: "Your stay at Itmenaan",
      h1: "A little time for yourself.",
      lede: [
        "The mountains are closer than you think.",
        "Choose your dates, discover your preferred cottage or room, and allow us to help you plan a stay shaped around the things that matter to you.",
        "Perhaps a few days of peace. A journey through Kumaon. Or simply time to do a little less.",
        "Whatever brings you here, we look forward to making you feel at home.",
      ],
    },
    blocks: [],
  },
];

export const stayCategories = [
  {
    path: "/stay/deodar-cottages",
    h: "Deodar Cottages",
    sub: "A little more room for solitude.",
    img: "i8" as ImgKey,
    p: [
      "Generous, private and closely connected to the outdoors, our three Deodar Cottages offer space to settle into the rhythm of the mountains.",
      "Large windows open towards the surrounding forests, valleys and Himalayan landscape, while private outdoor seating makes room for unhurried mornings and quiet evenings.",
    ],
    cta: "Explore Deodar Cottages",
  },
  {
    path: "/stay/pine-cottages",
    h: "Pine Cottages",
    sub: "Seclusion, naturally.",
    img: "i5" as ImgKey,
    p: [
      "Our two Pine Cottages offer an intimate mountain retreat for couples and small families.",
      "Independently positioned within the estate, they bring together the comforts of a private cottage and the easy pleasures of being surrounded by nature.",
    ],
    cta: "Explore Pine Cottages",
  },
  {
    path: "/stay/oak-rooms",
    h: "Oak Rooms",
    sub: "Where the old house welcomes you.",
    img: "i7" as ImgKey,
    p: [
      "Set within the original Kumaoni house, the two Oak Rooms retain the warmth, textures and character of traditional mountain living.",
      "They are quiet, welcoming spaces where heritage and comfort exist naturally together.",
    ],
    cta: "Explore Oak Rooms",
  },
  {
    path: "/stay/kafal-room",
    h: "Kafal Room",
    sub: "The quiet pleasure of simplicity.",
    img: "i21" as ImgKey,
    p: [
      "Intimate and full of character, the Kafal Room is ideal for solo travellers or couples who find that the most memorable stays require surprisingly little.",
      "A comfortable room in an old mountain house. A beautiful landscape just outside. And all the time you wish to give yourself.",
    ],
    cta: "Explore Kafal Room",
  },
];

export const roomTable = [
  ["Deodar Cottages", "3", "Generous spaces and outdoor sitting areas", "Couples, families"],
  ["Pine Cottages", "2", "Individually positioned and private", "Couples, small families"],
  ["Oak Rooms", "2", "Characterful rooms in the original heritage house", "Couples"],
  ["Kafal Room", "1", "Smaller heritage room", "Solo travellers, couples"],
];

export const experienceCards = [
  {
    path: "/experiences/art-of-doing-nothing",
    h: "The Art of Doing Nothing",
    sub: "A day that belongs entirely to you.",
    img: "i23" as ImgKey,
    p: [
      "Read. Rest. Walk a little. Stay for another cup of tea. Watch the changing light move across the valley.",
      "The simplest pleasures are often the ones that remain with us longest.",
    ],
    cta: "Explore the Art of Doing Nothing",
  },
  {
    path: "/experiences/village-walks",
    h: "Village Life & Walks",
    sub: "A world best discovered on foot.",
    img: "i11" as ImgKey,
    p: [
      "Follow quiet pathways through terraced fields, traditional settlements and surrounding forests.",
      "Accompanied by local guides, discover the everyday life of Kumaon through its people and landscapes.",
    ],
    cta: "Explore Village Walks",
  },
  {
    path: "/experiences/forests-and-birdsong",
    h: "Forests & Birdsong",
    sub: "Listen closely. The mountains are speaking.",
    img: "i12" as ImgKey,
    p: [
      "The surrounding forests are alive with birds, changing vegetation and the gentle sounds of the natural world.",
      "Walk slowly. Notice more.",
    ],
    cta: "Explore Nature Experiences",
  },
  {
    path: "/experiences/sacred-landscape",
    h: "The Sacred Landscape",
    sub: "Where history and faith belong to the land.",
    img: "i16" as ImgKey,
    p: [
      "Discover stone temples, forest shrines and places of worship that have shaped the cultural memory of Kumaon over centuries.",
    ],
    cta: "Explore the Sacred Landscape",
  },
];

export const seasons = [
  {
    h: "Winter. The mountains revealed.",
    months: "December to February",
    img: "i14" as ImgKey,
    p: [
      "Winter lends the Himalayan landscape a wonderful clarity.",
      "On suitable days, distant snow-covered peaks stand against the sky with remarkable definition. The air is crisp, the evenings are made for warmth, and the simple comforts of a good meal and a quiet room become especially satisfying.",
      "It is a season for lingering.",
      "For another cup of tea. Another chapter. Another evening by the fire.",
    ],
  },
  {
    h: "Spring. A mountain awakening.",
    months: "March to April",
    img: "i12" as ImgKey,
    p: [
      "The hills gradually change colour as spring moves through the forests.",
      "Rhododendrons begin to flower, vegetation responds to the warming days, and birdsong becomes an ever-changing accompaniment to the landscape.",
      "This is a beautiful time to follow woodland paths and discover the smaller details of the natural world.",
    ],
  },
  {
    h: "Summer. Life in a hundred shades of green.",
    months: "May to June",
    img: "i18" as ImgKey,
    p: [
      "Summer brings longer days and a landscape alive with growth.",
      "The forests and terraced fields turn green, outdoor meals become especially inviting and the hills offer a welcome contrast to the pace of the cities below.",
      "A few days here can become the kind of summer memory that remains long after the holiday has ended.",
    ],
  },
  {
    h: "Monsoon. The green silence.",
    months: "July to September",
    img: "i4" as ImgKey,
    p: [
      "Rain transforms the mountains.",
      "Clouds drift through the valleys, forests deepen in colour and familiar views disappear and reappear in the mist.",
      "It is a deeply atmospheric season, though travel and outdoor experiences must always take account of weather, access and safety conditions.",
      "Sometimes, the landscape is most compelling when it cannot be seen in its entirety.",
    ],
  },
  {
    h: "Autumn. The return of the horizon.",
    months: "October to November",
    img: "i17" as ImgKey,
    p: [
      "As the rains retreat, the skies begin to clear and the distant mountains return to view.",
      "Autumn brings a quality of light particularly suited to quiet walks, long mornings and evenings spent watching the valley.",
      "The world seems to settle once again into its winter rhythm.",
    ],
  },
];

export const journeys = [
  {
    h: "The Art of Itmenaan",
    meta: "A suggested three-night retreat",
    img: "i19" as ImgKey,
    lead: "A few days devoted entirely to yourself.",
    p: [
      "Unhurried mornings, thoughtful meals, quiet corners, forest walks if you wish, and plenty of time to do absolutely nothing.",
      "Designed for those who find that the greatest luxury is not needing a plan.",
    ],
    cta: ["Enquire About This Stay", "enquire"] as Link,
  },
  {
    h: "The Kumaon Way of Life",
    meta: "A suggested four- to five-night cultural journey",
    img: "i11" as ImgKey,
    lead: "Discover the rhythms of mountain life.",
    p: [
      "Discover the rhythms of mountain life through guided village walks, local cuisine, cultural landmarks and encounters with the people of Kumaon.",
      "A journey shaped by curiosity, consideration and the pleasure of travelling slowly.",
    ],
    cta: ["Explore This Journey", "enquire"] as Link,
  },
  {
    h: "The Naturalist's Retreat",
    meta: "A suggested three- to four-night nature experience",
    img: "i12" as ImgKey,
    lead: "Wake to birdsong.",
    p: [
      "Wake to birdsong, explore woodland paths and spend time observing the natural world with greater attention.",
      "A stay designed around the changing seasons and the varied landscapes surrounding Itmenaan.",
    ],
    cta: ["Enquire About This Experience", "enquire"] as Link,
  },
  {
    h: "A Little More Time Together",
    meta: "A suggested three-night stay for two",
    img: "i13" as ImgKey,
    lead: "Some of the most memorable conversations happen when there is nowhere else to be.",
    p: [
      "Enjoy quiet mornings, beautiful views, intimate dining possibilities and the rare pleasure of uninterrupted time together.",
    ],
    cta: ["Plan Your Stay", "book"] as Link,
  },
  {
    h: "The Kumaon Passage",
    meta: "A suggested five- to ten-night journey",
    img: "i17" as ImgKey,
    lead: "For those who wish to travel beyond a single destination.",
    p: [
      "Kumaon offers the possibility of an immersive journey across villages, valleys and mountain landscapes.",
      "Itmenaan can become part of a longer private itinerary combining stays, guided walks, heritage encounters and regional experiences.",
      "Each journey should be tailored to the travellers and the season.",
    ],
    cta: ["Request a Personal Itinerary", "enquire"] as Link,
  },
];

export const journalGroups = [
  {
    h: "Stories from the Estate",
    items: [
      ["The Pleasure of Wanting Nothing More", "On the uncommon satisfaction of a day that asks nothing of us."],
      ["A House That Belongs to Its Mountains", "The architectural memory of Kumaon and the beauty of building with a sense of place."],
      ["The People Behind the Peace", "Why the most enduring memory of a stay is often the kindness of those who welcome us."],
    ],
  },
  {
    h: "Stories from the Land",
    items: [
      ["The Geography of a Good Meal", "Following the journey of ingredients from the land to the table."],
      ["When the Rhododendrons Return", "Spring in Kumaon, told through the changing forest."],
      ["A Walk Without a Destination", "What the mountain paths teach us about seeing more by travelling slowly."],
    ],
  },
  {
    h: "Stories from Kumaon",
    items: [
      ["The Bells of Chitai", "Faith, gratitude and the extraordinary language of a mountain shrine."],
      ["Jageshwar: Where Stone Meets Forest", "An encounter with one of Kumaon's most evocative cultural landscapes."],
      ["Beyond the Familiar Himalayas", "An introduction to the villages, traditions and quiet pleasures of Kumaon."],
    ],
  },
];

export const arrival = [
  {
    h: "Arriving by road",
    lines: ["From Delhi: Approximately 9 hours."],
    p: "The journey gradually passes from the plains into the Himalayan foothills and onwards into Kumaon.",
  },
  {
    h: "Arriving by train",
    lines: ["Nearest major railway station: Kathgodam.", "Onward journey: Approximately 3 hours by road."],
    p: "",
  },
  {
    h: "Arriving by air",
    lines: ["Nearest airport: Pantnagar.", "Onward journey: Approximately 4 hours by road."],
    p: "",
  },
];

export const contactDetails = {
  name: BRAND,
  address: "Almora District, Uttarakhand, India",
  phone: "+91 78400 77773",
  phoneHref: "tel:+917840077773",
  email: "info@itmenaanlodges.com",
};

export const menuItems: { n: string; label: string; to: string; img: ImgKey; subs: Link[] }[] = [
  {
    n: "01", label: "The Estate", to: "/the-lodge", img: "i10",
    subs: [["The Philosophy", "/the-lodge"], ["Architecture & Heritage", "/the-lodge/architecture"], ["Our People", "/the-lodge/our-people"], ["Living Lightly", "/the-lodge/living-lightly"]],
  },
  {
    n: "02", label: "Stay", to: "/stay", img: "i9",
    subs: [["Deodar Cottages", "/stay/deodar-cottages"], ["Pine Cottages", "/stay/pine-cottages"], ["Oak Rooms", "/stay/oak-rooms"], ["Kafal Room", "/stay/kafal-room"]],
  },
  { n: "03", label: "The Kumaon Kitchen", to: "/the-kumaon-kitchen", img: "i13", subs: [] },
  {
    n: "04", label: "Experiences", to: "/experiences", img: "i6",
    subs: [["The Art of Doing Nothing", "/experiences/art-of-doing-nothing"], ["Village Life & Walks", "/experiences/village-walks"], ["Forests & Birdsong", "/experiences/forests-and-birdsong"], ["The Sacred Landscape", "/experiences/sacred-landscape"]],
  },
  {
    n: "05", label: "Our World", to: "/our-world", img: "i17",
    subs: [["Discover Kumaon", "/our-world"], ["A Place for Every Season", "/our-world/seasons"]],
  },
  { n: "06", label: "Journeys & Offers", to: "/journeys", img: "i24", subs: [] },
  { n: "07", label: "Journal", to: "/journal", img: "i29", subs: [] },
];

export const siblingGroups: { prefix: string; items: Link[] }[] = [
  { prefix: "/the-lodge", items: menuItems[0].subs },
  { prefix: "/stay", items: [["Overview", "/stay"], ...menuItems[1].subs] },
  { prefix: "/experiences", items: [["Overview", "/experiences"], ...menuItems[3].subs] },
  { prefix: "/our-world", items: menuItems[4].subs },
];
