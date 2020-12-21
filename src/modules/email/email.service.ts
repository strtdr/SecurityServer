import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { ErrorType } from '../../main/enums';

@Injectable()
export class EmailService {
  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  public async Send(data: MailDataRequired): Promise<void> {
    await SendGrid.send(data).catch(() => {
      throw new InternalServerErrorException(ErrorType.EmailSendFailed);
    });
  }
}
