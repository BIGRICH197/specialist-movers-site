/** Public URLs , filenames contain spaces; encode for reliable requests everywhere. */
const enc = (path: string) => path.replace(/ /g, "%20");

export const brandAssets = {
  logomarkPurple: enc("/brand/logos/svg/Logomark Purple.svg"),
  logomarkYellow: enc("/brand/logos/svg/Logomark Yellow.svg"),
  primaryLogoPurple: enc("/brand/logos/svg/Primary Logo Purple.svg"),
  primaryLogoYellow: enc("/brand/logos/svg/Primary Logo Yellow.svg"),
  /** 2× PNG , full yellow lockup; use in header on purple bar for clarity */
  primaryLogoYellow2xPng: "/brand/logos/primary-logo-yellow-2x.png",
  /** 2× PNG , yellow wordmark only (from email sig assets) */
  wordmarkYellow2xPng: "/brand/logos/wordmark-yellow-2x.png",
  /** Circle + wordmark lockup exports (logo lab , transparent PNG) */
  lockupYellowPng: "/brand/logos/exports/specialist-movers-lockup-yellow.png",
  lockupYellow2xPng: "/brand/logos/exports/specialist-movers-lockup-yellow@2x.png",
  lockupYellowSvg: "/brand/logos/exports/specialist-movers-lockup-yellow.svg",
  socialInstagram: "/brand/icons/social-instagram-white.svg",
  socialFacebook: "/brand/icons/social-facebook-white.svg",
} as const;
