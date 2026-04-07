// AliBabaSteel — App-wide link constants
// Fill in the TODO values before going live (see plan Open Items)

export const APP_LINKS = {
  phonePrimary: 'TODO',
  phoneSecondary: '',
  emails: {
    info: 'alibabasteel212@gmail.com',
    orders: 'TODO',
  },
  whatsappNumber: 'TODO', // international format without +, e.g. '923001234567'
  whatsappMessage: 'Hi AliBabaSteel! I have a question about your computer tables.',
  instagram: 'TODO',
  facebook: 'TODO',
  tiktok: 'TODO',
  youtube: 'TODO',
  mapEmbedUrl: 'TODO',
  siteUrl: 'https://alibabasteel.com', // TODO: update when domain is confirmed
  siteName: 'AliBabaSteel',
  siteTagline: 'Premium Computer Tables — Made in Pakistan',
  addressLine1: 'TODO',
  addressLine2: 'TODO',

  getWhatsAppLink(message?: string): string {
    const text = encodeURIComponent(message ?? this.whatsappMessage);
    return `https://wa.me/${this.whatsappNumber}?text=${text}`;
  },
} as const;

export type AppLinks = typeof APP_LINKS;
