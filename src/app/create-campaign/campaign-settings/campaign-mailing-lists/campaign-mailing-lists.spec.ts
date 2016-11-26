import {
    TestBed,
    async
}
from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CampaignMailingLists } from './campaign-mailing-lists.component.ts';
import { MailingListsService } from '../../../services/mailing-lists/mailing-lists.service';
import { MailingList } from '../../../models/mailing-list.model';
import { MockMailingListsService }
    from '../../../services/mailing-lists/mock-mailing-lists.service';
import { LanguageService } from '../../../services/language.service';

describe('Component: CampaignMailingLists', () => {
    let fixture: any;
    let component: any;
    let page: Page;

    class Page {
      buttons:            Array<DebugElement>;
      selectAllButton:    DebugElement;
      deselectAllButton:  DebugElement;
      selectFirstList:    DebugElement;

      addPageElements() {
        this.buttons = fixture.debugElement.queryAll(By.css('div'));
        this.selectAllButton = this.buttons[2];
        this.deselectAllButton = this.buttons[3];
        this.selectFirstList = this.buttons[7];
      }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CampaignMailingLists
            ],
            imports: [
                TabsModule,
                ModalModule,
                AlertModule
            ],
            providers: [
                {
                    provide: MailingListsService,
                    useClass: MockMailingListsService
                },
                LanguageService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(CampaignMailingLists);
            component = fixture.componentInstance;
            page = new Page();
            // Detect changes to wire up the `fixture.nativeElement` as necessary:
            fixture.detectChanges();
            page.addPageElements();
        });
    }));

    it('should have 3 unselected and valid mailing lists in the beginning', () => {
        expect(component.mailingLists.length).toBe(3);
        component.mailingLists
            .forEach(campaignMailingList => validateMailingList(campaignMailingList));
    });

    it('toggleSelection should toggle mailing list selection', () => {
        component.toggleSelection(component.mailingLists[0]);
        expect(component.isSelected(component.mailingLists[0].id)).toBe(true);
        component.toggleSelection(component.mailingLists[0]);
        expect(component.isSelected(component.mailingLists[0].id)).toBe(false);
    });

    it('hasSelected should return true when some mailing lists are selected', () => {
        expect(component.hasSelected()).toBe(false);
        component.select(component.mailingLists[0]);
        expect(component.hasSelected()).toBe(true);
    });

    it('getSelected should return selected mailing lists', () => {
        expect(component.getSelected().length).toBe(0);
        component.select(component.mailingLists[0]);
        expect(component.getSelected().length).toBe(1);
        expect(component.getSelected()[0].id)
            .toBe(component.mailingLists[0].id);
    });

    it('selectAll should set all mailing lists selected', () => {
        component.selectAll();
        component.mailingLists
            .forEach(mailingList => expect(component.isSelected(mailingList.id)).toBe(true));
    });

    it('deselectAll should set all mailing lists unselected', () => {
        component.select(component.mailingLists[0]);
        component.select(component.mailingLists[1]);
        component.deselectAll();
        component.mailingLists
            .forEach(mailingList => expect(component.isSelected(mailingList.id)).toBe(false));
    });
    // UI tests
    // it('pressing select all button should select all', () => {
    //     // click button and evaluate
    //     page.selectAllButton.triggerEventHandler('click', null);
    //     component.mailingLists
    //         .forEach(mailingList => expect(component.isSelected(mailingList.id)).toBe(true));
    // });
    //
    // it('pressing deselect all should deselect all', () => {
    //     // click button and evaluate
    //     page.selectAllButton.triggerEventHandler('click', null);
    //     component.mailingLists
    //         .forEach(mailingList => expect(component.isSelected(mailingList.id)).toBe(true));
    //
    //     // click deselect all and evaluate
    //     page.deselectAllButton.triggerEventHandler('click', null);
    //     component.mailingLists
    //         .forEach(mailingList => expect(component.isSelected(mailingList.id)).toBe(false));
    // });
    //
    // it('pressing first list should select it', () => {
    //     // select first list
    //     page.selectFirstList.triggerEventHandler('click', null);
    //     expect(component.getSelected().length).toBe(1);
    // });
    //
    // it('first selecting single list and then deselecting it should work', () => {
    //     // select first list
    //     page.selectFirstList.triggerEventHandler('click', null);
    //     expect(component.getSelected().length).toBe(1);
    //
    //     // click deselect all and evaluate
    //     page.deselectAllButton.triggerEventHandler('click', null);
    //     component.mailingLists
    //         .forEach(mailingList => expect(component.isSelected(mailingList.id)).toBe(false));
    // });
});

// Helpful functions
function validateMailingList(mailingList: MailingList) {
    expect(mailingList).toBeDefined();
    expect(mailingList.name).toBeDefined();
    expect(mailingList.id).toBeDefined();
}
