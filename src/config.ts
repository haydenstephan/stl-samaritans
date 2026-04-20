export const SITE = {
  name: "St. Louis Samaritans",
  tagline: "Friends on the street.",
  domain: "stlsamaritans.org",
  url: "https://stlsamaritans.org",
} as const;

export const CONTACT = {
  coordinatorEmail: "REPLACE_ME@example.com",
  groupMeInviteUrl: "REPLACE_ME",
} as const;

export const FORMS = {
  formspreeId: "REPLACE_ME",
  endpoint: () => `https://formspree.io/f/${FORMS.formspreeId}`,
} as const;

export const CALENDAR = {
  embedUrl: "REPLACE_ME",
} as const;

export const DONATIONS = {
  venmoHandle: "REPLACE_ME",
  venmoUrl: () => `https://venmo.com/u/${DONATIONS.venmoHandle}`,
  suppliesDropoff: {
    name: "St. Richard's Catholic Church",
    address: "REPLACE_ME",
  },
} as const;
