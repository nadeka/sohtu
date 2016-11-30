import { ContactsService } from './contacts.service';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
    BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseOptions, Response
}
    from '@angular/http';

import { IMPORTED_CONTACTS, RESPONSE_CONTACTS } from '../../test-data/test-contacts';

describe('Service: ContactsService', () => {
    let contactsService: ContactsService;
    let mockBackend: MockBackend;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                ContactsService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory:
                        (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backend, defaultOptions);
                        }
                }
            ],
            imports: [
                HttpModule
            ]
        }).compileComponents().then(function(arr) {
            contactsService = getTestBed().get(ContactsService);
            mockBackend = getTestBed().get(MockBackend);
        });
    }));

    function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {
            const responseOptions = new ResponseOptions(options);
            const response = new Response(responseOptions);

            connection.mockRespond(response);
        });
    }

    it('should return 4 contacts', async(() => {
        setupConnections(mockBackend, {
            body: RESPONSE_CONTACTS,
            status: 200
        });

        contactsService.getContacts()
            .then(contacts => expect(contacts.length).toBe(2));
    }));

    it('should create contact and return it', async(() => {
        contactsService.createContact(IMPORTED_CONTACTS[0])
            .then(function(contact) {
                expect(contact.firstName).toBe('Johanna');

                contactsService.getContacts()
                    .then(contacts => expect(contacts.length).toBe(3));
            });
    }));

    it('should create many contacts and return them', async(() => {
        contactsService.createContacts(IMPORTED_CONTACTS)
            .then(function(contacts) {
                expect(contacts.length).toBe(2);

                contactsService.getContacts()
                    .then(contacts => expect(contacts.length).toBe(6));
            });
    }));
});
