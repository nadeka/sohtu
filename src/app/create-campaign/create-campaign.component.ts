import { Component } from '@angular/core';
import { CampaignBasicInfo } from './campaign-basic-info';
import { CampaignMailingLists } from './campaign-mailing-lists';


@Component({
  selector: 'create-campaign',
  templateUrl: './create-campaign.template.html',
  directives: [CampaignBasicInfo, CampaignMailingLists]
})

export class CreateCampaign {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Create-campaign` component');
  }

}
