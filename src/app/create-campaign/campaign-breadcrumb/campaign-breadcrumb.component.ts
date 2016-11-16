import { CampaignCreationService} from '../../services/campaign-creation/campaign-creation.service';
import { Component } from '@angular/core';

@Component({
	selector: 'campaign-breadcrumb',
	templateUrl: './campaign-breadcrumb.template.html',
	styleUrls: [ './campaign-breadcrumb.style.css', '../campaign-creation.style.css' ],
})

export class CampaignBreadcrumb {

	constructor (private campaignCreationService: CampaignCreationService){
	}

	goToStep(step: string) {
		this.campaignCreationService.goToStep(step);
	}

	get step() {
		return this.campaignCreationService.getCurrentStep();
	}

}
