import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CampaignConfirmation } from './campaign-confirmation.component';
import { AlertsService } from '../../services/alerts/alerts.service';
import { CampaignCreationService } from
'../../services/campaign-creation/campaign-creation.service';
import { MockCampaignCreationService } from
'../../services/campaign-creation/mock-campaign-creation.service';
import { LanguageService } from '../../services/language.service';
import { CampaignBreadcrumb } from '../campaign-breadcrumb';
import { ModifiedTemplate }  from '../../models/modified-template.model';
import { Router } from '@angular/router';

describe('Component: CampaignConfirmation', () => {
    let fixture: any;
    let campaignCreationService: any;
    let alertsService: any;
    let lang: any;
    let component: any;
    let page: Page;

    class Page {
      breadCrumbLinks: Array<DebugElement>;
      navButtons: Array<DebugElement>;
      basicInfoContainer: DebugElement;
      finalContentContainer: DebugElement;

      addPageElements() {
          this.navButtons = fixture.debugElement.queryAll(By.css('button'));
          this.breadCrumbLinks = fixture.debugElement.queryAll(By.css('a'));
          this.basicInfoContainer = fixture.debugElement.query(By.css('.basic-information'));
          this.finalContentContainer = fixture.debugElement.query(By.css('#finalContent'));
      }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
              CampaignConfirmation,
              CampaignBreadcrumb
            ],
            providers: [
              {
                  provide: CampaignCreationService,
                  useClass: MockCampaignCreationService
              },
              {
                provide: Router,
                useClass: MockRouter
              },
              LanguageService,
              AlertsService,

            ],
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(CampaignConfirmation);
            component = fixture.componentInstance;
            alertsService = fixture.debugElement.injector.get(AlertsService);
            lang = fixture.debugElement.injector.get(LanguageService);
            campaignCreationService = fixture.debugElement.injector.get(CampaignCreationService);
            campaignCreationService.setModifiedTemplate(new ModifiedTemplate('<p>test modified template</p>'));
            campaignCreationService.setName('testname');
            campaignCreationService.setSubject('testsubject');
            page = new Page();
            page.addPageElements();
            fixture.detectChanges();
          });
    }));

    it('name and subject in service should be correct in the component', () => {
        expect(component.getCampaign().name).toBe('testname');
        expect(component.getCampaign().subject).toBe('testsubject');
    });

    // Test for UI
    it('campaign basic info is displayed correctly', () => {
        expect(page.basicInfoContainer.nativeElement.textContent).toContain('testname');
        expect(page.basicInfoContainer.nativeElement.textContent).toContain('testsubject');
    });

    it('final template should be fetched from campaign creation service and displayed', () => {
        expect(page.finalContentContainer.nativeElement.textContent).toContain('test modified template');
    });

    //it('confirming campaign should set succesful alert message', () => {
      //  page.navButtons[1].triggerEventHandler('click', null);
        //expect(alertsService.getCampaignCreatedAlert()).toBe(lang.getWord('CAMPAIGN_CREATED_ALERT'));
  //  });

    it('user informed if no campaign name and subject', () => {
        campaignCreationService.setName('');
        campaignCreationService.setSubject('');
        fixture.detectChanges();
        expect(page.basicInfoContainer.nativeElement.textContent).toContain('must be filled');
    });

});

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}
