import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CampaignTemplatesList } from './campaign-templates-list';
import { TemplatesService } from '../../services/templates/templates.service';
import { CampaignTemplate } from '../../models/campaign-template.model';
import { Template } from '../../models/template.model';
import { CampaignCreationService} from '../../services/campaign-creation/campaign-creation.service';
import { LanguageService } from '../../services/language.service';
import { CampaignBreadcrumb } from '../campaign-breadcrumb';

@Component({
    selector: 'campaign-templates',
    templateUrl: 'campaign-templates.template.html',
    styleUrls: [ 'campaign-templates.style.css', '../campaign-creation.style.css' ],
    providers: [CampaignTemplatesList, LanguageService, CampaignBreadcrumb]
})

export class CampaignTemplates {

    @ViewChild('templates') templatesList: CampaignTemplatesList;

    constructor(private language: LanguageService,
                private campaignCreationService: CampaignCreationService,
                private campaignTemplatesList: CampaignTemplatesList,
                private templatesService: TemplatesService, private ref: ChangeDetectorRef){}

    ngOnInit() {
        console.log('hello `CampaignTemplates` component');
    }

    ngAfterViewInit() {
        let selectedTemplate = this.campaignCreationService.getTemplate();
        if(selectedTemplate){
             this.templatesList.reselect(selectedTemplate.id);
        }

        this.campaignCreationService.setCurrentStep('template');
        this.ref.detectChanges();
    }

    goToStep(step: string) {
      this.saveChanges();
      this.campaignCreationService.goToStep(step);
    }

    saveChanges() {
      if(this.templatesList.getUpdateTemplate()) {
        console.log('asd');
          this.campaignCreationService.setTemplate(this.templatesList.getSelected());
      }
    }
}
