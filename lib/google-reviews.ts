/**
 * Google reviews from specialistmovers.co.nz (WP Social Reviews feed).
 * Refresh: save /reviews/ HTML to %TEMP%\\sm-reviews.html, then: node scripts/build-google-reviews.mjs
 */
export type GoogleReview = {
  name: string;
  text: string;
  rating: number;
  date: string;
  avatarUrl: string | null;
};

/** Google Business Profile aggregate rating (from live site schema). */
export const googleRating = 4.9;

/** Marketing total on Google (align with live Trustindex / GBP). */
export const googleReviewCount = 331;

export const googleReviews: GoogleReview[] = [
  {
    "name": "Craig Pitt",
    "text": "Excellent service.",
    "rating": 5,
    "date": "28/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLn99YLVf3qJ9VCyXJUUz741ALDKx60xz5koWClT2dVshWt7A=s120-c-rp-mo-br100"
  },
  {
    "name": "Greg Vincent",
    "text": "What a great team these guys are. Efficient, fast, polite, competent, communicative, helpful. I can't praise them enough. You won't go wrong in any way if you choose this company for your piano moving. I highly recommend them.",
    "rating": 5,
    "date": "26/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKhfEyQn3zb0W7SHstmnDWQQvY0moSh2RmwTafMS9DqETJq9g=s120-c-rp-mo-br100"
  },
  {
    "name": "Guy Yarrall",
    "text": "Awesome service! Moved our piano in and out of some difficult places without any issues at all. Highly recommend.",
    "rating": 5,
    "date": "26/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLD_y2WmbpVP__Z_qBxNJnJeisDaLsBf-IhCz6LHTnnPUn-Hg=s120-c-rp-mo-br100"
  },
  {
    "name": "Chathumi Lelwala",
    "text": "These guys helped me twice now and honestly cannot recommend enough. So patient, calm and super professional, I was in awe of their efficiency and skill. Thank you so much!! 😇 I hope I don't have to move again soon but if I do I know who to call!",
    "rating": 5,
    "date": "23/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLr50aIij_5arZfcDR0DPd_-z0z-KBeIUJtJGQY0CJz1Xzt_kGk=s120-c-rp-mo-br100"
  },
  {
    "name": "Roxanne Rokebrand",
    "text": "Excellent and efficient service. The team were amazing and went out of their way to ensure we got everything in to a difficult house. Would definitely recommend. Professional, friendly and helpful team!",
    "rating": 5,
    "date": "22/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjWeMYX0yuhMWc5sPUZx3Mv-pGJZhmIlOZhNXoryvCAhcyNMHoS3pg=s120-c-rp-mo-br100"
  },
  {
    "name": "Mitchell Dips",
    "text": "Requested an upright piano to be picked up and deliver to my place, hassle free transaction. professional movers. Recommended!",
    "rating": 5,
    "date": "20/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIfOvkUTUx7WVgObtUNlShV4XBr93Ud-1baq4fiwRQYSu9ptg=s120-c-rp-mo-br100"
  },
  {
    "name": "Juan “JT” Ndlovu",
    "text": "Great service. The truck was on at puck point on the scheduled time, which made the whole moving process that can be a nightmare at times into a light breeze. No hidden costs. Thank you will member to co target t you next time though it wont anytime soon 😉 🤣🤣🤣🤣🙏",
    "rating": 5,
    "date": "19/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXzlV1teoE9SBgbziwyTtDq15bl4V3Loy7xwkldZ1PZytXSviQcSQ=s120-c-rp-mo-ba4-br100"
  },
  {
    "name": "Mofo Jones",
    "text": "Talk about guardian angels.. Swift Movers left me for dead. Arrived to my property to move a fridge, damaged the American Oak floors, promised to bring more guys, never showed up and refused to help or pay for the damage. I had 2 hours to remove the fridge before the landlord sold the property. I had 3% battery life on my phone so I called Specialist Movers. Its Thursday after 4pm, the team shows up and the fridge was out of the house and at the next location within 2 hours! They even did it cheaper than the idiot at Swift Movers had quoted me.",
    "rating": 5,
    "date": "19/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocI3hXX-JwTMDLaSbrN5VNENcbsH6X9-RMa27Fvq3ZMaP6NxBQ=s120-c-rp-mo-br100"
  },
  {
    "name": "MIN HOU",
    "text": "Professional and reliable.",
    "rating": 5,
    "date": "18/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLEipIg1gSzGBe6muasMfksQVe0ghnX92J9PZRNlIgv5qo4TQ=s120-c-rp-mo-br100"
  },
  {
    "name": "Carri-Ann Hoy",
    "text": "​Shoutout to Specialist Movers! 🙌 Seriously, their team is the best—so hardworking, friendly, and positive. The whole moving day was stress-free thanks to their amazing service and integrity, from top, down. If you need movers, I can't recommend them enough! Wishing them continued success! #specialistmovers #movingday #greatservice #highlyrecommended",
    "rating": 5,
    "date": "16/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUZ2OmcsdHdw3ppw40XOwETs4F6PrD2ODe__xqH7TY3y_3mTvQ=s120-c-rp-mo-br100"
  },
  {
    "name": "Jane Taylor",
    "text": "The guys who did my move were great… quietly efficient, careful, professional and friendly. Nothing was too much trouble and they accommodated a last minute request. The people behind the scenes were also great. Totally happy to recommend.",
    "rating": 5,
    "date": "16/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjV6VpZ6z2myJgQzFQUsp82anKib5HHD5CCb5Z9iMje1u9gN9JgP=s120-c-rp-mo-br100"
  },
  {
    "name": "Ash Janssen",
    "text": "Very impressed with Richard and his team’s responsiveness and service. I had a last-minute job, and they handled it efficiently and effortlessly. Highly professional - 100% recommend!",
    "rating": 5,
    "date": "15/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVlyEwqVbcvjRBTUaHwP8SN_pbuGN8oD5rGpcHPAp3VQ36ba2s=s120-c-rp-mo-br100"
  },
  {
    "name": "T Elliott",
    "text": "Excellent service. We highly recommend the team at Specialist Movers. Very friendly staff, great communication at a competitive price.",
    "rating": 5,
    "date": "13/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJf5xGj52y-1Gz4kzYnCyMnQKTpn9Z4KexYsq4JdwFNLqz5wyk=s120-c-rp-mo-br100"
  },
  {
    "name": "Terry Levenberg",
    "text": "Efficient, careful and on time and budget. What more can you ask",
    "rating": 5,
    "date": "11/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXFeAb_EBzkDwXbJsZ0hNUiyIDQEJ8zyF2m2sgbh5hUu3JWPPY=s120-c-rp-mo-br100"
  },
  {
    "name": "Rachel Larcombe",
    "text": "Fantastic communication. Took great care of the piano. Would highly recommend.",
    "rating": 5,
    "date": "10/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjV9FKcVTVWGDbKnfI7b9piOIaQ51qysshQt2Xb4xSA_hXyVGfjb=s120-c-rp-mo-br100"
  },
  {
    "name": "Marina Pasi4nik",
    "text": "Excellent professional service, these movers are perfectionists. They are highly skilled in moving expensive and heavy pianos. Would thoroughly recommend them over any other movers. They moved a professional upright Yamaha U3 across town with no issues or stress.",
    "rating": 5,
    "date": "10/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVzpgdFvCPx-lLfEhSk3deC-N6YkEzVBVWE4BR-9LxFmjXUaQyh=s120-c-rp-mo-br100"
  },
  {
    "name": "Martin Cavanagh",
    "text": "Did a great job moving some delicate medical equipment for our business. Was easy to organize and everything was picked up and arrived on time. No complaints here, happy to recommend their service.",
    "rating": 5,
    "date": "10/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKXMRkfMoidIshL_aR0rAE6pKKdHbOjvAxKWa-2yCEOOxok4w=s120-c-rp-mo-br100"
  },
  {
    "name": "Jennifer Maybee",
    "text": "The men at Specialist Movers not only fitted us in at very short notice moving an upright piano and a pedal organ from one room to another but also took huge care over our brand new wooden flooring. They really are specialists and had not only an excellent piano trolley but fit-for-purpose floor quilts which prevented damage to especially the flooring but also architraves etc. They even suggested I remove the cobwebs before moving the instruments. Thank you very much.",
    "rating": 5,
    "date": "06/09/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKO80S5GQCoO9H6jDYCk87LYLuwk3xo4MLwU9nvqU3ebNnNwQ=s120-c-rp-mo-br100"
  },
  {
    "name": "Sagar Kariya",
    "text": "We recently relocated a two-bedroom house from the Shore to Blockhouse, and the move was completed within just three hours. The team was highly efficient, professional, and proactive throughout the process. Communication: 5/5 Service: 5/5 Staff: 10/5 🙂 Cost: Excellent value — unlikely to find a better deal. Overall, I am very satisfied with the experience and would not hesitate to recommend their services.",
    "rating": 5,
    "date": "25/08/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXVvW60n6O34gmPrMZWpNplP21plFJ9ZTWpDC8PdQ1M1um0X5Yq=s120-c-rp-mo-ba4-br100"
  },
  {
    "name": "Helen Marsh",
    "text": "Great service. Exceeded expectations and made my move stress free. Super friendly and respectful with my belongings. Would definitely recommend. Thanks Richard.",
    "rating": 5,
    "date": "17/08/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXKgn_gDLDIxn7ZWJ_17F8NO-XyLnE-iNwCforg34cIenB-8r_S=s120-c-rp-mo-br100"
  },
  {
    "name": "Darlene Scott",
    "text": "These guys did an awesome job of helping me move house. Highly recommend.",
    "rating": 5,
    "date": "13/08/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKJzgz8AVyFyKgvYb5hrhgEps5izBKZc7jbBtW2HN-csH_ZsQ=s120-c-rp-mo-br100"
  },
  {
    "name": "Rudi Hefer",
    "text": "We had an outstanding experience with Specialist Movers. Over two days, their specialist team packed and moved our entire house with absolute professionalism. Nothing was too big, heavy, or complicated – they handled every item with care and precision. The crew worked tirelessly from start to finish, all with a great attitude, and not a single item was damaged in the process. Truly faultless service. Absolutely 5 stars – highly recommended!",
    "rating": 5,
    "date": "12/08/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKrJx2GIm3MfQpR341NzVcuR8_kr7njFA8GOWLeqgBYT-1ESQ=s120-c-rp-mo-ba3-br100"
  },
  {
    "name": "Kalpana Ramjee",
    "text": "The men were careful with placing the boxes and the furniture in the truck. However, I would have like them to arrange the boxes in a manner that would have utilised the storage to its optimum.",
    "rating": 4,
    "date": "10/08/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLBcN8EU4yognoUIcmPuXPoKNC60-MtBZ2G1TML53sf04bHoQ=s120-c-rp-mo-br100"
  },
  {
    "name": "Tarek Ahmed",
    "text": "Excellent service, friendly and efficient!",
    "rating": 5,
    "date": "05/08/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXVb4DIHD2RopAA8kn8xGMTzeYh_FVgtK2y-WIBU60VeZU3Izen8w=s120-c-rp-mo-br100"
  },
  {
    "name": "Cheuk Johnny Lau",
    "text": "I can't recommend this team highly enough. They were well-coordinated, communicated clearly, well managed and it was obvious the crew was trained to work seamlessly together—especially when handling heavy items. Truly impressive teamwork. Highly recommended!",
    "rating": 5,
    "date": "03/08/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIEaVNkbRRWBZJyTlGRoqBdNAZn14-W5T42xHfYzITMK9fwcQ=s120-c-rp-mo-br100"
  },
  {
    "name": "Ashley Thomas",
    "text": "The team at Specialist Movers did a great job and were a great bunch of guys - very good value for money!! Thanks guys",
    "rating": 5,
    "date": "03/08/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjXfzENwk6m4MRuLhAYhiXDai8rMiQlGSwCNukuccutXgHTsV1Q=s120-c-rp-mo-br100"
  },
  {
    "name": "Christine Lee Carr",
    "text": "Great communication from start to finish. Removal done really quickly from one side of Auckland to another and in dreadful wet weather. Nothing was too much trouble and 2 very helpful and polite young men assisted in the move. Very competitive rates for top class service and peace of mind",
    "rating": 5,
    "date": "30/07/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIeVzfM3p9mRE14VVXFz6GPJ-btLyyJspkEe2nF9BJFz9WonA=s120-c-rp-mo-br100"
  },
  {
    "name": "Greg Paget",
    "text": "I've used Specialist Movers for about the 6th time this week. Always great. The guys are always helpful and very responsive despite tricky moves. Highly recommended.",
    "rating": 5,
    "date": "30/07/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJy09A6aC_05DHLdqOKnSsV6mKEQ1Ok1UuWwXoiCpSnB5iDGQ=s120-c-rp-mo-br100"
  },
  {
    "name": "Justine Purdy",
    "text": "Respectful and careful. When they put my furniture back in my apartment they made it look perfect and they had a great eye for layout creating more visual space. I felt valued and comfortable with them. Highly recommend!",
    "rating": 5,
    "date": "26/07/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIjVBmMUn_7Jl4fo9_PCREQC-kVXHqh2KbGadq184kGvLQgZw=s120-c-rp-mo-br100"
  },
  {
    "name": "Alex Davids",
    "text": "The team were really great to work with. The worked incredibly hard all day and were lovely to have around. They took the time to put everything in it's place and we were great at communicating with us leading up to and on the day.",
    "rating": 5,
    "date": "22/07/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVTg92iGTnyM1ZvRKor5WKkZBejF-lAs8R7E2GNM8xuJhQH47Hp=s120-c-rp-mo-br100"
  },
  {
    "name": "Yulene Kemp",
    "text": "Excellent service from start to finish! The team was punctual &amp; professional. They made moving into our 3-level home so much easier than I thought it would be. Friendly, efficient, and stress-free. Highly recommended!",
    "rating": 5,
    "date": "22/07/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUwZmSrc8cBe1z5DOlxZ_RpoecmET1RXj-L9SV_-4fD_r2xHqzB=s120-c-rp-mo-ba3-br100"
  },
  {
    "name": "Robyn Bolam",
    "text": "Great communication and very efficient! The guys were very respectful and obliging. Happy to use again😀",
    "rating": 5,
    "date": "21/07/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIaAKaRFPAF37GoRoXzwsKh3bVy_qFB_HrKKe-x0ln6EkXIVw=s120-c-rp-mo-br100"
  },
  {
    "name": "Waina Emery",
    "text": "We are very grateful for the service, the workers and movers of our furnitur, 60 crates and 20 odd cartons of items of our home from a 2 level to 1 level house. Their attitude and help with moving made it unstressful including a piano. Not one item was scratched or broken and the assitance in moving furniture to the alloted rooms was helpful. We would reommend them and use them again. The cost of the service was reasonable and okay as well. In many shifts over the years, this has been the smoothest with no dramas and loss of time. Thank you very much.",
    "rating": 5,
    "date": "16/07/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKSlEr5h9g0ysrNvTMMhd80kftjEhCz5YBMFzCGoMtSje2iJw=s120-c-rp-mo-br100"
  },
  {
    "name": "Anthony Fernando",
    "text": "Good Service and friendly people. I will use them again for the next move",
    "rating": 5,
    "date": "15/07/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocJUTreVnOPtSiTXol7Q63iI-gprmUOYg4Nd8ZmBT2AszvckjQ=s120-c-rp-mo-br100"
  },
  {
    "name": "Joyce McManus",
    "text": "Wow these movers were the best! Communication was on point the whole process. Great price point and no hidden costs. We moved my daughter's family and they just made the process and saved us so much work. Highly recommend these guys and will definitely use them again!",
    "rating": 5,
    "date": "08/07/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUwJlN79eaPbUXrpYvCojAzS_2p8pxAxtxhuy9mOpdpGrsQpFim=s120-c-rp-mo-br100"
  },
  {
    "name": "Margaret Jordan",
    "text": "Excellent, prompt service and great communication. The team were friendly, courteous and capable and I will not hesitate to use their services again. Highly recommended.",
    "rating": 5,
    "date": "02/07/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjX6xWcHguk5MdjS4TDV5VqJJKp4nVt6caTXamBaeFKYAmXwQIFV=s120-c-rp-mo-ba4-br100"
  },
  {
    "name": "GFW777",
    "text": "Absolutely professional, fast and friendly people that deliver an excellent service while showing care for each item they handled during the move.",
    "rating": 5,
    "date": "01/07/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjUX9eFs6mbRomkQer5MaI7PFPY0o1V5WRg4RhjfR9vyqqaGld-3=s120-c-rp-mo-br100"
  },
  {
    "name": "Steve Wang",
    "text": "Fantastic service! highly recommend! Thanks for the hard working boys today! shout out to Pat and Jay!",
    "rating": 5,
    "date": "30/06/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKsTwD7b-nD1l4uZgH8tKBWMGv6r5_upJcXllT1MYAofsW0xw=s120-c-rp-mo-br100"
  },
  {
    "name": "Aaron Wilson",
    "text": "Matt and his team from Specialist Movers recently moved all of our large items when we moved homes. The first asked if the site visit or video call could be made and a Quick Look at what needed moving to determine a quote. We accepted this quote and the communication on the day of the move was excellent. Unfortunately Matt’s first job took a lot longer than expected due to heavy rain in the morning and so the team arrived a couple hours late. This was communicated to me in the morning well before I started wondering where they were. And it gave us more time to move smaller things and get the old house ready for Matt to take our large items. The move went well, Matt and his team are amazing. He actually brought two trucks and you can see all the experience they have when removing items and loading up their trucks so efficiently. Only one small bump on a door way, but otherwise no damaged and I’d say they did extremely well. Highly recommend them if you need help moving any items, large or small. And they will keep asking if you have anything else you need moved, which proved to be a great piece of customer service and I did change my mind on a couple of things and the team were more than happy to load them up. Thanks again guys!",
    "rating": 5,
    "date": "28/06/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKfoS9uqLDQcJE2vIGkPnYSffA4n6AQm5DzjJnLH9lAFzTe1A=s120-c-rp-mo-br100"
  },
  {
    "name": "Raywyn Olliver",
    "text": "The two blokes who helped us move were amazing, they took care of our belongings and were fast and efficient! Fantastic movers! They helped us unload everything to the right rooms and places, asked if we liked where our couches went etc and if we needed them to move them again to find the right spot. Honestly they went above and beyond, absolutely fantastic service! Thank you so much ☺️",
    "rating": 5,
    "date": "24/06/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocIyKCTKUc8Nj7IWF_jngTezEgHUMC92G6_FGv6qLFTSokt13kw=s120-c-rp-mo-br100"
  },
  {
    "name": "Richard Ridler",
    "text": "Excellent service and cost was within cooee of quote. All in all job well done. Richard Ridler",
    "rating": 4,
    "date": "18/06/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocISJ2EfEIsCr-3jcox2PW6ymFCjKfQTSOFRMqy5rft--ywTyw=s120-c-rp-mo-br100"
  },
  {
    "name": "Sarah Bentley",
    "text": "These guys are excellent! Really competitive pricing and went above and beyond with the move, even connecting my washing machine, which no other company has ever done! I'm thrilled and will recommend them.",
    "rating": 5,
    "date": "17/06/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocKWM1SOdEqEyvdCqOIddv9AR8arcARg2DJHeZa7TkLtKMsmjw=s120-c-rp-mo-ba3-br100"
  },
  {
    "name": "jos maas",
    "text": "Excellent overall. We had 2 great guys who were very respectful and patient with us and nothing was too much. Hard workers and so respectful with our stuff and ourselfs. Would use them again.",
    "rating": 5,
    "date": "10/06/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a-/ALV-UjVInm2al4s8Bn_ZZE2MOVRMVSNkaBzEHiPRiopsi2WQknYNnDU=s120-c-rp-mo-br100"
  },
  {
    "name": "Briar Martindale",
    "text": "Great team to deal with, from first point of contact to the movers on the day. Thank you Specialist Movers, we highly recommend your business.",
    "rating": 5,
    "date": "31/05/2025",
    "avatarUrl": "https://lh3.googleusercontent.com/a/ACg8ocLkd5HRZgguH6WM7ZOYeN-TTXbtO90-_RIkiIH7pr04-kdPNA=s120-c-rp-mo-br100"
  }
];
