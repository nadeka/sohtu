import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CampaignTemplate } from '../../../models/campaign-template.model';
import { TemplatesService } from '../../../services/templates/templates.service';
import { HTML2ImageService } from '../../../services/html2image/html2image.service';
import { Template } from '../../../models/template.model';
import { LanguageService } from '../../../services/language.service';

@Component({
    selector: 'campaign-templates-list',
    styleUrls: [ 'campaign-templates-list.style.css' ],
    templateUrl: 'campaign-templates-list.template.html',
})

export class CampaignTemplatesList implements OnInit {

    // Notification to parent that a template has been chosen
    @Output() notify = new EventEmitter();

    campaignTemplatesHeader = this.language.getWord('CAMPAIGN_TEMPLATES_HEADER');

    public campaignTemplates: Array<CampaignTemplate> = [];

    constructor(private language: LanguageService,
                private templatesService: TemplatesService,
                private html2ImageService: HTML2ImageService) {}

    ngOnInit() {
        this.getCampaignTemplates();
    }

    getCampaignTemplates(): void {
        this.templatesService.getTemplates()
            .then(templates =>
                templates.forEach(template => this.convertToCampaignTemplate(template)));
    }

    convertToCampaignTemplate(template: Template): void {
        this.html2ImageService.toImage(template.content)
            .then(imageUrl => template.thumbnailImage = imageUrl)
            .catch(err => console.log(err));

        this.campaignTemplates.push(new CampaignTemplate(template, false));
    }

    hasSelected(): boolean {
        return this.campaignTemplates
            .some(campaignMailingList => campaignMailingList.selected);
    }

    getSelected(): Template {
        let campaignTemplate = this.campaignTemplates
            .find(template => template.selected === true);

        return campaignTemplate ? campaignTemplate.template : null;
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
        $('.campaign-templates-list').animate({ scrollLeft: '-=' + amount }, 300);
    }
}
