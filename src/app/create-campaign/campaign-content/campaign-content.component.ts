import { Component, ChangeDetectorRef } from '@angular/core';
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

    constructor(private language: LanguageService,
                private campaignCreationService: CampaignCreationService,
                private campaignChosenTemplate: CampaignChosenTemplate,
                private ref: ChangeDetectorRef){}

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

    }
}
