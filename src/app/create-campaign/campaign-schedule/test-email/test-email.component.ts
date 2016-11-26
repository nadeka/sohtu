import { Component } from '@angular/core';
import { CampaignCreationService } from '../../../services/campaign-creation/campaign-creation.service';
import { Campaign } from '../../../models/campaign.model';
import { LanguageService } from '../../../services/language.service';


@Component({
    selector: 'test-email',
    templateUrl: './test-email.template.html',
    providers: [ LanguageService ]
})

export class TestEmail {
    campaignNameLabe = this.languageServ.getWord('CAMPAIGN_NAME_LABEL');
    testMailSubjLabel = this.languageServ.getWord('EMAIL_SUBJECT_LABEL');
    sendTo = this.languageServ.getWord('EMAIL_SEND_TO');
    testMailName: String;

    constructor(private campaignCreationService: CampaignCreationService,
                private languageServ: LanguageService) {
        this.testMailName = campaignCreationService.getCampaign().name;

    }

}
