import { Component, Input } from '@angular/core';
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
    templateMustBeChosenMessage = this.languageServ.getWord('ERROR_TEMPLATE_MUST_BE_CHOSEN');
    sendTestMailButton = this.languageServ.getWord('SEND_TEST_EMAIL');
    errorCampaignSubject = this.languageServ.getWord('ERROR_CAMPAIGN_SUBJECT_MISSING');
    testMailSubject: String;
    @Input() testEmailAddress: string;

    constructor(private campaignCreationService: CampaignCreationService,
                private languageServ: LanguageService) {

    }
    ngOnInit() {
        if (this.campaignCreationService.getSubject() !== ""  && this.campaignCreationService.getSubject() !== undefined) {
            this.testMailSubject = this.campaignCreationService.getSubject() + " -test mail";
        }
    }

    onAddressChange(newValue) {
        this.testEmailAddress = newValue;
    }

    public getTestAddress(): string {
        return this.testEmailAddress;
    }

    templateExists() {
      return ((this.campaignCreationService.getTemplate() === undefined));
    }

    subjectExists() {
    return ((this.campaignCreationService.getSubject() === "" || this.campaignCreationService.getSubject() === undefined));
    }

}
