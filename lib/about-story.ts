/**
 * Founding story for /about — Richard Boote, 2026.
 * Voice: direct, honest, conversational.
 */

export const aboutStoryHeroIntro =
  "We never meant to start a moving company. A weekend hobby became Auckland's trusted name for pianos, homes, and offices.";

export type AboutStorySection = {
  heading?: string;
  paragraphs: readonly string[];
};

export const aboutStorySections: readonly AboutStorySection[] = [
  {
    paragraphs: [
      "Specialist Movers started as a hobby. Matthew was doing moves, I was giving him a hand on the weekends, both ends of the couch, a bit of extra cash in the pocket. That was the entire plan. No grand vision, no business strategy. Just a couple of blokes and a weekend.",
      "Then the piano stores started calling.",
      "They needed people who could actually be trusted with the expensive, fragile, heavy stuff, and with Matthew's experience it was a natural fit. So we committed to a truck. I still wasn't sold on it, mind you. Who in their right mind wants to own a bloody moving company?",
      "But we kept turning up, and we kept doing a genuinely good job, and people kept telling other people. Fast forward a year and we had 10 staff, a reputation we were proud of, and a business neither of us had really meant to build. So we stopped fighting it and just ran with it.",
      "We're glad we did.",
    ],
  },
  {
    heading: "Why piano skill matters for every move",
    paragraphs: [
      "Pianos are heavy, fragile and completely unforgiving. There's no margin for a careless mover. Once your crew can get a concert grand up a flight of stairs without a mark on it, a house or an office move is something we can do with our eyes closed and our full attention. We learned on the hardest jobs in the business, so everything else gets the same care by default.",
    ],
  },
  {
    heading: "What we do today",
    paragraphs: [
      "Today, most of what we do is moving homes and offices. Three-bedroom houses, full five-bedroom relocations, apartments with a lift that's always too small, and office moves that have to be done over a weekend so nobody loses a Monday. We pack, we move, we unpack, and we can clean the old place on the way out. Same crews, same care, whether it's your family home or your company's entire floor.",
      "We've grown to around 20 staff and 5 trucks, and we run roughly 80 house and office moves a month alongside about 100 piano moves. We're trusted by Steinway and just about every major music store in Auckland (Lewis Eady, Music Works, GPS, Shaws, Slys, KBB/Rockshop and Music Planet), and by Auckland families and businesses who simply wanted their move done properly.",
      "Matthew runs operations and the crews on the ground. I handle the strategy, the systems and the tech that keeps it all moving. We've never been the cheapest mover in Auckland, and we never will be. You pay for crews who turn up, take care, and pick up the phone.",
      "That's the whole story. We got good at the things people were most afraid to move, and we never found a reason to stop. Whether it's your house, your office, a hundred-year-old dresser or a half-million-dollar grand, you get the same crew, the same care, and people who actually pick up the phone.",
      "Hundreds of 5-star reviews. Homes, offices and pianos moved properly since 2023.",
    ],
  },
];
