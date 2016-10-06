import { Injectable } from '@angular/core';
import { MailingList } from '../../models/mailing-list.model';
import { MAILING_LISTS } from '../../mock-data/mock-mailing-lists';

// This returns same mock data as MockMailingListsService until we get real data
@Injectable()
export class MailingListsService {

    getMailingLists(): Promise<MailingList[]> {
        return Promise.resolve(MAILING_LISTS);
    }
}
