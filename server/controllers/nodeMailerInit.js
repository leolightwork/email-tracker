import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sender = async (customer) => {
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: customer.emailAddress,
    subject: `${customer.course} — Reminder`,
    text: `Hi,\n\nThis is your scheduled reminder for: ${customer.course}.\n\nScheduled for: ${customer.date}\n\n— MailPilot`,
  });

  console.log(`Email sent to ${customer.emailAddress} [${info.messageId}]`);
};
