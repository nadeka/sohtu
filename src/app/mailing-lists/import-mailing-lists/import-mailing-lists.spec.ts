import {
    TestBed,
    async
}
    from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImportMailingLists } from './import-mailing-lists.component.ts';
import { MailingList } from '../../models/mailing-list.model';
import { MockMailingListsService }
    from '../../services/mailing-lists/mock-mailing-lists.service';
import { MockContactsService }
    from '../../services/contacts/mock-contacts.service';
import { LanguageService } from '../../services/language.service';
import { File2JSONService } from '../../services/file2json/file2json.service';
import { MockFile2JSONService } from '../../services/file2json/mock-file2json.service';
import { MailingListsService } from '../../services/mailing-lists/mailing-lists.service';
import { ContactsService } from '../../services/contacts/contacts.service';

describe('Component: ImportMailingLists', () => {
    let fixture: any;
    let component: any;
    let mailingListsService: any;
    let contactsService: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ImportMailingLists
            ],
            imports: [
                TabsModule,
                ModalModule,
                AlertModule,
                FormsModule
            ],
            providers: [
                {
                    provide: MailingListsService,
                    useClass: MockMailingListsService
                },
                {
                    provide: ContactsService,
                    useClass: MockContactsService
                },
                {
                    provide: File2JSONService,
                    useClass: MockFile2JSONService
                },
                LanguageService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(ImportMailingLists);
            component = fixture.componentInstance;

            contactsService = fixture.debugElement.injector.get(ContactsService);
            mailingListsService = fixture.debugElement.injector.get(MailingListsService);

            // Detect changes to wire up the `fixture.nativeElement` as necessary:
            fixture.detectChanges();
        });
    }));

    it('should show alerts', () => {
        expect(component.alerts.length).toBe(0);
        component.showSuccessAlert();
        expect(component.alerts.length).toBe(1);
        expect(component.alerts[0].type).toBe('success');
        component.showErrorAlert();
        expect(component.alerts.length).toBe(2);
        expect(component.alerts[1].type).toBe('danger');
    });

    it('should close alerts', () => {
        component.showSuccessAlert();
        component.closeAlert(0);
        expect(component.alerts.length).toBe(0);
        component.showErrorAlert();
        component.showErrorAlert();
        component.closeAlert(1);
        expect(component.alerts.length).toBe(1);
    });

    it('should create contacts before creating mailing list', async(() => {
        contactsService.getContacts().then(contacts => function() {
            expect(contacts.length).toBe(4);
        });

        mailingListsService.getMailingLists().then(lists => function() {
            expect(lists.length).toBe(3);
        });

        component.mailingListName = 'some people';

        let results = {
            errors: [],
            data: [
                {
                    'Email': 'kimmo.vähä-saari@gmail.com',
                    'First name': 'Kimmo',
                    'Last name': 'Vähä-Saari'
                },
                {
                    'Email': 'liisa.hänninen@gmail.com',
                    'First name': 'Liisa',
                    'Last name': 'Hänninen'
                }
            ]
        };

        component.onImportDone(results);

        contactsService.getContacts().then(contacts => function() {
            expect(contacts.length).toBe(6);
            expect(contacts[4].email).toBe('kimmo.vähä-saari@gmail.com');
            expect(contacts[5].email).toBe('liisa.hänninen@gmail.com');
        });

        mailingListsService.getMailingLists().then(lists => function() {
            expect(lists.length).toBe(4);
            expect(lists[3].name).toBe('some people');
        });
    }));


    it('should not create contacts and mailing list if errors exist', async(() => {
        contactsService.getContacts().then(contacts => function() {
            expect(contacts.length).toBe(4);
        });

        mailingListsService.getMailingLists().then(lists => function() {
            expect(lists.length).toBe(3);
        });

        component.mailingListName = 'some people';

        let results = {
            errors: ['Error!'],
            data: [
                {
                    'Email': 'kimmo.vähä-saari@gmail.com',
                    'First name': 'Kimmo',
                    'Last name': 'Vähä-Saari'
                },
                {
                    'Email': 'liisa.hänninen@gmail.com',
                    'First name': 'Liisa',
                    'Last name': 'Hänninen'
                }
            ]
        };

        component.onImportDone(results);

        contactsService.getContacts().then(contacts => function() {
            expect(contacts.length).toBe(4);
        });

        mailingListsService.getMailingLists().then(lists => function() {
            expect(lists.length).toBe(3);
        });
    }));

    it('should change mailing list name', () => {
        expect(component.mailingListName).toBe('');
        component.onNameChange('name');
        expect(component.mailingListName).toBe('name');
    });

    it('should change mailing list description', () => {
        expect(component.mailingListDescription).toBe('');
        component.onDescriptionChange('description');
        expect(component.mailingListDescription).toBe('description');
    });

    it('reset should set file to null and name and description to empty', () => {
        component.onNameChange('name');
        component.onDescriptionChange('description');

        component.reset();

        expect(component.mailingListName).toBe('');
        expect(component.mailingListDescription).toBe('');
        expect(component.file).toBe(null);
    });
});
