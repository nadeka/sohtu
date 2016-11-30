import { TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CampaignCreationService } from '../../../services/campaign-creation/campaign-creation.service';
import { MockCampaignCreationService } from '../../../services/campaign-creation/mock-campaign-creation.service';
import { LanguageService } from '../../../services/language.service';
import { TestEmail } from './test-email.component';

describe('Component: test-email', () => {
    let fixture: any;
    let component: any;
    let campaignCreationService: any;
    let page: Page;
    let lang: Any;

    class Page {
      container: DebugElement;

      addPageElements() {
        this.container = fixture.debugElement.query(By.css('.test-email-info'));
      }
    }

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          TestEmail
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
        fixture = TestBed.createComponent(TestEmail);
        component = fixture.componentInstance;
        campaignCreationService = TestBed.get(CampaignCreationService);
        lang = fixture.debugElement.injector.get(LanguageService);
        page = new Page();
        page.addPageElements();
        fixture.detectChanges();
      });
    }));


    it('should show error message when no template chosen', () => {
        expect(page.container.nativeElement.textContent).toContain(lang.getWord('ERROR_TEMPLATE_MUST_BE_CHOSEN'));
    });
});
