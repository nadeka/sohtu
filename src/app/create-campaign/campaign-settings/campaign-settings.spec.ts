import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CampaignCreationService } from
'../../services/campaign-creation/campaign-creation.service';
import { MockCampaignCreationService } from
'../../services/campaign-creation/mock-campaign-creation.service';
import { CampaignSettings } from './campaign-settings.component';
import { CampaignBasicInfo } from './campaign-basic-info';
import { CampaignMailingLists } from './campaign-mailing-lists';
import { LanguageService } from '../../services/language.service';
import { MailingListsService } from '../../services/mailing-lists/mailing-lists.service';
import { MockMailingListsService } from '../../services/mailing-lists/mock-mailing-lists.service';
import { ContactsService } from '../../services/contacts/contacts.service';
import { MockContactsService } from '../../services/contacts/mock-contacts.service';
import { ImportMailingLists } from '../../mailing-lists/import-mailing-lists';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { File2JSONService } from '../../services/file2json/file2json.service';
import { MockFile2JSONService } from '../../services/file2json/mock-file2json.service';
import { CampaignBreadcrumb } from '../campaign-breadcrumb';

describe('Component: CampaignSettings', () => {
  let fixture: any;
  let component: any;
  let page: Page;
  let campaignCreationService: any;

  class Page {
    breadCrumbLinks: Array<DebugElement>;
    nextButton:      DebugElement;

    addPageElements() {
        this.nextButton = fixture.debugElement.query(By.css('button'));
        this.breadCrumbLinks = fixture.debugElement.queryAll(By.css('a'));
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CampaignSettings,
        CampaignBasicInfo,
        CampaignMailingLists,
        ImportMailingLists,
        CampaignBreadcrumb
      ],
      imports: [
        FormsModule,
        ModalModule,
        TabsModule,
        AlertModule
      ],
      providers: [
        {
          provide: CampaignCreationService,
          useClass: MockCampaignCreationService
        },
        {
          provide: LanguageService,
          useClass: LanguageService
        },
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
        }
      ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents().then(function(arr) {
      fixture = TestBed.createComponent(CampaignSettings);
      component = fixture.componentInstance;
      campaignCreationService = fixture.debugElement.injector.get(CampaignCreationService);
      page = new Page();
      fixture.detectChanges();
      page.addPageElements();
    });
  }));

  it('should navigate to correct page through the service when pressing next', () => {
      page.nextButton.triggerEventHandler('click', null);
      expect(campaignCreationService.stepParameter).toBe('template');
  });

  it('should save campaign name to service when moving to another step', () => {
      const campaignName = 'October2016';
      const spy = spyOn(campaignCreationService, 'setName');
      component.name = campaignName;
      fixture.detectChanges();
      page.nextButton.triggerEventHandler('click', null);
      expect(spy).toHaveBeenCalledWith(campaignName);
  });

  it('should save campaign subject to service when moving to another step', () => {
      const campaignSubject = '10% Off Selected items!';
      const spy = spyOn(campaignCreationService, 'setSubject');
      component.subject = campaignSubject;
      fixture.detectChanges();
      page.nextButton.triggerEventHandler('click', null);
      expect(spy).toHaveBeenCalledWith(campaignSubject);
  });
});
