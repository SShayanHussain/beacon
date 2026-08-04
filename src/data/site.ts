export const siteConfig = {
  name: 'Beacon Light Publishing',
  tagline: 'Every manuscript deserves a light to steer by.',
  description:
    'Editing, cover design, formatting, distribution, and marketing for independent authors. You keep every right and every royalty.',
  url: 'https://beaconlightpublishing.com',
  email: 'hello@beaconlightpublishing.com',
  phone: '+1 (555) 234-5678',
  founded: 2024,

  addresses: {
    office: {
      label: 'Office',
      lines: ['123 Harbour Lane', 'Suite 200', 'New York, NY 10001'],
      note: 'By appointment only',
    },
    mailing: {
      label: 'Mailing address',
      lines: ['PO Box 4521', 'New York, NY 10163'],
      note: 'Not staffed — no walk-ins',
    },
  },

  hours: 'Monday–Friday, 9 AM – 6 PM EST',

  socials: {
    linkedin: 'https://linkedin.com/company/beaconlightpublishing',
    x: 'https://x.com/beaconlightpub',
    instagram: 'https://instagram.com/beaconlightpub',
    facebook: 'https://facebook.com/beaconlightpublishing',
  },

  stats: {
    booksPublished: { value: 350, suffix: '+', label: 'Books published' },
    authorsServed: { value: 200, suffix: '+', label: 'Authors served' },
    countriesDistributed: { value: 40, suffix: '+', label: 'Countries distributed' },
    avgRating: { value: 4.9, suffix: '', label: 'Avg. rating' },
  },

  disclaimer:
    'Beacon Light Publishing is a work-for-hire publishing services company, not a traditional publishing house. Authors retain 100% ownership of their work, including all publishing rights, intellectual property, and royalties. Our role is to guide and support authors through the publishing process.',

  process: [
    {
      step: 1,
      title: 'Manuscript review',
      description:
        'Send what you have, in whatever format. We read it and come back with a scope, a timeline, and a price.',
    },
    {
      step: 2,
      title: 'Editing',
      description:
        'Developmental notes first, then line editing, then a copyedit. You approve each pass.',
    },
    {
      step: 3,
      title: 'Design',
      description:
        'Cover concepts built for thumbnail legibility, then interior typesetting for print and ebook.',
    },
    {
      step: 4,
      title: 'Registration',
      description:
        'ISBN, barcode, copyright filing, and metadata. Your name on every record.',
    },
    {
      step: 5,
      title: 'Distribution',
      description:
        'Print and digital files delivered to your retail accounts. The accounts stay in your name.',
    },
    {
      step: 6,
      title: 'Launch',
      description:
        'A dated plan for the first thirty days, and the assets to run it.',
    },
  ],
} as const
