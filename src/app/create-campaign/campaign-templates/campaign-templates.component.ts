import { Component } from '@angular/core';
import { CampaignTemplatesList } from './campaign-templates-list';

@Component({
    selector: 'campaign-templates',
    templateUrl: 'campaign-templates.template.html',
    providers: [CampaignTemplatesList]
})

export class CampaignTemplates {
    constructor() {

    }

    ngOnInit() {
        console.log('hello `CampaignTemplates` component');
    }
}
