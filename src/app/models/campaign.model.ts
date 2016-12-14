import { Template } from './template.model';
import { MailingList } from './mailing-list.model';

export class Campaign {
  name: string;
  subject: string;
  template: Template;
  content: string;
  schedule: Date;
  mailingLists: Array<MailingList>;
}
