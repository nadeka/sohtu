import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MailingListsService } from '../../services/mailing-lists/mailing-lists.service';
import { ContactsService } from '../../services/contacts/contacts.service';
import { LanguageService } from '../../services/language.service';
import { File2JSONService } from '../../services/file2json/file2json.service';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { MailingList } from '../../models/mailing-list.model';

@Component({
    selector: 'import-mailing-lists',
    styleUrls: [ 'import-mailing-lists.style.css' ],
    templateUrl: 'import-mailing-lists.template.html',
})

export class ImportMailingLists {
    @ViewChild('lgModal') public lgModal: ModalDirective;

    // Variables for static text on the page
    importMailingListButtonLabel = this.language.getWord('IMPORT_MAILING_LIST_BUTTON_LABEL');
    mailingListNameLabel = this.language.getWord('MAILING_LIST_NAME_LABEL');
    mailingListDescriptionLabel = this.language.getWord('MAILING_LIST_DESCRIPTION_LABEL');
    importButtonLabel = this.language.getWord('IMPORT_BUTTON_LABEL');

    @Input() mailingListName: string = '';
    @Input() mailingListDescription: string = '';
    @Input() file: File = null;

    active = true;

    @Output() mailingListImported: EventEmitter<MailingList> = new EventEmitter<MailingList>();

    constructor(private language: LanguageService,
                private mailingListsService: MailingListsService,
                private contactsService: ContactsService,
                private file2JSONService: File2JSONService) {}

    loadFile(event): void {
        let fileList: FileList = event.target.files;

        if (fileList.length > 0) {
            this.file = fileList[0];
        }
    }

    onImportSuccess(results): void {
        let contacts = this.contactsService.createContacts(results);

        let mailingList = this.mailingListsService
            .createMailingList(this.mailingListName, this.mailingListDescription, contacts);

        console.log(contacts);
        console.log(mailingList);

        this.mailingListImported.emit();
        this.hide();
        this.reset();
    }

    // Validates the form and parses the CSV file. The parser calls the onImportSuccess
    // function when it's done
    importMailingList(): void {
        if (this.isValid()) {
            this.file2JSONService.CSV2JSON(this.file, this.onImportSuccess.bind(this));
        }
    }

    onNameChange(newValue) {
        this.mailingListName = newValue;
    }

    onDescriptionChange(newValue) {
        this.mailingListDescription = newValue;
    }

    isValid() {
        return this.mailingListName.length > 0 &&
                    this.file != null && this.file.type === 'text/csv';
    }

    reset() {
        this.mailingListName = '';
        this.mailingListDescription = '';
        this.file = null;

        // This is a trick for form resetting
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    show() {
        this.lgModal.show();
    }

    hide() {
        this.lgModal.hide();
    }
}
