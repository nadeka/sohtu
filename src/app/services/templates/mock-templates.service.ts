import { Injectable } from '@angular/core';
import { TEMPLATES } from '../../mock-data/mock-templates';

// We make getTemplates() synchronous (for easier unit testing) by returning
// the service itself instead of a promise and adding a then method.
@Injectable()
export class MockTemplatesService {
    templates = TEMPLATES;

    getTemplates() {
        return this;
    }

    then(callback) {
        callback(this.templates);

        return this;
    }
}
