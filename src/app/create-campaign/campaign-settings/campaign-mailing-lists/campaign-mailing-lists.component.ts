import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportMailingLists }
    from '../../../mailing-lists/import-mailing-lists/import-mailing-lists.component';
import { MailingListsService } from '../../../services/mailing-lists/mailing-lists.service';
import { LanguageService } from '../../../services/language.service';
import { MailingList } from '../../../models/mailing-list.model';

@Component({
    selector: 'campaign-mailing-lists',
    styleUrls: [ 'campaign-mailing-lists.style.css' ],
    templateUrl: 'campaign-mailing-lists.template.html'
})

export class CampaignMailingLists implements OnInit {

    // Variables for static text on the page
    selectAllButtonLabel = this.language.getWord('SELECT_ALL_BUTTON_LABEL');
    deselectAllButtonLabel = this.language.getWord('DESELECT_ALL_BUTTON_LABEL');
    mailingListsHeader = this.language.getWord('MAILING_LISTS_HEADER');
    importButtonLabel = this.language.getWord('IMPORT_BUTTON_LABEL');

    public mailingLists: Array<MailingList> = [];
    private selected: Set<number>;

    @ViewChild(ImportMailingLists)
    private importMailingLists: ImportMailingLists;

    constructor(private language: LanguageService,
                private mailingListsService: MailingListsService) {
                  this.selected = new Set();
                }

    showImporter() {
        this.importMailingLists.show();
    }

    hideImporter() {
        this.importMailingLists.hide();
    }

    ngOnInit() {
        this.getMailingLists();
    }

    getMailingLists(): void {
        this.mailingLists = [];

        this.mailingListsService.getMailingLists()
            .then(mailingLists =>
                this.mailingLists = mailingLists);
    }

    hasSelected(): boolean {
        return this.selected.size !== 0;
    }

    getSelected(): Array<MailingList> {
        return this.mailingLists
                .filter(mailingList => this.selected.has(mailingList.id));
    }

    toggleSelection(mailingList): void {
        if (this.selected.has(mailingList.id)) {
            this.deselect(mailingList);
        } else {
            this.select(mailingList);
        }
    }

    selectAll(): void {
        this.mailingLists.forEach(mailingList =>
                                          this.selected.add(mailingList.id));
    }

    deselectAll(): void {
        this.selected.clear();
    }

    selectMany(mailingLists: Array<MailingList>): void {
        mailingLists.forEach(mailingList => this.selected.add(mailingList.id));
    }

    select(mailingList: MailingList): void {
        this.selected.add(mailingList.id);
    }

    deselect(mailingList: MailingList): void {
        this.selected.delete(mailingList.id);
    }

    isSelected(id: number): boolean {
        return this.selected.has(id);
    }
}
