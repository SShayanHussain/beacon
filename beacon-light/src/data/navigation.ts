export type NavItem = {
  label: string
  href: string
  children?: NavChild[]
}

export type NavChild = {
  label: string
  href: string
  description: string
  icon: string
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        label: 'Book Publishing',
        href: '/services/book-publishing',
        description: 'Manuscript to retail shelf, end to end',
        icon: 'book-open',
      },
      {
        label: 'Ghostwriting',
        href: '/services/book-writing',
        description: 'Your story, written in your voice',
        icon: 'pen-tool',
      },
      {
        label: 'Editing',
        href: '/services/book-editing',
        description: 'Developmental, line, and copy editing',
        icon: 'file-edit',
      },
      {
        label: 'Book Marketing',
        href: '/services/book-marketing',
        description: 'Launch strategy and long-tail visibility',
        icon: 'megaphone',
      },
      {
        label: 'Audiobooks',
        href: '/services/audiobooks',
        description: 'Narration, mastering, and ACX distribution',
        icon: 'headphones',
      },
      {
        label: 'Cover & Interior Design',
        href: '/services/cover-design',
        description: 'Covers that compete on the shelf',
        icon: 'palette',
      },
    ],
  },
  { label: 'Packages', href: '/packages' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const footerNav = {
  services: [
    { label: 'Book Publishing', href: '/services/book-publishing' },
    { label: 'Ghostwriting', href: '/services/book-writing' },
    { label: 'Editing', href: '/services/book-editing' },
    { label: 'Book Marketing', href: '/services/book-marketing' },
    { label: 'Audiobooks', href: '/services/audiobooks' },
    { label: 'Cover Design', href: '/services/cover-design' },
    { label: 'View packages', href: '/packages' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Book a call', href: '/schedule' },
  ],
  legal: [
    { label: 'Privacy policy', href: '/privacy-policy' },
    { label: 'Terms & conditions', href: '/terms-and-conditions' },
    { label: 'Refund policy', href: '/refund-policy' },
  ],
}
