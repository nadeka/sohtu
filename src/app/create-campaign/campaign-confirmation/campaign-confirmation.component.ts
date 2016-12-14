import { Component, Input, ChangeDetectorRef, Inject, Injectable } from '@angular/core';
import { CampaignCreationService } from '../../services/campaign-creation/campaign-creation.service';
import { Campaign } from '../../models/campaign.model';
import { CampaignBreadcrumb } from '../campaign-breadcrumb';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { AlertsService } from '../../services/alerts/alerts.service';

@Component({
    selector: 'campaign-confirmation',
    templateUrl: './campaign-confirmation.template.html',
    styleUrls: [ 'campaign-confirmation.style.css', '../campaign-creation.style.css' ],
    providers: [CampaignBreadcrumb]
})

export class CampaignConfirmation {

    previousLabel = this.language.getWord('PREVIOUS_LABEL');
    confirmLabel = this.language.getWord('CONFIRM_LABEL');
    campaignOverview = this.language.getWord('CAMPAIGN_OVERVIEW');
    campaignName = this.language.getWord('CAMPAIGN_NAME_LABEL');
    campaignSubject = this.language.getWord('CAMPAIGN_SUBJECT_LABEL');
    mailingLists = this.language.getWord('MAILING_LISTS_HEADER');
    willBeSent = this.language.getWord('WILL_BE_SENT');
    errorCampaignName = this.language.getWord('ERROR_CAMPAIGN_NAME_MISSING');
    errorCampaignSubject = this.language.getWord('ERROR_CAMPAIGN_SUBJECT_MISSING');
    errorMailingList = this.language.getWord('ERROR_MAILING_LIST_MISSING');

    private campaign: Campaign;
    private campaignContent: SafeHtml;
    private mailingListIsEmpty = true;

    constructor (	private language: LanguageService,
                  private campaignCreationService: CampaignCreationService,
                  private ref: ChangeDetectorRef,
                  private sanitized: DomSanitizer,
                  private alertsService: AlertsService,
                  @Inject(Router) public router: Router) {
      this.campaign = campaignCreationService.getCampaign();
    }

    ngOnInit() {
        this.campaignContent = this.sanitized.bypassSecurityTrustHtml(this.campaign.content);
        if (this.campaign.mailingLists.length > 0) {
          this.mailingListIsEmpty = false;
        }
    }

    ngAfterViewInit() {
        this.campaignCreationService.setCurrentStep('confirmation');
        this.ref.detectChanges();
    }

    goToStep(step: string) {
        this.campaignCreationService.goToStep(step);
    }

    getCampaign() {
        return this.campaign;
    }

    postCampaign() {
        // post the campaign
        // set the alert for the marketing overview -page
        // reroute the user
        this.campaignCreationService.postCampaign()
                    .then(c => {
                      if (c.status == 200) {
                        this.campaignCreationService.clearCampaign();
                      }
                    });
        this.alertsService.setCampaignCreatedAlert();
        this.router.navigate(['/marketing/marketing-overview']);

    }

    isCampaignReady() {
        return this.campaignCreationService.isReady();
    }
}
