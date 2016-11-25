import { Injectable } from '@angular/core';
import { LanguageService } from '../language.service';

@Injectable()
export class AlertsService {

  private campaignCreatedAlert = '';

  constructor(private lang: LanguageService) {}

  public setCampaignCreatedAlert():void {
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
}
