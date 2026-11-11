import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, CollectionConfig, GlobalConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'title',
    group: 'Collections',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'path', type: 'text' },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'showInSubNav', type: 'checkbox', defaultValue: true },
    { name: 'showInExperienceIndex', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
    {
      name: 'cardContent',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Explore' },
        { name: 'buttonUrl', type: 'text' },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'h1', type: 'text' },
        { name: 'mode', type: 'select', options: ['full', 'split'], defaultValue: 'full' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'pos', type: 'text', defaultValue: '50% 50%' },
        {
          name: 'lede',
          type: 'array',
          fields: [{ name: 'text', type: 'textarea' }],
        },
      ],
    },
    {
      name: 'blocks',
      type: 'array',
      fields: [
        { name: 'h', type: 'text' },
        { name: 'sub', type: 'text' },
        {
          name: 'p',
          type: 'array',
          fields: [{ name: 'text', type: 'textarea' }],
        },
        {
          name: 'galleryImages',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'ctaBand',
      type: 'group',
      fields: [
        { name: 'h', type: 'text' },
        { name: 'p', type: 'textarea' },
        { name: 'buttonLabel', type: 'text' },
        { name: 'buttonUrl', type: 'text' },
      ],
    },
    {
      name: 'stickyCta',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    { name: 'seoTitle', type: 'text' },
  ],
}

const Stays: CollectionConfig = {
  slug: 'stays',
  admin: { useAsTitle: 'title', group: 'Collections' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'seoTitle', type: 'text', label: 'SEO Page Title' },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'path', type: 'text' },
    { name: 'showInSubNav', type: 'checkbox', defaultValue: true },
    { name: 'showInStayIndex', type: 'checkbox', defaultValue: true },
    { name: 'cardTitle', type: 'text', label: 'Stay Card Title' },
    { name: 'cardSubtitle', type: 'text', label: 'Stay Card Subtitle' },
    { name: 'cardDescription', type: 'textarea', label: 'Stay Card Description' },
    { name: 'cardImage', type: 'upload', relationTo: 'media', label: 'Stay Card Image' },
    { name: 'cardCta', type: 'text', label: 'Stay Card Button Text', defaultValue: 'Explore' },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'h1', type: 'text' },
        { name: 'mode', type: 'select', options: ['full', 'split'], defaultValue: 'split' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'lede', type: 'array', fields: [{ name: 'text', type: 'textarea' }] },
      ],
    },
    {
      name: 'blocks',
      type: 'array',
      fields: [
        { name: 'h', type: 'text' },
        { name: 'sub', type: 'text' },
        { name: 'p', type: 'array', fields: [{ name: 'text', type: 'textarea' }] },
        { name: 'galleryImages', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media' }] }
      ],
    },
    {
      name: 'ctaBand',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'h', type: 'text' },
        { name: 'p', type: 'textarea' },
        { name: 'buttonLabel', type: 'text' },
        { name: 'buttonUrl', type: 'text' },
      ],
    },
    {
      name: 'stickyCta',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}

const LodgeSubPages: CollectionConfig = {
  slug: 'lodge-sub-pages',
  admin: {
    useAsTitle: 'title',
    group: 'Collections',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'path', type: 'text' },
    { name: 'showInSubNav', type: 'checkbox', defaultValue: true },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'h1', type: 'text' },
        { name: 'mode', type: 'select', options: ['full', 'split'], defaultValue: 'split' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { 
          name: 'lede', 
          type: 'array', 
          fields: [{ name: 'text', type: 'textarea' }] 
        },
      ],
    },
    {
      name: 'blocks',
      type: 'array',
      fields: [
        { name: 'h', type: 'text' },
        { name: 'sub', type: 'text' },
        { 
          name: 'p', 
          type: 'array', 
          fields: [{ name: 'text', type: 'textarea' }] 
        },
        {
          name: 'galleryImages',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' }
          ]
        }
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}

const OurWorldSubPages: CollectionConfig = {
  slug: 'our-world-sub-pages',
  admin: {
    useAsTitle: 'title',
    group: 'Collections',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'showInSubNav', type: 'checkbox', defaultValue: true },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'lede', type: 'array', fields: [{ name: 'text', type: 'text' }] },
      ],
    },
    {
      name: 'blocks',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'text' },
        { name: 'p', type: 'array', fields: [{ name: 'text', type: 'text' }] },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'eyebrow', type: 'text' }, // Jaise: "December to February"
        { name: 'title', type: 'text', required: true }, // Jaise: "Winter. The mountains revealed."
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'p',
          type: 'array',
          fields: [{ name: 'text', type: 'text' }],
        },
      ],
    },
  ],
}

const Journal: CollectionConfig = {
  slug: 'journal',
  admin: {
    useAsTitle: 'title',
    group: 'Collections',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'category', type: 'text', label: 'Category / Eyebrow' },
    { name: 'summary', type: 'textarea', label: 'Card Summary' },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'publishedDate', type: 'date' },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'h1', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    // Flexible Content Layout (Heading, Paragraph, Image)
    {
      name: 'contentBlocks',
      type: 'blocks',
      blocks: [
        {
          slug: 'headingBlock',
          labels: { singular: 'Heading', plural: 'Headings' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'level', type: 'select', options: ['h2', 'h3'], defaultValue: 'h2' },
          ],
        },
        {
          slug: 'paragraphBlock',
          labels: { singular: 'Paragraph', plural: 'Paragraphs' },
          fields: [
            { name: 'text', type: 'textarea', required: true },
          ],
        },
        {
          slug: 'imageBlock',
          labels: { singular: 'Image', plural: 'Images' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'caption', type: 'text' },
          ],
        },
      ],
    },
  ],
}


const HomepageGlobal: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    group: 'Pages',
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (!doc.hero) doc.hero = {};
        if (!doc.hero.eyebrow) doc.hero.eyebrow = 'Itmenaan Estate · Kumaon Himalayas';
        if (!doc.hero.title) doc.hero.title = 'You have arrived.';
        if (!doc.hero.subtitle) doc.hero.subtitle = 'There are places you visit. And places where, quite unexpectedly, you find yourself at peace.';

        if (!doc.introSection) doc.introSection = {};
        if (!doc.introSection.eyebrow) doc.introSection.eyebrow = 'A quieter kind of luxury';
        if (!doc.introSection.firstParagraph) doc.introSection.firstParagraph = 'High in the Kumaon Himalayas, where forests give way to terraced valleys and distant snow-clad peaks, Itmenaan Estate offers a different understanding of luxury. One measured in quiet mornings, generous hospitality, food with a sense of origin and the simple pleasure of being exactly where you are.';
        if (!doc.introSection.pullText) doc.introSection.pullText = 'Here, time seems to have remembered how to slow down.';
        if (!doc.introSection.feelingTitle) doc.introSection.feelingTitle = 'The pleasure of wanting nothing more.';
        if (!doc.introSection.ctaText) doc.introSection.ctaText = 'Explore the Estate';
        if (!doc.introSection.ctaPath) doc.introSection.ctaPath = '/the-lodge';
        if (!doc.introSection.feelingParagraphs || doc.introSection.feelingParagraphs.length === 0) {
          doc.introSection.feelingParagraphs = [
            { text: 'Itmenaan. A beautiful word for a feeling that needs little explanation.' },
            { text: 'Contentment. Satisfaction. The quiet certainty that, for this moment, nothing else is required.' },
            { text: 'It is a feeling that arrives naturally here. Perhaps in the first glimpse of the Himalayan range. In a cup of tea offered without hurry. In the sound of birds that accompanies the changing light. Or in the remarkable kindness of people who have always called these mountains home.' },
            { text: 'Nature is not something to conquer. Silence is not something to fill.' },
            { text: 'There is nowhere else you need to be.' }
          ];
        }

        if (!doc.staySection) doc.staySection = {};
        if (!doc.staySection.eyebrow) doc.staySection.eyebrow = 'Stone, timber & mountain light';
        if (!doc.staySection.title) doc.staySection.title = 'A place to belong, for a little while.';
        if (!doc.stayPanels || doc.stayPanels.length === 0) {
          doc.stayPanels = [
            {
              h: 'Stay',
              to: '/stay',
              p: 'Stone and timber, old-world character and quiet comfort. Our intimate collection of cottages and rooms is designed to live in harmony with the landscape.',
              cta: 'Discover Your Stay'
            },
            {
              h: 'The Kumaon Kitchen',
              to: '/the-kumaon-kitchen',
              p: 'The pleasure of good food begins with good ingredients. Seasonal produce, regional traditions and meals prepared with generosity, from the land around us to your table.',
              cta: 'Explore the Kitchen'
            },
            {
              h: 'Experiences',
              to: '/experiences',
              p: 'Walk through forests and villages. Follow birdsong. Discover ancient temples. Or simply surrender to an afternoon with no particular plans.',
              cta: 'Discover Experiences'
            }
          ];
        }

        if (!doc.slowSection) doc.slowSection = {};
        if (!doc.slowSection.eyebrow) doc.slowSection.eyebrow = 'The art of Itmenaan';
        if (!doc.slowSection.title) doc.slowSection.title = 'A slower way of being.';
        if (!doc.slowSection.quote) doc.slowSection.quote = 'The mountains have their own rhythm.\nWe are happy to follow it.';
        if (!doc.slowSection.ctaText) doc.slowSection.ctaText = 'The Art of Itmenaan';
        if (!doc.slowSection.ctaPath) doc.slowSection.ctaPath = '/experiences/art-of-doing-nothing';
        if (!doc.slowSection.paragraphs || doc.slowSection.paragraphs.length === 0) {
          doc.slowSection.paragraphs = [
            { text: 'Morning arrives gently. The valley emerges from the mist, birds begin their conversations, and somewhere, tea is being prepared.' },
            { text: 'There is no prescribed way to spend a day at Itmenaan.' },
            { text: 'You might take a walk along a forest path, linger over breakfast, discover a neighbouring village or spend an entire afternoon reading. Each experience is an invitation, never an obligation.' }
          ];
        }

        if (!doc.peopleSection) doc.peopleSection = {};
        if (!doc.peopleSection.eyebrow) doc.peopleSection.eyebrow = 'The heart of Itmenaan';
        if (!doc.peopleSection.title) doc.peopleSection.title = 'The people behind the peace.';
        if (!doc.peopleSection.pullText) doc.peopleSection.pullText = 'Buildings make an estate. People make it memorable.';
        if (!doc.peopleSection.ctaText) doc.peopleSection.ctaText = 'Meet Our People';
        if (!doc.peopleSection.ctaPath) doc.peopleSection.ctaPath = '/the-lodge/our-people';
        if (!doc.peopleSection.paragraphs || doc.peopleSection.paragraphs.length === 0) {
          doc.peopleSection.paragraphs = [
            { text: 'Hospitality at Itmenaan is not a carefully rehearsed performance.' },
            { text: 'It comes naturally to the people who welcome you, prepare your meals, accompany you on walks and share their intimate knowledge of the land. Our hosts come from the surrounding villages. Their warmth and connection to Kumaon give this place its most enduring character.' }
          ];
        }

        if (!doc.kitchenSection) doc.kitchenSection = {};
        if (!doc.kitchenSection.eyebrow) doc.kitchenSection.eyebrow = 'The Kumaon Kitchen';
        if (!doc.kitchenSection.title) doc.kitchenSection.title = 'A kitchen that belongs to the land.';
        if (!doc.kitchenSection.lead) doc.kitchenSection.lead = 'Good food has always been a way of expressing care.';
        if (!doc.kitchenSection.ctaText) doc.kitchenSection.ctaText = 'The Kumaon Kitchen';
        if (!doc.kitchenSection.ctaPath) doc.kitchenSection.ctaPath = '/the-kumaon-kitchen';
        if (!doc.kitchenSection.paragraphs || doc.kitchenSection.paragraphs.length === 0) {
          doc.kitchenSection.paragraphs = [
            { text: 'Our kitchen follows the changing seasons and the ingredients available close to home. Familiar comforts sit alongside regional Kumaoni preparations, each meal made to be enjoyed slowly.' },
            { text: 'Some meals are best shared around a table. Others deserve an open sky and the mountains for company.' }
          ];
        }

        if (!doc.beyondSection) doc.beyondSection = {};
        if (!doc.beyondSection.eyebrow) doc.beyondSection.eyebrow = 'Our world';
        if (!doc.beyondSection.title) doc.beyondSection.title = 'Beyond the familiar Himalayas.';
        if (!doc.beyondSection.pullText) doc.beyondSection.pullText = 'Kumaon reveals itself slowly.';
        if (!doc.beyondSection.ctaText) doc.beyondSection.ctaText = 'Discover Kumaon';
        if (!doc.beyondSection.ctaPath) doc.beyondSection.ctaPath = '/our-world';
        if (!doc.beyondSection.paragraphs || doc.beyondSection.paragraphs.length === 0) {
          doc.beyondSection.paragraphs = [
            { text: 'In the carved stone of an old house. In the bells of a mountain temple. In the rhythm of village life. In forest paths that appear to have been walked for generations.' },
            { text: 'Itmenaan is both a place to retreat from the world and a gentle introduction to another way of experiencing it.' }
          ];
        }

        if (!doc.journeySection) doc.journeySection = {};
        if (!doc.journeySection.eyebrow) doc.journeySection.eyebrow = 'Begin your journey';
        if (!doc.journeySection.title) doc.journeySection.title = 'Perhaps what you are looking for is already here.';
        if (!doc.journeySection.pullText) doc.journeySection.pullText = 'The pleasure of wanting nothing more.';
        if (!doc.journeySection.ctaText) doc.journeySection.ctaText = 'Book Your Stay';
        if (!doc.journeySection.ctaPath) doc.journeySection.ctaPath = 'book';
        if (!doc.journeySection.paragraphs || doc.journeySection.paragraphs.length === 0) {
          doc.journeySection.paragraphs = [
            { text: 'A few days in the mountains. A little distance from the familiar. Time to read, wander, reconnect, or simply be.' },
            { text: 'Whatever brings you to Itmenaan, we hope you leave with something that cannot be packed into a suitcase.' }
          ];
        }

        return doc;
      }
    ]
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Hero Background Image' },
      ],
    },
    {
      name: 'introSection',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'firstParagraph', type: 'textarea' },
        { name: 'pullText', type: 'textarea' },
        { name: 'feelingTitle', type: 'text' },
        { name: 'feelingImage', type: 'upload', relationTo: 'media', label: 'Feeling Section Image' },
        { name: 'feelingParagraphs', type: 'array', fields: [{ name: 'text', type: 'textarea' }] },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaPath', type: 'text' },
      ],
    },
    {
      name: 'staySection',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
      ],
    },
    {
      name: 'stayPanels',
      type: 'array',
      label: 'Stay / Feature Panels',
      fields: [
        { name: 'h', type: 'text', required: true, label: 'Title' },
        { name: 'to', type: 'text', required: true, label: 'Path' },
        { name: 'p', type: 'textarea', label: 'Description' },
        { name: 'cta', type: 'text', label: 'CTA Text' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Panel Image' },
      ],
    },
    {
      name: 'slowSection',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Slow Section Image' },
        { name: 'quote', type: 'textarea' },
        { name: 'paragraphs', type: 'array', fields: [{ name: 'text', type: 'textarea' }] },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaPath', type: 'text' },
      ],
    },
    {
      name: 'peopleSection',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'People Section Image' },
        { name: 'pullText', type: 'textarea' },
        { name: 'paragraphs', type: 'array', fields: [{ name: 'text', type: 'textarea' }] },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaPath', type: 'text' },
      ],
    },
    {
      name: 'kitchenSection',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Kitchen Section Image' },
        { name: 'lead', type: 'textarea' },
        { name: 'paragraphs', type: 'array', fields: [{ name: 'text', type: 'textarea' }] },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaPath', type: 'text' },
      ],
    },
    {
      name: 'beyondSection',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Beyond Section Image' },
        { name: 'pullText', type: 'textarea' },
        { name: 'paragraphs', type: 'array', fields: [{ name: 'text', type: 'textarea' }] },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaPath', type: 'text' },
      ],
    },
    {
      name: 'journeySection',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'pullText', type: 'textarea' },
        { name: 'paragraphs', type: 'array', fields: [{ name: 'text', type: 'textarea' }] },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaPath', type: 'text' },
      ],
    },
  ],
}

const TheLodgePageGlobal: GlobalConfig = {
  slug: 'the-lodge-page',
  label: 'The Lodge Page',
  admin: { group: 'Pages' },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Itmenaan Estate · The Lodge' },
        { name: 'h1', type: 'text', defaultValue: 'Where contentment comes naturally.' },
        { name: 'mode', type: 'select', options: ['full', 'split'], defaultValue: 'split' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'pos', type: 'text', defaultValue: '50% 50%' },
        { 
          name: 'lede', 
          type: 'array', 
          fields: [{ name: 'text', type: 'textarea' }],
          defaultValue: [
            { text: 'Itmenaan is not an invitation to withdraw from life, but to rediscover its simplest pleasures.' },
            { text: 'There are no expectations to fill your days. No elaborate rituals required to feel restored. The forests, the fresh mountain air, the warmth of our hosts and the unhurried rhythm of the place do most of the work.' },
            { text: 'Here, you can walk for hours or sit for an afternoon.' },
            { text: 'Both are considered time well spent.' }
          ]
        },
      ],
    },
    {
      name: 'blocks',
      type: 'array',
      fields: [
        { name: 'h', type: 'text' },
        { name: 'sub', type: 'text' },
        { 
          name: 'p', 
          type: 'array', 
          fields: [{ name: 'text', type: 'textarea' }] 
        },
        {
          name: 'galleryImages',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' }
          ]
        }
      ],
      defaultValue: [
        {
          h: 'Somewhere between the mountains and the silence, life begins to feel wonderfully uncomplicated.',
          sub: 'A retreat designed around the rhythm of nature.',
          p: [
            { text: 'There is a particular kind of happiness that comes from not having to look for it. It arrives without announcement, in ordinary moments that somehow become extraordinary.' },
            { text: 'A long breakfast. An unexpected conversation. Sunlight on an old stone wall. The distant sound of village life across the valley.' }
          ]
        },
        {
          h: 'Not the absence of comfort.',
          sub: 'The presence of contentment.',
          p: [
            { text: 'Rooms that open to the garden and the valley, fires lit when the evening turns crisp, books left on windowsills, and tea brought to you without asking.' },
            { text: 'Luxury here is entirely personal and unobtrusive.' }
          ]
        },
        {
          h: 'A house with a memory.',
          sub: 'Stories held in stone and timber.',
          p: [
            { text: 'Restored with patience and respect for its origins, Itmenaan retains the quiet dignity of old Kumaoni homes while offering the warmth of modern hospitality.' }
          ]
        }
      ]
    },
    {
      name: 'ctaBand',
      type: 'group',
      fields: [
        { name: 'h', type: 'text', defaultValue: 'Perhaps what you are looking for is already here.' },
        { name: 'p', type: 'textarea', defaultValue: 'A few days in the mountains. A little distance from the familiar. Time to read, wander, reconnect, or simply be.' },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Book Your Stay' },
        { name: 'buttonUrl', type: 'text', defaultValue: 'book' }
      ]
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Discover Our Heritage', url: '/the-lodge/architecture' },
        { label: 'Meet Our People', url: '/the-lodge/our-people' },
        { label: 'Explore the Estate', url: '/the-lodge' }
      ]
    },
  ],
}

const KumaonKitchenPageGlobal: GlobalConfig = {
  slug: 'kumaon-kitchen-page',
  label: 'The Kumaon Kitchen Page',
  admin: { group: 'Pages' },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Itmenaan Estate · The Kumaon Kitchen' },
        { name: 'h1', type: 'text', defaultValue: 'Rooted in the soil, crafted with patience.' },
        { name: 'mode', type: 'select', options: ['full', 'split'], defaultValue: 'split' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'pos', type: 'text', defaultValue: '50% 50%' },
        { 
          name: 'lede', 
          type: 'array', 
          fields: [{ name: 'text', type: 'textarea' }],
          defaultValue: [
            { text: 'Food at Itmenaan is a reflection of the mountains—simple, honest, and deeply comforting.' },
            { text: 'We source our ingredients from our own organic gardens and the surrounding villages, celebrating traditional Kumaoni recipes passed down through generations.' }
          ]
        },
      ],
    },
    {
      name: 'blocks',
      type: 'array',
      fields: [
        { name: 'h', type: 'text' },
        { name: 'sub', type: 'text' },
        { 
          name: 'p', 
          type: 'array', 
          fields: [{ name: 'text', type: 'textarea' }] 
        },
        {
          name: 'galleryImages',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' }
          ]
        }
      ],
      defaultValue: [
        {
          h: 'Flavours born from mountain seasons.',
          sub: 'Farm-to-table dining at its purest.',
          p: [
            { text: 'Every meal is prepared slowly, using wood-fired hearths and traditional earthenware to bring out the authentic richness of local grains, lentils, and mountain greens.' },
            { text: 'Whether it is a breakfast enjoyed in the crisp morning sun or a hearty dinner under the starlit sky, dining here is an unhurried celebration.' }
          ]
        },
        {
          h: 'Heirlooms of Kumaon.',
          sub: 'Recipes with a memory.',
          p: [
            { text: 'From Bhatt ki Dal to seasonal pahadi chutneys and freshly baked breads, our kitchen preserves the culinary heritage of the hills.' }
          ]
        }
      ]
    },
    {
      name: 'ctaBand',
      type: 'group',
      fields: [
        { name: 'h', type: 'text', defaultValue: 'Taste the unhurried life.' },
        { name: 'p', type: 'textarea', defaultValue: 'Join us for meals cooked with love, tradition, and local ingredients.' },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Reserve Your Table' },
        { name: 'buttonUrl', type: 'text', defaultValue: 'book' }
      ]
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Explore Experiences', url: '/experiences' },
        { label: 'Discover The Lodge', url: '/the-lodge' }
      ]
    },
  ],
}

const StaysPageGlobal: GlobalConfig = {
  slug: 'stays-page',
  label: 'Stay Page',
  admin: { group: 'Pages' },
  fields: [
    { name: 'seoTitle', type: 'text', label: 'SEO Page Title', defaultValue: 'Cottages & Rooms in Kumaon | Itmenaan Estate' },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'YOUR STAY AT ITMENAAN' },
        { name: 'h1', type: 'text', defaultValue: 'Rooms with a view of another life.' },
        { name: 'mode', type: 'select', options: ['full', 'split'], defaultValue: 'split' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'pos', type: 'text', defaultValue: '50% 50%' },
        { 
          name: 'lede', 
          type: 'array', 
          fields: [{ name: 'text', type: 'textarea' }],
          defaultValue: [
            { text: 'Some rooms are designed to be admired. Others invite you to make yourself at home.' },
            { text: 'At Itmenaan, our intimate collection of cottages and rooms offers the warmth of traditional Kumaoni architecture combined with quiet, uncompromised comfort.' }
          ]
        },
      ],
    },
    {
      name: 'blocks',
      type: 'array',
      fields: [
        { name: 'h', type: 'text' },
        { name: 'sub', type: 'text' },
        { name: 'p', type: 'array', fields: [{ name: 'text', type: 'textarea' }] },
        { name: 'galleryImages', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media' }] }
      ],
      defaultValue: [
        {
          h: 'A different view from every window.',
          sub: '',
          p: [
            { text: 'Each cottage and room has its own relationship with the landscape. Some look towards the valley, some towards the forest, others towards distant mountains.' },
            { text: 'Beyond the rooms, the estate offers open spaces, quiet corners and places to watch the day unfold.' },
            { text: 'Whichever room you choose, the mountains are never far away.' }
          ]
        }
      ]
    },
    {
      name: 'ctaBand',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'h', type: 'text', defaultValue: 'Whichever room you choose, the mountains are never far away.' },
        { name: 'p', type: 'textarea', defaultValue: 'Choose from our carefully curated cottages and rooms.' },
        { name: 'buttonLabel', type: 'text', defaultValue: 'CHECK AVAILABILITY' },
        { name: 'buttonUrl', type: 'text', defaultValue: 'book' }
      ]
    },
    
    {
      name: 'tableSection',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'eyebrow', type: 'text', defaultValue: 'Eight keys, four ways to stay' },
        { name: 'title', type: 'text', defaultValue: 'At a glance.' },
        {
          name: 'columns',
          type: 'array',
          fields: [{ name: 'label', type: 'text', required: true }],
          defaultValue: [
            { label: 'Category' },
            { label: 'Rooms' },
            { label: 'Key distinction' },
            { label: 'Ideal guest' },
          ],
        },
        {
          name: 'rows',
          type: 'array',
          fields: [
            {
              name: 'values',
              type: 'array',
              fields: [{ name: 'value', type: 'text' }],
            },
          ],
          defaultValue: [
            { values: [{ value: 'Deodar Cottages' }, { value: '3' }, { value: 'Generous spaces and outdoor sitting areas' }, { value: 'Couples, families' }] },
            { values: [{ value: 'Pine Cottages' }, { value: '2' }, { value: 'Individually positioned and private' }, { value: 'Couples, small families' }] },
            { values: [{ value: 'Oak Rooms' }, { value: '2' }, { value: 'Characterful rooms in the original heritage house' }, { value: 'Couples' }] },
            { values: [{ value: 'Kafal Room' }, { value: '1' }, { value: 'Smaller heritage room' }, { value: 'Solo travellers, couples' }] },
          ],
        },
      ],
    },
    {
      name: 'stickyCta',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'label', type: 'text', defaultValue: 'Check Availability' },
        { name: 'url', type: 'text', defaultValue: 'book' },
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}


const ExperiencesPageGlobal: GlobalConfig = {
  slug: 'experiences-page',
  label: 'Experiences Page',
  admin: { group: 'Pages' },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'h1', type: 'text' },
        { name: 'mode', type: 'select', options: ['full', 'split'], defaultValue: 'full' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'pos', type: 'text', defaultValue: '50% 50%' },
        {
          name: 'lede',
          type: 'array',
          fields: [{ name: 'text', type: 'textarea' }],
        },
      ],
    },
    {
      name: 'blocks',
      type: 'array',
      fields: [
        { name: 'h', type: 'text' },
        { name: 'sub', type: 'text' },
        {
          name: 'p',
          type: 'array',
          fields: [{ name: 'text', type: 'textarea' }],
        },
        {
          name: 'galleryImages',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'ctaBand',
      type: 'group',
      fields: [
        { name: 'h', type: 'text' },
        { name: 'p', type: 'textarea' },
        { name: 'buttonLabel', type: 'text' },
        { name: 'buttonUrl', type: 'text' },
      ],
    },
    {
      name: 'stickyCta',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    { name: 'seoTitle', type: 'text' },
  ],
}

const OurWorldPage: GlobalConfig = {
  slug: 'our-world-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'seoTitle', type: 'text' },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'lede', type: 'array', fields: [{ name: 'text', type: 'text' }] },
      ],
    },
    {
      name: 'blocks',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'text' },
        { name: 'p', type: 'array', fields: [{ name: 'text', type: 'text' }] },
        {
          name: 'galleryImages',
          type: 'array',
          fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
        },
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}

const JourneysPage: GlobalConfig = {
  slug: 'journeys-page',
  label: 'Journeys Page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'seoTitle', type: 'text', label: 'Page / SEO Title' },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'h1', type: 'text', label: 'H1 Title' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'lede',
          type: 'array',
          fields: [{ name: 'text', type: 'text' }],
        },
      ],
    },
    {
      name: 'journeys',
      type: 'array',
      label: 'Journey Cards',
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Eyebrow (e.g. A SUGGESTED THREE-NIGHT RETREAT)' },
        { name: 'title', type: 'text', label: 'Journey Title', required: true },
        { name: 'lead', type: 'textarea', label: 'Lead Text' },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'description',
          type: 'array',
          label: 'Paragraphs',
          fields: [{ name: 'text', type: 'text' }],
        },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Enquire' },
        { name: 'buttonUrl', type: 'text', defaultValue: 'enquire' },
      ],
    },
    {
      name: 'blocks',
      type: 'array',
      label: 'Content Blocks',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'text' },
        {
          name: 'p',
          type: 'array',
          fields: [{ name: 'text', type: 'text' }],
        },
      ],
    },
    {
      name: 'ctaBand',
      type: 'group',
      label: 'CTA Band',
      fields: [
        { name: 'h', type: 'text', label: 'Heading' },
        { name: 'p', type: 'text', label: 'Paragraph' },
        {
          name: 'actions',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
  ],
}

const JournalPage: GlobalConfig = {
  slug: 'journal-page',
  label: 'Journal Page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'seoTitle', type: 'text', label: 'Page / SEO Title' },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'h1', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'lede',
          type: 'array',
          fields: [{ name: 'text', type: 'text' }],
        },
      ],
    },
    {
      name: 'letterBand',
      type: 'group',
      label: 'Bottom Letter Band / Newsletter Section',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'A letter from the mountains.' },
        { name: 'paragraph1', type: 'textarea', defaultValue: 'Occasionally, we send stories, seasonal observations and invitations from Itmenaan.' },
        { name: 'paragraph2', type: 'text', defaultValue: 'No unnecessary noise. Just something worth reading.' },
      ],
    },
  ],
}

const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'seoTitle', type: 'text', label: 'Page / SEO Title' },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'h1', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'lede',
          type: 'array',
          fields: [{ name: 'text', type: 'text' }],
        },
      ],
    },
    {
      name: 'blocks',
      type: 'array',
      fields: [
        { name: 'h', type: 'text' },
        { name: 'sub', type: 'text' },
        {
          name: 'p',
          type: 'array',
          fields: [{ name: 'text', type: 'textarea' }],
        },
        {
          name: 'galleryImages',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'arrivalSection',
      type: 'group',
      label: 'Arrival Section',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Arrival' },
        { name: 'title', type: 'text', defaultValue: 'Finding your way to Itmenaan.' },
        { name: 'intro', type: 'textarea', defaultValue: 'Itmenaan Estate is located in the Almora district of Uttarakhand, in the Kumaon Himalayas, near Binsar.' },
        {
          name: 'arrivalCards',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            {
              name: 'lines',
              type: 'array',
              fields: [{ name: 'line', type: 'text' }],
            },
            { name: 'note', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'reservationsSection',
      type: 'group',
      label: 'Reservations Section',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Reservations' },
        { name: 'title', type: 'text', defaultValue: 'We would love to hear from you.' },
        { name: 'estateName', type: 'text', defaultValue: 'Itmenaan Estate' },
        { name: 'address', type: 'textarea', defaultValue: 'Almora District, Kumaon Himalayas, Uttarakhand' },
        { name: 'phone', type: 'text', defaultValue: '+91 ...' },
        { name: 'phoneHref', type: 'text', defaultValue: 'tel:+' },
        { name: 'email', type: 'text', defaultValue: 'reservations@itmenaanestate.com' },
      ],
    },
  ],
}


const HeaderNavigationGlobal: GlobalConfig = {
  slug: 'header-navigation',
  label: 'Header Navigation',
  admin: {
    group: 'Globals',
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (!doc.menuItems || doc.menuItems.length === 0) {
          doc.menuItems = [
            { label: 'The Estate', n: '01', to: '/the-lodge', subs: [{ label: 'The Philosophy', to: '/the-lodge/philosophy' }, { label: 'Architecture & Heritage', to: '/the-lodge/architecture' }, { label: 'Our People', to: '/the-lodge/our-people' }, { label: 'Living Lightly', to: '/the-lodge/living-lightly' }] },
            { label: 'Stay', n: '02', to: '/stay', subs: [{ label: 'Deodar Cottages', to: '/stay/deodar-cottages' }, { label: 'Pine Cottages', to: '/stay/pine-cottages' }, { label: 'Oak Rooms', to: '/stay/oak-rooms' }, { label: 'Kafal Room', to: '/stay/kafal-room' }] },
            { label: 'The Kumaon Kitchen', n: '03', to: '/the-kumaon-kitchen', subs: [] },
            { label: 'Experiences', n: '04', to: '/experiences', subs: [] },
            { label: 'Our World', n: '05', to: '/our-world', subs: [{ label: 'Seasons', to: '/our-world/seasons' }] },
            { label: 'Journeys & Offers', n: '06', to: '/journeys', subs: [] },
            { label: 'Journal', n: '07', to: '/journal', subs: [] }
          ];
        }
        return doc;
      }
    ]
  },
  fields: [
    { name: 'brandName', type: 'text', defaultValue: 'itmenaan' },
    { name: 'brandSub', type: 'text', defaultValue: 'estate · kumaon' },
    { name: 'bookButtonText', type: 'text', defaultValue: 'Book your stay' },
    { name: 'menuEyebrow', type: 'text', defaultValue: 'Explore Itmenaan', label: 'Menu Header Eyebrow Text' },
    { name: 'contactLinkText', type: 'text', defaultValue: 'Contact & Arrival', label: 'Menu Footer Contact Text' },
    { name: 'contactLinkUrl', type: 'text', defaultValue: '/contact', label: 'Menu Footer Contact URL' },
    {
      name: 'menuItems',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'n', type: 'text', required: true },
        { name: 'to', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Custom Uploaded Image (Optional)' },
        {
          name: 'subs',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'to', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}


const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Globals',
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (!doc.brandName) doc.brandName = 'itmenaan';
        if (!doc.brandSub) doc.brandSub = 'estate · kumaon';
        if (!doc.memberLabel) doc.memberLabel = 'A member of';
        if (!doc.quoteEyebrow) doc.quoteEyebrow = 'The mountains have always known.';
        if (!doc.quoteMain) doc.quoteMain = 'That life need not be hurried to be full. That silence need not be empty.';
        if (!doc.quoteSub) doc.quoteSub = 'That happiness is sometimes nothing more than a beautiful place, good company and the pleasure of wanting nothing else.';
        if (!doc.quoteSign) doc.quoteSign = 'Itmenaan. You have arrived.';
        
        if (!doc.exploreTitle) doc.exploreTitle = 'Explore';
        if (!doc.exploreLinks || doc.exploreLinks.length === 0) {
          doc.exploreLinks = [
            { label: 'The Estate', url: '/the-lodge' },
            { label: 'Stay', url: '/stay' },
            { label: 'The Kumaon Kitchen', url: '/the-kumaon-kitchen' },
            { label: 'Experiences', url: '/experiences' },
            { label: 'Our World', url: '/our-world' },
            { label: 'Journeys & Offers', url: '/journeys' },
            { label: 'Journal', url: '/journal' }
          ];
        }

        if (!doc.stayTitle) doc.stayTitle = 'Stay';
        if (!doc.stayLinks || doc.stayLinks.length === 0) {
          doc.stayLinks = [
            { label: 'Deodar Cottages', url: '/stay/deodar-cottages' },
            { label: 'Pine Cottages', url: '/stay/pine-cottages' },
            { label: 'Oak Rooms', url: '/stay/oak-rooms' },
            { label: 'Kafal Room', url: '/stay/kafal-room' },
            { label: 'A Place for Every Season', url: '/our-world/seasons' }
          ];
        }

        if (!doc.reservationsTitle) doc.reservationsTitle = 'Reservations';
        if (!doc.reservationsLinks || doc.reservationsLinks.length === 0) {
          doc.reservationsLinks = [
            { label: '+91 78400 77773', url: 'tel:+917840077773' },
            { label: 'info@itmenaanlodges.com', url: 'mailto:info@itmenaanlodges.com' },
            { label: 'Contact & Arrival', url: '/contact' },
            { label: 'Check Availability', url: '/book' }
          ];
        }

        if (!doc.newsletterTitle) doc.newsletterTitle = 'Letters from Itmenaan';
        if (!doc.newsletterDesc) doc.newsletterDesc = 'Occasionally, we send stories, seasonal observations and invitations from Itmenaan.';
        if (!doc.address) doc.address = 'Almora District, Uttarakhand, India';
        if (!doc.copyright) doc.copyright = '© 2026 Itmenaan Estate';

        if (!doc.legalLinks || doc.legalLinks.length === 0) {
          doc.legalLinks = [
            { label: 'Privacy', url: '/contact' },
            { label: 'Terms', url: '/contact' }
          ];
        }

        return doc;
      }
    ]
  },
  fields: [
    { name: 'brandName', type: 'text', defaultValue: 'itmenaan' },
    { name: 'brandSub', type: 'text', defaultValue: 'estate · kumaon' },
    { name: 'memberLabel', type: 'text', defaultValue: 'A member of' },
    { name: 'memberLogo', type: 'upload', relationTo: 'media', label: 'Member Logo (Optional Upload)' },
    { name: 'quoteEyebrow', type: 'text', defaultValue: 'The mountains have always known.' },
    { name: 'quoteMain', type: 'textarea', defaultValue: 'That life need not be hurried to be full. That silence need not be empty.' },
    { name: 'quoteSub', type: 'textarea', defaultValue: 'That happiness is sometimes nothing more than a beautiful place, good company and the pleasure of wanting nothing else.' },
    { name: 'quoteSign', type: 'text', defaultValue: 'Itmenaan. You have arrived.' },
    
    { name: 'exploreTitle', type: 'text', defaultValue: 'Explore' },
    {
      name: 'exploreLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    
    { name: 'stayTitle', type: 'text', defaultValue: 'Stay' },
    {
      name: 'stayLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },

    { name: 'reservationsTitle', type: 'text', defaultValue: 'Reservations' },
    {
      name: 'reservationsLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },

    { name: 'newsletterTitle', type: 'text', defaultValue: 'Letters from Itmenaan' },
    { name: 'newsletterDesc', type: 'textarea', defaultValue: 'Occasionally, we send stories, seasonal observations and invitations from Itmenaan.' },
    { name: 'address', type: 'textarea', defaultValue: 'Almora District, Uttarakhand, India' },
    { name: 'copyright', type: 'text', defaultValue: '© 2026 Itmenaan Estate' },
    {
      name: 'legalLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}


export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media, Experiences, Stays, LodgeSubPages, OurWorldSubPages, Journal, ],
  globals: [HomepageGlobal, TheLodgePageGlobal, KumaonKitchenPageGlobal, StaysPageGlobal, ExperiencesPageGlobal,OurWorldPage,JourneysPage,JournalPage, ContactPage, HeaderNavigationGlobal, FooterGlobal],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL || '' } }),
  sharp,
  plugins: [],
  onInit: async (payload) => {
    const existingLodge = await payload.find({
      collection: 'lodge-sub-pages',
      limit: 1,
    })

    if (existingLodge.docs.length === 0) {
      const defaultSubPages = [
        {
          title: 'Architecture & Heritage',
          slug: 'architecture',
          path: '/the-lodge/architecture',
          showInSubNav: true,
          hero: {
            eyebrow: 'Itmenaan Estate · Architecture & Heritage',
            h1: 'Stone, timber, and time.',
            mode: 'split',
            lede: [
              { text: 'Rooted in the vernacular traditions of the Kumaon Himalayas.' },
              { text: 'Every wall and timber beam tells a story of local craftsmanship.' }
            ]
          },
          blocks: [
            {
              h: 'Built by local hands, shaped by the landscape.',
              sub: 'Honouring traditional Kumaoni architecture.',
              p: [
                { text: 'Using thick stone walls, slate roofs, and deodar timber, our structures blend seamlessly into the terraced hillsides.' },
                { text: 'Old-world character meets modern comfort without disturbing the natural harmony.' }
              ]
            }
          ]
        },
        {
          title: 'Our People',
          slug: 'our-people',
          path: '/the-lodge/our-people',
          showInSubNav: true,
          hero: {
            eyebrow: 'Itmenaan Estate · Our People',
            h1: 'The heart behind the peace.',
            mode: 'split',
            lede: [
              { text: 'Hospitality that comes naturally from those who call these mountains home.' },
              { text: 'Our hosts and team are from the surrounding villages.' }
            ]
          },
          blocks: [
            {
              h: 'Faces and stories of Kumaon.',
              sub: 'Warmth and genuine care.',
              p: [
                { text: 'The people who welcome you, prepare your meals, and accompany you on walks give this estate its true soul.' },
                { text: 'Their deep connection to the land ensures every guest feels like family.' }
              ]
            }
          ]
        },
        {
          title: 'Living Lightly',
          slug: 'living-lightly',
          path: '/the-lodge/living-lightly',
          showInSubNav: true,
          hero: {
            eyebrow: 'Itmenaan Estate · Living Lightly',
            h1: 'Leaving no footprint behind.',
            mode: 'split',
            lede: [
              { text: 'Respecting the fragile Himalayan ecosystem in everything we do.' },
              { text: 'Sustainability is not an afterthought; it is our daily practice.' }
            ]
          },
          blocks: [
            {
              h: 'In harmony with the forest and valleys.',
              sub: 'Conscious stewardship of nature.',
              p: [
                { text: 'From rainwater harvesting and solar energy to sourcing local organic produce, we protect the environment that sustains us.' },
                { text: 'Living lightly allows both nature and guests to thrive.' }
              ]
            }
          ]
        }
      ]

      for (const page of defaultSubPages) {
        await payload.create({
          collection: 'lodge-sub-pages',
          data: page as any,
        })
      }
    }
  },
})
