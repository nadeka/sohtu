import { Component, Inject, ViewChild } from '@angular/core';
import { CampaignBasicInfo } from './campaign-basic-info';
import { CampaignMailingLists } from './campaign-mailing-lists';
import { CampaignCreationService } from '../../services/campaign-creation/campaign-creation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'campaign-settings',
  templateUrl: 'campaign-settings.template.html',
  styleUrls: [ '../campaign-creation.style.css', 'campaign-settings.style.css' ],
<<<<<<< HEAD
  providers: [ CampaignMailingLists, CampaignBasicInfo, LanguageService]
=======
  providers: [ CampaignMailingLists, CampaignBasicInfo ],
>>>>>>> 4f0a1229a6061d0b2b8dcdfdcc504b9c2956473d
})

export class CampaignSettings {

  constructor(private language: LanguageService,
              private campaignCreationService: CampaignCreationService) {
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
