import { Injectable } from '@angular/core';
import { MailingList } from '../models/mailing-list';
import { MAILING_LISTS } from '../mock-data/mock-mailing-lists';

@Injectable()
export class MailingListsService {

    getMailingLists(): Promise<MailingList[]> {
        return Promise.resolve(MAILING_LISTS);
    }
}