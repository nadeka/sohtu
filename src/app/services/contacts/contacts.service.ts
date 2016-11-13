import { Injectable } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { CONTACTS } from '../../mock-data/mock-contacts';

// This returns mock data until we get real data
@Injectable()
export class ContactsService {
    id: number = CONTACTS.length + 1;
    contacts: Contact[] = CONTACTS;

    getContacts(): Promise<Contact[]> {
        return Promise.resolve(this.contacts);
    }

    createContacts(contacts): Contact[] {
        let createdContacts = [];

        contacts
            .forEach(contact => createdContacts.push(this.createContact(contact)));

        return createdContacts;
    }

    createContact(contact): Contact {
        // Test a few possible CSV column names
        let firstNameRegex = /^first name|firstname|etunimi/g;
        let lastNameRegex = /^last name|lastname|sukunimi/g;
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

        let existingContact = this.contacts.find(c => c.email === email);

        if (existingContact) {
            return existingContact;
        }

        let createdContact = new Contact(this.id, firstName, lastName, email);
        this.contacts.push(createdContact);
        this.id++;
        return createdContact;
    }
}
