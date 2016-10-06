import {
    beforeEachProviders,
    describe,
    inject,
    it
}
    from '@angular/core/testing';

import { MailingLists } from './mailing-lists.component.ts';
import { MailingListsService } from '../services/mailing-lists/mailing-lists.service'
import { MailingList } from '../models/mailing-list.model'
import { MockMailingListsService } from '../services/mailing-lists/mock-mailing-lists.service'

describe('Component: MailingLists', () => {
    beforeEachProviders(() => [
        {
            provide: MailingListsService,
            useClass: MockMailingListsService
        },
        MailingLists
    ]);

    it('should be defined in the beginning', inject([ MailingLists, MailingListsService ],
        (component: MailingLists) => {
            expect(component).toBeDefined();
        }));

    it('should have a defined and empty array in the beginning', inject([ MailingLists, MailingListsService ],
        (component: MailingLists) => {
            expect(component.mailingLists).toBeDefined();
            expect(component.mailingLists.length).toBe(0);
        }));

    it('should have 3 valid mailing lists after initialization', inject([ MailingLists, MailingListsService ],
        (component: MailingLists) => {
            component.ngOnInit();
            expect(component.mailingLists.length).toBe(3);
            component.mailingLists
                .forEach(mailingList => validateMailingList(mailingList))
        }));
});

function validateMailingList(mailingList: MailingList) {
    expect(mailingList).toBeDefined();
    expect(mailingList.id).toBeDefined();
    expect(mailingList.name).toBeDefined();
}
