import { Component, Input, Inject } from '@angular/core';
import { CampaignCreationService } from '../../../services/campaign-creation/campaign-creation.service';
import { Campaign } from '../../../models/campaign.model';
import { LanguageService } from '../../../services/language.service';
import { AlertsService } from '../../../services/alerts/alerts.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import {CampaignSchedule} from "../campaign-schedule.component";

@Component({
    selector: 'test-email',
    templateUrl: './test-email.template.html',
    providers: [LanguageService]
})

export class TestEmail {
    campaignNameLabe = this.languageServ.getWord('CAMPAIGN_NAME_LABEL');
    testMailSubjLabel = this.languageServ.getWord('EMAIL_SUBJECT_LABEL');
    sendTo = this.languageServ.getWord('EMAIL_SEND_TO');
    templateMustBeChosenMessage = this.languageServ.getWord('ERROR_TEMPLATE_MUST_BE_CHOSEN');
    sendTestMailButton = this.languageServ.getWord('SEND_TEST_EMAIL');
    errorCampaignSubject = this.languageServ.getWord('ERROR_CAMPAIGN_SUBJECT_MISSING');
    errorAddress = this.languageServ.getWord('ERROR_TEST_EMAIL_ADDRESS_MISSING');
    testMailSubject: string;
    @Input() testEmailAddress: string;

    constructor(private campaignCreationService: CampaignCreationService,
                private languageServ: LanguageService,
                private alertsService: AlertsService,
                @Inject(Router) public router: Router) {

    }
    ngOnInit() {

        if (this.campaignCreationService.getSubject() !== ''  && this.campaignCreationService.getSubject() !== undefined && this.campaignCreationService.getSubject() !== null) {
            this.testMailSubject = this.campaignCreationService.getSubject() + ' -test mail';
        }
    }

    onAddressChange(newValue) {
        this.testEmailAddress = newValue;
    }

    public getTestAddress(): string {
        return this.testEmailAddress;
    }

    public getTestMailSubject(): string {
        return this.testMailSubject;
    }

    templateExists() {
        return !(this.campaignCreationService.getTemplate() === undefined);
    }

    subjectExists() {
        return !(this.campaignCreationService.getSubject() === '' || this.campaignCreationService.getSubject() === undefined || this.campaignCreationService.getSubject() === null);
    }

    validTemplateAndSubject(): boolean {
        return (this.subjectExists() && this.templateExists() && this.isValid(this.testEmailAddress));
    }

    isValid(input: string): boolean {
        let EMAIL_REGEXP =  /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$/;

        if (!EMAIL_REGEXP.test(input)) {
            return false;
        }
        return true;
    }

    postTestCampaign() {
        // post the campaign
        // set the alert for the campaign confirmation -page
        // reroute the user

        this.campaignCreationService.postTestCampaign(this.testMailSubject, this.testEmailAddress);

        this.alertsService.setTestEmailSentAlert();
        this.router.navigate(['/marketing/create-campaign/confirmation']);

    }

}
