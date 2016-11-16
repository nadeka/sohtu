import { Template } from './template.model';
import { MailingList } from './mailing-list.model';
import { ModifiedTemplate } from './modified-template.model';

export class Campaign {
  name: string;
  subject: string;
  template: Template;
  modifiedTemplate: ModifiedTemplate;
  schedule: Date;
  mailingLists: Array<MailingList>;
}
