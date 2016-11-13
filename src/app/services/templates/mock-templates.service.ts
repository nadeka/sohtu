import { Injectable } from '@angular/core';
import { TEMPLATES } from '../../test-data/test-templates';
import { Template } from '../../models/template.model';

// We make getTemplates() synchronous (for easier unit testing) by returning
// the service itself instead of a promise and adding a then method.
@Injectable()
export class MockTemplatesService {
    templates: Template[] = TEMPLATES;

    getTemplates() {
        return this;
    }

    then(callback) {
        callback(this.templates);

        return this;
    }
}
