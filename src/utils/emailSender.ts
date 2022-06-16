import { MAILER_HOST, MAILER_PASSWORD, MAILER_PORT, MAILER_USER } from '@/config';
import SMTPTransport from 'nodemailer';

export const transporterEmail = SMTPTransport.createTransport({
  host: String(MAILER_HOST),
  port: Number(MAILER_PORT),
  secure: true,
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASSWORD,
  },
});
