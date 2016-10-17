import { Component } from '@angular/core';
import { CampaignBasicInfo } from './campaign-basic-info';
import { CampaignMailingLists } from './campaign-mailing-lists';

@Component({
  selector: 'campaign-settings',
  templateUrl: 'campaign-settings.template.html',
  providers: [CampaignBasicInfo, CampaignMailingLists]
})

export class CampaignSettings {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `CampaignSettings` component');
  }

}
