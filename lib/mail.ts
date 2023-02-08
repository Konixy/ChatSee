import React from 'react';
import dotenv from 'dotenv';
import { render } from '@react-email/render';
import { Tailwind } from '@react-email/tailwind';
import { VerifyEmail } from 'components/Emails';
import { createTransport } from 'nodemailer';

const env = dotenv.config();
const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PWD,
  },
});

export async function sendVerifyEmail({ username, to, code }: { to: string; username: string; code: string }) {
  const component = Tailwind({
    config: require('../tailwind.config'),
    children: VerifyEmail({ email: to, name: username, code }),
  });
  const content = render(component as React.ReactElement<any, any>);
  return transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: `Verify email for ${to}`,
    text: `Please verify your email with the following code : ${code}`,
    html: content
  });
}
