import { Injectable } from '@angular/core';
import { MailingList } from '../../models/mailing-list.model';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Settings } from '../../settings';

import 'rxjs/add/operator/toPromise';
import { Contact } from "../../models/contact.model";

@Injectable()
export class MailingListsService {
    private mailingListsURL = Settings.API_BASE_URL() + '/mailing-lists';

    constructor(private http: Http) { }

    getMailingLists(): Promise<MailingList[]> {
        return this.http.get(this.mailingListsURL)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    createMailingList(name: string, description: string, members: Contact[]): Promise<MailingList> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let payload = JSON.stringify({ name: name, description: description, members: members.map(m => m.id) });

        return this.http.post(this.mailingListsURL, payload, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        return res.json() || { };
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
