import { Injectable } from '@angular/core';
import { Template } from '../../models/template.model';
import { Http, Response } from '@angular/http';
import { Settings } from '../../settings';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TemplatesService {
  private templatesURL = Settings.API_BASE_URL() + '/templates';

  constructor(private http: Http) { }

  getTemplates(): Promise<Template[]> {
    let self = this;

    return this.http.get(this.templatesURL)
      .toPromise()
      .then(this.extractData)
      .catch(function(err) {
        throw new Error('TemplatesService: Error fetching templates from URL ' + self.templatesURL);
      });
  }

  private extractData(res: Response) {
    let body = res.json();
    let templates = [];

    if (body) {
      body.forEach(template =>
          templates.push(new Template(template.id, template.name, template.html,
              template.htmlImage, template.createdAt, template.updatedAt))
      );
    }

    return templates;
  }
}
