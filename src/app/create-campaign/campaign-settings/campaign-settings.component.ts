import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CampaignBasicInfo } from './campaign-basic-info';
import { CampaignMailingLists } from './campaign-mailing-lists';
import { CampaignCreationService }
    from '../../services/campaign-creation/campaign-creation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'campaign-settings',
  templateUrl: 'campaign-settings.template.html',
  styleUrls: [ '../campaign-creation.style.css', 'campaign-settings.style.css' ],
  providers: [ CampaignMailingLists, CampaignBasicInfo, LanguageService]
})

export class CampaignSettings {

  @ViewChild('basicInfo') campaignBasicInfo: CampaignBasicInfo;
  @ViewChild('mailingLists') campaignMailingLists: CampaignMailingLists;

  name: string;
  subject: string;

  constructor(private language: LanguageService,
              private campaignCreationService: CampaignCreationService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.name = this.campaignCreationService.getName();

    if (this.name === undefined) {
      this.name = '';
    }

    this.subject = this.campaignCreationService.getSubject();
    if (this.subject === undefined) {
      this.subject = '';
    }
  }

  ngAfterViewInit() {
    let selectedMailingLists = this.campaignCreationService.getMailingLists();
    if (selectedMailingLists) {
      this.campaignMailingLists.selectMany(this.campaignCreationService.getMailingLists());
    }
    // Change detection needs to be forced because the selections have been added
    this.ref.detectChanges();
  }

  goToStep(step) {
    // save to service
    this.campaignCreationService.setName(this.campaignBasicInfo.getName());
    this.campaignCreationService.setSubject(this.campaignBasicInfo.getSubject());
    this.campaignCreationService.setMailingLists(this.campaignMailingLists.getSelected());
    this.campaignCreationService.goToStep(step);
  }

}
