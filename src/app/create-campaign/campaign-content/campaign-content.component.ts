import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CampaignCreationService} from '../../services/campaign-creation/campaign-creation.service';
import { LanguageService } from '../../services/language.service';
import { CampaignChosenTemplate } from './campaign-chosen-template';
import { CampaignBreadcrumb } from '../campaign-breadcrumb';

@Component({
    selector: 'campaign-content',
    templateUrl: 'campaign-content.template.html',
    styleUrls: [ '../campaign-creation.style.css' ],
    providers: [CampaignChosenTemplate, LanguageService, CampaignBreadcrumb]
})

export class CampaignContent {

    previousButton = this.language.getWord('PREVIOUS_LABEL');
    nextButton = this.language.getWord('NEXT_LABEL');

    constructor(private language: LanguageService,
                private campaignCreationService: CampaignCreationService,
                private campaignChosenTemplate: CampaignChosenTemplate,
                private ref: ChangeDetectorRef){}

    @ViewChild('campaignChosenTemplate') chosenTemplate: CampaignChosenTemplate;

    ngOnInit() {
        console.log('hello `CampaignContent` component');
    }

    ngAfterViewInit() {
      this.campaignCreationService.setCurrentStep('content');
      this.ref.detectChanges();
    }

    goToStep(step: string) {
      this.saveChanges();
      this.campaignCreationService.goToStep(step);
    }

    saveChanges() {
        this.chosenTemplate.saveContent();
    }
}
