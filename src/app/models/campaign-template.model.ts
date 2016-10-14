import { Template } from './template.model';

export class CampaignTemplate {
    template: Template;
    selected: boolean;

    constructor(template: Template, selected: boolean) {
        this.template = template;
        this.selected = selected;
    }
}
