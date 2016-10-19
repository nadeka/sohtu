import { Component, Input} from '@angular/core';
import { EnglishConfig } from '../../../english.language';


@Component({
  selector: 'campaign-basic-info',
  templateUrl: 'campaign-basic-info.template.html',
})
export class CampaignBasicInfo {

  // Variables for static text on the page
  campaignNameLabel = EnglishConfig.CAMPAIGN_NAME_LABEL;
  campaignSubjectLabel = EnglishConfig.CAMPAIGN_SUBJECT_LABEL;


  public campaignName: string;
  public campaignSubject: string;

  constructor() {
  }

  onNameChange(newValue) {
    this.campaignName = newValue;
  }

  onSubjectChange(newValue) {
    this.campaignSubject = newValue;
  }

  public getName(): string {
  	return this.campaignName;
  }

  public getSubject(): string {
    return this.campaignSubject;
  }
}
