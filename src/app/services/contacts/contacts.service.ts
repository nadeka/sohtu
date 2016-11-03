import { Injectable } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { CONTACTS } from '../../mock-data/mock-contacts';

// This returns same mock data as MockContactsService until we get real data
@Injectable()
export class ContactsService {
    id: number = 0;

    getContacts(): Promise<Contact[]> {
        return Promise.resolve(CONTACTS);
    }

    createContacts(contacts): Contact[] {
        let createdContacts = [];

        contacts
            .forEach(contact => createdContacts.push(this.createContact(contact)));

        return createdContacts;
    }

    createContact(contact): Contact {
        let firstNameRegex = /^first name|firstName|etunimi/g;
        let lastNameRegex = /^last name|lastName|sukunimi/g;
        let emailRegex = /^email|sähköposti$/g;

        let firstName = '';
        let lastName = '';
        let email = '';

        for (let key in contact) {
            let lowerCaseKey = key.toLowerCase();

            if (firstNameRegex.test(lowerCaseKey)) {
                firstName = contact[key];
            } else if (lastNameRegex.test(lowerCaseKey)) {
                lastName = contact[key];
            } else if (emailRegex.test(lowerCaseKey)) {
                email = contact[key];
            }
        }

        let createdContact = new Contact(this.id, firstName, lastName, email);
        this.id++;
        return createdContact;
    }
}
