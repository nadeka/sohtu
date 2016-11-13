import { ContactsService } from './contacts.service';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend, HttpModule }
    from '@angular/http';
import { IMPORTED_CONTACTS } from '../../test-data/test-contacts';

describe('Service: ContactsService', () => {
    let contactsService: ContactsService;
    let mockBackend: MockBackend;

    beforeEach(async(() => {
        // We will soon need MockBackend etc
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

    it('should return 4 contacts', async(() => {
        contactsService.getContacts()
            .then(contacts => expect(contacts.length).toBe(4));
    }));

    it('should create contact', async(() => {
        contactsService.createContact(IMPORTED_CONTACTS[0]);

        contactsService.getContacts()
            .then(contacts => expect(contacts.length).toBe(5));
    }));

    it('should create many contacts', async(() => {
        contactsService.createContacts(IMPORTED_CONTACTS);

        contactsService.getContacts()
            .then(contacts => expect(contacts.length).toBe(6));
    }));
});
