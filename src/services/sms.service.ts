import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from '@/config';
import { Twilio } from 'twilio';

class SmsService {
  /**
   *
   * @param telephone
   * @param message
   * @returns
   */
  async sendSms(telephone: string, message: string) {
    let ret = false;
    const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    await client.messages
      .create({
        from: TWILIO_PHONE_NUMBER,
        to: telephone,
        body: message,
      })
      .then(message => {
        ret = true;
      });
    return ret;
  }
}

export default SmsService;
