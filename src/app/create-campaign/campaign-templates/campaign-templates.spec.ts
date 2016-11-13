import { TestBed, async} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CampaignCreationService } from
        '../../services/campaign-creation/campaign-creation.service';
import { MockCampaignCreationService } from
        '../../services/campaign-creation/mock-campaign-creation.service';
import { CampaignTemplates } from './campaign-templates.component';
import { CampaignTemplatesList } from './campaign-templates-list';
import { TemplatesService } from '../../services/templates/templates.service';
import { MockTemplatesService } from '../../services/templates/mock-templates.service';
import { HTML2ImageService } from '../../services/html2image/html2image.service';
import { MockHTML2ImageService } from '../../services/html2image/mock-html2image.service';

describe('Component: CampaignTemplates', () => {
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
              CampaignTemplates,
              CampaignTemplatesList
            ],
            imports: [

            ],
            providers: [
              {
                  provide: CampaignCreationService,
                  useClass: MockCampaignCreationService
              },
              {
                  provide: TemplatesService,
                  useClass: MockTemplatesService
              },
              {
                  provide: HTML2ImageService,
                  useClass: MockHTML2ImageService
              }
            ],
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(CampaignTemplates);
            component = fixture.componentInstance;
            campaignCreationService = fixture.debugElement.injector.get(CampaignCreationService);
            page = new Page();
            page.addPageElements();
            fixture.detectChanges();
          });
    }));

    it('should navigate to correct pages through the service using workflow navigation', () => {
        page.breadCrumbLinks[0].triggerEventHandler('click', null);
        expect(campaignCreationService.stepParameter).toBe('');
        page.breadCrumbLinks[1].triggerEventHandler('click', null);
        expect(campaignCreationService.stepParameter).toBe('content');
        page.breadCrumbLinks[2].triggerEventHandler('click', null);
        expect(campaignCreationService.stepParameter).toBe('schedule');
        page.breadCrumbLinks[3].triggerEventHandler('click', null);
        expect(campaignCreationService.stepParameter).toBe('confirmation');
    });

    it('should save selected template to service when moving to another step', () => {
        const selection = 1;
        component.campaignTemplates.select(selection);
        fixture.detectChanges();
        page.navButtons[1].triggerEventHandler('click', null);
        expect(campaignCreationService.getTemplate().id).toBe(selection);
    });

});
