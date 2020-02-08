import { generatePageUrl } from "./utils";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 8;
export const SUPPORT_EMAIL = "support@example.com";
export const PROVIDERS = {
  BRAINTREE: "Braintree",
  DUMMY: "Dummy",
  STRIPE: "Stripe",
};
export const STATIC_PAGES = [
  {
    label: "About",
    url: generatePageUrl("about"),
  },
];
export const SOCIAL_MEDIA = [
  {
    ariaLabel: "facebook",
    href: "https://www.facebook.com/Hackpacking.life/",
    path: require("../images/facebook-icon.svg"),
  },
  {
    ariaLabel: "instagram",
    href: "https://www.instagram.com/hack.packing",
    path: require("../images/instagram-icon.svg"),
  },
  {
    ariaLabel: "twitter",
    href: "https://twitter.com/HackPacking_",
    path: require("../images/twitter-icon.svg"),
  },
  {
    ariaLabel: "youtube",
    href: "/",
    path: require("../images/youtube-icon.svg"),
  },
];
export const META_DEFAULTS = {
  custom: [],
  description: "We deliver clean and comfortable clothes and accessories at your trip destination so you don't have to pack or worry about your luggage everytime you fly.",
  image: "https://firebasestorage.googleapis.com/v0/b/tariy-ra.appspot.com/o/HackPackingx512.png?alt=media&token=5a1985b2-86af-4a9a-b597-1c07de378a97",
  title: "HackPacking – What you need on-destination & on-demand",
  type: "website",
  url: window.location.origin,
};
