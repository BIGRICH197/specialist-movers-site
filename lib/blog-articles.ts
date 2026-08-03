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
    title: "Comparing Do-It-Yourself Packing with Expert Packing Services",
    sections: [
      {
        heading: "Advantages of DIY Packing",
        paragraphs: [
          "You love your belongings, and you want to pack them by yourself. Doing the packing yourself gives you a greater feeling of mastery and satisfaction. And there are a few more advantages:",
          "Saving Money with Do-It-Yourself Packaging: Doing it yourself saves money compared to hiring movers. All you have to do is gather the necessary packing materials and set aside some time.",
          "Complete Command of Your Property: Everything is structured according to your preferences, which you choose in advance. Prefer to keep your board games and books in separate sections? Try it out.",
          "Customisation: There are usually particular instructions for the care of sentimental objects, such as family heirlooms, when you give them to someone. You could feel more at ease if you packed them by yourself.",
        ],
      },
      {
        heading: "Disadvantages of DIY Packing",
        paragraphs: [
          "It takes a lot of effort to pack a whole home. Depending on your schedule, it can last a few days or a few weeks. Common disadvantages include:",
          "Increased Danger of Injury: Unless special precautions are taken, fragile items may not survive the journey intact. No one has a pleasant experience when they open a carton of broken dishes.",
          "Overwhelmed by Stress: Trying to do everything you normally do, plus pack, can be overwhelming. When every closet and drawer needs attention, you can feel overwhelmed.",
        ],
      },
      {
        heading: "Advantages of Professional Packing Services",
        paragraphs: [
          "Hiring professional movers and packers in Auckland is like taking a shortcut compared to doing it yourself. To make things easier for you, movers and packers in Auckland, for example, provide specialist services.",
          "Maximising Efficiency: Teams that pack items are taught to work quickly. They are able to do tasks that may take you days in only hours.",
          "Expert Handling: When it comes to packing, experts know just what to do with products that are delicate, heavy, or unusually shaped. Preventing damage while in transit is achieved by doing this.",
          "Easy and Relaxing Experience: Envision yourself getting a cup of coffee and letting someone else deal with the mayhem. Hiring movers allows you to concentrate on other aspects of the moving process.",
        ],
      },
      {
        heading: "Disadvantages of Professional Packing Services",
        paragraphs: [
          "Just like the DIY approach, hiring professionals also comes with a number of drawbacks, such as",
          "Greater Expenses: Services of high quality are not cheap. If you are on a limited budget, this might be a turnoff.",
          "Reduced Control: Letting go is putting your faith in other people to take care of your belongings. The majority of businesses are trustworthy, yet it's still nerve-wracking.",
          "Timeline Disruptions: You must communicate with the service provider to arrange their services, which may not always be convenient for you.",
        ],
      },
      {
        heading: "Cost Comparison: Do-It-Yourself vs. Expert Packing",
        paragraphs: [
          "The choice to hire a professional packer or do it yourself is usually driven by budget. We can do the math.",
          "You'll need to buy boxes, tape, bubble wrap, and other packaging materials if you want to do it yourself. Although these expenses might mount up, they're usually less than what you'd pay for expert help. But remember to include the time and work you put in. We all know that time is money.",
          "Professional packing services come with predefined costing. For instance, in Auckland, movers and packers provide packages that are tailored to your home's size and the intricacy of the transfer. Although more expensive, many may find that the ease and decreased worry are worth it.",
        ],
      },
      {
        heading: "What Is Your Deadline?",
        paragraphs: [
          "If you have ample time prior to your move, you may even have the ability to pack all of your items yourself. However, if time is an issue, hiring a professional moving service can ensure everything goes smoothly and gets completed quickly.",
        ],
      },
      {
        heading: "Unique Care for Precious and Dangerous Goods",
        paragraphs: [
          "Take additional precautions while handling delicate objects. Home improvement projects might be a good option if you have faith in your skills to keep these things safe. If you don't want to risk damaging your possessions, experts can help.",
          "A hybrid strategy offers a nice middle ground. Do your own packing for the easier things and get the experts for the more fragile ones. This way, you may be sure that important parts are in good hands while still having control.",
        ],
      },
      {
        heading: "Which Professional Packing Service Should You Hire?",
        paragraphs: [
          "Choosing a trustworthy organisation is crucial if you want to pursue professional work. Learn as much as you can by reading reviews, getting recommendations, and asking plenty of questions. If you're looking for a dependable service, choose one of the several solutions offered by Auckland's movers and packers.",
        ],
      },
      {
        heading: "Tips for DIY Enthusiasts on Packing Efficiently",
        paragraphs: [
          "If you're thinking about doing it yourself, here are some pointers to help you out:",
          "Clear Your Clutter Before You Go: Get rid of something you aren't using. The less your load, the easier it is to carry.",
          "Make a Note of Everything: Put labels on each container so you can see what's inside. You won't have to deal with the hassle of searching for necessities later on if you do this.",
          "Assemble Each Room: You can keep the process reasonable and orderly by tackling one place at a time.",
          "Get High-Quality Materials: Invest in strong boxes and packaging supplies. Invest in them to safeguard your possessions.",
          "Get Some Help: Family and friends can help ease the burden. In addition, pizza-themed packing parties are a great way to make a memory out of a task.",
        ],
      },
      {
        heading: "When Expert Help Is Necessary",
        paragraphs: [
          "Sometimes you just need an expert's opinion. The pros should be hired if the distance is great, the deadline is short, or if the objects to be moved are delicate or valuable. Having a worry-free life may be priceless at times.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "In the end, your money, schedule, and personal preferences will determine whether you should hire a professional or do it yourself. No one solution will work in every situation. Evaluate your options and go with the one that makes the most sense given your current circumstances.",
          "Although moving day packing is never simple, having a plan may make a world of difference. The goal is the same either way: arrive at your new place with boxes unpacked in the right rooms, not chaos in the hallway.",
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
          "Most Auckland house moves with a professional crew land somewhere between $300 and $1,300 plus GST, depending on how much you own, what day you move, and how awkward the access is. Across the 1,500+ Auckland moves we've done, our average house move invoice comes in a little under $1,200 plus GST.",
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
          "The callout fee depends on how far you are from our Glenfield depot. Close-in Auckland (roughly within 23 kilometres) is $60 for a two-person crew. The outer suburbs, like the Hibiscus Coast or Pukekohe, are $80, and the fringe of the region is $120. The hourly rate itself is the same across all of Auckland; only the callout changes with distance.",
          "On top of that there's a flat $25 fuel surcharge per job. Everything is plus GST, and we tell you the day rate, callout and surcharge before you book, so the structure you're quoted is the structure you're invoiced on.",
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
          "Specialist Movers runs regular commercial work for dozens of Auckland businesses, from office relocations to weekly runs for cabinetry and fit-out companies, alongside the 1,500+ household moves we've completed across Auckland. Commercial gear gets blanket-wrapped as standard, crews are sized to the job, and you get one contact who owns the plan from quote to final box.",
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
          "We operate seven days a week and have completed over 1,500 Auckland moves. If your home is on the larger side, we are happy to do a free viewing first so you get an accurate quote rather than a guess. Fill in the form on our site and we will be in touch.",
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
          "We have completed over 1,500 Auckland moves, and a lot of them have included awkward access situations. You build up a read for what crew size fits what job. This one was a two-person job from the start.",
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
          "If you have a heavy item, an awkward floor, or a commercial space in Auckland that needs clearing, we are worth talking to. We have completed over 1,500 Auckland moves and hoist and crane-assist jobs are a regular part of that work.",
          "Send us the details through the quote form on our website. In business hours we usually come back to you in about 15 minutes. You see the full price upfront before you commit to anything.",
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
          "Freemans Bay, Grey Lynn, Ponsonby, Parnell, buildings along the waterfront near Westhaven, apartments in the CBD, all of these areas come with access quirks. We have handled them across more than 1,500 Auckland moves. If you have got an awkward item, use the quote form on our website and tell us what you are working with.",
        ],
      },
    ],
  },
};

export function getBlogArticle(slug: string) {
  return blogArticles[slug] ?? null;
}
