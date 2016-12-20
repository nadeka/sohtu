import { TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CampaignCreationService } from '../../../services/campaign-creation/campaign-creation.service';
import { MockCampaignCreationService } from '../../../services/campaign-creation/mock-campaign-creation.service';
import { LanguageService } from '../../../services/language.service';
import { TestEmail } from './test-email.component';
import { Template } from '../../../models/template.model';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/alerts/alerts.service';

describe('Component: test-email', () => {
    let fixture: any;
    let component: any;
    let campaignCreationService: any;
    let page: Page;
    let lang: any;

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
                FormsModule
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
                AlertsService
            ],
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(TestEmail);
            component = fixture.componentInstance;
            campaignCreationService = fixture.debugElement.injector.get(CampaignCreationService);
            lang = fixture.debugElement.injector.get(LanguageService);
            page = new Page();
            page.addPageElements();
            fixture.detectChanges();
        });
    }));


    it('should show error message when no template chosen', () => {
        expect(page.container.nativeElement.textContent).toContain(lang.getWord('ERROR_TEMPLATE_MUST_BE_CHOSEN'));
    });

    it('should show error message when email subject has not been given', () => {
        expect(page.container.nativeElement.textContent).toContain(lang.getWord('ERROR_CAMPAIGN_SUBJECT_MISSING'));
    });

    it('should set test email subject to ´chosenSubject -test mail´', () => {
        campaignCreationService.setSubject('subject');
        component.ngOnInit();
        fixture.detectChanges();
        expect(page.container.nativeElement.textContent).toContain('subject -test mail');
    });

    it('send test email button should be disabled when no template chosen', () => {
        campaignCreationService.setTemplate(undefined);
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.validTemplateAndSubject()).toBe(false);
    });

    it('send test email button should be disabled when no subject chosen', () => {
        campaignCreationService.setSubject(undefined);
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.validTemplateAndSubject()).toBe(false);
    });

});

class MockRouter {
    navigate = jasmine.createSpy('navigate');
}
