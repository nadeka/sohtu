import { Template } from './template.model';
import { MailingList } from './mailing-list.model';

export class Campaign {
  name: string;
  subject: string;
  template: Template;
  schedule: Date;
  mailingLists: Array<MailingList>;
}
