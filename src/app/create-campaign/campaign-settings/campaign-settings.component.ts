import { Component, Inject, ViewChild } from '@angular/core';
import { CampaignBasicInfo } from './campaign-basic-info';
import { CampaignMailingLists } from './campaign-mailing-lists';
import { CampaignCreationService } from '../../services/campaign-creation/campaign-creation.service';

@Component({
  selector: 'campaign-settings',
  templateUrl: 'campaign-settings.template.html',
  providers: [ CampaignMailingLists, CampaignBasicInfo ]
})

export class CampaignSettings {

  

  constructor(private campaignCreationService: CampaignCreationService) {
  }

  @ViewChild('basicInfo') campaignBasicInfo: CampaignBasicInfo
  @ViewChild('mailingLists') campaignMailingLists: CampaignMailingLists

  
  goToStep(step) {
    //save to service
    this.campaignCreationService.setName(this.campaignBasicInfo.getName());
    this.campaignCreationService.setSubject(this.campaignBasicInfo.getSubject());
    this.campaignCreationService.setMailingLists(this.campaignMailingLists.getSelected());
    this.campaignCreationService.goToStep(step);
  }

}
