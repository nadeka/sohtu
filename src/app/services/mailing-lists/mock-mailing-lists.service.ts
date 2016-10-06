import { Injectable } from '@angular/core';
import { MAILING_LISTS } from '../../mock-data/mock-mailing-lists';

// We make getMailingLists() synchronous (for easier unit testing) by returning
// the service itself instead of a promise and adding a then method.
@Injectable()
export class MockMailingListsService {
    mailingLists = MAILING_LISTS;

    getMailingLists() {
        return this;
    }

    then(callback) {
        callback(this.mailingLists);

        return this;
    }
}
