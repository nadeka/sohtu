import {
    TestBed,
    async
}
from '@angular/core/testing';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CampaignTemplatesList } from './campaign-templates-list.component.ts';
import { TemplatesService } from '../../../services/templates/templates.service';
import { CampaignCreationService } from
        '../../../services/campaign-creation/campaign-creation.service';
import { MockCampaignCreationService } from
        '../../../services/campaign-creation/mock-campaign-creation.service';
import { HTML2ImageService } from '../../../services/html2image/html2image.service';
import { Template } from '../../../models/template.model';
import { MockTemplatesService }
    from '../../../services/templates/mock-templates.service';
import { MockHTML2ImageService }
    from '../../../services/html2image/mock-html2image.service';
import { LanguageService } from '../../../services/language.service';


describe('Component: CampaignTemplatesList', () => {
    let fixture: any;
    let component: any;
    let page: Page;

    class Page {
      // starts from thumbnails[1]
      thumbnails:   Array<DebugElement>;

      addPageElements() {
        this.thumbnails = fixture.debugElement.queryAll(By.css('div'));
      }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CampaignTemplatesList
            ],
            imports: [ModalModule],
            providers: [
                {
                    provide: TemplatesService,
                    useClass: MockTemplatesService
                },
                {
                    provide: HTML2ImageService,
                    useClass: MockHTML2ImageService
                },
                {
                    provide: CampaignCreationService,
                    useClass: MockCampaignCreationService
                },
                LanguageService
            ]
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(CampaignTemplatesList);
            component = fixture.componentInstance;
            page = new Page();

            // Detect changes to wire up the `fixture.nativeElement` as necessary:
            fixture.detectChanges();
            page.addPageElements();
        });
    }));

    it('should have 9 unselected and valid templates in the beginning', () => {
        expect(component.campaignTemplates.length).toBe(9);
        component.campaignTemplates
            .forEach(campaignTemplate => validateCampaignTemplate(campaignTemplate));
    });


    it('select should set template with given id as selected', () => {
        component.select(1);
        expect(component.selectedTemplate).toBe(1);
    });

    it('hasSelected should return true when a template is selected', () => {
        expect(component.hasSelected()).toBe(false);
        component.selectedTemplate = 1;
        expect(component.hasSelected()).toBe(true);
    });

    it('getSelected should return selected template', () => {
        expect(component.getSelected()).toBeNull();
        component.selectedTemplate = 1;
        expect(component.getSelected()).not.toBeNull();
        expect(component.getSelected().id)
            .toBe(1);
    });

    // UI tests
    it('clicking first thumbnail should choose that template', () => {
        page.thumbnails[1].triggerEventHandler('click', null);
        expect(component.selectedTemplate).toBe(1);
    });

    it('clicking on another thumbnail should change thumbnail', () => {
        page.thumbnails[1].triggerEventHandler('click', null);
        expect(component.selectedTemplate).toBe(1);

        page.thumbnails[2].triggerEventHandler('click', null);
        expect(component.selectedTemplate).toBe(2);
    });
});

function validateCampaignTemplate(campaignTemplate: Template) {
    expect(campaignTemplate).toBeDefined();
    expect(campaignTemplate.name).toBeDefined();
    expect(campaignTemplate.id).toBeDefined();
    expect(campaignTemplate.html).toBeDefined();
    expect(campaignTemplate.htmlImage).toBeDefined();
}
