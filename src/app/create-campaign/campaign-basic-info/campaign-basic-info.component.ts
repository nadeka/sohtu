import { Component } from '@angular/core';
import { EnglishConfig } from '../../english.language';


@Component({
  selector: 'campaign-basic-info',
  templateUrl: 'campaign-basic-info.template.html'
})

export class CampaignBasicInfo {

  // Variables for static text on the page
  campaignNameLabel = EnglishConfig.CAMPAIGN_NAME_LABEL;
  campaignSubjectLabel = EnglishConfig.CAMPAIGN_SUBJECT_LABEL;

  public campaignName;
  public campaignSubject;

  constructor() {
  //
  }
}
