import { Component, Inject, ViewChild } from '@angular/core';
import { CampaignBasicInfo } from './campaign-basic-info';
import { CampaignMailingLists } from './campaign-mailing-lists';
import { CampaignCreationService } from '../../services/campaign-creation/campaign-creation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'campaign-settings',
  templateUrl: 'campaign-settings.template.html',
  styleUrls: [ '../campaign-creation.style.css', 'campaign-settings.style.css' ],
  providers: [ CampaignMailingLists, CampaignBasicInfo, LanguageService]
})

export class CampaignSettings {

  name: string;
  subject: string;

  constructor(private language: LanguageService,
              private campaignCreationService: CampaignCreationService) {
  }

  @ViewChild('basicInfo') campaignBasicInfo: CampaignBasicInfo
  @ViewChild('mailingLists') campaignMailingLists: CampaignMailingLists

  ngOnInit() {
    this.name = this.campaignCreationService.getName();
    if(this.name == undefined){
      this.name="";
    }
    this.subject = this.campaignCreationService.getSubject();
    if(this.subject == undefined){
      this.subject="";
    }
  }

  goToStep(step) {
    //save to service
    this.campaignCreationService.setName(this.campaignBasicInfo.getName());
    this.campaignCreationService.setSubject(this.campaignBasicInfo.getSubject());
    this.campaignCreationService.setMailingLists(this.campaignMailingLists.getSelected());
    this.campaignCreationService.goToStep(step);
  }

}
