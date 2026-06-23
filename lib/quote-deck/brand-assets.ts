/** Public URLs , filenames contain spaces; encode for reliable requests everywhere. */
const enc = (path: string) => path.replace(/ /g, "%20");

export const brandAssets = {
  logomarkPurple: enc("/brand/logos/svg/Logomark Purple.svg"),
  logomarkYellow: enc("/brand/logos/svg/Logomark Yellow.svg"),
  primaryLogoPurple: enc("/brand/logos/svg/Primary Logo Purple.svg"),
  primaryLogoYellow: enc("/brand/logos/svg/Primary Logo Yellow.svg"),
  /** 2× PNG , full yellow lockup; use in header on purple bar for clarity */
  primaryLogoYellow2xPng: "/brand/logos/primary-logo-yellow-2x.png",
  socialInstagram: "/brand/icons/social-instagram-white.svg",
  socialFacebook: "/brand/icons/social-facebook-white.svg",
} as const;
