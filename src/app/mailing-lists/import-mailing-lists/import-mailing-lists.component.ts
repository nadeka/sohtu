import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MailingListsService } from '../../services/mailing-lists/mailing-lists.service';
import { ContactsService } from '../../services/contacts/contacts.service';
import { LanguageService } from '../../services/language.service';
import { File2JSONService } from '../../services/file2json/file2json.service';
import { MailingList } from '../../models/mailing-list.model';

@Component({
    selector: 'import-mailing-lists',
    styleUrls: [ 'import-mailing-lists.style.css' ],
    templateUrl: 'import-mailing-lists.template.html',
})

export class ImportMailingLists {
    // Variables for static text on the page
    importMailingListHeader = this.language.getWord('IMPORT_MAILING_LIST_HEADER');
    mailingListNameLabel = this.language.getWord('MAILING_LIST_NAME_LABEL');
    mailingListDescriptionLabel = this.language.getWord('MAILING_LIST_DESCRIPTION_LABEL');
    importButtonLabel = this.language.getWord('IMPORT_BUTTON_LABEL');
    noFileChosen = this.language.getWord('NO_FILE_CHOSEN');
    chooseFile = this.language.getWord('CHOOSE_FILE');
    acceptedFormats = this.language.getWord('ACCEPTED_FORMATS');
    fileParseError = this.language.getWord('FILE_PARSE_ERROR');

    @Input() mailingListName: string = '';
    @Input() mailingListDescription: string = '';
    @Input() file: File = null;

    @ViewChild('form') form;

    public alerts: Array<Object> = [];

    @Output() mailingListImported: EventEmitter<MailingList> = new EventEmitter<MailingList>();

    constructor(private language: LanguageService,
                private mailingListsService: MailingListsService,
                private contactsService: ContactsService,
                private file2JSONService: File2JSONService) {}

    closeAlert(i: number): void {
        this.alerts.splice(i, 1);
    }

    loadFile(event): void {
        let target = event.target || event.srcElement;
        let fileList = target.files;

        if (fileList.length > 0) {
            this.file = fileList[0];
        }
    }

    showErrorAlert() {
        this.alerts.push({
            type: 'danger',
            msg: 'Error occurred while parsing file',
            closable: true
        });
    }

    showSuccessAlert(mailingListName: string) {
        this.alerts.push({
            type: 'success',
            msg: 'Mailing list ' + mailingListName + ' successfully created',
            closable: true
        });
    }

    onImportDone(results): void {
        if (results.errors.length > 0) {
            this.showErrorAlert();

            // For some reason, the view freezes without this
            this.mailingListImported.emit();
        } else {
            let contacts = this.contactsService.createContacts(results.data);

            let mailingList = this.mailingListsService
                .createMailingList(this.mailingListName, this.mailingListDescription, contacts);

            this.showSuccessAlert(mailingList.name);

            this.mailingListImported.emit(mailingList);
            this.reset();
        }
    }

    // Validates the form and parses the CSV file. The parser calls the onImportSuccess
    // function when it's done.
    importMailingList(): void {
        if (this.isValid()) {
            this.file2JSONService.CSV2JSON(this.file, this.onImportDone.bind(this));
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
        this.form.nativeElement.reset();
        this.file = null;
        this.mailingListName = '';
        this.mailingListDescription = '';
    }
}
