import { Component, OnInit } from '@angular/core';
import { CampaignMailingList } from '../../models/campaign-mailing-list.model'
import { MailingListsService } from '../../services/mailing-lists/mailing-lists.service';
import { EnglishConfig } from '../../english.language';

@Component({
    selector: 'campaign-mailing-lists',
    styleUrls: [ './campaign-mailing-lists.style.css' ],
    providers: [MailingListsService],
    templateUrl: './campaign-mailing-lists.template.html'
})

export class CampaignMailingLists implements OnInit {

    //Variables for static text on the page
    selectAllButtonLabel = EnglishConfig.SELECT_ALL_BUTTON_LABEL;
    deselectAllButtonLabel = EnglishConfig.DESELECT_ALL_BUTTON_LABEL;
    mailingListsHeader = EnglishConfig.MAILING_LISTS_HEADER;

    public campaignMailingLists: Array<CampaignMailingList> = [];

    constructor(private mailingListsService: MailingListsService) {}

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
        return this.campaignMailingLists.filter(campaignMailingList => campaignMailingList.selected);
    }

    toggleSelection(mailingListId): void {
        this.campaignMailingLists.forEach(function(campaignMailingList) {
            if (campaignMailingList.mailingList.id == mailingListId) {
                campaignMailingList.selected = !campaignMailingList.selected;
                return;
            }
        });
    }

    selectAll(): void {
        this.campaignMailingLists.forEach(campaignMailingList => campaignMailingList.selected = true);
    }

    deselectAll(): void {
        this.campaignMailingLists.forEach(campaignMailingList => campaignMailingList.selected = false);
    }
}
