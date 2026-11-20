
import { CollectionConfig } from 'payload';
import { transporter } from '../lib/mailer';

export const NewsletterSubscriptions: CollectionConfig = {
  slug: 'newsletter-subscriptions',
  admin: {
    useAsTitle: 'email',
    group: 'Collections',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          await transporter.sendMail({
            from: `"Itmenaan Estate" <${process.env.SMTP_USER}>`,
            to: process.env.NOTIFICATION_EMAIL || 'info@itmenaanlodges.com',
            subject: 'New Newsletter Subscription',
            html: `
              <h2>New Newsletter Subscriber</h2>
              <p><strong>Email:</strong> ${doc.email}</p>
              <p><strong>Date:</strong> ${doc.createdAt || new Date().toISOString()}</p>
            `,
          });
        }

        return doc;
      },
    ],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};
