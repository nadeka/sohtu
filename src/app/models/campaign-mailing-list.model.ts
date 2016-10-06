import { MailingList } from './mailing-list.model';

export class CampaignMailingList {
    mailingList: MailingList;
    selected: boolean;

    constructor(mailingList: MailingList, selected: boolean) {
        this.mailingList = mailingList;
        this.selected = selected;
    }
}
