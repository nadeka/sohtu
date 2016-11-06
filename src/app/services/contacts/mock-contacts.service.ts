import { Injectable } from '@angular/core';
import { CONTACTS } from '../../mock-data/mock-contacts';

// We make getContacts() synchronous (for easier unit testing) by returning
// the service itself instead of a promise and adding a then method.
@Injectable()
export class MockContactsService {
    contacts = CONTACTS;

    getContacts() {
        return this;
    }

    then(callback) {
        callback(this.contacts);

        return this;
    }
}
