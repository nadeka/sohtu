import { Injectable } from '@angular/core';
import { MAILING_LISTS } from '../../test-data/test-mailing-lists';
import { MailingList } from '../../models/mailing-list.model';
import { Contact } from '../../models/contact.model';

// We make getMailingLists() synchronous (for easier unit testing) by returning
// the service itself instead of a promise and adding a then method.
@Injectable()
export class MockMailingListsService {
    id: number = MAILING_LISTS.length + 1;
    mailingLists: MailingList[] = MAILING_LISTS;
    private mailingListNames;

    getMailingLists() {
        return this;
    }

    then(callback) {
        callback(this.mailingLists);

        return this;
    }

    createMailingList(name: string, description: string, members: Contact[]): MailingList {
        let mailingList = new MailingList(this.id, name, description, members);

        this.mailingLists.push(mailingList);

        this.id++;

        return mailingList;
    }

    setMailingListNames(names: Array<string>) {
      this.mailingListNames = names;
    }

    getMailingListNames(): Array<string> {
      return this.mailingListNames;
    }
}
