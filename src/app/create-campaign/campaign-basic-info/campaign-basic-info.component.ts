import { Component } from '@angular/core';

@Component({
  selector: 'campaign-basic-info',
  templateUrl: './campaign-basic-info.template.html'
})

export class CampaignBasicInfo {
  public campaignName;
  public campaignSubject;

  constructor() {}
}
