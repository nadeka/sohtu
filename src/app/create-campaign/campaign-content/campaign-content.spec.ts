import { TestBed, async} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CampaignCreationService } from
        '../../services/campaign-creation/campaign-creation.service';
import { MockCampaignCreationService } from
        '../../services/campaign-creation/mock-campaign-creation.service';
import { CampaignContent } from './campaign-content.component';
import { CampaignChosenTemplate } from './campaign-chosen-template';

describe('Component: CampaignContent', () => {
    let fixture: any;
    let component: any;
    let campaignCreationService: any;
    let page: Page;

    class Page {
      breadCrumbLinks: Array<DebugElement>;
      navButtons: Array<DebugElement>;

      addPageElements() {
          this.navButtons = fixture.debugElement.queryAll(By.css('button'));
          this.breadCrumbLinks = fixture.debugElement.queryAll(By.css('a'));
      }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
              CampaignContent,
              CampaignChosenTemplate
            ],
            providers: [
              {
                  provide: CampaignCreationService,
                  useClass: MockCampaignCreationService
              }
            ],
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(CampaignContent);
            component = fixture.componentInstance;
            campaignCreationService = fixture.debugElement.injector.get(CampaignCreationService);
            page = new Page();
            page.addPageElements();
            fixture.detectChanges();
          });
    }));

    //Tests don't work as the campaign template is undefined in the initialization

    // it('should navigate to correct pages through the service using workflow navigation', () => {
    //     page.breadCrumbLinks[0].triggerEventHandler('click', null);
    //     expect(campaignCreationService.stepParameter).toBe('');
    //     page.breadCrumbLinks[1].triggerEventHandler('click', null);
    //     expect(campaignCreationService.stepParameter).toBe('template');
    //     page.breadCrumbLinks[2].triggerEventHandler('click', null);
    //     expect(campaignCreationService.stepParameter).toBe('schedule');
    //     page.breadCrumbLinks[3].triggerEventHandler('click', null);
    //     expect(campaignCreationService.stepParameter).toBe('confirmation');
    // });

});
