import {
    TestBed,
    async
}
from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CampaignMailingLists } from './campaign-mailing-lists.component.ts';
import { MailingListsService } from '../../../services/mailing-lists/mailing-lists.service';
import { MailingList } from '../../../models/mailing-list.model';
import { MockMailingListsService }
    from '../../../services/mailing-lists/mock-mailing-lists.service';
import { LanguageService } from '../../../services/language.service';

describe('Component: CampaignMailingLists', () => {
    let fixture: any;
    let component: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CampaignMailingLists
            ],
            imports: [],
            providers: [
                {
                    provide: MailingListsService,
                    useClass: MockMailingListsService
                },
                LanguageService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(CampaignMailingLists);
            component = fixture.componentInstance;

            // Detect changes to wire up the `fixture.nativeElement` as necessary:
            fixture.detectChanges();
        });
    }));

    it('should have 3 unselected and valid mailing lists in the beginning', () => {
        expect(component.mailingLists.length).toBe(3);
        component.mailingLists
            .forEach(campaignMailingList => validateMailingList(campaignMailingList));
    });

    it('toggleSelection should toggle mailing list selection', () => {
        component.toggleSelection(component.mailingLists[0]);
        expect(component.isSelected(component.mailingLists[0].id)).toBe(true);
        component.toggleSelection(component.mailingLists[0]);
        expect(component.isSelected(component.mailingLists[0].id)).toBe(false);
    });

    it('hasSelected should return true when some mailing lists are selected', () => {
        expect(component.hasSelected()).toBe(false);
        component.select(component.mailingLists[0]);
        expect(component.hasSelected()).toBe(true);
    });

    it('getSelected should return selected mailing lists', () => {
        expect(component.getSelected().length).toBe(0);
        component.select(component.mailingLists[0]);
        expect(component.getSelected().length).toBe(1);
        expect(component.getSelected()[0].id)
            .toBe(component.mailingLists[0].id);
    });

    it('selectAll should set all mailing lists selected', () => {
        component.selectAll();
        component.mailingLists
            .forEach(mailingList => expect(component.isSelected(mailingList.id)).toBe(true));
    });

    it('deselectAll should set all mailing lists unselected', () => {
        component.select(component.mailingLists[0]);
        component.select(component.mailingLists[1]);
        component.deselectAll();
        component.mailingLists
            .forEach(mailingList => expect(component.isSelected(mailingList.id)).toBe(false));
    });
});

function validateMailingList(mailingList: MailingList) {
    expect(mailingList).toBeDefined();
    expect(mailingList.name).toBeDefined();
    expect(mailingList.id).toBeDefined();
}
