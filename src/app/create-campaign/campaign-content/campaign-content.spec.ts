import { TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CampaignCreationService } from
        '../../services/campaign-creation/campaign-creation.service';
import { MockCampaignCreationService } from
        '../../services/campaign-creation/mock-campaign-creation.service';
import { CampaignContent } from './campaign-content.component';
import { CampaignChosenTemplate } from './campaign-chosen-template';
import { CampaignBreadcrumb } from '../campaign-breadcrumb';


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
              CampaignChosenTemplate,
              CampaignBreadcrumb
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

});
