import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CampaignCreationService } from
'../../services/campaign-creation/campaign-creation.service';
import { MockCampaignCreationService } from
'../../services/campaign-creation/mock-campaign-creation.service';
import { CampaignBreadcrumb } from '../campaign-breadcrumb';
import { LanguageService } from '../../services/language.service';

describe('Component: CampaignTemplates', () => {
    let fixture: any;
    let component: any;
    let campaignCreationService: any;
    let page: Page;

    class Page {
      breadCrumbLinks: Array<DebugElement>;

      addPageElements() {
          this.breadCrumbLinks = fixture.debugElement.queryAll(By.css('a'));
      }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
              CampaignBreadcrumb
            ],
            imports: [

            ],
            providers: [
              {
                  provide: CampaignCreationService,
                  useClass: MockCampaignCreationService
              },
              LanguageService
            ],
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(CampaignBreadcrumb);
            component = fixture.componentInstance;
            campaignCreationService = fixture.debugElement.injector.get(CampaignCreationService);
            page = new Page();
            page.addPageElements();
            fixture.detectChanges();
          });
    }));

    it('should navigate to correct pages through the service', () => {
        campaignCreationService.setCurrentStep('testStep');
        page.breadCrumbLinks[0].triggerEventHandler('click', null);
        expect(campaignCreationService.stepParameter).toBe('');
        page.breadCrumbLinks[1].triggerEventHandler('click', null);
        expect(campaignCreationService.stepParameter).toBe('template');
        page.breadCrumbLinks[2].triggerEventHandler('click', null);
        expect(campaignCreationService.stepParameter).toBe('content');
        page.breadCrumbLinks[3].triggerEventHandler('click', null);
        expect(campaignCreationService.stepParameter).toBe('schedule');
        page.breadCrumbLinks[4].triggerEventHandler('click', null);
        expect(campaignCreationService.stepParameter).toBe('confirmation');
    });

});
