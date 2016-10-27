import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CampaignMailingList } from '../../../models/campaign-mailing-list.model';
import { MailingListsService } from '../../../services/mailing-lists/mailing-lists.service';
import { LanguageService } from '../../../services/language.service';

@Component({
    selector: 'campaign-mailing-lists',
    styleUrls: [ 'campaign-mailing-lists.style.css' ],
    templateUrl: 'campaign-mailing-lists.template.html',
})

export class CampaignMailingLists implements OnInit {

    // Variables for static text on the page
    selectAllButtonLabel = this.language.getWord('SELECT_ALL_BUTTON_LABEL');
    deselectAllButtonLabel = this.language.getWord('DESELECT_ALL_BUTTON_LABEL');
    mailingListsHeader = this.language.getWord('MAILING_LISTS_HEADER');

    public campaignMailingLists: Array<CampaignMailingList> = [];

    constructor(private language: LanguageService,
                private mailingListsService: MailingListsService) {}

    ngOnInit() {
        this.getCampaignMailingLists();
    }

    getCampaignMailingLists(): void {
        this.mailingListsService.getMailingLists()
            .then(mailingLists =>
                mailingLists.forEach(mailingList =>
                    this.campaignMailingLists.push(new CampaignMailingList(mailingList, false))));
    }

    hasSelected(): boolean {
        return this.campaignMailingLists.some(campaignMailingList => campaignMailingList.selected);
    }

    getSelected(): Array<CampaignMailingList> {
        return this.campaignMailingLists.filter(campaignMailingList =>
                                          campaignMailingList.selected);
    }

    toggleSelection(mailingListId): void {
        this.campaignMailingLists.forEach(function(campaignMailingList) {
            if (campaignMailingList.mailingList.id === mailingListId) {
                campaignMailingList.selected = !campaignMailingList.selected;
                return;
            }
        });
    }

    selectAll(): void {
        this.campaignMailingLists.forEach(campaignMailingList =>
                                          campaignMailingList.selected = true);
    }

    deselectAll(): void {
        this.campaignMailingLists.forEach(campaignMailingList =>
                                          campaignMailingList.selected = false);
    }
}
