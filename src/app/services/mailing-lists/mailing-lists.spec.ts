import { MailingListsService } from './mailing-lists.service';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {
    BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseOptions, Response
}
    from '@angular/http';
import { CONTACTS } from '../../test-data/test-contacts';
import { RESPONSE_MAILING_LISTS } from '../../test-data/test-mailing-lists';

describe('Service: MailingListsService', () => {
    let mailingListsService: MailingListsService;
    let mockBackend: MockBackend;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                MailingListsService,
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
            mailingListsService = getTestBed().get(MailingListsService);
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

    it('should return 3 mailing lists', async(() => {
        setupConnections(mockBackend, {
            body: RESPONSE_MAILING_LISTS,
            status: 200
        });

        mailingListsService.getMailingLists()
            .then(lists => expect(lists.length).toBe(3));
    }));

    it('should create mailing list and return it', async(() => {
        mailingListsService.createMailingList('test list', 'test description', CONTACTS)
            .then(function(mailingList) {
                expect(mailingList.name).toBe('test list');
                expect(mailingList.description).toBe('test description');
                expect(mailingList.members.length).toBe(4);

                mailingListsService.getMailingLists()
                    .then(lists => expect(lists.length).toBe(4));
            });
    }));
});
