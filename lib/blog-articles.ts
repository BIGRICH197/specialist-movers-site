/**
 * Full article bodies copied from specialistmovers.co.nz blog posts (human-written).
 */

export type BlogArticle = {
  title: string;
  sections: {
    heading: string;
    paragraphs: string[];
    /**
     * Optional photo rendered above the heading. Own photography beats stock on
     * these pages, so reach for lib/site-photos.ts before anything licensed.
     */
    image?: { src: string; alt: string; credit?: string };
    /**
     * Optional table, rendered after the paragraphs. Worth reaching for on
     * "how much does X cost" pages: every competitor ranking for those queries
     * leads with a price table, and Google pulls tables into snippets far more
     * readily than it pulls prose ranges.
     */
    table?: { caption?: string; columns: string[]; rows: string[][] };
    /**
     * Optional internal link rendered after the paragraphs. Paragraphs render as
     * plain text, so this is the only way a section can hand a reader (or a
     * crawler) off to the page that goes deeper on its subject.
     */
    link?: { href: string; label: string };
  }[];
  /**
   * Optional Q&A block rendered after the sections and emitted as FAQPage
   * schema. Keep questions unique across the site: a sweep in August 2026 found
   * 54 questions appearing on more than one page, which splits the signal
   * instead of compounding it.
   */
  faqs?: { q: string; a: string }[];
};

export const blogArticles: Record<string, BlogArticle> = {
  "the-ultimate-guide-to-house-moving-in-auckland": {
    title: "The Ultimate Guide to Moving Home in Auckland",
    sections: [
      {
        heading: "Figure out your dates early",
        paragraphs: [
          "Don't wait until you've packed your last spoon to start making calls. If you know you're moving out at the end of the month, try not to book your movers for the 30th or 1st. Everyone does that, and movers get booked out. Also, that's when prices magically go up.",
          "Even if you're not 100% sure of the exact date, at least start pencilling things in. Moving during the week is usually cheaper and less chaotic.",
        ],
      },
      {
        heading: 'Get rid of the "why do I still own this?" pile',
        paragraphs: [
          "You know that drawer with cables you haven't touched since high school? Now's the time.",
          "Go through one room at a time and just be honest with yourself. If it's broken, useless, or makes you roll your eyes, toss it, donate it, or list it on Trade Me. Don't move things you're going to throw out later.",
          'Keep a "donate" box by the door and just chuck stuff in as you go. It makes a bigger difference than you\'d think.',
        ],
      },
      {
        heading: "Don't trust every moving company's website",
        paragraphs: [
          "Anyone can say they're the best movers in Auckland. The real question is whether they'll show up on time, with enough people, and not chuck your things around like they're gym bags.",
          "Here's what matters:",
          "Ask around,friends, neighbours, even your local Facebook group.",
          "Be specific. Do they charge by the hour or flat rate? What happens if it rains? What if they scratch your fridge? Is there an extra fee for stairs or longer driveways?",
          "If you're moving from a place with tight parking, let them know upfront.",
          "You don't want surprises on the day. That's when things fall apart.",
        ],
      },
      {
        heading: "Start packing way earlier than seems normal",
        paragraphs: [
          "If you think packing will take two days, it'll probably take five. No joke.",
          'Begin with stuff you won\'t miss,books, winter coats, old decorations. Leave daily-use items for last. Use proper boxes, tape them properly, and label the top and side with where they go (e.g. "Kitchen – cutlery", not just "stuff").',
          "Also, don't overpack. You're not trying to win Tetris. One snapped box can ruin your day.",
          "Pro tip: pack one \"first night\" box. Toothbrush, change of clothes, snacks, phone charger, toilet paper, kettle. You'll be too tired to dig through everything.",
        ],
      },
      {
        heading: "Let people know you're moving",
        paragraphs: [
          "Not just your mates. You'll need to tell:",
          "Power and gas company",
          "Internet provider",
          "NZ Post (set up mail redirection,it's worth it)",
          "IRD, insurance, bank, car rego",
          "Your doctor, if you want to stay in the same network",
          "Write it all down and knock them off one by one. Saves chasing mail or unpaid bills later.",
        ],
      },
      {
        heading: "Don't assume the power's on at the new place",
        paragraphs: [
          "It's Auckland. Sometimes things don't work especially if the house was empty before you moved in.",
          "Call the power company at least a few days before and confirm everything's connected. Same with gas, water, and internet. If you're renting, double-check what's your job and what's the landlord's.",
          "Also, if it's a fibre-only property and your modem's not compatible, it's a slow start to your first week.",
        ],
      },
      {
        heading: "Clean both places (or pay someone to)",
        paragraphs: [
          "If you're leaving a rental, your bond depends on how clean it is. Some property managers are stricter than others. Either way, clean like it's your parents coming over.",
          "Wipe cupboards inside and out",
          "Clean the oven (you'll hate it but do it anyway)",
          "Check for cobwebs, especially in high corners",
          "Steam clean the carpet if needed",
          "If you're selling or just being decent, do the same for the new place before moving everything in. Even if it looks clean, you'll feel better.",
        ],
      },
      {
        heading: "Be ready on the day",
        paragraphs: [
          "It'll feel like everything's happening too fast. Stay calm.",
          "Have a clear spot for boxes. Stack by room or weight. Keep your essentials (wallet, keys, phone, coffee) in one bag you don't let go of. Take photos of everything you care about,TV wires, shelf setups, meter readings. Trust me, you won't remember where anything plugs in.",
          "And breathe. The movers are just people too. Offer a coffee or water. Direct them if needed but don't hover.",
        ],
      },
      {
        heading: "At the new place",
        paragraphs: [
          "Don't aim to unpack everything that night. You won't. Get your bed sorted. Set up the kettle. Plug in the fridge. Do what you need to feel okay.",
          "If you've got kids or pets, try to have someone watch them or at least take them out for part of the day. Moving's stressful enough without a toddler chasing the vacuum or the cat hiding in a drawer.",
          "Over the next few days, unpack one room at a time. Don't rush to make it perfect. You'll move things around anyway.",
        ],
      },
      {
        heading: "Extra tips just for Auckland",
        paragraphs: [
          "Rain comes out of nowhere, so have tarps or plastic wrap ready. Even if it looks sunny when you wake up.",
          "Driveways can be nightmares. If your street is steep or narrow, check if the truck can get close. If not, they may need to walk things up.",
          "Parking's a pain in some areas. Try to save a space near your place with bins or cones if you can. If it's an apartment or complex, check if you need to book a lift or access slot.",
          "Traffic is real. Let the movers know what time you want them and keep things flexible. A 15-minute delay can easily become 45 on a Friday.",
        ],
      },
      {
        heading: "A quick recap, without fluff",
        paragraphs: [
          "Don't leave packing or booking to the last minute",
          "Throw away or give away what you don't need",
          "Ask the right questions before hiring movers",
          "Label everything",
          "Tell your service providers",
          "Take photos for proof",
          "Clean both homes",
          "Keep snacks and phone chargers handy",
          "Don't expect to unpack everything on day one",
          "Take your time settling in",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Moving in Auckland takes effort, but with a bit of planning, clear thinking, and honesty about what you actually need, it's completely doable. You'll get through it,just not all in one day.",
        ],
      },
    ],
  },

  "diy-packing-vs-professional-packing-services": {
    title: "DIY Packing vs Professional Packers: What Each Really Costs",
    sections: [
      {
        heading: "The honest answer: most people should do both",
        paragraphs: [
          "Packing your own house saves real money. Paying us to do it saves real time and takes the worst job off your list. Almost nobody needs all of one or none of the other.",
          "What most of our customers land on is a split. They pack their own clothes, books, linen and the garage over a couple of weekends, and we come in the day before to do the kitchen, the glassware and anything breakable. That is the part that takes the longest, causes the most damage when it goes wrong, and is the least satisfying to do yourself at 11pm.",
        ],
      },
      {
        heading: "What packing your own house actually costs",
        paragraphs: [
          "Not nothing. Cartons, tape, bubble wrap and paper for a three-bedroom house runs to a couple of hundred dollars if you buy decent ones, and supermarket boxes will let you down under weight. Add two or three weekends of your own time.",
          "The bigger cost is the one people do not budget for: the fridge that got packed last and had to be emptied on move morning, or the box of plates that went in with newspaper between them instead of paper and arrived as a bag of pieces. We see both most months.",
        ],
      },
      {
        heading: "What we charge to pack it for you",
        paragraphs: [
          "Three packers, labour and all materials, the day before your move:",
          "One bedroom $1,599 plus GST. Two bedrooms $1,770. Three bedrooms $1,962. Four bedrooms $2,486.",
          "That is the whole house, boxed and labelled by room, ready to load. Nothing left to do the night before except make the bed you are about to take apart.",
        ],
      },
      {
        heading: "Or just the parts you do not want to do",
        paragraphs: [
          "Partial packing is priced by room rather than by house, so if you only want the kitchen done, you only pay for the kitchen. If you want something more specific than that, our packers are $180 an hour for a team of three plus an $80 callout, and you point them at whatever you like.",
          "The kitchen is the room to hand over if you only hand over one. It is the most breakable, the most fiddly, and the one that eats a whole evening.",
        ],
      },
      {
        heading: "Where DIY packing usually goes wrong",
        paragraphs: [
          "Boxes packed too heavy to lift. A full carton of books weighs more than you think, and a box that cannot be carried safely gets dragged, which is how corners split and floors get marked.",
          "Plates packed flat. They travel on their edges, standing up like records, with paper between each one. Flat plates crack under the weight of the plates above them.",
          "Nothing labelled. Every box that arrives unmarked is a box someone has to open to find the kettle. Write the room on the top and one side, because you will only see one of those when it is stacked.",
          "Half-packed on the day. This is the one that costs money rather than crockery, because we are charged by the hour and a crew standing around while you finish the wardrobe is an hour on your invoice.",
        ],
      },
      {
        heading: "Things we would rather you did not pack yourself",
        paragraphs: [
          "Anything you would be upset to lose. Not because we do not trust you, but because breakables need the right paper, the right box and the right amount of it, and that is a skill rather than an effort.",
          "Televisions and monitors, unless you kept the original box. They need corner protection and to travel upright.",
          "Marble, glass tabletops and mirrors. These travel on their edges in a padded frame, never flat, and we bring the frame.",
          "Paint, gas bottles, fuel and anything aerosol. We cannot carry those, so they need to go in your own car or be disposed of before the day. Worth checking the shed early rather than on move morning.",
        ],
      },
      {
        heading: "If you are packing yourself, do it in this order",
        paragraphs: [
          "Start with the rooms you barely use, four weeks out. The spare room, the linen cupboard, the garage. Nothing in those is needed before you move.",
          "Do the books and the ornaments next, then clothes out of season. Keep the boxes small and heavy things low.",
          "Leave the kitchen, the bathroom and one set of bedding until the last two days. Pack a single box that travels in your car with the kettle, mugs, teabags, phone chargers, toilet paper and a change of clothes. Label it so nobody puts it on the truck.",
          "Get everything sealed and stacked by a wall the night before. Not because we mind, but because a crew that can start loading at 8am finishes earlier, and you are paying for the hours.",
        ],
      },
      {
        heading: "So which one should you pick?",
        paragraphs: [
          "Pack it yourself if you have three or four spare weekends, a straightforward household, and you would rather spend the money on the move than the packing.",
          "Get us to do it if you are working full time, moving at the end of the month, downsizing after decades in one house, or you have a kitchen full of things you would not want to replace. Also if you simply do not want to, which is a perfectly good reason.",
          "And if you are not sure, ask us for a viewing. We will walk the house with you, tell you what we would pack and what you could handle, and price both so you can see the difference rather than guess at it.",
        ],
      },
    ],
  },
  "stress-free-moving-in-auckland-expert-tips-from-specialist-movers": {
    title: "Stress-Free Moving in Auckland: Expert Tips from Specialist Movers",
    sections: [
      {
        heading: "Introduction",
        paragraphs: [
          "Shifting to a new home doesn't have to be a daunting task. Proper planning and expert guidance can simplify your relocation. Here are some tips from expert movers to guide you through the process:",
        ],
      },
      {
        heading: "Expert tips at a glance",
        paragraphs: [
          "Step 1: Prepare a Proper Strategy",
          "Step 2: Free up Space Before Packing Begins",
          "Step 3: Pack your Bags Systematically",
          "Step 4: Book Professional Movers in Auckland",
          "Step 4: Plan for the D-Day",
          "Step 5: Settle Into Your New Home",
          "For room-by-room detail, packing lists, and Auckland-specific advice, read our full Ultimate Guide to House Moving in Auckland on this blog.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Relocating to a new place can be full of hassles. However, with proper planning and systematic arrangements, moving to Auckland can be a breezy affair. From packing boxes to unloading them, professional movers in Auckland ensure the transition is smooth. Follow the expert guide to enjoy a stress-free move.",
        ],
      },
    ],
  },
  "how-much-do-movers-cost-in-auckland": {
    title: "How Much Do Movers Cost in Auckland? Real 2026 Numbers",
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Most Auckland house moves with a professional crew land somewhere between $300 and $1,300 plus GST, depending on how much you own, what day you move, and how awkward the access is. Across the 4,000+ moves across Auckland and the Waikato we've done, our average house move invoice comes in a little under $1,200 plus GST.",
          "That's a wide range, so here's exactly how the pricing works, with real numbers. These are our actual 2026 rates, not a lead-generation guess.",
        ],
      },
      {
        heading: "How Auckland movers actually charge",
        paragraphs: [
          "Almost every reputable Auckland mover charges the same way: an hourly rate for the crew and truck, plus a one-off callout fee that covers getting the truck to you and back to base.",
          "The clock runs from arrival at your pickup address to the last item off the truck at the other end. So the total is simple: hours worked times the hourly rate, plus the callout.",
          "Two things move the hourly rate around: crew size (two or three movers, occasionally four for big houses) and the day of the week. Weekends and Fridays are the busiest days in Auckland, so they cost more. Tuesdays and Thursdays are the quietest, so they cost less.",
        ],
      },
      {
        heading: "Our 2026 rates",
        paragraphs: [
          "A two-person crew with a truck starts at $120 per hour plus GST on a Tuesday, our cheapest day. Midweek days sit around $130 to $135, and Friday, the most popular day of the week, is $150. A three-person crew runs $40 to $50 an hour more than two.",
          "The callout fee depends on how far you are from our Wairau Valley depot. Close-in Auckland (roughly within 23 kilometres) is $60 for a two-person crew. The outer suburbs, like the Hibiscus Coast or Pukekohe, are $80, and the fringe of the region is $120. The hourly rate itself is the same across all of Auckland; only the callout changes with distance.",
          "Everything is plus GST, and we tell you the day rate and the callout before you book, so the structure you're quoted is the structure you're invoiced on.",
        ],
      },
      {
        heading: "Worked examples by house size",
        paragraphs: [
          "A one-bedroom apartment with easy access at both ends typically takes a two-person crew about two hours. On a Tuesday that's 2 x $120 + $60 callout = $300 plus GST.",
          "A two-bedroom home usually runs about three hours. Midweek: 3 x $135 + $60 = $465 plus GST.",
          "A three-bedroom home is around four hours with straightforward access. On a Friday: 4 x $150 + $60 = $660 plus GST.",
          "A four-bedroom home is a three-person job and usually six hours or more. On a Monday: 6 x $175 + $80 = $1,130 plus GST, and bigger or harder versions of that move go up from there.",
          "Those hour estimates assume the truck can park close and there are no big flights of stairs. Difficult access at either end adds roughly half an hour to an hour per end, which is the single most common reason a move costs more than people expect.",
        ],
      },
      {
        heading: "What pushes the price up",
        paragraphs: [
          "Day of the week. Friday and the end of the month are peak. If your dates are flexible, a Tuesday or Thursday mid-month is the same crew doing the same work for up to $30 an hour less.",
          "Access. Stairs, long carries from the truck to the door, steep or narrow driveways, and apartment lifts that need booking all add time, and time is what you're paying for.",
          "Not being ready. If the crew arrives and boxes are still being packed, you pay hourly for packing you could have done yourself. Fully packed, labelled and stacked near the door is the cheapest move there is.",
          "Furniture that needs disassembly. Beds, trampolines and big wardrobes come apart quickly if we know about them in advance, and slowly if we discover them on the day.",
        ],
      },
      {
        heading: "Packing and cleaning, if you want the full service",
        paragraphs: [
          "Professional packing is priced by house size, with three packers, all materials included, done the day before your move: $1,599 plus GST for a one-bedroom, $1,770 for two bedrooms, $1,962 for three, and $2,486 for four. Partial packing, like just the kitchen, is priced by the room and costs a lot less.",
          "Move-out cleaning starts at $280 plus GST for a one-bedroom, one-bathroom home and scales with beds and bathrooms, up to $730 for a five-bedroom. If you're leaving a rental, this is usually cheaper than losing part of your bond.",
        ],
      },
      {
        heading: "How to keep your move cheap",
        paragraphs: [
          "Book a Tuesday or Thursday, and avoid the last and first days of the month if you possibly can.",
          "Declutter before you pack. Every box you don't move is minutes you don't pay for.",
          "Be completely packed before the crew arrives, and label boxes by room so unloading is fast.",
          "Tell your mover the truth about access. If the driveway is steep or there are two flights of stairs, saying so upfront gets you an accurate quote instead of an awkward surprise.",
          "Reserve parking as close to your door as you can at both ends. Ten metres of extra carry, repeated eighty times, is real money.",
        ],
      },
      {
        heading: "Get an actual number for your move",
        paragraphs: [
          "Ranges are useful, but your move has a specific price. Tell us your suburbs, house size and preferred date through the quote form on our house moving page and we'll come back with the real figure, usually within 15 minutes during business hours. No obligation, and the number we quote is the pricing structure we invoice on.",
        ],
      },
    ],
  },

  "office-move-auckland-planning-guide": {
    title: "Planning an Office Move in Auckland: Timeline, Costs and What Everyone Forgets",
    sections: [
      {
        heading: "Why office moves go wrong",
        paragraphs: [
          "Office moves fail differently from house moves. Nobody's grandmother's china gets broken. Instead, the phones don't work on Monday, the server is in a box nobody labelled, and the one person who knew the alarm code is on leave.",
          "The pattern behind almost every messy office relocation we've seen is the same: the move was treated as a single day instead of a six-week project, and it was scheduled during business hours because that seemed simpler. It isn't.",
        ],
      },
      {
        heading: "The timeline that works",
        paragraphs: [
          "Six weeks out: confirm the new premises, measure the lift and doorways, and decide what furniture is coming. Book your mover now, not in week five, especially if you want a weekend slot.",
          "Four weeks out: tell your IT provider the date. Internet circuits at the new site routinely take three to four weeks to provision in Auckland, and this is the deadline businesses miss most often.",
          "Two weeks out: order crates or boxes, assign every desk a number that matches a floor plan of the new office, and book the lifts and loading docks at both buildings with the building managers.",
          "Move week: staff pack their own desks into labelled crates by Thursday night. IT shuts down and disconnects gear last, photographs the cabling, and packs screens properly.",
          "Move day, ideally a Friday evening or Saturday: the crew moves everything against the numbered floor plan, furniture is placed and assembled at the new site, and IT reconnects over the weekend. Monday morning, people sit down and work.",
        ],
      },
      {
        heading: "What an office move costs in Auckland",
        paragraphs: [
          "Commercial moves are priced the same transparent way as our house moves: an hourly rate for the crew and truck plus a callout fee, with the crew sized to the job. A small office of six to ten desks is usually a few hours for a crew; a full floor is a planned evening-and-weekend operation with a bigger team.",
          "After-hours and weekend moves cost slightly more per hour but are almost always cheaper overall, because the alternative is your whole team being paid to not work while the office is in boxes around them.",
        ],
        link: {
          href: "/blog/how-much-does-it-cost-to-move-an-office-in-auckland",
          label: "Full cost breakdown: what an office move costs in Auckland",
        },
      },
      {
        heading: "The stuff everyone forgets",
        paragraphs: [
          "Lift bookings. Most Auckland CBD and Takapuna buildings require the service lift to be booked in advance, often with a time window and sometimes a bond. If it isn't booked, your move waits in the loading dock.",
          "Building requirements. Many commercial buildings want your mover's insurance details before allowing access. We supply these routinely, but it takes a day, not a minute.",
          "Filing cabinets and drawers. They must be emptied. A full four-drawer filing cabinet is a two-person lift at best and a lift-and-doorway problem at worst.",
          "Keys, access cards and alarm codes for both sites, held by someone who is actually present on move day.",
          "The tip run. Every office move surfaces broken chairs and dead monitors nobody wants to pay to relocate. Decide in advance what's being disposed of, and we can take it away rather than moving rubbish to your nice new office.",
        ],
      },
      {
        heading: "Take less than you think",
        paragraphs: [
          "The cheapest thing to move is nothing. Office furniture is heavy, bulky and cheap to replace second-hand, so audit honestly: if the new space is fitted out, or your desks are fifteen years old, selling or donating them often beats paying by the hour to relocate them.",
          "What is worth moving carefully: screens, IT equipment, whiteboards with anything important on them (photograph them anyway), plants, and anything with compliance records in it.",
        ],
      },
      {
        heading: "Keeping the business running",
        paragraphs: [
          "The gold standard is that customers never notice you moved. That means moving outside business hours, having phones and internet live at the new site before the old one is disconnected, and keeping one 'essentials' crate per team that travels last and opens first.",
          "For larger offices, a phased move works well: non-essential storage and spare furniture go earlier in the week, and the working desks move in one fast overnight push.",
        ],
      },
      {
        heading: "How we run commercial moves",
        paragraphs: [
          "Specialist Movers runs regular commercial work for dozens of Auckland businesses, from office relocations to weekly runs for cabinetry and fit-out companies, alongside the 4,000+ moves we've completed across Auckland and the Waikato. Commercial gear gets blanket-wrapped as standard, crews are sized to the job, and you get one contact who owns the plan from quote to final box.",
          "If you're planning an office move anywhere in Auckland, tell us your team size, both addresses and your ideal date through our office moving page, and we'll come back with a plan and a price. The earlier we see the job, the smoother your Monday morning.",
        ],
      },
    ],
  },
  "auckland-moving-day-checklist": {
    title: "The Complete Auckland Moving-Day Checklist: 4 Weeks to Keys in Hand",
    sections: [
      {
        heading: "Why Auckland moves need their own checklist",
        paragraphs: [
          "Moving house is the same everywhere in one sense: boxes, truck, new address. But Auckland adds its own layer. Narrow driveways on the North Shore. Apartment buildings in the CBD that share one service lift between six floors of residents. The Harbour Bridge turning a 20-minute run into an hour when the motorway stacks up. And, of course, the rain.",
          "This checklist is built around those realities. Work through it in order and you will not be scrambling on the day.",
        ],
      },
      {
        heading: "Four weeks out: the decisions that save you later",
        paragraphs: [
          "Book your moving company first. Good crews in Auckland fill up fast, especially on Fridays and at the end of the month when leases turn over. If you have a large home, ask about a free viewing. A 20-minute walk-through lets the crew plan the right truck size and team size, usually two to four people, so there are no surprises on the day.",
          "Contact your body corporate or building manager if you are leaving or arriving in an apartment. Ask two things: when is the service lift available, and does the building require a bond to hold it? Some Auckland apartment buildings only allow lift bookings on weekday mornings. Finding this out now means you can choose a move time that actually works.",
          "Notify the important people. That means Waka Kotahi for your licence address, your bank, Inland Revenue, your GP, and your kids' school. The NZ Post mail redirection service is worth setting up even if you update everyone, because something always slips through.",
          "Start collecting boxes. Liquor stores, supermarkets, and Facebook Marketplace are all good sources in Auckland. Wardrobe boxes are worth buying properly as they save a lot of time with hanging clothes.",
        ],
      },
      {
        heading: "One week out: logistics and Auckland-specific prep",
        paragraphs: [
          "Sort your parking well before the day. You need a clear space at both ends for the truck. At the departure address, check whether you need a temporary no-parking sign from Auckland Transport. You can apply online, and it usually requires a few days' notice. If you are moving into a street with metered parking or yellow lines, the same process applies.",
          "Confirm your lift booking if you are in an apartment. Call the building manager again. Get the time slot in writing, even just a text will do.",
          "Pack a moving-day box and keep it separate from everything else. Put in: phone chargers, a change of clothes, kids' essentials, toilet paper, a kettle, coffee or tea, and snacks. This box travels in your car, not the truck. You will thank yourself at 6pm when you cannot find anything.",
          "If you have booked a packing service, this is typically done the day before your move. Confirm the time with your moving company and make sure someone will be home to let the crew in.",
          "Defrost your freezer. Put a towel down. Do it the night before if you can.",
        ],
      },
      {
        heading: "The night before: the hour that makes the morning",
        paragraphs: [
          "Disassemble anything that needs it. Bed frames, flat-pack shelving, the TV bracket if it is coming with you. Doing this at 7am while the crew waits costs everyone time.",
          "Check the weather forecast. Auckland's rain is frequent and can be heavy. If rain is likely, put a few large rubbish bags in an easy-to-reach spot. They go over mattresses and fabric furniture during loading. A good moving crew will bring blankets and protective gear, but the bags are cheap insurance.",
          "Put your appliances near the door if they are going. Washing machines need to be drained and the drum secured for transport. If you are not sure how, your moving company can advise.",
          "Set an alarm that gives you enough time. If the crew arrives at 8am, be up by 6:30. You need breakfast, a clear head, and time to do a final walk-through before anyone starts carrying boxes.",
        ],
      },
      {
        heading: "Moving day: what to do from the moment the crew arrives",
        paragraphs: [
          "Walk the crew through the property before they start. Point out anything fragile, anything that is not coming, and anything that needs special handling. A piano, for example, or a large piece of art. The crew will plan the load order around the truck and the destination layout.",
          "Stay available but out of the way. The crew works fastest when they can move freely. Keep children and pets somewhere safe and calm.",
          "Plan your driving around Auckland traffic. If you are crossing the Harbour Bridge, avoid the 7:30 to 9am and 4 to 6:30pm windows if you can. The Northwestern and Southern motorways follow similar patterns. A midmorning start often means both trucks and cars move faster between the two addresses.",
          "At the new address, be there before the truck. Propping doors open, clearing the path, and knowing where everything is going saves the crew time and saves you money on an hourly job.",
        ],
      },
      {
        heading: "The Auckland rain plan",
        paragraphs: [
          "Auckland averages rain on more days than most New Zealanders expect, and moving in the wet is genuinely harder. Here is what helps.",
          "Lay old towels or a plastic sheet at both entry points. Mud tracks through a house fast when people are carrying boxes every 90 seconds. If the forecast is for heavy rain, talk to your moving company about timing. Starting earlier and finishing before a front arrives is often possible.",
          "Electronics and documents should go in waterproof containers or sealed plastic bags. Cardboard boxes are fine in light drizzle but not in a downpour. Your moving company's truck has a taillift and a covered deck, so the time boxes are exposed is short. But the walk between the truck and the door is where things get wet.",
          "Do not cancel a move because of rain unless it is genuinely extreme. Auckland moves happen in the wet every week. A prepared crew handles it.",
        ],
      },
      {
        heading: "After the truck leaves: the things people forget",
        paragraphs: [
          "Do a full walk-through of the old property before you hand over keys. Check every cupboard, the garage, the hot water cupboard, the shed if there is one. Look in the ceiling space if you store things up there. Check the letterbox.",
          "Take photos of the empty property. This protects your bond if you are renting. If you have booked a move-out clean, make sure it is scheduled for after the truck has gone and before the landlord inspection.",
          "At the new place, locate your water toby, your electrical board, and your internet router position before you unpack anything. These are the three things you will need to find in a hurry at some point in the first week.",
          "Update your address with any automated payments or subscriptions. Set a reminder to do it over the next few days while the move is fresh.",
        ],
      },
      {
        heading: "Ready to get a quote?",
        paragraphs: [
          "If you are planning a move in Auckland and want to know what it will cost, you can get a quote through the Specialist Movers website. During business hours, quotes usually come back in about 15 minutes. Hourly rates are the same across Auckland. The fixed callout varies with distance from our depot, and you see the full price upfront before you book.",
          "We operate seven days a week and have completed over 4,000 moves across Auckland and the Waikato. If your home is on the larger side, we are happy to do a free viewing first so you get an accurate quote rather than a guess. Fill in the form on our site and we will be in touch.",
        ],
      },
    ],
  },
  "moving-into-out-of-auckland-apartment": {
    title: "Moving Into or Out of an Auckland Apartment: What You Need to Know",
    sections: [
      {
        heading: "Apartment moves are a different job",
        paragraphs: [
          "Moving a house and moving an apartment look similar on paper. In practice they are quite different. A house move is mostly about volume. An apartment move is mostly about access, rules, and timing.",
          "Get the access side wrong and your move stalls in the lobby while the body corporate manager fields complaints. Get it right and the whole day runs smoothly. This guide walks you through exactly what to sort before moving day.",
        ],
      },
      {
        heading: "Start with the body corporate",
        paragraphs: [
          "Most Auckland apartment buildings with more than a handful of units have a body corporate. It sets the rules for how moves happen in common areas. These rules vary a lot between buildings, so the first thing to do is contact the building manager or body corporate directly.",
          "Ask these questions: Is there a designated moving time window? Many Auckland buildings only allow moves between 8 am and 5 pm on weekdays, or restrict Saturday moves. Some ban Sunday moves entirely. Is a bond or damage deposit required before your move? Some bodies corporate charge one, refundable after they inspect the common areas. Is there a move-in or move-out form to fill in? Do not assume it is handled automatically.",
          "Get the answers in writing, even if it is just an email reply. That protects you if anything is disputed later.",
        ],
      },
      {
        heading: "Booking the service lift",
        paragraphs: [
          "Most buildings with multiple floors have a service lift separate from the passenger lift, or at least a way to book the main lift for exclusive use during your move. Book it as early as possible, weeks out if you can. On popular move-out dates, like end-of-month or end of tenancy, that lift slot can fill up fast.",
          "When you book, confirm the lift dimensions. Auckland service lifts range from generous to very tight. A standard Auckland apartment service lift is often around 1.2 m wide by 2.0 m deep, sometimes smaller. That is enough for a fridge laid on its side, a queen mattress on edge, and most flat-pack furniture. It is rarely enough for a large corner sofa in one piece.",
          "Tell the building manager your move start and finish times and ask them to note it in the building system. Some buildings use a paper sign-up sheet. Others use an online portal. Either way, get confirmation.",
        ],
      },
      {
        heading: "Loading zones and truck access in Auckland",
        paragraphs: [
          "This is where a lot of apartment moves hit trouble. Auckland's inner-city and fringe suburbs, think Parnell, Grey Lynn, Newmarket, Ponsonby, the CBD waterfront, often have narrow streets and limited stopping space outside apartment buildings.",
          "Before moving day, check whether the building has a dedicated loading zone. If it does, ask whether you need to notify Auckland Transport or the building manager to reserve it. Some loading zones are first-come-first-served and another vehicle can simply park there.",
          "If there is no dedicated zone, your movers will need to double-park briefly or use a nearby space. A professional crew is used to this and will work quickly. But you should flag the access situation when you get your quote so nothing is a surprise on the day.",
          "Our trucks have taillifts, which matters here. A taillift means the truck can sit at the kerb and load from ground level without needing a loading dock. That flexibility helps a lot in tight Auckland streets.",
        ],
      },
      {
        heading: "What fits and what does not",
        paragraphs: [
          "Before moving day, measure three things: your apartment door width, the service lift interior, and any tight corners in the common corridors. These three measurements will tell you almost everything you need to know about what can move in one piece.",
          "Standard Auckland apartment doors are 810 mm wide. Most furniture is designed with that in mind. The items that cause problems are large corner sofas, California king beds (wider than a standard king), big dining tables, and upright pianos.",
          "If you have a piano, that is a specialist job on its own. Specialist Movers is trusted by Steinway dealers and Auckland Town Hall for piano moves. A piano in an apartment building, especially one involving a service lift, needs a crew that knows exactly what they are doing.",
          "For anything you are not sure about, a photo sent through before the move is worth a thousand words. We can tell you quickly whether something is going to need disassembly or a different approach.",
        ],
      },
      {
        heading: "Protecting common areas",
        paragraphs: [
          "Bodies corporate take damage to lifts, lobby walls, and corridors seriously. Scratched lift doors or a gouged skirting board can come out of your bond. A professional crew will bring furniture blankets and padding to protect tight corners and lift interiors.",
          "Ask the building manager whether they require corner protectors or lift padding to be installed before the move begins. Some buildings supply these. Others expect you to bring your own. Either way, a good crew handles this without being asked.",
          "It is also worth doing a quick walk of the common areas when your movers arrive, before anything is carried in or out. Note any existing damage and photograph it. That protects you if the body corporate later claims your move caused a scuff that was already there.",
        ],
      },
      {
        heading: "Packing and timing tips for apartment moves",
        paragraphs: [
          "Apartments are often short on space to stage packed boxes. A good approach is to pack room by room and stack boxes in one area, usually the living room, to keep corridors clear for the movers to work.",
          "If packing the whole apartment yourself feels like too much, we offer a packing service the day before your move. The crew comes in, packs everything properly, and labels it. Then the move itself the next day is faster because everything is already boxed and ready.",
          "Timing matters in apartments more than in houses. If your lift slot is 9 am to 1 pm, you want the truck at the building before 9, not pulling up at 9. Build in a buffer. And if you are moving out and someone else is moving in the same day, coordinate with the building manager so you are not competing for the same lift at the same time.",
        ],
      },
      {
        heading: "Getting a quote for your Auckland apartment move",
        paragraphs: [
          "Every apartment building in Auckland is a bit different. The lift dimensions, the loading zone situation, the body corporate rules, they all affect how long a move takes and what the crew needs to prepare for.",
          "When you fill in a quote request on our website, include the floor level, the lift access situation, any known restrictions from the body corporate, and details of anything large or awkward. We get quotes back in about 15 minutes during business hours. You see the full price before you commit, with no surprises on the day.",
          "We operate seven days a week, which helps when your lift slot or body corporate rules only allow a weekend move. If you have a larger apartment and want a crew member to do a free viewing first, that is available too. Head to the website, fill in the details, and we will come back to you shortly.",
        ],
      },
    ],
  },
  "balcony-fridge-delivery-st-heliers-auckland": {
    title: "How We Got a Full-Size Fridge Up a Balcony in St Heliers",
    sections: [
      {
        heading: "The job in plain terms",
        paragraphs: [
          "In June 2026 we delivered a full-size fridge to a property in St Heliers. Sounds straightforward. It was not.",
          "The fridge measured 900mm wide, 710mm deep, and 1717mm tall. The access route went up one flight of stairs and then through a balcony opening. That opening measured 855mm at the bottom, narrowing to 820mm at the top where a slat wall cut into the clearance.",
          "We had two movers on the job. This is what we did.",
        ],
      },
      {
        heading: "Why the measurements mattered so much",
        paragraphs: [
          "The fridge was 900mm wide. The tightest point of the balcony opening was 820mm. On paper that is an 80mm problem.",
          "In practice it means you cannot carry the fridge upright and walk it straight through. You have to think about which way the item can be tilted, whether the depth changes when it is on its side, and whether the balcony floor and the balustrade give you enough working room to rotate safely.",
          "We also had a measurement query before the job. The original email listed the fridge height as 17170mm, which is clearly a typo for 1717mm. We flagged that with the client before dispatch. Always confirm measurements from the manufacturer spec sheet or measure the item yourself. A wrong number at the planning stage costs everyone time on the day.",
        ],
      },
      {
        heading: "Planning before we turned up",
        paragraphs: [
          "We reviewed the measurements against the access notes ahead of the job. The staircase and balcony route was identified as the only viable way in. The main door approach was ruled out based on the site information we had.",
          "Two movers is the right crew size for a job like this. A third person in a narrow balcony space creates more problems than it solves. What you need is two people who know how to read each other and communicate through a lift, not a crowd.",
          "We made sure the truck had the right gear loaded. Our trucks carry taillifts, furniture blankets, and strapping as standard. For an item this size and weight, the taililft handles the ground-to-truck stage safely. The manual work is the stair and balcony section, and that is where technique counts.",
        ],
      },
      {
        heading: "How we got it through",
        paragraphs: [
          "Up the stair flight first. One mover at the base controlling the weight, one at the top guiding. We use leg drive, not back strain. Short, deliberate steps. Fridge blankets protect the item and the walls.",
          "At the balcony the challenge is the narrowing opening. The fridge had to be tilted and rotated to clear the slat wall at the top. We worked out the angle on site, confirmed the fridge depth in that position gave us clearance, and moved slowly. No rushing a manoeuvre like that.",
          "The balustrade to glass half wall at the base gave us 855mm, which was workable. The 820mm at the top was the pinch point, and that is where we took the most care. It cleared. The fridge was placed, levelled, and left ready to connect.",
        ],
      },
      {
        heading: "What St Heliers access is often like",
        paragraphs: [
          "St Heliers sits on the eastern bays. A lot of the housing stock there is built on sloped sections, which means split levels, external stairs, and balcony access routes are common. Streets like Polygon Road and Tuatai Place have properties where a front door is not the obvious or only option.",
          "If you are moving into or within the eastern bays, it is worth thinking carefully about how large items will actually get inside. The balcony route is more common than people expect, and it changes the job considerably.",
        ],
      },
      {
        heading: "What to check if you have a similar item",
        paragraphs: [
          "Measure the item in all three dimensions, and double-check the manufacturer spec rather than relying on a listing. Heights especially get rounded or mistyped.",
          "Measure your access route at every pinch point, not just the widest part. Balcony openings often taper. Measure at the bottom, the middle, and the top. Note any fixed obstacles like balustrades, glass panels, or overhanging structure.",
          "Think about what the item weighs and whether it can be tilted without damage. Fridges generally can be laid on their side or tilted for short periods, but you want to confirm this for your specific model and plan for the item to stand upright again before it is plugged in.",
          "If you are not sure whether something will fit, ask us before booking. We can often tell you from measurements and photos whether a route is viable, and what crew or gear the job will need.",
        ],
      },
      {
        heading: "Why two movers was the right call",
        paragraphs: [
          "Some people assume a bigger crew means a faster job. On a balcony move, that is not always true. Two people who work together well can navigate a tight space more effectively than four people trying to stay out of each other's way.",
          "We have completed over 4,000 moves across Auckland and the Waikato, and a lot of them have included awkward access situations. You build up a read for what crew size fits what job. This one was a two-person job from the start.",
        ],
      },
      {
        heading: "Got something that looks difficult to move?",
        paragraphs: [
          "If you have a large item and access that makes you nervous, the best thing to do is send us the measurements and a description of the route. We turn quotes around in about 15 minutes during business hours, and we will tell you honestly what the job involves and what it will cost before you commit to anything.",
          "You can send those details through the quote form on our website. No obligation, no pressure, just a straight answer.",
        ],
      },
    ],
  },
  "hoist-move-newmarket-how-we-did-it": {
    title: "When the Stairs Are Not an Option: A Hoist Job in Newmarket",
    sections: [
      {
        heading: "The job in plain terms",
        paragraphs: [
          "In late July 2026 we moved a commercial fit-out from a Newmarket showroom to a production office and warehouse elsewhere in Auckland. The load included some heavy items, among them safes, that could not go down the stairs without serious risk to the building, the gear, and the crew.",
          "The solution was a hoist. That word gets used loosely, so here is what it means in practice: we rig a rated lifting system to get items vertically from one level to another, bypassing the stairwell entirely. It is not unusual in inner Auckland. Newmarket, Parnell, and Grey Lynn all have older commercial buildings where stairwells are narrow, tight-cornered, or simply not rated for the weight.",
        ],
      },
      {
        heading: "Why this job needed four people",
        paragraphs: [
          "A hoist move is not a two-person job. You need people at the top, people at the bottom, and someone managing the rig and the load in between. On this job we ran a crew of four.",
          "The split roughly goes like this: one or two people guide and steady the item as it travels, one person operates the lift, and at least one more is on the receiving end to bring the item in safely once it clears the opening. Everyone has a clear role before anything leaves the floor. If one person is uncertain, we stop and reset. There is no rushing a loaded hoist.",
        ],
      },
      {
        heading: "Planning before the truck leaves our depot",
        paragraphs: [
          "For a job like this, site assessment is not optional. We need to know the weight of each item, the floor-to-floor height, what the anchor points are, whether there is a window or external opening large enough, and what is on the ground below. Safes are a particular case because their weight is not always obvious from the outside. A compact office safe can easily top 200 kg.",
          "We also need to think about the footpath and any road space at ground level. Newmarket is busy. Depending on the building and the street, you may need a temporary traffic management plan or at minimum a spotter keeping pedestrians clear. We sort all of this before move day, not on the morning.",
        ],
      },
      {
        heading: "The gear we use",
        paragraphs: [
          "Our trucks run taillifts, which handled the ground-level loading at the destination warehouse end of this job. The hoist itself is rated lifting equipment, not improvised rope work. Items are wrapped and secured before they go on the rig. Safes get extra attention because their centre of gravity is not always where you expect it, and a tilting safe mid-air is a problem.",
          "We carry furniture dollies, load straps, and corner guards as standard. For a commercial job with mixed items including showroom stock, wrapping and padding takes time and we factor that in. Rushing the wrap to save twenty minutes is how things get damaged.",
        ],
      },
      {
        heading: "How the day went",
        paragraphs: [
          "The crew worked methodically through the showroom items first, staging everything on the floor ready to go before the hoist was rigged. That staging step matters. Once you commit to a hoist lift you do not want to be hunting for the next item while the rig is set up.",
          "The safes went last. Heavier items at the end means the team is not already tired when the hardest lift happens. Every item was checked at the bottom and again at the top before moving it further. The destination warehouse had good vehicle access, so the tailift on the truck made short work of offloading once everything arrived.",
        ],
      },
      {
        heading: "What can go wrong and how we avoid it",
        paragraphs: [
          "The most common problem on hoist jobs is underestimating time. Rigging, lifting, de-rigging, and re-rigging for the next item all take longer than carrying something down stairs would, if stairs were an option. Customers sometimes expect the clock to run at normal pace. It does not, and we are upfront about that.",
          "The second issue is anchor points. Not every building has a suitable place to fix a hoist without damaging the structure. We check this on the site visit. If the anchor situation is awkward, there are other approaches, including crane hire for very large loads, but that is a different scope and we would say so clearly.",
        ],
      },
      {
        heading: "What you should do if you have a similar job",
        paragraphs: [
          "First, do not try to guess whether stairs will work. Get someone with hoist experience to look at the job before move day. We offer free viewings for larger or complex moves. It costs you nothing and it means there are no surprises on the day.",
          "Second, know the weight of your heavy items if you can. Safe manufacturers usually list it. If you have bought secondhand and do not have the spec sheet, we can often help identify the model and look it up.",
          "Third, give yourself a realistic time window. A hoist job in central Auckland with parking and traffic considerations is not a half-day job if there are multiple heavy items. Budget the time properly and the whole thing goes smoothly.",
        ],
      },
      {
        heading: "Getting a quote",
        paragraphs: [
          "If you have a heavy item, an awkward floor, or a commercial space in Auckland that needs clearing, we are worth talking to. We have completed over 4,000 moves across Auckland and the Waikato and hoist and crane-assist jobs are a regular part of that work.",
          "Send us the details through the quote form on our website. In business hours we usually come back to you in about 15 minutes. You see the full price upfront before you commit to anything.",
        ],
      },
    ],
  },
  "how-to-choose-a-moving-company-auckland": {
    title: "How to Choose a Moving Company in Auckland: the Exact Questions to Ask Before You Book",
    sections: [
      {
        heading: "Why this matters more than most people think",
        paragraphs: [
          "Most people spend more time researching a new TV than they do picking a moving company. That is understandable. Moving is already a lot to manage.",
          "But a bad choice on moving day costs real money and real stress. Furniture gets damaged. The truck turns up two hours late. Suddenly there are charges on the invoice that were never mentioned.",
          "Auckland has dozens of removalist companies. Some are excellent. Some will let you down. The difference usually shows up in the answers to a handful of simple questions. Ask them before you book, and you will be in a much better position.",
        ],
      },
      {
        heading: "Hourly rate vs fixed price: what you actually need to know",
        paragraphs: [
          "Most Auckland movers charge by the hour. That is normal and fair, but you need to understand exactly what the clock covers.",
          "Ask: does the hourly rate start when the truck leaves the depot, or when it arrives at my door? Some companies charge travel time both ways. Others only charge from arrival. That gap can be an hour of billable time on a move from, say, Albany down to Onehunga.",
          "Also ask about the minimum charge. Many companies have a two or three hour minimum. If your move is small, a fixed-price quote might work out cheaper. Ask whether they offer that option.",
          "At Specialist Movers, hourly rates are the same across Auckland. The fixed callout fee varies with distance from our depot, and you see the full price upfront before you book. No surprises on the invoice.",
        ],
      },
      {
        heading: "Insurance: the question most people forget to ask",
        paragraphs: [
          "Ask this directly: are my belongings covered if something is damaged during the move, and what does that cover actually include?",
          "New Zealand's consumer law gives you some protection, but basic liability and full replacement value are very different things. A company that does insurance pack-out work for insurers, as we do, understands the difference clearly.",
          "Ask whether their insurance covers items they did not pack. Many policies exclude self-packed boxes. If you are packing yourself, know that going in.",
          "Also ask what the claims process looks like. A vague answer is a red flag. A good company can tell you exactly what to do if something goes wrong.",
        ],
      },
      {
        heading: "Stairs, tight access, and Auckland's tricky properties",
        paragraphs: [
          "Auckland is full of properties that make moving harder than it looks on paper. Steep driveways in Ponsonby. Apartment towers in the CBD with one service lift shared between three crews. Split-level homes on the North Shore with steps everywhere.",
          "Ask: is there an extra charge for stairs, and how do you calculate it? Some companies charge per flight. Others include a certain number of steps in the base rate. Know what you are getting.",
          "Ask about access for the truck. A standard moving truck needs a reasonable amount of clearance. If your street is narrow or has parking restrictions, ask whether they carry the right equipment to work from a distance. Trucks with taillifts make a big difference on difficult sites.",
          "For larger or more complex homes, it is worth asking for a free viewing before you confirm. We offer that for bigger moves. It means no surprises on the day.",
        ],
      },
      {
        heading: "What happens if it rains",
        paragraphs: [
          "Auckland gets a lot of rain. Any moving company that acts surprised by this is not well prepared.",
          "Ask: what do you do to protect furniture and floors in wet weather? Good movers carry blankets, shrink wrap, and floor protection as standard. They do not wait to be asked.",
          "Ask whether the truck has a taillift and whether it is covered. Loading in the rain from an open truck deck is messy and slow. A taillift with a covered rear makes a real difference.",
          "You should also ask what happens if you need to reschedule because of severe weather. Understand the policy before your move date arrives.",
        ],
      },
      {
        heading: "Red flags to watch for",
        paragraphs: [
          "No physical address or depot listed anywhere. A reputable Auckland company has a real base of operations.",
          "Quotes given over the phone in thirty seconds with no questions asked about your property. A proper quote requires knowing how many rooms, what floor, what access is like, and what large items you have.",
          "Cash-only payment with no written confirmation. Always get the quote and the terms in writing before moving day.",
          "No Google reviews, or reviews that all appeared within a short window. Check the pattern, not just the star rating. A steady stream of detailed reviews over time is a better sign than fifty generic ones posted in a week.",
          "Reluctance to answer the questions in this article. A crew that does this job properly has heard these questions before and is happy to answer them.",
        ],
      },
      {
        heading: "A few more things worth checking",
        paragraphs: [
          "Ask how many people will be on the crew. For a standard three-bedroom house, two movers is workable but tight. Three or four movers on the day means the job gets done faster and with less handling risk for your furniture. We run crews of two to four depending on the job.",
          "Ask whether they operate seven days a week. Weekend availability matters in Auckland because settlement dates and lease handovers do not always fall on a Tuesday.",
          "Ask how quickly you can get a quote. Waiting days for a number is a sign of how they will communicate on moving day too. In business hours, we get quotes back in around fifteen minutes.",
        ],
      },
      {
        heading: "Ready to get a straight answer on your move",
        paragraphs: [
          "We have completed over 4,000 moves across Auckland and the Waikato, from single-bedroom apartments in Grey Lynn to full family homes on the Shore. We are happy to answer every question on this list before you commit to anything.",
          "If you have a larger home and want us to come and see it first, we offer free viewings. If you just want a fast number, fill in the quote form on our website and we will come back to you quickly.",
          "No pressure, no vague answers. Just a clear price and a straight conversation about what your move involves.",
        ],
      },
    ],
  },
  "downsizing-retirement-village-auckland": {
    title: "Moving to a Retirement Village in Auckland: A Plain Guide to Downsizing",
    sections: [
      {
        heading: "The decision to downsize is big. The move itself does not have to be.",
        paragraphs: [
          "Most people spend decades filling a family home. Rymans on the North Shore, Summerset villages out in Karaka, Metlifecare spots in Remuera, the options around Auckland are plenty. But every one of those villages has a unit size that is smaller than what you are leaving behind.",
          "That gap between what you own and what will fit is the real challenge. Getting it right before moving day saves a lot of grief. This guide walks you through the main steps: sorting your belongings, managing dates, handling storage, and making sure your moving crew actually knows what they are walking into.",
        ],
      },
      {
        heading: "Start with the floor plan, not the feelings",
        paragraphs: [
          "Before you decide what comes, get the exact dimensions of your new unit. Most Auckland retirement villages will give you a floor plan. If they will not, measure it yourself on a visit.",
          "Then go room by room at your current home and ask one question: does this fit, and do I use it? Furniture that works in a large Remuera villa often overwhelms a two-bedroom unit in Orewa. A big dining table, a second sofa, a king bed that barely clears the walls, these are common culprits.",
          "Write three lists: keep, sell or give away, and unsure. Leave the unsure pile for a second pass a week later. You will find most of the unsure items shift to the second column once you have slept on it.",
          "Involve family early. Adult children often want certain pieces. Others will be happy to take furniture that would otherwise go to Trade Me or the Salvation Army on Great South Road. Getting family commitments in writing, even just a text, saves arguments later.",
        ],
      },
      {
        heading: "Settlement dates and the gap nobody warns you about",
        paragraphs: [
          "Here is the thing most people do not think about until it is too late. Your sale settles on one date. Your village occupation date is another. Rarely are they the same day.",
          "In Auckland's property market, a week or two between settlement dates is common. Sometimes it is longer, especially if your village unit needs a small freshen-up before you move in. That gap is real and it needs a plan.",
          "Talk to your lawyer early about whether a short rent-back from your buyer is possible. Some buyers will allow it for a week or two, particularly in quieter suburbs like Titirangi or Howick where they are not in a rush. It is not guaranteed, but it is worth asking.",
          "If a rent-back is not possible, you need a short-term option. That might mean staying with family. It might mean a short-stay apartment. Either way, your furniture still needs somewhere to go.",
        ],
      },
      {
        heading: "Storage: what to look for and what to watch",
        paragraphs: [
          "Auckland has plenty of storage options. Kennards and Storage King have sites around the city, and there are smaller local operators in places like Henderson and Penrose. For a gap of one to four weeks, a standard unit is usually enough for the excess furniture from a typical three-bedroom home.",
          "A few things to check before you book. Make sure the unit is ground floor or the facility has a lift big enough for furniture. Find out if you can access it seven days a week, because moving days do not always fall on a Tuesday. Check that the insurance cover is clear, either through the facility or your own contents policy.",
          "If you are moving a piano, be especially careful. Pianos need climate-stable storage. A metal shed that bakes in the Auckland summer will damage soundboards and felts. Ask specifically about temperature control before you commit.",
          "The cleanest approach is a two-stage move. Your moving crew loads everything on day one and takes it to storage. On village move-in day, they reload and deliver only what is going into the unit. It costs more than a single move, but it is far less stressful than trying to sort keep-versus-store while the truck is parked in the driveway.",
        ],
      },
      {
        heading: "Why a viewing matters more for these moves",
        paragraphs: [
          "A viewing is when a mover comes to your home before the job, walks through with you, and works out exactly what is involved. For a standard two-bedroom flat this is often optional. For a downsizing move from a large family home, it is worth doing.",
          "Here is why. Retirement village access is often tighter than a standard home. Villages like those in Takapuna or Botany have shared driveways, low carports, and strict booking windows for the service lift in apartment blocks. A crew that has not seen the site can lose an hour working out the logistics on the day.",
          "A viewing also lets you show the mover exactly which items are going and which are not. That clarity is everything. It means the crew is not stopping to ask questions every ten minutes. It means the quote you get reflects the actual job, not a rough estimate.",
          "We offer free viewings for larger homes. It takes about half an hour and it makes the whole job sharper.",
        ],
      },
      {
        heading: "On the day: a few things that help",
        paragraphs: [
          "Label everything before the crew arrives. A simple system works fine. Green tape for the village, blue tape for storage, red tape for family collection. It sounds basic but it removes every grey-area decision from moving day.",
          "Keep a small bag with the things you will need for the night separate from everything else. Medications, phone charger, a change of clothes, the kettle. Pack this yourself and keep it in your car.",
          "If you have a piano coming with you, tell the moving company upfront. Not every crew is set up for this. Specialist Movers is trusted by Steinway dealers and does piano moves regularly, including into village units where the hallway is tight and the carpet is new. It is worth flagging early so the right equipment comes on the truck.",
          "Finally, let the retirement village know the moving date as far ahead as possible. Many villages have a coordinator who manages move-in bookings. Some have rules about which entrance vehicles can use or what hours are allowed. Getting this confirmed in writing saves trouble on the day.",
        ],
      },
      {
        heading: "What the whole process looks like end to end",
        paragraphs: [
          "Here is a simple timeline that works for most Auckland downsizing moves.",
          "About eight weeks out: get your village floor plan and measure your furniture. Start your three lists. Talk to family about items they want.",
          "Six weeks out: confirm your settlement dates with your lawyer. Work out whether you have a gap and how long it is. Book storage if you need it.",
          "Four weeks out: contact a moving company and arrange a viewing. Lock in your moving dates. Confirm with the village coordinator.",
          "One week out: finish labelling. Arrange the two-stage move if you are going via storage. Confirm access details with the village.",
          "The day before: a packing service can do this for you if needed, with a crew coming in to wrap and box everything properly so nothing is rushed on moving day itself.",
          "Moving day: let the crew do their job. You have done the hard thinking already.",
        ],
      },
      {
        heading: "Ready to get a clear picture of your move?",
        paragraphs: [
          "Downsizing from a family home in Auckland is one of the more involved moves we do, and we have done well over 4,000 moves across Auckland and the Waikato to draw on. Every job is different, every village has its own quirks, and every family has a slightly different plan for the furniture that does not make the cut.",
          "If you have a rough idea of what you are working with, our quotes come back in about 15 minutes during business hours. For larger homes, a free viewing gives you a more accurate price and lets us flag anything worth knowing before moving day arrives.",
          "Head to our website and fill in the quote form. No pressure, just a straight answer on what your move is likely to involve.",
        ],
      },
    ],
  },
  "piano-and-couch-lift-to-balcony-freemans-bay-auckland": {
    title: "How We Got a Piano and a Couch Up to a Freemans Bay Balcony",
    sections: [
      {
        heading: "The job in plain English",
        paragraphs: [
          "Freemans Bay sits right on the edge of the city, and a lot of its apartments were built before anyone thought too hard about getting large furniture through stairwells. This job was a good example of that.",
          "The customer needed a piano relocated and a couch lifted up onto a balcony. Neither item was going up a standard staircase the normal way. That meant we needed to plan the lift before we showed up, not figure it out on the day.",
        ],
      },
      {
        heading: "Why balcony lifts are genuinely tricky",
        paragraphs: [
          "A balcony lift sounds simple until you think through what can go wrong. You need a clear drop zone below, a solid anchor point above, enough crew to guide the item from both ends, and a balcony railing that can take a load passing over it without damage.",
          "Couches catch wind and twist. A piano, depending on the type, can weigh anywhere from around 150 kilograms for a small upright to several hundred for a grand. The weight is not evenly distributed, which means the lift has to be controlled the whole way up, not just at the start and finish.",
          "In Freemans Bay specifically, narrow streets and parked cars can limit where you stage the truck. We factor that in during planning, not when we arrive.",
        ],
      },
      {
        heading: "How we planned it",
        paragraphs: [
          "Before the crew left our depot, we knew the access situation at the property. For jobs like this we talk through the route: where the truck parks, how far the item travels on the ground, what the lift angle looks like, and which crew member takes which position.",
          "For a balcony lift we typically bring a crew of at least three. One person on the ground controls the rigging and steadies the load. At least two people are on or near the balcony to receive and guide the item over the rail. Everyone knows their cue before the item leaves the ground.",
          "Our trucks carry taillifts as standard, which helps with staging. Getting the item from truck to lift point at the right height saves effort and reduces the risk of anyone straining at an awkward angle.",
        ],
      },
      {
        heading: "The gear we used",
        paragraphs: [
          "For a lift like this we use furniture straps and moving blankets as the first layer of protection. The straps go under the item so we control it from below rather than trying to grip the sides.",
          "The couch was wrapped before it went anywhere near the air. Balcony posts and railings can leave marks on fabric or timber in a split second if the item shifts. Blankets take the hit instead.",
          "For the piano, our standard practice is to assess on the spot whether castors come off or stay on. Moving a piano with castors on while it is in the air is asking for trouble. We secure the lid and the fallboard before the item moves at all.",
        ],
      },
      {
        heading: "How it went on the day",
        paragraphs: [
          "The crew worked the couch up first. That gave everyone a chance to check the rigging setup and confirm the balcony railing was solid before the heavier item went up.",
          "The piano followed. The approach was slow and deliberate. There is no benefit in rushing a piano lift. A controlled, steady rise with constant communication between the ground and balcony crew is what keeps the job clean.",
          "Both items landed on the balcony without damage to the items or the building. That is the only result that counts.",
        ],
      },
      {
        heading: "What to know if you have a similar job",
        paragraphs: [
          "If you have an item that will not fit through your stairwell or front door, a balcony lift is often the right answer. But it needs to be assessed properly first.",
          "Tell us the item type and weight if you know it, the balcony height, and what access looks like from the street below. Photos help a lot. We can usually come back to you with a plan and a price in about 15 minutes during business hours.",
          "A free viewing is available for larger or more complex jobs. We would rather spend 20 minutes at the property than have anyone surprised on the day.",
          "Freemans Bay, Grey Lynn, Ponsonby, Parnell, buildings along the waterfront near Westhaven, apartments in the CBD, all of these areas come with access quirks. We have handled them across more than 4,000 moves. If you have got an awkward item, use the quote form on our website and tell us what you are working with.",
        ],
      },
    ],
  },
  "moving-house-with-kids-and-pets-nz": {
    title: "Moving House with Kids and Pets: How to Keep the Day on Track",
    sections: [
      {
        heading: "The honest truth about moving day with kids and animals",
        paragraphs: [
          "Moving day is loud, unpredictable, and full of strangers carrying your couch through the hallway. For kids and pets, that is a lot to take in. The good news is that a bit of planning the week before makes a real difference on the day itself.",
          "This guide is for Auckland families doing a full home move. It covers what to sort in advance, how to structure the actual moving day, and how to help pets settle once you arrive. There is also a section on school zones, because the timing of your move can affect your kids for years.",
        ],
      },
      {
        heading: "Two weeks out: decisions that make the day easier",
        paragraphs: [
          "Work out where the kids and pets will actually be on moving day. This sounds obvious, but it is the thing families leave too late. If you have a toddler or an anxious dog, having them underfoot while the crew loads a piano is not safe for anyone.",
          "For younger children, ask a family member or friend to take them for the day. A grandparent in Remuera or a friend in Blockhouse Bay works just as well as paid childcare. The goal is a calm environment for the child and a clear house for the movers.",
          "For pets, the same logic applies. Dogs especially pick up on the stress of boxes appearing and furniture disappearing. Book a day-stay with a local dog walker or a pet boarding service in advance. For cats, a single quiet room with a closed door, food, water, and their litter box works well. Put a note on the door so nobody opens it by accident.",
        ],
      },
      {
        heading: "The night before: pack for humans first",
        paragraphs: [
          "Pack an overnight bag for each child the same way you would for a short trip. Pyjamas, a change of clothes, their favourite toy, and any comfort item they sleep with. Keep this bag with you, not on the truck.",
          "Do the same for pets. Pack a bag or box with food, bowls, leads, medication, and bedding. Familiar smells help animals settle faster in a new space. If you use a professional packing service the day before your move, keep the pet and kids bags separate so they do not get packed by accident.",
          "If your cat or dog has not been in a carrier for a while, bring it out a few days before the move and leave it open in the lounge. Letting them go in and out on their own terms means the carrier does not feel like a trap on moving day.",
        ],
      },
      {
        heading: "On the day: structure it like a building site",
        paragraphs: [
          "Good movers work to a system. You should too. Before the crew arrives, do a final walk-through and close off any rooms that are off-limits, especially if a pet is in there.",
          "Tell the crew upfront. Something like: the cat is in the laundry, please keep that door closed. Any experienced crew will appreciate the heads-up and work around it without a fuss.",
          "If your kids are home during the move, give them a specific job. Older children can be in charge of their own boxes. Younger ones can help carry light items to a designated spot. Feeling involved tends to reduce the anxiety of watching their bedroom disappear into a truck.",
          "Keep snacks and drinks accessible all day, for kids and adults. Hunger makes everything harder. A chilly bin with sandwiches and juice boxes near the front door is not glamorous but it works.",
        ],
      },
      {
        heading: "Settling pets into a new home",
        paragraphs: [
          "Cats are territorial and can take weeks to feel safe in a new home. Start them in one room with their food, litter, and bedding. After a day or two, open the door and let them explore at their own pace. Do not force it.",
          "Dogs adjust faster but still need routine. Walk them around the new street on the first evening. Stick to their normal feeding and walk times as closely as you can. In Auckland, most suburban areas have good footpaths and parks nearby. Getting them out and sniffing around helps them claim the new territory.",
          "Check fences and gates before you let a dog into the garden unsupervised. A new property in an area like Titirangi or the Shore might have old fencing you have not inspected closely. It takes five minutes and it matters.",
          "For smaller pets like rabbits or guinea pigs, keep them inside for the first few days and make sure their enclosure is set up early in the unpacking process. They are often forgotten in the chaos.",
        ],
      },
      {
        heading: "School zones: why the timing of your move matters",
        paragraphs: [
          "In Auckland, living in zone for a school makes a real difference to enrolment. Schools like Westlake Boys, Rangitoto College, and many sought-after primary schools have strict in-zone criteria. Your address on enrolment day is what counts.",
          "If you are moving to get into a specific zone, talk to the school before you move, not after. Find out exactly what proof of address they need and when they need it. Some schools want a confirmed tenancy or title plus a utility bill. Others are stricter.",
          "Term timing also matters. Moving mid-term is harder on kids socially than moving at the start of a new school year or at the beginning of Term 1 or Term 3. If you have any flexibility on settlement date, use it. Talk to your real estate agent or property manager about whether a short-term rental gap is possible to line things up.",
          "Starting at a new school is big for a child. If you can, visit the school with them before the first day. Walk the route from the new house. Small things like knowing where the gates are and where you drop off make the first week easier.",
        ],
      },
      {
        heading: "The first night in the new house",
        paragraphs: [
          "Set up the kids rooms first. Not perfectly, just enough. Beds made, a lamp working, their bag unpacked. A familiar bedroom at the end of a big day helps children feel settled quickly.",
          "Do not worry about the rest of the house that evening. Leave the kitchen boxes for the morning. Order a pizza, sit on the floor, and let the kids feel like it is an adventure rather than a disruption.",
          "Pets should stay inside overnight in a new property. Cats especially should not go outside until they have had at least a few days to get used to the new smells indoors.",
        ],
      },
      {
        heading: "Ready to plan your Auckland move?",
        paragraphs: [
          "Across more than 4,000 moves, we have helped families with complicated logistics, tight timelines, and the full range of things that can go wrong when you are moving a whole household with children and animals in tow.",
          "We operate seven days a week, so you can book around school drop-off, vet appointments, or whatever your week looks like. For larger homes we offer a free viewing so we can give you an accurate quote, not a rough guess. Send us the details through our website and you will usually have a quote back within 15 minutes during business hours.",
        ],
      },
    ],
  },
  "moving-in-winter-auckland": {
    title: "Moving in Winter Auckland: Why July to September Might Be Your Best Option",
    sections: [
      {
        heading: "Winter moves get a bad reputation they don't deserve",
        paragraphs: [
          "Most people plan their move for summer. Warm weather, school holidays, long evenings. It makes sense on paper. But in Auckland, that thinking drives demand through the roof from November through to February. Trucks are booked weeks out. Move dates are rigid. Prices reflect the pressure.",
          "July through September is different. Demand is lower, crews have more space in the schedule, and you have real room to negotiate your date. If something changes at settlement or your tenancy needs to shift by a week, that flexibility is worth a lot.",
          "Auckland winters are mild compared to most of the country. Yes, it rains. But it does not snow on the North Shore or freeze in Epsom. A bit of drizzle is manageable when a crew knows what it is doing.",
        ],
      },
      {
        heading: "What availability actually looks like in winter",
        paragraphs: [
          "During peak summer season, a Saturday in December can fill up fast. In July, you are much more likely to get the exact date you want, including weekends. We operate seven days a week, so Monday to Sunday is all on the table.",
          "That matters if your settlement date lands on a Wednesday or your lease ends mid-week. In winter you can usually align everything without juggling around someone else's booking.",
          "Larger homes benefit from a free viewing so we can size the job properly. In quieter months those viewings are easier to schedule quickly, and you get your quote back in about 15 minutes during business hours rather than waiting in a queue.",
        ],
      },
      {
        heading: "How we keep furniture dry when it rains",
        paragraphs: [
          "Rain is the main thing people worry about. Here is what actually happens on a wet Auckland moving day.",
          "Our trucks have taillifts. That means furniture goes straight from your doorway onto the truck platform without being carried through open air any longer than necessary. The taillift sits flush with the truck, so the path is short and covered by the truck canopy.",
          "Everything goes into furniture blankets before it moves. Blankets are thick, they absorb surface moisture, and they protect corners and edges regardless of weather. Flat-screen TVs and anything electronic get wrapped in plastic first, then blanketed. Mattresses go into mattress bags. Nothing sits exposed.",
          "On a heavy rain day we work the doorways hard. One person inside, one at the truck, items moving in a steady rhythm rather than sitting on a wet driveway. The goal is zero dwell time in the open.",
        ],
      },
      {
        heading: "Preparing your home for a wet-weather move",
        paragraphs: [
          "A bit of prep on your end makes a big difference. Lay down old towels or cardboard in your hallway the night before. Movers will be going in and out, and floors get slippery fast on a rainy morning in a Ponsonby villa or a Remuera townhouse with polished timber.",
          "Put anything small and water-sensitive, documents, chargers, laptops, into a bag you carry yourself. That keeps it with you and out of the truck entirely.",
          "If you have a long path from your front door to the street, let us know before moving day. On a tight West Auckland site or a Newmarket apartment building with a covered carpark we can often position the truck to shorten the carry. A quick chat beforehand sorts this.",
        ],
      },
      {
        heading: "The day before: packing can take the pressure off",
        paragraphs: [
          "One thing that makes a rainy moving day much calmer is having everything already boxed and ready. Our packing service runs the day before your move. The crew comes in, packs your kitchen, linen, breakables, whatever you need done, and everything is sealed and labelled before the truck arrives.",
          "On a wet morning, that means the movers are loading boxes and furniture straight away. No scrambling to finish packing while rain comes in through an open door. It keeps the job tight and the floors drier.",
        ],
      },
      {
        heading: "What about moving into a place that needs cleaning first?",
        paragraphs: [
          "Sometimes the property you are leaving needs a thorough clean before you hand the keys back. We offer move-out cleaning, so you are not organising a separate tradesperson on top of everything else.",
          "In winter this is often easier to schedule because demand for cleaning crews eases off too. Worth factoring in if your tenancy agreement requires the place to be left in a specific condition.",
        ],
      },
      {
        heading: "Is winter right for every move?",
        paragraphs: [
          "Honestly, not always. If you have very small children who need to be out of the house for a long day, a cold wet day is harder to manage. If your new property has a long exposed pathway and no shelter, the crew will manage it but it takes longer.",
          "For most households though, the combination of better availability, flexible dates, and a professional crew that handles wet weather every week makes July to September a genuinely good window. We have completed well over 4,000 moves and a solid chunk of those have been in winter. The process is well worn in.",
          "If you are weighing up dates or want to know how a winter move would work for your specific property, the easiest thing is to get a quote through our website. Fill in the details, and we will come back to you with a clear price and what the day would look like. No pressure, just information.",
        ],
      },
    ],
  },

  /**
   * TODO (Richard): "The short answer" quotes published Auckland market ranges
   * rather than our own piano pricing, because piano rates are not written down
   * anywhere I could source them. Every other figure on this page is ours and is
   * taken from how-much-do-movers-cost-in-auckland. Replace the market ranges
   * with our real piano numbers when you have them, and the page gets
   * meaningfully stronger: the pages currently winning this query in AI search
   * all state explicit prices.
   */
  "how-much-does-it-cost-to-move-a-piano-in-auckland": {
    title: "How Much Does It Cost to Move a Piano in Auckland? Real 2026 Numbers",
    sections: [
      {
        heading: "The short answer",
        image: {
          src: "/photos/source/batch-p125/P1250409-cropped.jpg",
          alt: "Specialist Movers crew loading a wrapped piano into the truck",
        },
        paragraphs: [
          "Across the Auckland market, a local upright piano move is generally quoted between $200 and $500, and a grand between $400 and $1,000. Long-distance piano transport around New Zealand runs between $800 and $2,000.",
          "Those are ranges, and your piano has a price. It comes down to four things: the instrument, the access at both ends, the distance from our Wairau Valley depot, and whether anything has to go up rather than through.",
          "An upright runs from around 150 kg for a small one to several hundred for a grand, and none of that weight is evenly distributed. It sits on castors that were never meant to roll anywhere. That is the whole reason this costs what it does.",
        ],
      },
      {
        heading: "How piano movers actually charge",
        image: {
          src: "/photos/hard-to-shift/crew-piano-dolly.jpg",
          alt: "Two movers walking a wrapped upright piano on a dolly",
        },
        paragraphs: [
          "Almost nobody explains this part, so here it is in plain terms.",
          "Most Auckland movers charge an hourly rate for the crew and truck, plus a one-off callout fee that covers getting the truck to you and back to base. Our clock runs from arrival at your pickup address to the last item off the truck at the other end.",
          "Two things move the hourly rate. Crew size, and the day of the week. A two-person crew with a truck starts at $120 per hour plus GST on a Tuesday, our quietest day. Midweek sits around $130 to $135. Friday, the most popular moving day in Auckland, is $150. A three-person crew runs $40 to $50 an hour more than two.",
          "The question worth asking any mover: does the clock start when the truck leaves the depot, or when it arrives at your door? On an Albany to Onehunga job that gap can be an hour of billable time. Ours starts at your door.",
          "Some companies quote pianos as a fixed price instead. Neither approach is wrong. What matters is that you know which one you are being given, and what happens to the number if the job runs long.",
        ],
      },
      {
        heading: "Upright, grand, or digital",
        image: {
          src: "/photos/blog/grand-piano-concert-hall.jpg",
          alt: "A grand piano on a concert hall stage",
          credit: "Julia Barrantes / Pexels",
        },
        paragraphs: [
          "The instrument is the biggest single factor, and not only because of weight.",
          "An upright is top-heavy. The mass sits high and towards the back, which is why an upright that feels stable in your lounge will try to tip the moment it goes onto a ramp. Uprights stay upright, always, and they get strapped to a board before they go anywhere.",
          "A grand is heavier and more awkward, and it usually comes apart. The lyre, legs and pedal assembly come off, the body goes onto a padded skid on its side, and it travels that way. That work takes time at both ends, which is the real reason a grand costs more than an upright rather than the extra weight alone.",
          "A digital piano or stage keyboard is a different job entirely. Two people, no board, no dismantling. The Auckland market quotes those around $90 to $150. If that is what you have, say so when you ask for a quote, because you should not be paying piano rates for it.",
        ],
      },
      {
        heading: "Distance, and what the callout actually covers",
        paragraphs: [
          "Our hourly rate is the same across Auckland. Only the callout changes with distance, calculated from the Wairau Valley depot.",
          "Close-in Auckland, roughly within 23 kilometres, is $60 for a two-person crew. Outer suburbs like the Hibiscus Coast or Pukekohe are $80. The fringe of the region is $120. Everything is plus GST.",
          "Going out of the region is a different quote. Auckland to Hamilton, or anything further down the line, gets priced as a transport job rather than an hourly one, because most of the cost is road time rather than handling.",
        ],
      },
      {
        heading: "Stairs, and the access nobody mentions until the day",
        image: {
          src: "/photos/source/batch-p125/P1250551.jpg",
          alt: "Specialist Movers crew handling a wrapped piano inside a home",
        },
        paragraphs: [
          "Access is the single biggest reason a piano move costs more than people expected.",
          "The market rate for stairs sits around $50 to $100 per flight, and that is a fair reflection of the time involved. A flight of stairs with an upright is not one carry. It is a controlled descent with one person taking the weight below and one guiding above, short deliberate steps, leg drive, and a stop at every landing to reset.",
          "Long carries from the truck do the same thing to a bill. Ten metres of extra distance sounds like nothing until you have covered it with an upright between two people. Narrow driveways, tight garage entries and apartment lifts that need booking all convert directly into billable time.",
          "Tell us the truth about the access when you ask for the quote. A steep driveway mentioned upfront gets you an accurate number. The same driveway discovered on the morning gets you an awkward conversation while the clock runs.",
        ],
      },
      {
        heading: "When the stairs are not an option",
        image: {
          src: "/photos/hard-to-shift/crane-piano-hero.jpg",
          alt: "A piano lifted by crane on a Specialist Movers job",
        },
        paragraphs: [
          "Some pianos do not go up the stairs at all. When that happens the job becomes a lift, either over a balcony or by crane, and the price structure changes with it. The Auckland market quotes hoist and crane work between $300 and $1,000 depending on the rig and the building.",
          "We did a Freemans Bay apartment in August 2026 with a piano and a couch, neither of which was going up the stairwell. Crew of three: one on the ground controlling the rigging and steadying the load, two at the balcony receiving. Many Freemans Bay apartments were built before anyone thought hard about getting large furniture through a stairwell, and the narrow streets limit where the truck can sit.",
          "The detail worth stealing: we sent the couch up first. Same rigging, same railing, far less valuable. Once we knew the setup held, the piano followed.",
          "Straps go under the item so the load is controlled from below rather than gripped at the sides. A piano's weight is not evenly distributed, so the lift stays slow the whole way. There is no benefit in rushing a piano lift.",
          "Not every building has a suitable anchor point. Some balcony and stair routes are not viable at all, and a very large load needs a crane and a different scope. Ask before you book rather than after.",
        ],
      },
      {
        heading: "Measure the pinch points before anyone quotes you",
        paragraphs: [
          "This is the one thing almost nobody does, and it is the most common reason a quote turns out to be wrong.",
          "Measure the narrowest part of the route, not the widest. Openings taper. On a St Heliers job earlier this year we had a balcony opening that measured 855 mm at the bottom and 820 mm at the top, where a slat wall cut into the clearance. The bottom measurement would have told us the job was fine. It was not.",
          "Measure bottom, middle and top of every doorway, gate and stair turn on the route. Send us the numbers and a few photos.",
          "Check the manufacturer's specification for the instrument rather than trusting a listing. On that same job the brief listed a fridge height of 17170 mm, which is obviously a typo for 1717 mm. We caught it before the truck was dispatched. A wrong number at the planning stage costs everyone time on the day.",
        ],
      },
      {
        heading: "Storage, if the dates do not line up",
        image: {
          src: "/photos/source/batch-p125/P1250887.jpg",
          alt: "An upright piano positioned in a home after a move",
        },
        paragraphs: [
          "Settlement dates move. If your piano needs somewhere to sit between houses, the Auckland market prices piano storage around $60 to $100 a month.",
          "Ask one specific question before you agree to any of it: is the space temperature stable?",
          "A piano is wood, felt and steel under tension. A metal shed baking through an Auckland summer and cooling overnight will move the soundboard and wreck the felts, and you will not find out until it is tuned. Self-storage units are frequently exactly that shed. Ask about temperature control by name, and if the answer is vague, treat the vagueness as the answer.",
        ],
      },
      {
        heading: "Insurance",
        paragraphs: [
          "Basic liability and full replacement value are different things, and the gap between them is usually where the argument happens.",
          "Ask what the cover actually is for the piano specifically, not the load in general. Ask what the excess is. If you are moving a valuable instrument, ask whether it needs to be declared separately, because on most policies it does.",
          "Additional insurance in the New Zealand market runs around $10 to $15 per $1,000 of declared value. That is cheap against a soundboard.",
        ],
      },
      {
        heading: "Tuning afterwards",
        image: {
          src: "/photos/piano-gallery/piano-tuning.jpg",
          alt: "A piano being tuned after a move",
        },
        paragraphs: [
          "Budget for a tune after the move. Not because we dropped it, but because pianos go out of tune when the humidity and temperature around them change, and a new house is a new climate.",
          "Let it acclimatise first. Two weeks in the new room is the usual advice before you book the tuner. Tuning it the day after the move mostly wastes the tuning.",
        ],
      },
      {
        heading: "How to keep a piano move cheap",
        paragraphs: [
          "Book midweek if your dates allow. A Tuesday or Thursday is the same crew doing the same work for up to $30 an hour less than a Friday.",
          "Clear the route before we arrive. Rugs up, doors off their catches, cars off the driveway, and a path from the piano to the truck that nobody has to negotiate around.",
          "Get the measurements to us early. Most of the cost of a difficult piano move is the improvising, and improvising is what happens when the planning did not.",
          "Tell us it is a piano when you first make contact. Not every crew is set up for one, and a general moving crew that discovers a piano on the morning is a bad day for everyone.",
        ],
      },
      {
        heading: "Get an actual number for your piano",
        paragraphs: [
          "Send us the type of piano, both suburbs, the floor at each end, and the narrowest measurement on the route. Photos of the doorways and stairs help more than anything else you can send.",
          "We come back with a real figure, usually within 15 minutes during business hours. For larger or more complicated jobs we will come and look at it for free, though not every piano move needs that.",
          "No obligation, and the number we quote is the pricing structure we invoice on.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you really need a professional piano mover?",
        a: "For a digital piano, no. For an upright or a grand, yes, and not because of the weight. It is the balance. An upright pivots around a high centre of mass, and once it starts to go over, two people cannot stop it. The damage is usually to the person, then the floor, then the piano.",
      },
      {
        q: "Why does moving a piano cost more than moving a couch?",
        a: "A couch can be dragged, tipped, and stood on its end. A piano cannot. It needs a board, straps, a controlled route and a crew who have done it before. You are paying for the time and the technique, not the kilograms.",
      },
      {
        q: "Can you move a piano up or down stairs?",
        a: "Usually. Send us the number of steps, whether there is a turn or a landing, and the width at the narrowest point. If the answer is that the stairs will not work, we will tell you before you book rather than on the day.",
      },
      {
        q: "How far ahead should I book a piano move?",
        a: "A week is comfortable. End of month and Fridays go first, and if your piano needs a hoist or a crane we need longer to organise the rig and, in some spots, the footpath.",
      },
      {
        q: "Do you store pianos between houses?",
        a: "Yes, and in a space we control rather than a unit we rent. Ask us about temperature specifically when you enquire, because a piano left in an uninsulated shed over an Auckland summer will need more than a tune afterwards.",
      },
      {
        q: "Will my piano need tuning after the move?",
        a: "Almost certainly, because the humidity and temperature in the new room will be different. Give it a couple of weeks to acclimatise first, then book the tuner.",
      },
    ],
  },

  /**
   * Deliberately split from office-move-auckland-planning-guide by intent: that
   * page answers "how do we plan this", this one answers "what will it cost".
   * The per-cubic-metre rates used to sit on both; they now live here only, and
   * the planning guide links across instead. Keep it that way. Two pages
   * carrying the same prices split the signal rather than compounding it.
   */
  "how-much-does-it-cost-to-move-an-office-in-auckland": {
    title: "How Much Does It Cost to Move an Office in Auckland? Real 2026 Numbers",
    sections: [
      {
        heading: "The short answer",
        image: {
          src: "/photos/source/batch-p126-p127/P1260879.jpg",
          alt: "Specialist Movers crew carrying office boxes through glass doors",
        },
        paragraphs: [
          "Across the Auckland market, a small office of one to five desks is generally quoted between $800 and $2,500 plus GST, and a twenty-desk office between $2,500 and $7,000 plus GST. Above fifty desks nobody quotes off a list, and neither do we.",
          "Those bands are wide because an office move is priced on volume and access rather than on headcount. Two companies with the same number of staff can be a factor of three apart, and usually the difference is the building rather than the furniture.",
        ],
        table: {
          caption: "Published Auckland market ranges, 2026. Our own quote depends on volume and access.",
          columns: ["Office size", "Auckland market range"],
          rows: [
            ["1 to 5 desks", "$800 to $2,500 plus GST"],
            ["6 to 20 desks", "$2,500 to $7,000 plus GST"],
            ["21 to 50 desks", "$6,500 to $15,000 plus GST"],
            ["50+ desks", "Quoted on inspection"],
          ],
        },
      },
      {
        heading: "The three ways an office move gets priced",
        image: {
          src: "/photos/source/batch-p125/P1250386.jpg",
          alt: "Specialist Movers truck loaded for a commercial job",
        },
        paragraphs: [
          "Most guides describe two pricing models. There are three, and knowing which one you are being offered tells you more than the number does.",
          "Hourly. A rate for the crew and truck, plus a one-off callout fee. Best for smaller offices and anything where the scope is genuinely uncertain, because you only pay for the time the job actually takes.",
          "Fixed price. One number for the whole job, quoted after someone has walked the site. Best when you need budget certainty or a purchase order, and the trade-off is that the number carries a margin for the unknowns.",
          "Per cubic metre. Priced on volume rather than time. This is the one almost nobody explains, and it is often the cheapest of the three for stock, storage and fit-out work, where the load is bulky and predictable and the handling is straightforward.",
          "The wrong model costs you real money. A warehouse of palletised stock quoted hourly is expensive. A tight CBD office with a lift booking quoted per cubic metre is a number that will not survive the day.",
        ],
      },
      {
        heading: "Our rates, and what the clock covers",
        image: {
          src: "/photos/source/batch-p125/P1250366.jpg",
          alt: "Specialist Movers truck on site at a commercial job",
        },
        paragraphs: [
          "Commercial jobs are priced the same transparent way as our house moves. An hourly rate for the crew and truck plus a callout fee, with the crew sized to the job.",
          "A two-person crew with a truck starts at $120 per hour plus GST on a Tuesday. Midweek sits around $130 to $135, and Friday is $150. A three-person crew runs $40 to $50 an hour more than two. The callout depends on distance from our Wairau Valley depot: $60 for close-in Auckland, $80 for outer suburbs, $120 for the fringe of the region.",
          "For freight-style work, like stock, storage or a fit-out, we price per cubic metre instead: $90 per cubic metre plus GST with a five cubic metre minimum, or $110 per cubic metre for after-hours work before 6am or after 5pm.",
          "The clock runs from arrival at your pickup address to the last item off the truck at the other end. Worth asking any mover whether theirs starts at the depot instead, because on a cross-town job that gap is an hour of billable time.",
        ],
      },
      {
        heading: "What actually drives the number",
        paragraphs: [
          "Volume, not headcount. Ten people in a paperless studio with laptops and a few desks is a different job from ten people in a firm that has kept every file since 2009. Count the storage, not the staff.",
          "Furniture that has to come apart. Workstation pods, height-adjustable desks and modular partitioning all dismantle and rebuild, and that is where the hours go. A pod system that came flat-packed will go back flat-packed, and it takes as long as it took the first time.",
          "Whether anyone has thrown anything out. Offices accumulate. The single biggest lever you control is deciding what does not come, and deciding it before we quote rather than on the day.",
        ],
      },
      {
        heading: "IT, and the things that do not just go in a box",
        image: {
          src: "/photos/blog/server-racks.jpg",
          alt: "Server racks in a comms room",
          credit: "panumas nikhomkhai / Pexels",
        },
        paragraphs: [
          "Desktops, monitors and docks move like any other fragile item, and they travel better in their original boxes if you still have them. Most people do not, so they get wrapped.",
          "Anything rack-mounted is a different conversation. Servers, switches and the comms cabinet need someone who owns the decommissioning and recommissioning, and that person is usually your IT provider rather than your mover. Get their availability confirmed before you lock a moving date, because a Saturday move with no one able to bring the network up until Tuesday is an expensive weekend.",
          "The cabling at the new site is not a moving cost, but it lands in the same budget and it has the longest lead time of anything on the list. Order it early.",
        ],
      },
      {
        heading: "The building is usually the problem",
        image: {
          src: "/photos/source/batch-p125/P1250030.jpg",
          alt: "Specialist Movers team and trucks at the Wairau Valley depot",
        },
        paragraphs: [
          "Access is the single biggest reason a commercial move costs more than the quote suggested it would, and in the CBD it is nearly always the lift.",
          "A goods lift that has to be booked, padded and operated by building management turns a continuous job into a queued one. If the lift is shared and you did not book it, you are waiting behind someone else's furniture. Ask your building manager for the loading dock rules and the lift booking process before you ask anyone for a quote.",
          "We moved a commercial fit-out out of a Newmarket showroom in late July 2026 where the stairs were not an option at all. The load included safes that could not go down the stairwell without real risk to the building and the crew, so it went out on a rated hoist with a crew of four: one operating the lift, one or two steadying the load in transit, one receiving at the top.",
          "Two details from that job are worth copying. We staged everything on the floor before the rig went up, because once you commit to a hoist lift you do not want to be hunting for the next item. And the safes went last, so nobody was doing the hardest lift already tired.",
          "Ground level needed planning too. Newmarket is busy, so that meant a temporary traffic management plan, or at minimum a spotter keeping the footpath clear. That is a cost, and it is one that appears on inner-city jobs more often than people expect.",
        ],
      },
      {
        heading: "After hours costs more per hour and less overall",
        paragraphs: [
          "Evening and weekend work carries a premium. Ours is the difference between $90 and $110 per cubic metre on freight-style jobs, and a higher hourly rate on crewed ones.",
          "It is still usually the cheaper option, and the arithmetic is not close. A twenty-person team that cannot work on Monday morning costs you twenty people's wages plus whatever those people would have billed. The premium on the moving invoice is a rounding error against that.",
          "The exception is a genuinely small office that can move on a Friday afternoon and be working by Monday anyway. If that is you, do not pay a premium you do not need.",
        ],
      },
      {
        heading: "The cost that never appears on the mover's invoice",
        image: {
          src: "/photos/source/batch-p125/P1250510.jpg",
          alt: "Specialist Movers crew working through an office relocation",
        },
        paragraphs: [
          "Every guide to office moving costs, including the ones currently ranking for this question, prices the truck and stops there. For most businesses the truck is not the biggest number.",
          "Downtime is. Add up the hours your team is packing instead of working, the hours they are unpacking instead of working, and the hours they are waiting for the network. On a twenty-person office that number reaches the moving invoice quickly and frequently passes it.",
          "This is why the cheapest-looking quote is often not the cheapest move. A crew that takes two days because it was under-resourced has cost you a day of everyone's time, and that does not show up anywhere you would think to look for it.",
          "It is also the argument for professional packing on a commercial job even if you would not bother at home. Your staff packing their own desks is not free labour. It is your most expensive labour doing unskilled work badly.",
        ],
      },
      {
        heading: "Make-good, and what your lease actually says",
        paragraphs: [
          "Most commercial leases require you to return the space to the condition you took it in. That means partitions out, cabling removed, walls made good, and the place professionally cleaned.",
          "This is a separate trade from moving and it is regularly the largest single line in an office move budget. Read the clause early. If your fit-out involved building anything, unbuilding it is on you.",
          "Move-out cleaning we can handle. Structural make-good is a builder, and you want that quoted long before your last day.",
        ],
      },
      {
        heading: "When the dates do not line up",
        paragraphs: [
          "Office leases rarely hand over cleanly. The old one ends, the new fit-out runs a fortnight late, and you have a floor of furniture and no floor to put it on. This is common enough that it belongs in the budget rather than in the surprises.",
          "Storage in transit is priced per cubic metre in the same way as the freight-style work above, so the volume you already had measured for the move is the volume you are storing. Getting that number early means you can price the contingency before you need it rather than at the point where you have no options.",
          "Two things make the stored-then-delivered version cheaper. Decide what is going straight to the new site and what is going to storage before move day, and label it that way, so nothing gets handled twice. And keep the things you will need first at the front, because a container packed in the wrong order costs an hour to unpack and repack at the other end.",
          "If the gap is long enough that it is worth asking whether some of the furniture should just be sold, ask it. Paying to store desks you will replace in the new fit-out is a cost with nothing at the end of it.",
        ],
      },
      {
        heading: "Insurance",
        paragraphs: [
          "Ask what the cover is, what the excess is, and specifically whether it covers items your own staff packed. Many policies exclude self-packed boxes, which matters more on an office move than a house move because your staff will pack most of it.",
          "Ask separately about the IT equipment. On some policies it is capped well below what a comms cabinet is worth.",
          "A vague answer about the claims process is itself the answer.",
        ],
      },
      {
        heading: "How to get a quote that holds",
        image: {
          src: "/photos/source/batch-p126-p127/P1260017.jpg",
          alt: "Specialist Movers crew loading office furniture",
        },
        paragraphs: [
          "For anything above a handful of desks, have someone walk the site. Both sites. A quote given over the phone for a commercial job is a guess, and a quote given in thirty seconds with no questions asked is a red flag rather than a bargain.",
          "Have these ready before you call: desk count, how many storage units and filing cabinets, what is in the comms room, the floor at each end, whether there is a goods lift and whether it needs booking, and your loading dock access times.",
          "Then ask what happens if the job runs long, and whether the rate changes after a certain hour. The answer to that question is where quotes diverge from invoices.",
        ],
      },
      {
        heading: "How to bring the number down",
        paragraphs: [
          "Purge before you quote, not after. Every archive box you do not move is money you do not spend twice, once on handling and once on the space it takes at the other end.",
          "Book the lift and the dock at both ends yourself, early. Nothing on this list saves more time.",
          "Have the new floor plan finished and the desks numbered before move day. Furniture that arrives with nowhere to go gets put down twice.",
          "Move midweek if the business can absorb it. A Tuesday is the same crew doing the same work for up to $30 an hour less than a Friday.",
          "Get your IT provider booked for the same window as the move rather than the week after.",
        ],
      },
      {
        heading: "Get an actual number for your office",
        image: {
          src: "/photos/source/batch-p125/P1250977.jpg",
          alt: "Specialist Movers crew handling storage crates",
        },
        paragraphs: [
          "Send us your desk count, both addresses, the floor at each end, and whether either building has a goods lift. Photos of the comms room and any storage areas help more than a description does.",
          "We come back with a real figure, usually within 15 minutes during business hours. For anything above a small office we will come and look at both sites for free, because that is the only way a commercial quote is worth anything.",
          "No obligation, and the number we quote is the pricing structure we invoice on.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the average hourly rate for office movers in Auckland?",
        a: "Across the Auckland market, small commercial jobs are generally quoted between $150 and $250 plus GST per hour for two to three movers and a truck. Ours starts at $120 plus GST for a two-person crew on a Tuesday, with a three-person crew $40 to $50 an hour more, plus a callout fee based on distance from our Wairau Valley depot.",
      },
      {
        q: "What does it cost to move a small office of five people?",
        a: "The Auckland market range for one to five desks is roughly $800 to $2,500 plus GST. Where you land inside that depends far more on the buildings than the desk count: ground floor with a loading dock at both ends sits at the bottom, a CBD tower with a booked goods lift sits at the top.",
      },
      {
        q: "Is an after-hours office move more expensive?",
        a: "Per hour, yes. Overall, usually not. Our freight-style pricing goes from $90 to $110 per cubic metre plus GST for work before 6am or after 5pm. That premium is almost always smaller than the cost of your whole team being unable to work on a weekday.",
      },
      {
        q: "Are commercial moves more expensive than house moves of the same size?",
        a: "Generally yes, for the same volume. Offices carry more furniture that has to be dismantled and rebuilt, more equipment that cannot simply be wrapped and stacked, and buildings with lift bookings and dock access windows that a house does not have.",
      },
      {
        q: "How far ahead should we book an office move?",
        a: "Four to six weeks for anything above a handful of desks, and longer if you need a specific weekend. The constraint is rarely our truck. It is the goods lift, your IT provider, and the make-good trades, and those three are what set your date.",
      },
      {
        q: "Who is responsible for disconnecting our servers and network gear?",
        a: "Your IT provider, in almost every case. We move the hardware once it is decommissioned and racked or boxed. Confirm their availability before you lock in a moving date, because the move is not finished when the truck is empty. It is finished when people can work.",
      },
    ],
  },

  /**
   * Scoped to single items and part loads, NOT whole houses. That boundary is
   * the only reason this can coexist with how-much-do-movers-cost-in-auckland,
   * which prices by bedroom count and says nothing about single items. Do not
   * add bedroom-count pricing here, and do not add single-item pricing there.
   * The per-item timings come from lib/furniture-pages.ts and should be changed
   * in both places together.
   */
  "how-much-do-furniture-movers-cost-in-auckland": {
    title: "How Much Do Furniture Movers Cost in Auckland? Real 2026 Numbers",
    sections: [
      {
        heading: "The short answer",
        image: {
          src: "/photos/source/batch-p126-p127/P1260739.jpg",
          alt: "Specialist Movers crew carrying a sofa while the client reads",
        },
        paragraphs: [
          "Moving a single piece of furniture across Auckland is generally quoted between $150 and $350 plus GST. A bed that needs taking apart and putting back together runs higher, and a marble-topped table higher again.",
          "You will also find quotes at $69 and quotes at $550 for what sounds like the same job. That spread is real and it is not random. It is the difference between one person with a van and two insured movers with blankets, straps and a trolley, and it is worth knowing which one you are buying.",
          "If you are moving a whole house rather than a few items, the pricing works differently and we have written that up separately.",
        ],
        table: {
          caption: "Published Auckland market ranges, 2026. Single item, standard access at both ends.",
          columns: ["Item", "Auckland market range"],
          rows: [
            ["Sofa or couch", "$180 to $400 plus GST"],
            ["Fridge or freezer", "$180 to $350 plus GST"],
            ["Bed, including disassembly", "$300 to $550 plus GST"],
            ["Trade Me or Marketplace pickup", "$150 to $450 plus GST"],
          ],
        },
        link: {
          href: "/blog/how-much-do-movers-cost-in-auckland",
          label: "Moving a whole house? Here is what that costs",
        },
      },
      {
        heading: "Why one item costs more than you would expect",
        image: {
          src: "/photos/source/batch-p125/P1250461.jpg",
          alt: "Specialist Movers crew carrying blanket-wrapped furniture",
        },
        paragraphs: [
          "A three-seater sofa takes two movers about twenty to forty minutes to wrap, carry and place. People do the arithmetic on that at an hourly rate and expect to pay forty dollars.",
          "The number is higher because the truck still has to get to you and back, and two people still have to be booked for a slot that could have held a bigger job. Our callout fee is $60 for close-in Auckland, $80 for the outer suburbs and $120 for the fringe of the region, calculated from our Wairau Valley depot, and that applies whether the truck carries one item or forty.",
          "So the floor on any furniture job is the callout plus the minimum crew time, not the literal minutes your sofa spends in the air. Every mover works this way. The ones advertising $69 are either very close to you, doing it single-handed, or both.",
        ],
      },
      {
        heading: "How long each item actually takes",
        image: {
          src: "/photos/hard-to-shift/crew-guide-lift.jpg",
          alt: "Two Specialist Movers guiding a heavy item through a doorway",
        },
        paragraphs: [
          "These are our own timings for two movers with normal access at both ends. Multiply by the hourly rate and add the callout and you have the shape of your quote before you ever speak to us.",
          "Our two-person crew starts at $120 per hour plus GST on a Tuesday, our quietest day. Midweek sits around $130 to $135, and Friday is $150.",
        ],
        table: {
          caption: "Two movers, normal access. Stairs, long carries and tight doorways all add time.",
          columns: ["Item", "How we handle it", "Time"],
          rows: [
            ["Three-seater sofa", "Blanket-wrapped, shrink wrapped, carried on its end", "20 to 40 min"],
            ["Bed and mattress", "Frame apart, mattress in a cover, rebuilt at the other end", "30 to 45 min"],
            ["Fridge or freezer", "Emptied and defrosted first, strapped upright to a trolley", "20 to 30 min"],
            ["Wardrobe or tallboy", "Emptied, doors taped, wrapped, walked on a flat trolley", "20 to 40 min"],
            ["Dining table, timber", "Legs removed, top wrapped and carried on edge", "30 to 45 min"],
            ["Dining table, marble or glass", "Top travels vertically in a padded frame, never flat", "45 to 90 min"],
            ["Pool table, slate", "Slate beds separated, carried individually, relevelled", "2 to 4 hrs"],
          ],
        },
      },
      {
        heading: "Combining items is where the money is",
        image: {
          src: "/photos/source/batch-p125/P1250366.jpg",
          alt: "Specialist Movers truck loaded with wrapped furniture",
        },
        paragraphs: [
          "This is the part nobody writes down, and it is the single most useful thing on this page.",
          "The callout is fixed. Once the truck is at your door and two people are standing in your lounge, each extra item costs only the time it takes. So the cost per item falls sharply the more you move at once.",
          "Work it through on a Tuesday. One sofa on its own is a callout plus the minimum booking. Add a bed and a fridge to the same visit and you have added roughly an hour of crew time, which is $120 plus GST, spread across three items instead of one.",
          "The practical version: if you are moving a sofa this month and a bed next month, move both now. And if you are buying two things off Trade Me from opposite sides of Auckland, ask whether they can go on one run rather than two.",
          "The same logic is why a part load of six or eight pieces is far better value per item than three separate single-item jobs, even though the invoice is bigger.",
        ],
      },
      {
        heading: "What it is made of matters more than how big it is",
        image: {
          src: "/photos/blog/marble-dining-table.jpg",
          alt: "A marble-topped dining table in a modern dining room",
          credit: "Furkan Tumer / Pexels",
        },
        paragraphs: [
          "Two dining tables of identical dimensions can be an hour apart, and the difference is the top.",
          "A timber table is thirty to forty-five minutes. Legs off, top wrapped, carried on edge. A marble or glass top is forty-five to ninety minutes, because the top has to travel vertically in a padded frame and never flat. Stone cracks across its own weight if it is laid down and the surface underneath is not perfectly even, and a marble top laid flat in a truck over a speed bump is a common and expensive way to find that out.",
          "The same goes for anything with a stone, glass or mirrored surface, and for older furniture with joints that have loosened over the decades. Veneer and chipboard flat-pack is its own problem: it frequently does not survive being taken apart and rebuilt, so we would rather carry it assembled if the doorways allow.",
          "Tell us what the thing is made of when you ask for a quote, not just how big it is. It is the detail most likely to change the number.",
        ],
      },
      {
        heading: "Stairs, lifts and the walk from the truck",
        image: {
          src: "/photos/hard-to-shift/balcony-hero.jpg",
          alt: "Specialist Movers crew lifting furniture to a balcony",
        },
        paragraphs: [
          "Access is the single biggest reason a furniture job costs more than the quote suggested. On a one-item job it matters proportionally more, because there is less other work for the extra time to hide inside.",
          "Stairs add roughly half an hour to an hour per end. An apartment lift that has to be booked can add more than the stairs would have, and a lift that is out of service turns a forty-minute job into a two-hour one.",
          "Where the truck can park matters more than people think. Ten metres of extra carry is nothing once. On a part load of twenty pieces it is the difference between a two-hour job and a three-hour one.",
          "If the item will not fit through a door, the job becomes a balcony lift and the price structure changes entirely. Measure the narrowest point on the route rather than the widest, and measure the item at its widest. If those two numbers are close, send us photos before you book.",
        ],
      },
      {
        heading: "Disassembly, and who is doing it",
        paragraphs: [
          "Beds, modular wardrobes and most large dining tables come apart. That work is billed as time, so whether we do it or you do it changes the number.",
          "If you take the bed apart before we arrive and keep the fittings in a labelled bag taped to the frame, you have saved yourself the better part of half an hour at each end. If we arrive to a made bed and no tools out, you are paying our hourly rate to do something you could have done on Sunday.",
          "The exception is anything you are not confident you can rebuild. A bed frame reassembled wrong is worse than a bed frame we took apart ourselves.",
        ],
      },
      {
        heading: "Trade Me and Marketplace pickups",
        paragraphs: [
          "A large share of single-item furniture jobs in Auckland are online purchases, and they carry a specific risk: you have usually not seen the item, and the seller has usually not measured it.",
          "Ask the seller for the width at its widest point and a photo of the doorway it currently sits behind. If it got in, it can get out, but only by the route it came in by, and that route is not always the one the seller assumes.",
          "Confirm the pickup window before you book us. The most common way a Trade Me delivery becomes expensive is a crew arriving at a house where nobody is home, because that time is still billable.",
          "Also ask whether the seller will help load. They are often willing, and it is not something either of us should assume.",
        ],
      },
      {
        heading: "The $69 quote, and what it is not",
        paragraphs: [
          "There is a real market at the bottom of the range, and for some jobs it is the right call. A flat-pack bookshelf going three suburbs with ground-floor access at both ends does not need an insured two-person crew.",
          "What that price does not usually include: a second person, furniture blankets, a trolley, straps, or cover if the thing gets dropped. Ask what happens if it is damaged, and if the answer is vague, that is the answer.",
          "The judgement is simple enough. Compare the quote to what the item is worth. Nobody should pay us to move a $90 bookshelf. A $3,000 sofa through a doorway with 20 mm to spare is a different conversation.",
          "A quote given in thirty seconds with no questions asked is a red flag rather than a bargain. A proper quote requires knowing what the item is, what floor it is on, and what the access is like at both ends.",
        ],
      },
      {
        heading: "Insurance",
        paragraphs: [
          "Ask what the cover actually is, and what the excess is. Basic liability and full replacement value are very different things.",
          "For a single valuable item this matters more than it does on a house move, because there is no averaging out. If the one thing on the truck is the one thing that gets damaged, the cover on that item is the whole conversation.",
          "Ask specifically about items you packed or wrapped yourself. Many policies exclude them.",
        ],
      },
      {
        heading: "How to bring the number down",
        image: {
          src: "/photos/source/batch-p126-p127/P1260453.jpg",
          alt: "Specialist Movers crew wrapping and preparing items",
        },
        paragraphs: [
          "Move everything in one visit rather than spreading it over months. The callout is the fixed cost and you only want to pay it once.",
          "Book midweek. A Tuesday is the same crew doing the same work for up to $30 an hour less than a Friday.",
          "Take the bed apart yourself and bag the fittings, if you are confident you can rebuild it.",
          "Empty the wardrobe, the drawers and the fridge before we arrive, and defrost the fridge the night before. A full wardrobe is a two-person lift that should have been a one-person trolley job.",
          "Clear the route. Rugs up, doors hooked open, cars off the driveway.",
          "Park as close as you can at both ends, and if you are in an apartment, book the lift.",
        ],
      },
      {
        heading: "Get an actual number for your furniture",
        image: {
          src: "/photos/source/batch-p125/P1250836.jpg",
          alt: "Specialist Movers crew positioning furniture in a room",
        },
        paragraphs: [
          "Send us a list of the items, both suburbs, the floor at each end, and what the tricky ones are made of. Photos of anything with a tight doorway save more time than a description does.",
          "We come back with a real figure, usually within 15 minutes during business hours.",
          "No obligation, and the number we quote is the pricing structure we invoice on.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does it cost to move just one piece of furniture in Auckland?",
        a: "Generally $150 to $350 plus GST across the Auckland market for a single item with standard access. The floor is set by the callout fee plus minimum crew time rather than by how long your item takes, which is why one sofa does not cost a third of what three items cost.",
      },
      {
        q: "Is it cheaper to move several items at once?",
        a: "Substantially, per item. The callout is a fixed cost paid once, so every additional piece only costs the time it takes to carry. Moving a sofa, a bed and a fridge in one visit is far cheaper than three separate jobs, and it is the easiest saving available on this whole page.",
      },
      {
        q: "Why does a marble dining table cost more than a wooden one the same size?",
        a: "Because it takes about twice as long. A timber top is 30 to 45 minutes, legs off and carried on edge. A marble or glass top is 45 to 90 minutes, because it has to travel vertically in a padded frame and never flat. Stone can crack under its own weight if it is laid down.",
      },
      {
        q: "Do I need to take my bed apart before the movers arrive?",
        a: "You do not have to, but it saves you money if you do, because the disassembly and rebuild is billed as time. Keep the fittings in a labelled bag taped to the frame. If you are not confident you can rebuild it correctly, leave it to us.",
      },
      {
        q: "Can you pick up something I bought on Trade Me?",
        a: "Yes, and it is one of the more common jobs we do. Get the seller to confirm the width at the widest point and the pickup window before you book. A crew arriving at a house where nobody is home is still billable time.",
      },
      {
        q: "Should I use a cheap single-item service instead?",
        a: "For a flat-pack bookshelf going a few suburbs with easy access, quite possibly. For anything valuable, fragile, or going through a tight doorway, compare the quote against what the item is worth and ask what cover comes with it. A vague answer about damage is itself the answer.",
      },
    ],
  },
  "crane-lift-beach-haven-how-we-did-it": {
    title: "Crane Lift in Beach Haven: How We Got the Furniture In",
    sections: [
      {
        heading: "When the front door is not the answer",
        paragraphs: [
          "Some jobs are straightforward. Load the truck, drive across Auckland, carry things in through the front door. Done.",
          "This one was not that job.",
          "In August 2026 we were called to a property in Beach Haven, on the North Shore, to deliver a large piece of furniture. The access inside the home ruled out the usual route. The stairwell was too tight, the turns too sharp. Trying to force it through would have meant damage to the item or the walls, probably both.",
          "The answer was a crane lift: bring the item up the outside of the building and in through an upper-level opening. It is a technique we use when the building itself is the obstacle.",
        ],
      },
      {
        heading: "Planning before the truck leaves",
        paragraphs: [
          "A crane lift does not just happen on the day. The planning starts well before the crew arrives.",
          "We needed to know the weight and dimensions of the item, the height of the lift, what the landing point looked like, and whether there was clear space on the ground for the crane to operate safely. Beach Haven sits close to the Waitemata Harbour and the properties there can have steep sections and limited flat ground, so site assessment matters.",
          "On a job like this we also have to think about the neighbours and the street. A crane takes up room. We work out timing so the disruption is as short as possible.",
        ],
      },
      {
        heading: "The crew and the kit",
        paragraphs: [
          "Two movers handled this job. That might sound lean for a crane lift, but the crew size fits the task: one person manages the item as it rises, the other guides it in at the landing point and makes sure nothing shifts during the swing.",
          "The crane does the heavy work. Our role is control, not brute force. Furniture gets protected with blankets or shrink wrap depending on what the surface needs, because a scratch at the top of a lift is just as bad as one on the ground.",
          "We carry full public liability cover and our crews are insured. For customers who want cover arranged for their own belongings, we can help sort that through our team before the job.",
        ],
      },
      {
        heading: "How the lift went",
        paragraphs: [
          "The team was on site in Beach Haven early. That is deliberate. A crane lift in a residential street goes better before the morning traffic builds, and it gives us time to set up without rushing.",
          "The item came off the truck, was prepared for the lift, and went up. The landing was controlled. Once it was inside, the crew positioned it and made sure nothing in the room had been disturbed in the process.",
          "From truck to in-room, the operation ran to plan. That is what good preparation looks like.",
        ],
      },
      {
        heading: "What makes Beach Haven tricky for deliveries",
        paragraphs: [
          "The North Shore has some of Auckland's most varied terrain. Beach Haven in particular has a mix of older homes on sections that were not designed with large furniture in mind, steep driveways, and properties where the upper floors are the main living area.",
          "If you are buying or moving something large in this part of Auckland, it is worth thinking about access before the truck arrives. A sofa that fits in the shop does not always fit around a 1960s stairwell. The earlier you flag the access question, the more options you have.",
        ],
      },
      {
        heading: "What to do if you think you have a crane job",
        paragraphs: [
          "First, measure. Doorways, hallway widths, stairwell widths at the tightest point, and ceiling heights on any turns. Take photos if you can.",
          "Second, check the outside. Is there enough flat ground for a crane to park and operate? Are there power lines nearby? In some Auckland suburbs the lines run close to the house, which affects how a crane can approach.",
          "Third, call early. Crane lifts need more lead time than a standard move. The crane itself has to be booked, the site has to be assessed, and any permits for street access may need arranging.",
          "We have done balcony hoists and crane lifts across Auckland, and we know what to look for. If you are not sure whether your job needs one, describe the item and the access to us and we will give you an honest answer.",
        ],
      },
      {
        heading: "Specialist gear for items that need it",
        paragraphs: [
          "Crane lifts are one end of the spectrum. We also handle items that are heavy, fragile, or oddly shaped in other ways. We are trusted by Auckland's Steinway dealers and Auckland Town Hall for piano moves, which gives you a sense of the care we bring to anything that cannot just be rolled up a ramp.",
          "Not every hard job is a crane job. Sometimes it is about packing, sometimes about the angle of approach, sometimes about choosing the right moment in the day. The point is that the technique comes from the item and the site, not from a default setting.",
        ],
      },
      {
        heading: "Get a quote for your job",
        paragraphs: [
          "If you have a piece that will not go through the door, or you are not sure how you will get it in at all, we are worth talking to. We quote back in around 15 minutes during business hours, and for larger or more complex jobs we can come and look at the site first.",
          "You can request a quote through our website. Tell us what the item is, where it is going, and what the access looks like, and we will take it from there.",
        ],
      },
    ],
  },
  "moving-truck-hamilton": {
    title: "Getting a Moving Truck in Hamilton: What the Job Actually Looks Like",
    sections: [
      {
        heading: "If You've Searched \"Moving Truck Hamilton\", Here's What You Actually Need",
        paragraphs: [
          "Most people searching for a moving truck in Hamilton are not looking to hire a truck and drive it themselves. They want a truck that turns up with people who know what they are doing. That is what we provide from our Hamilton base.",
          "We are Specialist Movers. We have two bases, one in Auckland and one in Hamilton, and the Hamilton operation covers the wider Waikato including Cambridge, Te Awamutu, Morrinsville, Matamata, Huntly, Ngaruawahia and Raglan. So if you are moving within Hamilton, out to the surrounding towns, or between Hamilton and Auckland, we have the truck and the crew.",
        ],
      },
      {
        heading: "What a Hamilton Move Actually Involves",
        paragraphs: [
          "Hamilton is a mix of older bungalows in Dinsdale and Frankton, bigger family homes out toward Rototuna and Flagstaff, and a lot of townhouses and apartments closer to the CBD and the university. Each of those has different loading conditions.",
          "A Rototuna family home with a long flat driveway and a double garage is a different job from a Te Awamutu house with a steep section and a timber deck. A flat in the CBD might have a lift, or it might have stairs that narrow at the top. None of this is a problem. It just affects how long the job takes and how the crew approaches it.",
          "Crew size for most Hamilton moves is two to four people. Trucks have taillifts. For items that need extra care, such as a piano or a large piece of furniture in a tight space, the crew uses blankets, shrink wrap or mattress covers depending on what the item needs.",
        ],
      },
      {
        heading: "How Pricing Works for a Moving Truck in Hamilton",
        paragraphs: [
          "We do not hide the numbers. Hourly rates are the same across Hamilton and Auckland. The fixed callout varies with distance from our depot, and you see the full price before you book, not after.",
          "The things that move the price up or down are: how long the job takes, how many crew members are needed, and whether there are access complications at either end. A straightforward same-city move in Hamilton is usually quoted and done the same week.",
          "We do not charge extra for weekends. We operate seven days.",
        ],
      },
      {
        heading: "How We Quote It",
        paragraphs: [
          "Send us a message or fill in the quote form on the website. In business hours, we usually come back to you in about 15 minutes. For larger homes we can arrange a free viewing so the quote is accurate.",
          "The information that helps us most: the addresses at both ends, a rough list of the larger items (beds, sofas, appliances, anything fragile or heavy), and whether there are stairs or tricky access at either property. With that, we can give you a price that holds.",
        ],
      },
      {
        heading: "What People Get Wrong Before Moving Day",
        paragraphs: [
          "The most common issue we see is underestimating volume. A three-bedroom house in Huntly looks manageable until someone adds up the garage, the garden shed and the linen cupboard. If the quote is based on two hours and the job runs to four, that changes the day for everyone.",
          "The second thing people get wrong is access. Parking a moving truck on Anglesea Street or near the lake in the CBD takes a bit of planning. If you know there are restrictions at your address, tell us early. We sort it, but we need the heads-up.",
          "The third is timing. Moving out of a rental on the last day of the month, at the same time half of Hamilton is doing the same thing, puts pressure on availability. Booking a week or two out gives you more choice of days and crew.",
        ],
      },
      {
        heading: "Waikato Moves Beyond the City",
        paragraphs: [
          "A lot of what we do in the Waikato is not strictly a Hamilton-to-Hamilton job. Cambridge and Te Awamutu are busy, and Matamata and Morrinsville are growing faster than people expect. Raglan is a different situation because of the road and the sections, and we know that stretch well.",
          "If you are moving between any of these towns, or between Hamilton and Auckland, the quote process is the same. We do the Hamilton to Auckland run regularly and the distance is factored into the price upfront.",
        ],
      },
      {
        heading: "Insurance and Peace of Mind",
        paragraphs: [
          "Our crews are licensed and insured. We carry public liability and carrier's liability. If you want cover arranged for your own belongings during the move, we can sort that through our team before the job starts.",
        ],
      },
      {
        heading: "Ready to Sort Your Moving Truck in Hamilton?",
        paragraphs: [
          "You now know what the job involves, how the pricing works, and what to watch out for. The next step is straightforward. Use the quote form on our website, give us the basics of the move, and we will come back to you quickly with a price.",
          "We have done 4,000+ moves across Auckland and the Waikato. Hamilton is not an add-on for us. It is half of what we do.",
        ],
      },
    ],
  },
  "what-professional-packers-do-auckland": {
    title: "Inside a Day-Before Pack: What the Crew Does, Room by Room",
    sections: [
      {
        heading: "The day before is its own job",
        paragraphs: [
          "Most people think of moving day as the main event. But if you book a packing service, the day before is when a lot of the real work happens. A crew comes to your home, brings all the materials, and works through your rooms systematically while you get on with other things.",
          "When moving day arrives, the truck team can load straight away. Nothing needs wrapping on the footpath. Nothing gets forgotten in a drawer because someone ran out of time the night before.",
        ],
      },
      {
        heading: "What the packers bring with them",
        paragraphs: [
          "The crew arrives with boxes in several sizes, butcher's paper, bubble wrap, packing tape, mattress covers, and furniture blankets. They do not show up expecting you to have supplies ready.",
          "Fragile items get wrapped individually before going into a box. That might be bubble wrap for something with an odd shape, or paper for everyday crockery. The crew decides based on what is in front of them, not a fixed formula. Boxes are labelled with the room they are going to, which makes unloading at the other end much faster.",
        ],
      },
      {
        heading: "How the rooms get worked through",
        paragraphs: [
          "The crew usually starts with the rooms you use least: spare bedrooms, the garage, any storage areas. That way the kitchen and main living spaces stay functional as long as possible.",
          "Kitchens take the most time. Lots of small, breakable things packed together, and cupboards that always have more in them than you expect. Plates get packed on their edge, not flat. Glasses are individually wrapped. Pots and bulkier items go into larger boxes with paper to stop them shifting.",
          "Bedrooms go quickly by comparison. Clothes in drawers can often stay in the drawers if the furniture is being moved that way. Wardrobes get emptied into wardrobe boxes where hanging items can travel upright, which saves a lot of ironing at the other end.",
          "Artwork, mirrors, and anything with a glass face gets wrapped and packed upright in purpose-sized boxes or between blankets. The crew treats these as a separate category rather than tucking them in with general items.",
        ],
      },
      {
        heading: "What you should pack yourself",
        paragraphs: [
          "Some things belong in your hands, not in a packer's box. Passports, birth certificates, wills, financial documents, and any paperwork you might need in the next few days should travel with you.",
          "The same goes for jewellery, cash, and anything small and high-value. Not because packers are untrustworthy, but because a small bag in your car is simply the safest place for things that cannot be replaced.",
          "Pack an essentials box yourself the night before. Include a change of clothes, phone chargers, medication, a few basics from the kitchen, toilet paper, and whatever the kids or pets will need in the first few hours. Label it clearly and keep it separate so it goes into the house first, not onto the truck last.",
        ],
      },
      {
        heading: "Things to talk through before the crew starts",
        paragraphs: [
          "Walk through the house with the lead packer before they begin. Point out anything fragile or unusual. If something needs special attention, say so at the start rather than after it has been packed.",
          "Let them know which items are not moving. It sounds obvious, but packers work efficiently and a box of things destined for the op shop can end up on the truck if nobody flags it. A sticky note on furniture that is being left behind is a simple way to avoid that.",
          "If you have a dedicated spot at the new place for certain items, mention it. Labelling boxes for a specific room rather than just 'kitchen' or 'lounge' saves everyone a lot of shuffling at the other end.",
        ],
      },
      {
        heading: "Packing and moving on the same day: when it works, when it doesn't",
        paragraphs: [
          "Some jobs do combine packing and moving on the same day. A smaller flat with a later truck time can work fine. But for a three-bedroom house in Remuera or a full family home in Botany, trying to pack and load on the same morning usually just means a longer, more stressful day for everyone.",
          "The day-before model works well because it separates two very different tasks. Packing requires patience and care. Loading and transport requires speed and muscle. Mixing them at the same time, under time pressure, is where things tend to go wrong.",
        ],
      },
      {
        heading: "Insurance and your belongings",
        paragraphs: [
          "Our crews are licensed and insured. If you want cover for your own goods in transit, that can be arranged through our team before the job. Ask when you book and we will walk you through the options.",
        ],
      },
      {
        heading: "Getting a quote",
        paragraphs: [
          "Packing is priced alongside your move, so the easiest thing to do is mention it when you first get in touch. For larger homes we offer free viewings so we can give you an accurate picture of what the pack will involve.",
          "Quotes usually come back within about 15 minutes during business hours. If you want to know what a day-before pack would look like for your place, head to the quote form on our website and tell us a bit about the job.",
        ],
      },
    ],
  },
  "auckland-office-relocation-building-access-guide": {
    title: "Before the Truck Arrives: Building Access, Lifts and Loading Docks in an Auckland Office Move",
    sections: [
      {
        heading: "The Move Day Is the Easy Part",
        paragraphs: [
          "Most office moves that go wrong do not go wrong because of the movers. They go wrong because no one confirmed the freight lift booking, or the loading dock turns out to be shared with three other tenants, or the security desk was not told to expect a crew at 6 am.",
          "The physical moving part, getting furniture from one floor to another, is straightforward when the access is sorted. It is the coordination beforehand that decides whether your team is working at their new desks by Monday morning or waiting on a footpath in the rain.",
          "This guide is for the person in your business who ends up coordinating the move. You do not need to have done this before. You just need to ask the right questions early enough to act on the answers.",
        ],
      },
      {
        heading: "What to Ask Your Building Manager Before Anything Else",
        paragraphs: [
          "Start with your building manager at least four weeks out, not one. The questions that matter most are: Can you book the freight lift exclusively, and for how long? Is the loading dock first-come first-served, or does it require a booking? What are the approved hours for contractor access, and who authorises after-hours work?",
          "Get the answers in writing. A verbal yes from a facilities manager means nothing when a different security guard is on at 5:30 am on move day.",
          "Also ask about the specifics of the lift itself. What are the internal dimensions? What is the weight rating? Some older buildings in the CBD have freight lifts that look large but have a weight limit that rules out moving a full server rack or a heavy boardroom table in a single trip. Knowing this early lets your movers plan the order of work rather than discover the constraint mid-job.",
          "Find out whether the building requires a certificate of currency from your movers. Most managed commercial buildings in Auckland do, and some have a minimum liability cover requirement. A moving company that works regularly on commercial jobs will have this ready. If they hesitate, that tells you something.",
        ],
      },
      {
        heading: "Common Access Problems in the CBD",
        paragraphs: [
          "Auckland's CBD presents a specific set of constraints. Loading dock windows are often narrow, frequently shared between multiple tenants, and booked out fast if you are moving at month-end when leases turn over. On streets like Shortland, Fort and Wyndham, there is no realistic option to park a large truck for an extended period without a proper dock or a timed permit.",
          "Auckland Transport issues temporary traffic management permits for some moves that require extended kerbside loading. This is not something you sort on the morning. Apply well in advance and factor the cost into your move budget.",
          "High-rise buildings with a single freight lift and high tenancy turnover are the most common source of delays. If your building fits that description, book the lift for longer than you think you need. An extra hour of lift time costs less than overtime for a crew waiting on the ground floor.",
        ],
      },
      {
        heading: "North Shore Access: Different Problems, Same Principle",
        paragraphs: [
          "Commercial buildings on the North Shore, particularly along Taharoto Road in Takapuna and in the Smales Farm precinct, tend to have more generous loading areas than the CBD, but they come with their own quirks.",
          "Shared campus environments like Smales Farm often have security protocols that require vehicles to be pre-registered. Turn up unannounced with a truck and you may wait while someone tracks down the right person to authorise access. In business parks around Albany and Northcote, access roads are sometimes weight-restricted, which matters for a fully loaded furniture truck.",
          "The principle is the same wherever you are moving from or to. Contact the building manager early, confirm everything in writing, and share those confirmations with your moving company before the job starts.",
        ],
      },
      {
        heading: "After-Hours Work: When It Makes Sense and What It Requires",
        paragraphs: [
          "Many Auckland businesses choose to move after hours or over a weekend to avoid disrupting their own operations and those of neighbouring tenants. This is sensible, but it adds a layer of coordination that catches people out.",
          "After-hours access usually requires formal approval from building management, sometimes days in advance. Security firms need to be briefed. Some buildings charge a facilities fee for after-hours lift use. Find out before you book, because these costs belong in your move budget.",
          "If your building has card-access-only entry after a certain time, make sure someone with the right access level is physically present for the duration of the job. A crew that arrives to find a locked loading dock and no one to let them in is not a problem the movers can solve from the footpath.",
          "Commercial movers who do after-hours and weekend work regularly will already know these questions to ask. When you are talking to your movers, ask them directly what information they need from you about after-hours access. Their answer will tell you whether they have done this before.",
        ],
      },
      {
        heading: "Why Sequencing Matters More Than the Date",
        paragraphs: [
          "The single biggest driver of how smoothly an office move runs is the order in which things happen, not which day it falls on.",
          "Your IT team needs to move servers and infrastructure either first or last, depending on your setup. Workstations that need to be reassembled and connected before staff arrive need to move before the chairs and filing cabinets, not after. If your new space needs any fitout work completed before furniture goes in, that fitout needs a hard finish date, not a rough estimate.",
          "Map this out as a sequence, not just a calendar. Write down what has to happen before each other thing can happen. Then add a buffer at each dependency point. When step three slips, steps four through eight slip with it. The businesses that move cleanly are the ones that thought about dependencies, not just dates.",
          "Talk this through with your moving company early. A commercial mover who is used to coordinating around IT, fitout teams and building access will have questions and suggestions that help. If they just ask for the address and a date, keep asking questions yourself.",
        ],
      },
      {
        heading: "A Practical Pre-Move Checklist",
        paragraphs: [
          "Four or more weeks out: contact both building managers (old and new premises), confirm freight lift availability and loading dock bookings, ask about contractor access hours and any certificate of currency requirements, and start your sequence plan.",
          "Two weeks out: confirm everything in writing, share access details with your moving company, check whether after-hours security needs to be briefed, and confirm IT and fitout timelines against your move sequence.",
          "One week out: reconfirm the freight lift booking, make sure the right people have after-hours access cards if needed, brief your own staff on the plan and what they need to have packed or cleared before the crew arrives.",
          "The day before: confirm your moving company has the building manager's contact number and the loading dock details. Make sure someone from your team will be on-site for the duration of the job. Have a backup contact for building access in case the primary person is unavailable.",
        ],
      },
      {
        heading: "Getting the Right Movers for a Commercial Job",
        paragraphs: [
          "Not every moving company is set up for commercial work. Managed buildings, construction sites and commercial precincts often require movers to hold SiteWise Gold certification. Specialist Movers holds SiteWise Gold with a 90-plus percent score, which is what gets a crew through the gate at those sites.",
          "We work after hours and on weekends, and we have done 4,000-plus moves across Auckland and the Waikato, including commercial relocations in the CBD and across the North Shore. We know what building managers are going to ask, which means fewer surprises on the day.",
          "If you are planning a commercial move and want to talk through the access and sequencing before you commit to a date, get in touch through our website. Tell us what you are working with and we will come back to you with a clear picture of what is involved.",
        ],
      },
    ],
  },
  "balcony-hoist-couch-freemans-bay": {
    title: "Down from the Second Floor: A Freemans Bay Balcony Hoist Job",
    sections: [
      {
        heading: "The job in plain terms",
        paragraphs: [
          "In August 2026 we were called to a Freemans Bay apartment to move a couch down from a second-level balcony. The building sits in one of those older pockets of Freemans Bay where the internal stairwells are narrow and the corners are tight. Getting a full-size couch down through the building was not a realistic option. That left the balcony as the exit point, and that meant a hoist.",
        ],
      },
      {
        heading: "Why the stairs were not the answer",
        paragraphs: [
          "Before we commit to a hoist, we look hard at every ground-level route. Staircases, landings, door widths, the angle at the bottom of the stairs, whether a couch can be stood on its end without the ceiling killing the clearance. On this job the internal path did not work. The couch was not going to make the turns without damage to the item or the walls, and forcing it was not something we were willing to do.",
          "Once we ruled out the stairs, the balcony hoist became the plan, not a fallback. That shift in thinking matters. You plan a hoist the same way you plan any other lift: assess the weight, the anchor points, the drop zone on the ground, and who stands where.",
        ],
      },
      {
        heading: "Planning the lift",
        paragraphs: [
          "The balcony was on the second level, so the vertical drop was manageable, but we still needed a clear path from the balcony rail to the ground and enough flat space below to receive the couch safely. Freemans Bay streets can be tight, and foot traffic and parked cars are part of the picture. We plan for that before the truck arrives.",
          "The crew size and the rigging setup are decided before the day. On a job like this, having the right number of hands matters more than working fast. One person manages the load on the balcony, others control the descent and guide the couch clear of the building face.",
        ],
      },
      {
        heading: "On the day",
        paragraphs: [
          "The hoist itself, once the setup is right, is the straightforward part. The couch came down from the balcony under control and was loaded directly onto the truck. Total time at the property was what you would expect for a job with this kind of access challenge: longer than a standard ground-floor pickup, but well within the window we had planned for.",
          "We use blankets, shrink wrap or mattress covers depending on what an item needs during a hoist. A couch coming down the outside of a building picks up more risk than one carried through a hallway, so protection matters.",
        ],
      },
      {
        heading: "What makes a hoist job different from a standard move",
        paragraphs: [
          "The planning window is longer. We need to see the site, or get accurate measurements and photos, before we can give you a confident quote. A balcony hoist that turns out to need a crane lift is a different job to one that only needs rigging and rope.",
          "Access to the ground-level drop zone sometimes needs to be arranged in advance, especially in apartment complexes or on narrow Auckland streets. If your building has a body corporate, it is worth checking whether they need notice before a hoist is run off the balcony. We have done this enough times to know which questions to ask, and we will prompt you if we think something needs sorting before the day.",
        ],
      },
      {
        heading: "If you have something that will not fit through the stairwell",
        paragraphs: [
          "The first step is to tell us the item, the floor it is on, and what the internal path looks like. A few photos of the staircase, the landing, and the balcony go a long way. From there we can usually tell you whether a hoist is needed, or whether there is a ground-level option we can work with.",
          "Large sofas, sectional lounges, and awkward bedroom furniture are the most common items we hoist in Auckland apartments. The buildings around Freemans Bay, Ponsonby, Grey Lynn, and the CBD waterfront are full of them, because the apartments were built before furniture got as large as it is now.",
          "Our crew are licensed and insured. Cover for your own belongings during a hoist can be arranged through our team before the job. We will talk you through the options when you get in touch.",
        ],
      },
      {
        heading: "Getting a quote",
        paragraphs: [
          "If you have a similar job coming up, the best thing to do is send us the details through the website. Quotes for hoist work come back quickly in business hours. We will let you know what we need to see before we can confirm the approach, and we will give you the full price before you book so there are no surprises on the day.",
        ],
      },
    ],
  },
  "moving-furniture-from-new-zealand-to-australia": {
    title: "Shipping Your Furniture to Australia: What Actually Happens and Who You Need",
    sections: [
      {
        heading: "This is not a domestic move with a longer drive",
        paragraphs: [
          "A lot of people planning a trans-Tasman move start by ringing a local moving company. That makes sense. You moved locally last time, it went well, and now you want the same team to handle Australia. The problem is that international freight is a completely different industry, with different regulations, different paperwork, and different companies doing the work.",
          "A domestic move in Auckland involves a truck, a crew, and a destination address. A move to Sydney or Melbourne involves sea freight, a container booking, MPI biosecurity inspections, Australian border force customs clearance, and at least two separate legs of transport on either side of the water. No single local moving company operates all of that. Anyone who tells you otherwise is either partnering with an international forwarder behind the scenes, or has misunderstood what you need.",
        ],
      },
      {
        heading: "The two main roles: forwarder and furniture mover",
        paragraphs: [
          "An international freight forwarder is the company that manages the shipping itself. They book the container or groupage space on a vessel, handle the MPI export documentation on the New Zealand side, coordinate with Australian customs brokers on the other side, and arrange delivery to your new address once the container clears port. Companies like Crown Relocations, Grace Removals, and Allied Pickfords operate as full-service international movers. They cover both ends.",
          "A local moving company, which is what Specialist Movers is, handles the physical work in Auckland. That means packing your belongings, wrapping your furniture, loading it into a container at your property or at a depot, and making sure everything is correctly prepared for the forwarder to take over. On the Australia side, a different local crew handles the delivery. The forwarder coordinates all of it. The local movers do the hands-on work at each end.",
          "Understanding this split saves you from booking the wrong company and wondering why they cannot give you a price for the whole job.",
        ],
      },
      {
        heading: "Container versus groupage: the choice that affects your budget most",
        paragraphs: [
          "If you are shipping the contents of a full three or four bedroom home, you will likely fill a 20-foot container and ship it exclusively. Your goods go in, the doors seal, and nothing else is added. Faster transit, simpler handling.",
          "Most people relocating from Auckland to Sydney or Melbourne are not moving a whole house. They are taking a bedroom set, a couch, some boxes, and a few things they cannot replace. For a partial load, groupage freight makes more sense. Your goods share container space with other customers' shipments, which keeps the cost proportional to what you are actually sending. The trade-off is that the container waits until it is economically viable to sail, so transit times are less predictable.",
          "Your international forwarder will advise which option suits your volume. Get that conversation early, because the decision affects how and when you need to pack.",
        ],
      },
      {
        heading: "MPI biosecurity: the step people forget until it causes a delay",
        paragraphs: [
          "Before your goods leave New Zealand, they are subject to Ministry for Primary Industries inspection. Australia has strict biosecurity rules, and New Zealand has export requirements that feed into them. Certain items, particularly wooden furniture, outdoor gear, garden equipment, and anything with soil residue, may need cleaning, treatment, or documentation before they can ship.",
          "Your forwarder will walk you through the specific requirements for what you are sending. The practical point for packing is this: if you are using a local crew to load your container, they need to know which items have been cleared and how. Good communication between your forwarder and your Auckland movers avoids problems at the inspection stage.",
          "Items that fail inspection can cause the whole container to be held. It is not a paperwork formality. It is a real checkpoint with real consequences for your timeline.",
        ],
      },
      {
        heading: "What Specialist Movers can do for a trans-Tasman move",
        paragraphs: [
          "We are Auckland movers. We are not an international freight forwarder, and we will not pretend to be one.",
          "What we can do is handle the Auckland end of the job properly. If your forwarder needs a container packed and loaded at your Remuera or Hobsonville home, we can do that. If you need your furniture carefully wrapped and prepared before it goes into storage ahead of a container booking, we can do that too. Packing for an international move requires more care than a local job, because the goods are going onto a vessel and spending weeks at sea. We take that seriously.",
          "We can also help with the parts of the move that happen entirely on New Zealand soil. If you are vacating a rental and need a clean, or moving some furniture into short-term storage while you wait for your shipping date, those are services we offer. What we cannot give you is a price for the sea freight, the customs clearance, or the Sydney delivery. For that, you need a forwarder.",
        ],
      },
      {
        heading: "How to avoid the most common mistake",
        paragraphs: [
          "The mistake we see most often is someone searching for moving company prices, getting a quote from a local crew, and assuming that covers the whole job. It does not. Local movers quote for local work. The sea freight, the biosecurity compliance, the customs entry in Australia, and the final delivery from the port to your new home are separate costs arranged by a separate company.",
          "The right sequence is: contact an international freight forwarder first, get a full quote for the international leg, then ask them who they recommend for the Auckland packing and loading. Most forwarders have preferred local partners. If you already have a local mover you trust, ask your forwarder whether they can work with them. Usually the answer is yes.",
          "Do not sign anything with a local moving company that implies they are managing the whole trans-Tasman move unless you have seen documentation that they are operating as or through a licensed international freight forwarder.",
        ],
      },
      {
        heading: "A few practical points for Auckland people moving to Sydney or Melbourne",
        paragraphs: [
          "The Auckland to Sydney and Auckland to Melbourne routes are the busiest trans-Tasman freight lanes, so there are regular sailings and your forwarder will have good options. That said, sailings do not leave every day, and container availability can tighten around Christmas and at the end of the New Zealand financial year when a lot of businesses are also moving stock.",
          "Give yourself more lead time than you think you need. Four to six weeks from first forwarder contact to container on the water is a reasonable expectation for a straightforward residential move, but that assumes clean biosecurity paperwork and no complications with your booking.",
          "If you are leaving behind a property in Auckland, a move-out clean is something we can handle on the same day as the final pack. It is one fewer thing to organise from the other side of the Tasman.",
        ],
      },
      {
        heading: "Where Specialist Movers fits in",
        paragraphs: [
          "We have completed 4,000+ moves across Auckland and the Waikato. International freight forwarding is not what we do, and we would rather be straight with you than take a booking we cannot deliver on.",
          "If you are in the planning stages of a move to Australia and you need the Auckland end handled well, whether that is a full pack, furniture protection, container loading, or clearing out a property before you go, we are glad to help with that piece. Our crew is licensed and insured, and cover for your belongings during the international leg can be arranged through your forwarder or through our team.",
          "If you want to talk through what the Auckland side of your move looks like, get in touch through our website. We will come back to you quickly, and we will tell you honestly what we can and cannot do.",
        ],
      },
    ],
  },
  "business-relocation-auckland-no-lost-working-day": {
    title: "Monday Morning Ready: How Auckland Businesses Relocate Without Losing a Working Day",
    sections: [
      {
        heading: "The real goal is Monday morning, not move day",
        paragraphs: [
          "Most business relocations go wrong before the truck arrives. The furniture gets moved fine. What kills productivity is a monitor with no stand, a phone system that rings at the old address, or a server that nobody thought to shut down cleanly. Staff arrive Monday and spend the morning hunting for their chair.",
          "If you are an operations lead or a business owner, your measure of success is not a smooth move day. It is whether your team can do their job at 8 a.m. the following Monday. Everything in a relocation plan should work backwards from that moment.",
        ],
      },
      {
        heading: "Sequence IT first, furniture second",
        paragraphs: [
          "This is the rule that experienced operations managers learn once, usually the hard way. IT infrastructure drives the sequence of everything else. Before you book a truck, confirm with your IT team or provider exactly what needs to happen at the old site and in what order, and what needs to be live at the new site before anyone sits down.",
          "Patching, switching, and server racking takes time at the destination. If your IT provider needs Saturday to commission the server room, your furniture move needs to be complete by Friday evening. That is not a request you can make Friday afternoon. It is a decision that sets your whole move schedule, and it needs to be made at least two weeks out.",
          "Workstations are the handover point between IT and the movers. Decide in advance whether IT strips desks before the crew arrives or whether the movers pack monitors and cables under instruction. Whoever does it, every cable run needs to be photographed at the old desk so setup at the new one is straightforward. This takes about ten minutes per workstation and saves an hour of guesswork on Monday.",
        ],
      },
      {
        heading: "After-hours and weekend crews: what actually works in Auckland",
        paragraphs: [
          "Most Auckland commercial buildings have loading dock and lift access windows. If you are moving out of a multi-tenancy building in the CBD, Newmarket, or the Viaduct precinct, your building manager will tell you those windows are tightly controlled. Friday evening from 6 p.m. and Saturday are the slots most building managers prefer for a full office clearance, because it keeps corridors clear during the working week.",
          "We work seven days, including evenings, specifically because business moves rarely fit a Tuesday morning. If your building only has one freight lift and another tenant is using it Wednesday, that is not a problem you can solve on Wednesday. Weekend crews are the practical answer, and they are not a premium service, they are just how commercial moves get done without your staff having to step around packing boxes.",
          "One thing worth confirming with your new building early: are there any days the loading dock is booked out, and does the freight lift need a building staff member present? Some buildings in the Auckland CBD require that. Finding out on move day costs you hours.",
        ],
      },
      {
        heading: "The decisions that matter most in the week before move day",
        paragraphs: [
          "The week before the move is when most downtime is created or prevented. Here is where to spend your attention.",
          "Floor plans first. If every workstation has a number on the plan and every chair has a label, the crew can place furniture without asking. If the plan does not exist, the crew asks, the operations lead answers, and the afternoon disappears. Print the floor plan. Tape a copy at the entrance to each room at the new site.",
          "Talk to your staff. People who know their desk is moving on Saturday and their login will be tested Monday morning arrive Monday prepared. People who find out on the day arrive unsettled. A five-minute team meeting on Thursday is worth more than any amount of careful packing.",
          "Confirm parking and access for the truck. A standard moving truck needs a reasonable run at a loading bay. If you are moving into a site on a narrow street in Ponsonby or Grey Lynn, the crew needs to know that before 7 a.m. on Saturday, not at 7:01. Check with your building manager and pass that information to whoever is coordinating the move.",
        ],
      },
      {
        heading: "What to pack the day before, and what to leave for the crew",
        paragraphs: [
          "Loose personal items, desk contents, and anything stored in pedestals should be packed by staff before they leave Friday. This is not about saving money on packing time. It is about staff having their own things in order and not spending Monday morning unpacking someone else's filing.",
          "Furniture, large equipment, and anything awkward is better left to the crew. Attempting to flat-pack your own workstations the night before a move, without the right tools or experience, usually results in something that cannot be reassembled cleanly. The crew handles this regularly and it is quicker to let them do it.",
          "If you have a packing service booked for the day before the move, communicate clearly which areas are in scope. A crew arriving at your Takapuna office to pack the storeroom does not automatically know to leave the IT server rack alone unless you have told them.",
        ],
      },
      {
        heading: "SiteWise certification and managed sites",
        paragraphs: [
          "Some Auckland relocations involve new builds or sites still under construction management, particularly around the Wynyard Quarter, Commercial Bay tenancies, or suburban business parks that were recently developed. Those sites often require contractors to hold a SiteWise certification before they can work on the premises.",
          "Our crews hold SiteWise Gold certification with a 90-plus percent score. That score is what gets a moving crew admitted to managed and construction sites without delays at the gate. If your new premises has a site manager, it is worth asking about contractor requirements early, and confirming your movers can meet them.",
        ],
      },
      {
        heading: "A simple checklist for the final week",
        paragraphs: [
          "Floor plan finalised and printed for each room at the new site. Labels on every workstation, pedestal, and filing cabinet. IT provider briefed on the furniture sequence and confirmed for Saturday commissioning. Building manager at both sites contacted about dock and lift access windows. Staff briefed on their role before Friday close. Parking access confirmed and passed to the moving crew.",
          "None of this is complicated. What makes it difficult is doing it on Thursday instead of the Monday before. The moves that finish with everyone functional on Monday morning are almost always the ones where the operations lead made these calls with a full week to spare.",
          "If you are still working out the sequence and want a second set of eyes on the logistics, we are happy to talk it through. A quote through our website usually comes back within about 15 minutes during business hours, and the conversation before booking is free.",
        ],
      },
    ],
  },
};

export function getBlogArticle(slug: string) {
  return blogArticles[slug] ?? null;
}
