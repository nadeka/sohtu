import { Injectable } from '@angular/core';
import { CONTACTS } from '../../test-data/test-contacts';
import { Contact } from '../../models/contact.model';

// We make getContacts() synchronous (for easier unit testing) by returning
// the service itself instead of a promise and adding a then method.
@Injectable()
export class MockContactsService {
    id: number = CONTACTS.length + 1;
    contacts: Contact[] = CONTACTS;

    getContacts() {
        return this;
    }

    then(callback) {
        callback(this.contacts);

        return this;
    }

    createContacts(contacts): Promise<Contact[]> {
        let createdContacts = [];

        contacts.forEach(contact => createdContacts.push(this.createContact(contact)));

        return Promise.all(createdContacts);
    }

    createContact(contact): Promise<Contact> {
        let firstNameRegex = /^first name|firstname|etunimi/g;
        let lastNameRegex = /^last name|lastname|sukunimi/g;
        let emailRegex = /^email|sähköposti$/g;
        let telephoneRegex = /^telephone|phone|tel|puhelin|puhelinnumero/g;
        let genderRegex = /^gender|sukupuoli/g;

        let firstName = '';
        let lastName = '';
        let email = '';
        let telephone = '';
        let gender = '';

        for (let key in contact) {
            let lowerCaseKey = key.toLowerCase();

            if (firstNameRegex.test(lowerCaseKey)) {
                firstName = contact[key];
            } else if (lastNameRegex.test(lowerCaseKey)) {
                lastName = contact[key];
            } else if (emailRegex.test(lowerCaseKey)) {
                email = contact[key];
            } else if (telephoneRegex.test(lowerCaseKey)) {
                telephone = contact[key];
            } else if (genderRegex.test(lowerCaseKey)) {
                gender = contact[key];
            }
        }

        let createdContact = new Contact(this.id, firstName, lastName, email, telephone,
            gender, new Date().toDateString(), new Date().toDateString());

        this.contacts.push(createdContact);
        this.id++;
        return Promise.resolve(createdContact);
    }
}
