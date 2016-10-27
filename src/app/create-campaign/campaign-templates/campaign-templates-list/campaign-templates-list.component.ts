import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CampaignTemplate } from '../../../models/campaign-template.model';
import { TemplatesService } from '../../../services/templates/templates.service';
import { HTML2CanvasService } from '../../../services/html2canvas/html2canvas.service';
import { EnglishConfig } from '../../../english.language';
import { Template } from '../../../models/template.model';

@Component({
    selector: 'campaign-templates-list',
    styleUrls: [ 'campaign-templates-list.style.css' ],
    templateUrl: 'campaign-templates-list.template.html',
})

export class CampaignTemplatesList implements OnInit {

    // Notification to parent that a template has been chosen
    @Output() notify = new EventEmitter();

    campaignTemplatesHeader = EnglishConfig.CAMPAIGN_TEMPLATES_HEADER;
    public campaignTemplates: Array<CampaignTemplate> = [];

    constructor(private templatesService: TemplatesService,
                private html2CanvasService: HTML2CanvasService) {}

    ngOnInit() {
        this.getCampaignTemplates();
    }

    getCampaignTemplates(): void {
        this.templatesService.getTemplates()
            .then(templates =>
                templates.forEach(template => this.convertToCampaignTemplate(template)));
    }

    convertToCampaignTemplate(template: Template): void {
        this.html2CanvasService.toCanvas(template.content)
            .then(canvas => template.thumbnailImage = canvas.toDataURL());

        this.campaignTemplates.push(new CampaignTemplate(template, false));
    }

    hasSelected(): boolean {
        return this.campaignTemplates
            .some(campaignMailingList => campaignMailingList.selected);
    }

    getSelected(): CampaignTemplate {
        let campaignTemplate = this.campaignTemplates
            .find(template => template.selected === true);

        return campaignTemplate ? campaignTemplate : null;
    }

    setSelected(templateId: number): void {
        this.campaignTemplates.forEach(function (campaignTemplate) {
            if (campaignTemplate.template.id === templateId) {
                campaignTemplate.selected = true;

            } else {
                campaignTemplate.selected = false;
            }
        });
        this.notify.emit(this.getSelected());
    }

    scrollLeft(amount: number): void {
        $('.campaign-templates-list').animate({ scrollLeft: '-=' + amount }, 400);
    }
}
