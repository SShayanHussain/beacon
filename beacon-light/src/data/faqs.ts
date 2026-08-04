import type { FAQ } from '@/lib/schemas'

export const faqs: FAQ[] = [
  /* ── Global / Services ──────────────────────────────── */
  {
    id: 'faq-1',
    question: 'Do I keep my rights and royalties?',
    answer:
      'Yes, completely. Beacon Light is a work-for-hire company. You retain 100% of your copyright, publishing rights, intellectual property, and royalties. We are paid for the services we deliver, and we never take a share of what your book earns.',
    scope: 'global',
  },
  {
    id: 'faq-2',
    question: 'How long does the publishing process take?',
    answer:
      'A typical project takes 8–16 weeks from manuscript submission to the book being listed on retail platforms. The timeline depends on the scope: a book that only needs formatting and distribution moves faster than one requiring a full developmental edit and custom cover design. We confirm the timeline in your quote.',
    scope: 'global',
  },
  {
    id: 'faq-3',
    question: 'Can I hire you for just one service?',
    answer:
      'Absolutely. Every service — editing, cover design, formatting, distribution, marketing — can be purchased individually. Packages bundle them at a lower cost, but nothing is forced together.',
    scope: 'global',
  },
  {
    id: 'faq-4',
    question: 'What formats will my book be available in?',
    answer:
      'Depending on the package, we produce ebook (EPUB and KDP-ready MOBI), paperback (print-on-demand via IngramSpark and KDP), hardcover, and large print. Audiobook production is available as a separate service.',
    scope: 'global',
  },
  {
    id: 'faq-5',
    question: 'Where will my book be distributed?',
    answer:
      'We distribute to Amazon KDP, Barnes & Noble Press, Apple Books, Kobo, Google Play Books, IngramSpark (which reaches 40,000+ retailers and libraries worldwide), and Draft2Digital. The exact distribution depends on your package and preferences.',
    scope: 'global',
  },
  {
    id: 'faq-6',
    question: 'What does the pricing include?',
    answer:
      'Every price on the packages page is a starting point for a typical manuscript. The final quote is scoped to your specific book — length, genre, and manuscript condition all affect the number. You always see the final price before work begins.',
    scope: 'global',
  },

  /* ── Contact ────────────────────────────────────────── */
  {
    id: 'faq-contact-1',
    question: 'How quickly do you respond?',
    answer:
      'We reply to every enquiry within one business day, including the ones that turn out not to be a fit.',
    scope: 'contact',
  },
  {
    id: 'faq-contact-2',
    question: 'Is the initial call really free?',
    answer:
      'Yes. The intro call is thirty minutes, no pitch deck. You describe your book and what you want from it. We tell you what it would take and what it would cost. If it is not a fit, we say so.',
    scope: 'contact',
  },
  {
    id: 'faq-contact-3',
    question: 'What happens after I submit the form?',
    answer:
      'We read the details, check the calendar, and reply within one business day with either a scope and a number, or a couple of clarifying questions.',
    scope: 'contact',
  },
  {
    id: 'faq-contact-4',
    question: 'Do you work with authors outside the US?',
    answer:
      'Yes. Most of our communication is by email and video call. We work with authors worldwide and quote in USD.',
    scope: 'contact',
  },
  {
    id: 'faq-contact-5',
    question: 'My manuscript isn\'t finished yet. Can I still reach out?',
    answer:
      'Yes. If you are still writing, we can scope the services you will need and give you a rough timeline, so you are not starting from zero when the draft is done.',
    scope: 'contact',
  },

  /* ── Book Publishing ────────────────────────────────── */
  {
    id: 'faq-pub-1',
    question: 'Who owns the retail accounts?',
    answer:
      'You do. We set them up in your name and you retain full control. If you ever move on from Beacon Light, the accounts stay with you.',
    scope: 'book-publishing',
  },
  {
    id: 'faq-pub-2',
    question: 'Can I publish under a pen name?',
    answer:
      'Yes. The ISBN and copyright are registered under your legal name, but the pen name appears everywhere the reader sees.',
    scope: 'book-publishing',
  },
  {
    id: 'faq-pub-3',
    question: 'Do you offer print-on-demand?',
    answer:
      'Yes, through IngramSpark and Amazon KDP. There is no upfront print run — books are printed as they are ordered.',
    scope: 'book-publishing',
  },
  {
    id: 'faq-pub-4',
    question: 'What do I need to send you to get started?',
    answer:
      'A manuscript in any format — Word, Google Doc, Scrivener export, even a PDF. We handle the conversion. If you have cover ideas or reference images, send those too, but they are not required.',
    scope: 'book-publishing',
  },
  {
    id: 'faq-pub-5',
    question: 'Can I make changes after the book is published?',
    answer:
      'Yes. Minor corrections and updates can be made at any time. Significant revisions (new chapters, structural changes) are quoted separately.',
    scope: 'book-publishing',
  },

  /* ── Editing ────────────────────────────────────────── */
  {
    id: 'faq-edit-1',
    question: 'What is the difference between developmental editing and line editing?',
    answer:
      'A developmental edit addresses structure, pacing, character, and argument — the big-picture concerns. A line edit works at the sentence level: clarity, rhythm, word choice, and voice. They are separate passes because fixing structure first prevents wasting time polishing sentences that may not survive.',
    scope: 'book-editing',
  },
  {
    id: 'faq-edit-2',
    question: 'How many rounds of revision are included?',
    answer:
      'That depends on the package — Standard includes 2, Professional includes 3, and Premium includes 5. Additional rounds can be added for a flat fee per round.',
    scope: 'book-editing',
  },

  /* ── Marketing ──────────────────────────────────────── */
  {
    id: 'faq-mkt-1',
    question: 'When should marketing start?',
    answer:
      'Ideally 2–3 months before launch. The best launches are not surprises — they are built on an audience, pre-orders, and advance reviews that are in place before day one.',
    scope: 'book-marketing',
  },
  {
    id: 'faq-mkt-2',
    question: 'Do you manage Amazon ads?',
    answer:
      'Yes, in the Growth and Authority packages. We set up, monitor, and optimise your campaigns with monthly performance reports.',
    scope: 'book-marketing',
  },
]
