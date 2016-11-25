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
    return this.http.get(this.templatesURL)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    let templates = [];

    body.forEach(template =>
      templates.push(new Template(template.id, template.name, template.html,
        template.htmlImage, template.createdAt, template.updatedAt))
    );

    return templates;
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
