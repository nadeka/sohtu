import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CampaignConfirmation } from './campaign-confirmation.component';
import { CampaignCreationService } from
'../../services/campaign-creation/campaign-creation.service';
import { MockCampaignCreationService } from
'../../services/campaign-creation/mock-campaign-creation.service';
import { LanguageService } from '../../services/language.service';
import { CampaignBreadcrumb } from '../campaign-breadcrumb';

describe('Component: CampaignConfirmation', () => {
    let fixture: any;
    let campaignCreationService: any;
    let component: any;
    let page: Page;

    class Page {
      breadCrumbLinks: Array<DebugElement>;
      navButtons: Array<DebugElement>;
      basicInfoContainer : DebugElement;

      addPageElements() {
          this.navButtons = fixture.debugElement.queryAll(By.css('button'));
          this.breadCrumbLinks = fixture.debugElement.queryAll(By.css('a'));
          this.basicInfoContainer = fixture.debugElement.query(By.css('.basic-information'));
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
              LanguageService
            ],
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(CampaignConfirmation);
            component = fixture.componentInstance;
            campaignCreationService = fixture.debugElement.injector.get(CampaignCreationService);
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
});
