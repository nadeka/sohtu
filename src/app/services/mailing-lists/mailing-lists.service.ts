import { Injectable } from '@angular/core';
import { MailingList } from '../../models/mailing-list.model';
import { MAILING_LISTS } from '../../mock-data/mock-mailing-lists';
import { Contact } from '../../models/contact.model';

// This returns same mock data as MockMailingListsService until we get real data
@Injectable()
export class MailingListsService {
    id: number = 0;

    getMailingLists(): Promise<MailingList[]> {
        return Promise.resolve(MAILING_LISTS);
    }

    createMailingList(name: string, description: string, members: Contact[]): MailingList {
        let mailingList = new MailingList(this.id, name, description, members);

        this.id++;

        return mailingList;
    }
}
