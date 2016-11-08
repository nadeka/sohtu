import { Component } from '@angular/core';
import { CampaignCreationService} from '../../services/campaign-creation/campaign-creation.service';
import { LanguageService } from '../../services/language.service';
import { CampaignChosenTemplate } from './campaign-chosen-template';


@Component({
    selector: 'campaign-content',
    templateUrl: 'campaign-content.template.html',
    styleUrls: [ '../campaign-creation.style.css' ],
    providers: [CampaignChosenTemplate, LanguageService]

})

export class CampaignContent {

    constructor(private language: LanguageService,
                private campaignCreationService: CampaignCreationService,
                private campaignChosenTemplate: CampaignChosenTemplate){}

    ngOnInit() {
        console.log('hello `CampaignContent` component');
    }

    goToStep(step: string) {
        this.campaignCreationService.goToStep(step);
    }
}