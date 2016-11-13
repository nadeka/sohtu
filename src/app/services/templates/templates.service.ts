import { Injectable } from '@angular/core';
import { Template } from '../../models/template.model';
import { TEMPLATES } from '../../mock-data/mock-templates';

// This returns mock data until we get real data
@Injectable()
export class TemplatesService {
    templates: Template[] = TEMPLATES;

    getTemplates(): Promise<Template[]> {
        return Promise.resolve(this.templates);
    }
}
