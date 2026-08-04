import type { Package } from '@/lib/schemas'

// PLACEHOLDER prices — Hiba replaces before launch
export const packages: Package[] = [
  /* ── Publishing ─────────────────────────────────────── */
  {
    id: 'pub-standard',
    category: 'publishing',
    tier: 'Standard Publication',
    audience: 'For first-time authors publishing on one retailer',
    price: 700,
    currency: 'USD',
    priceNote: 'starting at',
    isFeatured: false,
    featureGroups: [
      {
        heading: 'Manuscript Preparation',
        items: ['Line editing', 'Basic proofreading', '2 revision rounds'],
      },
      {
        heading: 'Design & Formatting',
        items: ['Custom ebook cover', 'Interior formatting (ebook)', 'Back cover design'],
      },
      {
        heading: 'Publishing & Distribution',
        items: ['ISBN registration', 'Single-platform distribution', 'Metadata setup'],
      },
    ],
    ctaLabel: 'Get a quote',
  },
  {
    id: 'pub-elite',
    category: 'publishing',
    tier: 'Elite Publication',
    audience: 'For authors wanting wide distribution and a professional-grade book',
    price: 2200,
    currency: 'USD',
    priceNote: 'starting at',
    isFeatured: true,
    featureGroups: [
      {
        heading: 'Manuscript Preparation',
        items: ['Developmental assessment', 'Line editing', 'Copyediting', '3 revision rounds'],
      },
      {
        heading: 'Design & Formatting',
        items: [
          'Custom cover (print + ebook)',
          'Interior design & typesetting',
          'Back cover & spine',
          'Author branding consultation',
        ],
      },
      {
        heading: 'Publishing & Distribution',
        items: [
          'ISBN + barcode',
          'Copyright registration',
          'Multi-platform distribution (6+ retailers)',
          'Print-on-demand setup',
          'Metadata optimisation',
        ],
      },
    ],
    ctaLabel: 'Get a quote',
  },
  {
    id: 'pub-global',
    category: 'publishing',
    tier: 'Global Publication',
    audience: 'For authors seeking maximum reach, all formats, and marketing support',
    price: 3800,
    currency: 'USD',
    priceNote: 'starting at',
    isFeatured: false,
    featureGroups: [
      {
        heading: 'Manuscript Preparation',
        items: [
          'Full developmental edit',
          'Line editing',
          'Copyediting',
          'Final proofread',
          '5 revision rounds',
        ],
      },
      {
        heading: 'Design & Formatting',
        items: [
          'Premium cover design (2 concepts)',
          'Interior design (print + ebook)',
          'Hardcover jacket design',
          'Author platform assets',
        ],
      },
      {
        heading: 'Publishing & Distribution',
        items: [
          'ISBN + barcode',
          'Copyright registration',
          'Global distribution (all major retailers)',
          'Print, ebook, and large-print formats',
          'Library distribution (IngramSpark)',
          'Advanced metadata & category strategy',
        ],
      },
      {
        heading: 'Marketing',
        items: [
          '30-day launch plan',
          'Press release',
          'Social media kit',
          'Amazon optimisation',
        ],
      },
    ],
    ctaLabel: 'Get a quote',
  },

  /* ── Editing ────────────────────────────────────────── */
  {
    id: 'edit-standard',
    category: 'editing',
    tier: 'Standard Edit',
    audience: 'For manuscripts that need a thorough line edit and clean-up',
    price: 1499,
    currency: 'USD',
    priceNote: 'starting at',
    isFeatured: false,
    featureGroups: [
      {
        heading: 'Editorial',
        items: ['Line editing', 'Basic copyedit', '2 revision rounds', 'Style sheet'],
      },
    ],
    ctaLabel: 'Get a quote',
  },
  {
    id: 'edit-pro',
    category: 'editing',
    tier: 'Professional Edit',
    audience: 'For manuscripts needing developmental attention and a full edit pass',
    price: 2499,
    currency: 'USD',
    priceNote: 'starting at',
    isFeatured: true,
    featureGroups: [
      {
        heading: 'Editorial',
        items: [
          'Developmental assessment',
          'Line editing',
          'Copyediting',
          '3 revision rounds',
          'Detailed style sheet',
          'Post-edit consultation call',
        ],
      },
    ],
    ctaLabel: 'Get a quote',
  },
  {
    id: 'edit-premium',
    category: 'editing',
    tier: 'Premium Edit',
    audience: 'Full editorial treatment from structure to final proof',
    price: 3999,
    currency: 'USD',
    priceNote: 'starting at',
    isFeatured: false,
    featureGroups: [
      {
        heading: 'Editorial',
        items: [
          'Full developmental edit',
          'Line editing',
          'Copyediting',
          'Final proofread',
          '5 revision rounds',
          'Editorial letter',
          'Two consultation calls',
        ],
      },
    ],
    ctaLabel: 'Get a quote',
  },

  /* ── Ghostwriting ───────────────────────────────────── */
  {
    id: 'ghost-standard',
    category: 'ghostwriting',
    tier: 'Standard Ghostwriting',
    audience: 'For short non-fiction or memoir projects up to 40,000 words',
    price: 2999,
    currency: 'USD',
    priceNote: 'starting at',
    isFeatured: false,
    featureGroups: [
      {
        heading: 'Writing',
        items: ['Up to 40k words', 'Interview-based research', '2 drafts', 'Basic formatting'],
      },
    ],
    ctaLabel: 'Get a quote',
  },
  {
    id: 'ghost-pro',
    category: 'ghostwriting',
    tier: 'Professional Ghostwriting',
    audience: 'For full-length manuscripts with voice matching and multiple drafts',
    price: 4499,
    currency: 'USD',
    priceNote: 'starting at',
    isFeatured: true,
    featureGroups: [
      {
        heading: 'Writing',
        items: [
          'Up to 70k words',
          'In-depth interviews',
          'Voice-matching analysis',
          '3 drafts',
          'Chapter outline',
          'Formatting for publication',
        ],
      },
    ],
    ctaLabel: 'Get a quote',
  },
  {
    id: 'ghost-premium',
    category: 'ghostwriting',
    tier: 'Premium Ghostwriting',
    audience: 'For complex projects requiring extensive research and collaboration',
    price: 6499,
    currency: 'USD',
    priceNote: 'starting at',
    isFeatured: false,
    featureGroups: [
      {
        heading: 'Writing',
        items: [
          'Up to 100k words',
          'Extended interviews and research',
          'Voice-matching with sample chapters',
          '5 drafts',
          'Detailed outline and synopsis',
          'Publication-ready formatting',
          'Developmental editing included',
        ],
      },
    ],
    ctaLabel: 'Get a quote',
  },

  /* ── Marketing ──────────────────────────────────────── */
  {
    id: 'mkt-foundation',
    category: 'marketing',
    tier: 'Foundation',
    audience: 'For authors launching their first book who need a solid start',
    price: 3550,
    currency: 'USD',
    priceNote: 'starting at',
    duration: '3 months',
    isFeatured: false,
    featureGroups: [
      {
        heading: 'Marketing',
        items: [
          'Launch strategy',
          'Amazon category & keyword optimisation',
          'Social media templates',
          'Press release',
          'Author bio & positioning',
        ],
      },
    ],
    ctaLabel: 'Get a quote',
  },
  {
    id: 'mkt-growth',
    category: 'marketing',
    tier: 'Growth',
    audience: 'For authors who want sustained visibility after launch',
    price: 5550,
    currency: 'USD',
    priceNote: 'starting at',
    duration: '6 months',
    isFeatured: true,
    featureGroups: [
      {
        heading: 'Marketing',
        items: [
          'Everything in Foundation',
          'Ongoing Amazon ad management',
          'BookBub & Goodreads strategy',
          'Monthly analytics reports',
          'Email list setup & nurture sequence',
          'Review generation campaign',
        ],
      },
    ],
    ctaLabel: 'Get a quote',
  },
  {
    id: 'mkt-authority',
    category: 'marketing',
    tier: 'Authority',
    audience: 'For authors building a platform and a long-tail backlist',
    price: 9550,
    currency: 'USD',
    priceNote: 'starting at',
    duration: '12 months',
    isFeatured: false,
    featureGroups: [
      {
        heading: 'Marketing',
        items: [
          'Everything in Growth',
          'Author website & SEO',
          'Podcast & media pitching',
          'Speaking engagement kit',
          'Quarterly strategy sessions',
          'Multi-book backlist strategy',
          'International market expansion',
        ],
      },
    ],
    ctaLabel: 'Get a quote',
  },

  /* ── Children's ─────────────────────────────────────── */
  {
    id: 'child-wonder',
    category: 'childrens',
    tier: 'Wonder',
    audience: 'For picture books up to 32 pages with simple illustration needs',
    price: 1950,
    currency: 'USD',
    priceNote: 'starting at',
    isFeatured: false,
    featureGroups: [
      {
        heading: 'Writing & Editorial',
        items: ['Manuscript review', 'Line editing', '2 revision rounds'],
      },
      {
        heading: 'Illustration & Design',
        items: ['Illustration sourcing', 'Cover design', 'Interior layout (up to 32 pages)'],
      },
      {
        heading: 'Publishing',
        items: ['ISBN', 'Ebook formatting', 'Single-platform distribution'],
      },
    ],
    ctaLabel: 'Get a quote',
  },
  {
    id: 'child-dreamers',
    category: 'childrens',
    tier: 'Dreamers',
    audience: 'For illustrated books with custom artwork and wide distribution',
    price: 3450,
    currency: 'USD',
    priceNote: 'starting at',
    isFeatured: true,
    featureGroups: [
      {
        heading: 'Writing & Editorial',
        items: ['Developmental feedback', 'Line editing', 'Copyedit', '3 revision rounds'],
      },
      {
        heading: 'Illustration & Design',
        items: [
          'Custom illustration (selected artist)',
          'Cover + interior design',
          'Print-ready files',
          'Activity page (optional)',
        ],
      },
      {
        heading: 'Publishing',
        items: [
          'ISBN + barcode',
          'Multi-format (print + ebook)',
          'Multi-platform distribution',
          'Library distribution',
        ],
      },
    ],
    ctaLabel: 'Get a quote',
  },
  {
    id: 'child-bright',
    category: 'childrens',
    tier: 'Bright Minds',
    audience: 'For chapter books, middle grade, and educational titles with full production',
    price: 5950,
    currency: 'USD',
    priceNote: 'starting at',
    isFeatured: false,
    featureGroups: [
      {
        heading: 'Writing & Editorial',
        items: [
          'Full developmental edit',
          'Line editing',
          'Copyedit',
          'Final proofread',
          '5 revision rounds',
        ],
      },
      {
        heading: 'Illustration & Design',
        items: [
          'Premium illustration package',
          'Cover design (2 concepts)',
          'Interior design & typesetting',
          'Hardcover jacket',
          'Activity/workbook pages',
        ],
      },
      {
        heading: 'Publishing',
        items: [
          'ISBN + barcode',
          'All formats (print, ebook, hardcover)',
          'Global distribution',
          'Library distribution',
          'Metadata optimisation',
        ],
      },
      {
        heading: 'Marketing',
        items: ['Launch plan', 'Social media kit', 'School/library outreach template'],
      },
    ],
    ctaLabel: 'Get a quote',
  },
]
