import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'maddison53@ethereal.email',
    pass: 'jn7jnAPss4f63QBp6D',
  },
});

export const sender = async (email) => {
  const info = await transporter.sendMail({
    from: '808sk8cake@gmail.com',
    to: email.recipients,
    subject: `${email.class} - Reminder`,
    text: 'This is your reminder.',
  });

  console.log('Email sent:', info.messageId);
};