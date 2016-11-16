import { CampaignCreationService} from '../../services/campaign-creation/campaign-creation.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'campaign-breadcrumb',
	templateUrl: './campaign-breadcrumb.template.html',
	styleUrls: [ './campaign-breadcrumb.style.css', '../campaign-creation.style.css' ],
})

export class CampaignBreadcrumb {

	@Output() pageChanged = new EventEmitter();

	constructor (private campaignCreationService: CampaignCreationService){
	}

	goToStep(step: string) {
		this.pageChanged.emit();
		this.campaignCreationService.goToStep(step);
	}

	isStep(step: string) {
		return this.campaignCreationService.getCurrentStep() === step;
	}

}
