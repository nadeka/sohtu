import { Component } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { CampaignBasicInfo } from './campaign-basic-info';


@Component({
  selector: 'create-campaign',
  templateUrl: './create-campaign.template.html',
  directives: [CampaignBasicInfo]
})

export class CreateCampaign {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Create-campaign` component');
  }

}
