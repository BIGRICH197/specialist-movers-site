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
};

export function getBlogArticle(slug: string) {
  return blogArticles[slug] ?? null;
}
