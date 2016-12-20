import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Settings } from '../../settings';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoggerService {

    private logMessagesURL: string = Settings.API_BASE_URL() + '/log-messages';

    constructor(private http: Http) {}

    createLogMessage(error): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let payload: string = JSON.stringify({
            msg: error.message || '',
            level: 'error',
            meta: {
                origin: 'front-end',
                stack: error.stack || {}
            }
        });

        return this.http.post(this.logMessagesURL, payload, options)
            .toPromise()
            .then(function(res) { return res; })
            .catch(err =>
                console.log('Error sending log message with payload ' + payload
                    + ' to URL ' + this.logMessagesURL)
            );
    }
}
