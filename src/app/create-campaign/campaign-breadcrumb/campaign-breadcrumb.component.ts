import { CampaignCreationService} from '../../services/campaign-creation/campaign-creation.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
	selector: 'campaign-breadcrumb',
	templateUrl: './campaign-breadcrumb.template.html',
	styleUrls: [ './campaign-breadcrumb.style.css', '../campaign-creation.style.css' ],
})

export class CampaignBreadcrumb {

	settingsLabel = this.language.getWord('SETTINGS_LABEL');
	templateLabel = this.language.getWord('TEMPLATE_LABEL');
	contentLabel = this.language.getWord('CONTENT_LABEL');
	scheduleLabel = this.language.getWord('SCHEDULE_LABEL');
	confirmationLabel = this.language.getWord('CONFIRMATION_LABEL');

	@Output() pageChanged = new EventEmitter();

	constructor (	private language: LanguageService,
								private campaignCreationService: CampaignCreationService){
	}

	goToStep(step: string) {
		this.pageChanged.emit();
		this.campaignCreationService.goToStep(step);
	}

	isStep(step: string) {
		return this.campaignCreationService.getCurrentStep() === step;
	}

	isDisabled(step: string) {
		if(step === 'content') {
			return (this.campaignCreationService.getTemplate() === undefined) || (this.campaignCreationService.getTemplate() === null);
		}
		return false;
	}

}
