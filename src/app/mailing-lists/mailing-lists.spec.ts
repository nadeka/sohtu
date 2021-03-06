import {
    TestBed,
    async
}
from '@angular/core/testing';

import { MailingLists } from './mailing-lists.component.ts';
import { MailingListsService } from '../services/mailing-lists/mailing-lists.service';
import { MailingList } from '../models/mailing-list.model';
import { MockMailingListsService } from '../services/mailing-lists/mock-mailing-lists.service';

describe('Component: MailingLists', () => {

    let fixture: any;
    let component: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MailingLists
            ],
            imports: [],
            providers: [
                {
                    provide: MailingListsService,
                    useClass: MockMailingListsService
                }
            ]
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(MailingLists);
            component = fixture.componentInstance;

            // Detect changes to wire up the `fixture.nativeElement` as necessary:
            fixture.detectChanges();
        });
    }));

    // it('should have 3 valid mailing lists in the beginning', () => {
    //     expect(component.mailingLists.length).toBe(3);
    //     component.mailingLists
    //         .forEach(mailingList => validateMailingList(mailingList));
    // });
});

function validateMailingList(mailingList: MailingList) {
    expect(mailingList).toBeDefined();
    expect(mailingList.id).toBeDefined();
    expect(mailingList.name).toBeDefined();
}
