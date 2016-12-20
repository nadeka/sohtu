import { Injectable } from '@angular/core';
import { LanguageService } from '../language.service';

@Injectable()
export class AlertsService {

  private campaignCreatedAlert = '';
  private testEmailSentAlert = '';

  constructor(private lang: LanguageService) {}

  public setCampaignCreatedAlert(): void {
    this.campaignCreatedAlert = this.lang.getWord('CAMPAIGN_CREATED_ALERT');
  }

  public removeCampaignCreatedAlert(): void {
    this.campaignCreatedAlert = '';
  }

  public getCampaignCreatedAlert(): string {
    let temp = this.campaignCreatedAlert;
    this.removeCampaignCreatedAlert();
    return temp;
  }


  public setTestEmailSentAlert(): void {
    this.testEmailSentAlert = this.lang.getWord('TEST_EMAIL_SENT_ALERT');
  }

  public removeTestEmailSentAlert(): void {
    this.testEmailSentAlert = '';
  }

  public getTestEmailSentAlert(): string {
    let temp = this.testEmailSentAlert;
    this.removeTestEmailSentAlert();
    return temp;
  }
}

