import { Injectable } from '@angular/core';
import { MailingList } from '../../models/mailing-list.model';
import { MAILING_LISTS } from '../../mock-data/mock-mailing-lists';
import { Contact } from '../../models/contact.model';

// This returns mock data until we get real data
@Injectable()
export class MailingListsService {
    id: number = MAILING_LISTS.length + 1;
    mailingLists: MailingList[] = MAILING_LISTS;

    getMailingLists(): Promise<MailingList[]> {
        return Promise.resolve(this.mailingLists);
    }

    createMailingList(name: string, description: string, members: Contact[]): MailingList {
        let mailingList = new MailingList(this.id, name, description, members);

        this.mailingLists.push(mailingList);

        this.id++;

        return mailingList;
    }
}
