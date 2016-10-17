import {
    TestBed,
    async
}
    from '@angular/core/testing';

import { CampaignTemplatesList } from './campaign-templates-list.component.ts';
import { TemplatesService } from '../../../services/templates/templates.service';
import { HTML2CanvasService } from '../../../services/html2canvas/html2canvas.service';
import { CampaignTemplate } from '../../../models/campaign-template.model';
import { MockTemplatesService }
    from '../../../services/templates/mock-templates.service';
import { MockHTML2CanvasService }
    from '../../../services/html2canvas/mock-html2canvas.service';

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
                    provide: HTML2CanvasService,
                    useClass: MockHTML2CanvasService
                }
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
    it('setSelected should set template with given id as selected', () => {

        component.setSelected(1);

        component.campaignTemplates
            .forEach(function(template) {
                if (template.template.id === 1) {
                    expect(template.selected).toBe(true);
                } else {
                    expect(template.selected).toBe(false);
                }
            });

        component.setSelected(1);

        component.campaignTemplates
            .forEach(function(template) {
                if (template.template.id === 1) {
                    expect(template.selected).toBe(true);
                } else {
                    expect(template.selected).toBe(false);
                }
            });
    });

    it('hasSelected should return true when a template is selected', () => {
        expect(component.hasSelected()).toBe(false);
        component.campaignTemplates[0].selected = true;
        expect(component.hasSelected()).toBe(true);
    });

    it('getSelected should return selected template', () => {
        expect(component.getSelected()).toBeNull();
        component.campaignTemplates[0].selected = true;
        expect(component.getSelected()).not.toBeNull();
        expect(component.getSelected().selected).toBe(true);
        expect(component.getSelected().template.id)
            .toBe(component.campaignTemplates[0].template.id);
    });
});

function validateCampaignTemplate(campaignTemplate: CampaignTemplate) {
    expect(campaignTemplate).toBeDefined();
    expect(campaignTemplate.template).toBeDefined();
    expect(campaignTemplate.template.name).toBeDefined();
    expect(campaignTemplate.template.id).toBeDefined();
    expect(campaignTemplate.template.content).toBeDefined();
    expect(campaignTemplate.template.thumbnailImage).toBeDefined();
    expect(campaignTemplate.selected).toBe(false);
}
