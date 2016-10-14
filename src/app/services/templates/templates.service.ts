import { Injectable } from '@angular/core';
import { Template } from '../../models/template.model';
import { TEMPLATES } from '../../mock-data/mock-templates';

// This returns same mock data as MockTemplatesService until we get real data
@Injectable()
export class TemplatesService {

    getTemplates(): Promise<Template[]> {
        return Promise.resolve(TEMPLATES);
    }
}
