import { CollectionConfig } from 'payload';
import { transporter } from '../lib/mailer';

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          try {
            await transporter.sendMail({
              from: `"Itmenaan Estate" <${process.env.SMTP_USER}>`,
              to: process.env.NOTIFICATION_EMAIL || 'info@itmenaanlodges.com',
              subject: `New ${doc.type === 'book' ? 'Booking Request' : 'Enquiry'} from ${doc.name}`,
              html: `
                <h2>New Form Submission</h2>
                <p><strong>Type:</strong> ${doc.type}</p>
                <p><strong>Name:</strong> ${doc.name}</p>
                <p><strong>Email:</strong> ${doc.email}</p>
                <p><strong>Phone:</strong> ${doc.phone || 'N/A'}</p>
                <p><strong>Arrival:</strong> ${doc.arrival || 'N/A'}</p>
                <p><strong>Departure:</strong> ${doc.departure || 'N/A'}</p>
                <p><strong>Guests:</strong> ${doc.guests || 'N/A'}</p>
                <p><strong>Interest:</strong> ${doc.interest || 'N/A'}</p>
                <p><strong>Message:</strong> ${doc.message || 'N/A'}</p>
              `,
            });
            console.log('Email sent successfully');
          } catch (error) {
            console.error('Error sending email:', error);
          }
        }
      },
    ],
  },
  fields: [
    { name: 'type', type: 'text' },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'arrival', type: 'text' },
    { name: 'departure', type: 'text' },
    { name: 'guests', type: 'text' },
    { name: 'interest', type: 'text' },
    { name: 'message', type: 'textarea' },
  ],
};