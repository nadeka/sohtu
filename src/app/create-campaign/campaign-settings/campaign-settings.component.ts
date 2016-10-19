import { Component, Inject } from '@angular/core';
import { CampaignBasicInfo } from './campaign-basic-info';
import { CampaignMailingLists } from './campaign-mailing-lists';
import { CampaignCreationService} from '../../services/campaign-creation/campaign-creation.service';

@Component({
  selector: 'campaign-settings',
  templateUrl: 'campaign-settings.template.html',
  providers: [CampaignBasicInfo, CampaignMailingLists]
})

export class CampaignSettings {

  constructor(private campaignCreationService: CampaignCreationService,
            private campaignBasicInfo: CampaignBasicInfo,
            private campaignMailingLists: CampaignMailingLists) {
  }

  ngOnInit() {
    console.log('hello `CampaignSettings` component');
  }

  goToStep(step) {
    //save to service
    this.campaignCreationService.goToStep(step);
  }

}
