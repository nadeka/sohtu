import { Component } from '@angular/core';
import { CampaignMailingList } from './campaign-mailing-list'
import { MailingListsService } from '../../services/mailing-lists.service';

@Component({
    selector: 'campaign-mailing-lists',
    styleUrls: [ './campaign-mailing-lists.style.css' ],
    providers: [MailingListsService],
    templateUrl: './campaign-mailing-lists.template.html'
})

export class CampaignMailingLists {
    public campaignMailingLists: CampaignMailingList[] = [];

    constructor(private mailingListsService: MailingListsService) {}

    ngOnInit() {
        this.getCampaignMailingLists();
    }

    getCampaignMailingLists(): void {
        this.mailingListsService.getMailingLists()
            .then(lists =>
                lists.forEach(list =>
                    this.campaignMailingLists.push({ list: list, selected: false })));
    }

    toggleSelection(mailingListId): void {
        this.campaignMailingLists.forEach(function(list) {
            if (list.list.id == mailingListId) {
                list.selected = !list.selected;
                return;
            }
        });
    }

    getSelected(): void {
        this.campaignMailingLists.filter(list => list.selected);
    }

    selectAll(): void {
        this.campaignMailingLists.forEach(list => list.selected = true);
    }

    deselectAll(): void {
        this.campaignMailingLists.forEach(list => list.selected = false);
    }
}