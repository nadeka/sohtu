import { Injectable } from '@angular/core';
import { MailingList } from '../../models/mailing-list.model';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Settings } from '../../settings';

import 'rxjs/add/operator/toPromise';
import { Contact } from "../../models/contact.model";

@Injectable()
export class ContactsService {
    private contactsURL = Settings.API_BASE_URL() + '/contacts';

    constructor(private http: Http) { }

    getContacts(): Promise<Contact[]> {
        return this.http.get(this.contactsURL)
            .toPromise()
            .then(this.extractManyContacts)
            .catch(this.handleError);
    }

    createContacts(contacts): Promise<Contact[]> {
        let createdContacts = [];

        contacts.forEach(contact => createdContacts.push(this.createContact(contact)));

        return Promise.all(createdContacts);
    }

    createContact(contact): Promise<Contact> {
        // Test a few possible CSV column names. (Find a better solution?)
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
        // Add this check this at some point?
        //
        // let existingContact = this.contacts.find(c => c.email === email);
        //
        // if (existingContact) {
        //     return existingContact;
        // }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let payload = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            telephone: telephone,
            gender: gender });

        return this.http.post(this.contactsURL, payload, options)
            .toPromise()
            .then(this.extractOneContact)
            .catch(this.handleError);
    }

    private extractOneContact(res: Response) {
        let contact = res.json();

        if (contact) {
            return new Contact(contact.id, contact.firstName, contact.lastName, contact.email,
                contact.telephone, contact.gender, contact.createdAt, contact.updatedAt);
        }

        return {};
    }

    private extractManyContacts(res: Response) {
        let contacts = res.json();

        if (contacts) {
            return contacts.map(c => new Contact(c.id, c.firstName, c.lastName, c.email,
                c.telephone, c.gender, c.createdAt, c.updatedAt));
        }

        return [];
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}
