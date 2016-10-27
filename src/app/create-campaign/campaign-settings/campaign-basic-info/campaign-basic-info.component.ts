import { Component, Input } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'campaign-basic-info',
  templateUrl: 'campaign-basic-info.template.html',
  providers: []
})
export class CampaignBasicInfo {

  // Variables for static text on the page
  campaignNameLabel = this.language.getWord('CAMPAIGN_NAME_LABEL');
  campaignSubjectLabel = this.language.getWord('CAMPAIGN_SUBJECT_LABEL');


  @Input() campaignName: string;
  @Input() campaignSubject: string;

  constructor(private language: LanguageService) {
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
