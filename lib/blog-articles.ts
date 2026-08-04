/**
 * Full article bodies copied from specialistmovers.co.nz blog posts (human-written).
 */

export type BlogArticle = {
  title: string;
  sections: { heading: string; paragraphs: string[] }[];
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
          "For freight-style jobs, like moving stock, storage or a fit-out, we also offer per-cubic-metre pricing at $90 per cubic metre plus GST with a five-cubic-metre minimum, or $110 per cubic metre for after-hours work before 6am or after 5pm.",
          "After-hours and weekend moves cost slightly more per hour but are almost always cheaper overall, because the alternative is your whole team being paid to not work while the office is in boxes around them.",
        ],
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
};

export function getBlogArticle(slug: string) {
  return blogArticles[slug] ?? null;
}
