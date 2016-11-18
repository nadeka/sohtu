import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CampaignTemplate } from '../../../models/campaign-template.model';
import { TemplatesService } from '../../../services/templates/templates.service';
import { HTML2ImageService } from '../../../services/html2image/html2image.service';
import { Template } from '../../../models/template.model';
import { LanguageService } from '../../../services/language.service';
import { CampaignCreationService} from '../../../services/campaign-creation/campaign-creation.service';
import { ModalDirective, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'campaign-templates-list',
    styleUrls: [ 'campaign-templates-list.style.css' ],
    templateUrl: 'campaign-templates-list.template.html',
})

export class CampaignTemplatesList implements OnInit {

    // Notification to parent that a template has been chosen
    @Output() notify = new EventEmitter();

    campaignTemplatesHeader = this.language.getWord('CAMPAIGN_TEMPLATES_HEADER');

    public campaignTemplates: Array<Template> = [];
    @ViewChild('staticModal') public staticModal: ModalDirective;
    private selectedTemplate: number;
    private tempTemplateId: number;

    constructor(private language: LanguageService,
                private templatesService: TemplatesService,
                private html2ImageService: HTML2ImageService,
                private campaignCreationService: CampaignCreationService) {
                    this.selectedTemplate = null;
                }

    ngOnInit() {
        this.getCampaignTemplates();
    }

    getCampaignTemplates(): void {
        this.campaignTemplates = [];
        this.templatesService.getTemplates()
            .then(templates => {this.campaignTemplates = templates;
                templates.forEach(template => this.convertToCampaignTemplate(template));
                });
    }

    convertToCampaignTemplate(template: Template): void {
        this.html2ImageService.toImage(template.content)
            .then(imageUrl => template.thumbnailImage = imageUrl)
            .catch(err => console.log(err));
    }

    hasSelected(): boolean {
        if (this.selectedTemplate) {
            return true;
        }
        return false;
    }

    getSelected(): Template {
        let campaignTemplate = this.campaignTemplates
            .find(template => template.id === this.selectedTemplate);
        return campaignTemplate ? campaignTemplate : null;
    }

    select(templateId: number): void {
        this.tempTemplateId = templateId;
        if(!this.campaignCreationService.getModifiedTemplate()) {
          this.notify.emit(this.getSelected());
          this.selectedTemplate = templateId;
        }
        else {
          this.staticModal.show();
        }
    }

    changeTemplate(): void {
      this.notify.emit(this.getSelected());
      this.selectedTemplate = this.tempTemplateId;
      this.staticModal.hide();
    }

    reselect(templateId: number): void {
        this.selectedTemplate = templateId;
        this.notify.emit(this.getSelected());
    }

    isSelected(templateId: number): boolean {
        if (this.selectedTemplate) {
            return (templateId === this.selectedTemplate);
        }
        return false;
    }

    saveChanges() {

    }
}
