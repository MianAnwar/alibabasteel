// AliBabaSteel — App-wide link constants
// Fill in the TODO values before going live (see plan Open Items)

export const APP_LINKS = {
  phonePrimary: 'TODO',
  phoneSecondary: '',
  emails: {
    info: 'alibabasteel212@gmail.com',
    orders: 'TODO',
  },
  whatsappNumber: '923121481908', // international format without +, e.g. '923001234567'
  whatsappMessage: 'Hi AliBabaSteel! I have a question about your computer tables.',
  instagram: 'TODO',
  facebook: 'https://www.facebook.com/people/Ali-baba-steel-furniture-and-fiber-glass/100064865883828/',
  tiktok: 'TODO',
  youtube: 'https://www.youtube.com/@AliBabaSteel',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.4847872265946!2d74.2907851!3d31.4558479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919017eba94c1ef%3A0xe706c1a91ce7ba93!2sAli%20Baba%20Steel%20Furniture%20and%20Fiber%20Glass!5e0!3m2!1sen!2s!4v1775590637029!5m2!1sen!2s',
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
