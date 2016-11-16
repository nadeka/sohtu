import { Component, Input } from '@angular/core';
import { CampaignBasicInfo } from '../campaign-settings/campaign-basic-info';
import { CampaignMailingLists } from '../campaign-settings/campaign-mailing-lists';
import { CampaignCreationService} from '../../services/campaign-creation/campaign-creation.service';
import { Campaign } from '../../models/campaign.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
	selector: 'campaign-confirmation',
	templateUrl: './campaign-confirmation.template.html',
	styleUrls: [ 'campaign-confirmation.style.css', '../campaign-creation.style.css' ],
})

export class CampaignConfirmation {

	private campaign: Campaign;
	private campaignContent: SafeHtml;

	constructor (private campaignCreationService: CampaignCreationService, private sanitized: DomSanitizer){
		this.campaign = campaignCreationService.getCampaign();
	}

	ngOnInit() {
    console.log('hello `CONFIRMATION` component');
		this.campaignContent = this.sanitized.bypassSecurityTrustHtml(this.campaign.modifiedTemplate.content);
  }

	goToStep(step: string) {
		this.campaignCreationService.goToStep(step);
	}

	getCampaign() {
		return this.campaign;
	}
}
