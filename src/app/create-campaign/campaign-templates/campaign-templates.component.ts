import { Component } from '@angular/core';
import { CampaignTemplatesList } from './campaign-templates-list';
import { CampaignChosenTemplate } from './campaign-chosen-template';
import { TemplatesService } from '../../services/templates/templates.service';
import { CampaignTemplate } from '../../models/campaign-template.model';
import { CampaignCreationService} from '../../services/campaign-creation/campaign-creation.service';

@Component({
    selector: 'campaign-templates',
    templateUrl: 'campaign-templates.template.html',
    styleUrls: [ 'campaign-templates.style.css' ],
    providers: [CampaignTemplatesList, CampaignChosenTemplate]
})

export class CampaignTemplates {
    constructor(private campaignCreationService: CampaignCreationService,
                private campaignChosenTemplate: CampaignChosenTemplate,
                private campaignTemplatesList: CampaignTemplatesList,
                private templatesService: TemplatesService) {
    }

    ngOnInit() {
        console.log('hello `CampaignTemplates` component');
    }

    templateChanged(c: CampaignTemplate):void {
        this.templatesService.setUserSelectedTemplate(c);
        //this.campaignChosenTemplate.updateTemplate();
    }

    goToStep(step: string) {
        this.campaignCreationService.goToStep(step);
    }
}
