import {
    TestBed,
    async
}
from '@angular/core/testing';

import { CampaignMailingLists } from './campaign-mailing-lists.component.ts';
import { MailingListsService } from '../../services/mailing-lists/mailing-lists.service';
import { CampaignMailingList } from '../../models/campaign-mailing-list.model';
import { MockMailingListsService } from '../../services/mailing-lists/mock-mailing-lists.service';

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
                }
            ]
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(CampaignMailingLists);
            component = fixture.componentInstance;

            // Detect changes to wire up the `fixture.nativeElement` as necessary:
            fixture.detectChanges();
        });
    }));

    it('should have 3 unselected and valid mailing lists in the beginning', () => {
        expect(component.campaignMailingLists.length).toBe(3);
        component.campaignMailingLists
            .forEach(campaignMailingList => validateCampaignMailingList(campaignMailingList));
    });

    it('toggleSelection should toggle mailing list selection', () => {
        component.toggleSelection(1);
        expect(component.campaignMailingLists[0].selected).toBe(true);
        component.toggleSelection(1);
        expect(component.campaignMailingLists[0].selected).toBe(false);
    });

    it('hasSelected should return true when some mailing lists are selected', () => {
        expect(component.hasSelected()).toBe(false);
        component.campaignMailingLists[0].selected = true;
        expect(component.hasSelected()).toBe(true);
    });

    it('getSelected should return selected mailing lists', () => {
        expect(component.getSelected().length).toBe(0);
        component.campaignMailingLists[0].selected = true;
        expect(component.getSelected().length).toBe(1);
        expect(component.getSelected()[0].selected).toBe(true);
        expect(component.getSelected()[0].mailingList.id)
            .toBe(component.campaignMailingLists[0].mailingList.id);
    });

    it('selectAll should set all mailing lists selected', () => {
        component.selectAll();
        component.campaignMailingLists
            .forEach(campaignMailingList => expect(campaignMailingList.selected).toBe(true));
    });

    it('deselectAll should set all mailing lists unselected', () => {
        component.campaignMailingLists[0].selected = true;
        component.campaignMailingLists[1].selected = true;
        component.deselectAll();
        component.campaignMailingLists
            .forEach(campaignMailingList => expect(campaignMailingList.selected).toBe(false));
    });
});

function validateCampaignMailingList(campaignMailingList: CampaignMailingList) {
    expect(campaignMailingList).toBeDefined();
    expect(campaignMailingList.mailingList).toBeDefined();
    expect(campaignMailingList.mailingList.name).toBeDefined();
    expect(campaignMailingList.mailingList.id).toBeDefined();
    expect(campaignMailingList.selected).toBe(false);
}
