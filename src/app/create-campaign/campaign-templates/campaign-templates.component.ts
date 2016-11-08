import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CampaignTemplatesList } from './campaign-templates-list';
import { TemplatesService } from '../../services/templates/templates.service';
import { CampaignTemplate } from '../../models/campaign-template.model';
import { CampaignCreationService} from '../../services/campaign-creation/campaign-creation.service';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'campaign-templates',
    templateUrl: 'campaign-templates.template.html',
    styleUrls: [ 'campaign-templates.style.css', '../campaign-creation.style.css' ],
    providers: [CampaignTemplatesList, LanguageService]
})

export class CampaignTemplates {

    @ViewChild('templates') campaignTemplates: CampaignTemplatesList;

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
            this.campaignTemplates.select(selectedTemplate.id);
        }

        // Change detection needs to be forced because the selections have been added
        this.ref.detectChanges();
    }

    templateChanged(c: CampaignTemplate):void {
        this.templatesService.setUserSelectedTemplate(c);
        //this.campaignChosenTemplate.updateTemplate();
    }

    goToStep(step: string) {
        this.campaignCreationService.setTemplate(this.campaignTemplates.getSelected());
        this.campaignCreationService.goToStep(step);
    }
}
