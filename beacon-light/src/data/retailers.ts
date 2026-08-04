export type Retailer = {
  name: string
  logo: string
  url: string
  invertOnDark: boolean
}

export const retailers: Retailer[] = [
  {
    name: 'Amazon KDP',
    logo: '/logos/retailers/amazon-kdp.svg',
    url: 'https://kdp.amazon.com',
    invertOnDark: true,
  },
  {
    name: 'Barnes & Noble',
    logo: '/logos/retailers/barnes-noble.svg',
    url: 'https://press.barnesandnoble.com',
    invertOnDark: true,
  },
  {
    name: 'Apple Books',
    logo: '/logos/retailers/apple-books.svg',
    url: 'https://authors.apple.com',
    invertOnDark: true,
  },
  {
    name: 'Kobo',
    logo: '/logos/retailers/kobo.svg',
    url: 'https://www.kobo.com/writinglife',
    invertOnDark: true,
  },
  {
    name: 'IngramSpark',
    logo: '/logos/retailers/ingramspark.svg',
    url: 'https://www.ingramspark.com',
    invertOnDark: true,
  },
  {
    name: 'Google Play Books',
    logo: '/logos/retailers/google-books.svg',
    url: 'https://play.google.com/books',
    invertOnDark: false,
  },
  {
    name: 'Draft2Digital',
    logo: '/logos/retailers/draft2digital.svg',
    url: 'https://www.draft2digital.com',
    invertOnDark: true,
  },
  {
    name: 'ACX',
    logo: '/logos/retailers/acx.svg',
    url: 'https://www.acx.com',
    invertOnDark: true,
  },
]
