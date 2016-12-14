import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ImportMailingLists }
    from '../../../mailing-lists/import-mailing-lists/import-mailing-lists.component';
import { MailingListsService } from '../../../services/mailing-lists/mailing-lists.service';
import { LanguageService } from '../../../services/language.service';
import { CampaignCreationService } from '../../../services/campaign-creation/campaign-creation.service';
import { MailingList } from '../../../models/mailing-list.model';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'campaign-mailing-lists',
    styleUrls: [ 'campaign-mailing-lists.style.css' ],
    templateUrl: 'campaign-mailing-lists.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CampaignMailingLists implements OnInit {
    @ViewChild('lgModal') public lgModal: ModalDirective;

    // Variables for static text on the page
    selectAllButtonLabel = this.language.getWord('SELECT_ALL_BUTTON_LABEL');
    deselectAllButtonLabel = this.language.getWord('DESELECT_ALL_BUTTON_LABEL');
    mailingListsHeader = this.language.getWord('MAILING_LISTS_HEADER');
    importButtonLabel = this.language.getWord('IMPORT_BUTTON_LABEL');
    chooseButtonLabel = this.language.getWord('CHOOSE_BUTTON_LABEL');
    okButtonLabel = this.language.getWord('OK_BUTTON_LABEL');
    nameLabel = this.language.getWord('MAILING_LIST_NAME_LABEL');
    memberCountLabel = this.language.getWord('MEMBER_COUNT_LABEL');
    errorMailingList = this.language.getWord('ERROR_MAILING_LIST_MISSING');

    public mailingLists: Array<MailingList> = [];
    private selected: Set<number>;

    @ViewChild(ImportMailingLists)
    private importMailingLists: ImportMailingLists;

    constructor(private language: LanguageService,
                private mailingListsService: MailingListsService,
                private campaignCreationService: CampaignCreationService) {
                  this.selected = new Set();
                }

    ngOnInit() {
        this.getMailingLists();
    }

    mailingListImported(mailingList: MailingList) {
        if (mailingList) {
            this.select(mailingList);
        }

        this.getMailingLists();
    }

    getMailingLists(): void {
        this.mailingLists = [];
        let mailingListNames = [];

        this.mailingListsService.getMailingLists()
            .then(mailingLists => {
                this.mailingLists = mailingLists;
                let re = /\s+/g;
                this.mailingLists.forEach(list => {
                  mailingListNames.push(list.name.toLowerCase().replace(re, ' '));
                });
                this.mailingListsService.setMailingListNames(mailingListNames);
              });
    }

    hasSelected(): boolean {
        if(this.selected.size === 0) {
          if(!this.campaignCreationService.getMailingLists()) {
            return true;
          }
          else if (this.campaignCreationService.getMailingLists().length > 0) {
            return true;
          }
        }
        return this.selected.size > 0;
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

    selectAll() {
        this.mailingLists.forEach(mailingList =>
            this.selected.add(mailingList.id));
    }

    deselectAll() {
        this.selected.clear();
    }

    selectAllToggle(event): void {
        if (event.target.checked) {
            this.selectAll();
        } else {
            this.deselectAll();
        }
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

    show() {
        this.lgModal.show();
    }

    hide() {
        this.lgModal.hide();
    }
}
