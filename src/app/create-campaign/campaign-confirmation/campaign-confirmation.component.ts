import { Component, Input } from '@angular/core';
import { CampaignBasicInfo } from '../campaign-settings/campaign-basic-info';
import { CampaignMailingLists } from '../campaign-settings/campaign-mailing-lists';
import { CampaignCreationService} from '../../services/campaign-creation/campaign-creation.service';
import { Campaign } from '../../models/campaign.model';

@Component({
	selector: 'campaign-confirmation',
	templateUrl: './campaign-confirmation.template.html',
	styleUrls: [ 'campaign-confirmation.style.css' ],
	providers: [CampaignBasicInfo, CampaignMailingLists]
})

export class CampaignConfirmation {

	private campaign: Campaign;

	private campaignName: string;
	private campaignSubject: string;
	private campaignMailingLists;
	private campaignSchedule;

	constructor (private creationService: CampaignCreationService){
		this.campaign = creationService.getCampaign();

		this.campaignName = this.campaign.name;
		this.campaignSubject = this.campaign.subject;
		this.campaignMailingLists = this.campaign.mailingLists;
		this.campaignSchedule = this.campaign.schedule;
	}

	ngOnInit() {
    console.log('hello `CONFIRMATION` component');
  }

}
