import {
    beforeEachProviders,
    describe,
    inject,
    it
}
from '@angular/core/testing';

import { CampaignMailingLists } from './campaign-mailing-lists.component.ts';
import { MailingListsService } from '../../services/mailing-lists/mailing-lists.service'
import { CampaignMailingList } from '../../models/campaign-mailing-list.model'
import { MockMailingListsService } from '../../services/mailing-lists/mock-mailing-lists.service'

describe('Component: CampaignMailingLists', () => {
    beforeEachProviders(() => [
        {
            provide: MailingListsService,
            useClass: MockMailingListsService
        },
        CampaignMailingLists
    ]);

    it('should be defined in the beginning', inject([ CampaignMailingLists, MailingListsService ],
        (component: CampaignMailingLists) => {
            expect(component).toBeDefined();
    }));

    it('should have a defined and empty array in the beginning', inject([ CampaignMailingLists, MailingListsService ],
        (component: CampaignMailingLists) => {
            expect(component.campaignMailingLists).toBeDefined();
            expect(component.campaignMailingLists.length).toBe(0);
    }));

    it('should have 3 unselected and valid mailing lists after initialization', inject([ CampaignMailingLists, MailingListsService ],
        (component: CampaignMailingLists) => {
            component.ngOnInit();
            expect(component.campaignMailingLists.length).toBe(3);
            component.campaignMailingLists
                .forEach(campaignMailingList => validateCampaignMailingList(campaignMailingList))
    }));

    it('toggleSelection should toggle mailing list selection', inject([ CampaignMailingLists, MailingListsService ],
        (component: CampaignMailingLists) => {
            component.ngOnInit();
            component.toggleSelection(1);
            expect(component.campaignMailingLists[0].selected).toBe(true);
            component.toggleSelection(1);
            expect(component.campaignMailingLists[0].selected).toBe(false);
        }));

    it('hasSelected should return true when some mailing lists are selected', inject([ CampaignMailingLists, MailingListsService ],
        (component: CampaignMailingLists) => {
            component.ngOnInit();
            expect(component.hasSelected()).toBe(false);
            component.campaignMailingLists[0].selected = true;
            expect(component.hasSelected()).toBe(true);
        }));

    it('getSelected should return selected mailing lists', inject([ CampaignMailingLists, MailingListsService ],
        (component: CampaignMailingLists) => {
            component.ngOnInit();
            expect(component.getSelected().length).toBe(0);
            component.campaignMailingLists[0].selected = true;
            expect(component.getSelected().length).toBe(1);
            expect(component.getSelected()[0].selected).toBe(true);
            expect(component.getSelected()[0].mailingList.id)
                .toBe(component.campaignMailingLists[0].mailingList.id);
        }));

    it('selectAll should set all mailing lists selected', inject([ CampaignMailingLists, MailingListsService ],
        (component: CampaignMailingLists) => {
            component.ngOnInit();
            component.selectAll();
            component.campaignMailingLists
                .forEach(campaignMailingList => expect(campaignMailingList.selected).toBe(true));
        }));

    it('deselectAll should set all mailing lists unselected', inject([ CampaignMailingLists, MailingListsService ],
        (component: CampaignMailingLists) => {
            component.ngOnInit();
            component.campaignMailingLists[0].selected = true;
            component.campaignMailingLists[1].selected = true;
            component.deselectAll();
            component.campaignMailingLists
                .forEach(campaignMailingList => expect(campaignMailingList.selected).toBe(false));
        }));
});

function validateCampaignMailingList(campaignMailingList: CampaignMailingList) {
    expect(campaignMailingList).toBeDefined();
    expect(campaignMailingList.mailingList).toBeDefined();
    expect(campaignMailingList.mailingList.name).toBeDefined();
    expect(campaignMailingList.mailingList.id).toBeDefined();
    expect(campaignMailingList.selected).toBe(false);
}
