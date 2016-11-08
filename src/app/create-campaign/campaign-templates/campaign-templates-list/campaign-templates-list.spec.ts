import {
    TestBed,
    async
}
    from '@angular/core/testing';

import { CampaignTemplatesList } from './campaign-templates-list.component.ts';
import { TemplatesService } from '../../../services/templates/templates.service';
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CampaignTemplatesList
            ],
            imports: [],
            providers: [
                {
                    provide: TemplatesService,
                    useClass: MockTemplatesService
                },
                {
                    provide: HTML2ImageService,
                    useClass: MockHTML2ImageService
                },
                LanguageService
            ]
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(CampaignTemplatesList);
            component = fixture.componentInstance;

            // Detect changes to wire up the `fixture.nativeElement` as necessary:
            fixture.detectChanges();
        });
    }));

    it('should have 9 unselected and valid templates in the beginning', () => {
        expect(component.campaignTemplates.length).toBe(9);
        component.campaignTemplates
            .forEach(campaignTemplate => validateCampaignTemplate(campaignTemplate));
    });


    // TÄTÄ TESTIÄ EN SAA LÄPI
    it('select should set template with given id as selected', () => {
        component.select(1);
        expect(component.selectedTemplate).toBe(1);
        component.select(2);
        expect(component.selectedTemplate).toBe(2);
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
});

function validateCampaignTemplate(campaignTemplate: Template) {
    expect(campaignTemplate).toBeDefined();
    expect(campaignTemplate.name).toBeDefined();
    expect(campaignTemplate.id).toBeDefined();
    expect(campaignTemplate.content).toBeDefined();
    expect(campaignTemplate.thumbnailImage).toBeDefined();
}
