import { Injectable } from '@angular/core';
import { MailingList } from '../../models/mailing-list.model';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Settings } from '../../settings';

import 'rxjs/add/operator/toPromise';
import { Contact } from '../../models/contact.model';

@Injectable()
export class MailingListsService {
    private mailingListsURL: string = Settings.API_BASE_URL() + '/mailing-lists';
    private mailingListNames;

    constructor(private http: Http) {}

    getMailingLists(): Promise<MailingList[]> {
        let self = this;

        return this.http.get(this.mailingListsURL)
            .toPromise()
            .then(this.extractData)
            .catch(function(err) {
                throw new Error('MailingListsService: Error fetching mailing lists from URL ' + self.mailingListsURL);
            });
    }

    createMailingList(name: string, description: string, members: Contact[]): Promise<MailingList> {
        let self = this;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let payload: string = JSON.stringify({ name: name, description: description, members: members.map(m => m.id) });

        return this.http.post(this.mailingListsURL, payload, options)
            .toPromise()
            .then(this.extractData)
            .catch(function(err) {
                throw new Error('MailingListsService: Error posting payload '
                    + payload + ' to URL ' + self.mailingListsURL);
            });
    }

    private extractData(res: Response) {
        return res.json() || { };
    }

    setMailingListNames(names: Array<string>) {
      this.mailingListNames = names;
    }

    getMailingListNames(): Array<string> {
      return this.mailingListNames;
    }
}
