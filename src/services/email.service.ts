import { HttpException } from '@/exceptions/HttpException';
import { transporterEmail } from '@/utils/emailSender';
import fs from 'fs';
import path from 'path';
import * as handlebars from 'handlebars';

class EmailService {
  /**
   * envoyer email confirmation reset mot de passe
   * @param ModelEmail{url, email, typeEmail, subject}
   * @returns
   */
  public async sendEmail(data: ModelEmail) {
    try {
      const filePath = await this.getFilePathlEmail(data.typeEmail);
      const sourceFile = fs.readFileSync(filePath, 'utf-8').toString();
      const template = handlebars.compile(sourceFile);
      const new_password: string = data.url;
      const replacements: any =
        data.sendUrl === true
          ? {
              url: data.url,
            }
          : {
              new_password,
            };
      const htmlToSend = template(replacements);

      transporterEmail.sendMail({
        from: '"cartool api" <test@sayna.io>',
        to: data.email,
        subject: data.subject,
        html: htmlToSend,
      });
    } catch (error) {
      throw new HttpException(500, 'email non envoye');
    }
  }

  /**
   * get template email
   */
  public async getFilePathlEmail(type: number) {
    let html = null;
    switch (type) {
      case 1:
        html = path.join(__dirname, '../html/confirmationEmail.html');
        break;
      case 2:
        html = path.join(__dirname, '../html/resetPasswordEmail.html');
        break;
      case 3:
        html = path.join(__dirname, '../html/employeCreationEmail.html');
        break;
      case 4:
        html = path.join(__dirname, '../html/employeNouveauMotDePasse.html');
        break;
      case 5:
        html = path.join(__dirname, '../html/notifyEmployeeTaskEmail.html');
        break;
    }
    return html;
  }

  public async sendNotificationTechnicien(debut, fin, email) {
    const filePath: any = path.join(__dirname, '../html/notifyEmployeeTaskEmail.html');
    const source: any = fs.readFileSync(filePath, 'utf-8').toString();
    const template: any = handlebars.compile(source);
    const replacements: any = {
      debut: debut,
      fin: fin,
    };
    const htmlToSend: any = template(replacements);
    transporterEmail.sendMail({
      from: '"cartool api" <test@sayna.io>',
      to: email,
      subject: 'New task assigned to you',
      html: htmlToSend,
    });
  }
}

export default EmailService;

export class ModelEmail {
  public url: string;
  public email: string;
  public typeEmail: number;
  public subject: string;
  public sendUrl: boolean;
}
