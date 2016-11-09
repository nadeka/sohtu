import { Injectable } from '@angular/core';
import { Template } from '../../models/template.model';
import { TEMPLATES } from '../../mock-data/mock-templates';
import { CampaignTemplate } from '../../models/campaign-template.model';

// This returns same mock data as MockTemplatesService until we get real data
@Injectable()
export class TemplatesService {

    private chosenTemplate: CampaignTemplate = null;

    setUserSelectedTemplate(t: CampaignTemplate): void {
        this.chosenTemplate = t;
    }

    getSelectedTemplate(): CampaignTemplate {
        return this.chosenTemplate;
    }

    getTemplates(): Promise<Template[]> {
        return Promise.resolve(TEMPLATES);
    }
}
