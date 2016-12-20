import { Request, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// Globally handles ERR_CONNECTION_REFUSED errors (status 0) that occur when
// the backend is down. Currently logs only to console
export class CustomXHRBackend extends XHRBackend {

    constructor(_browserXhr: BrowserXhr, _baseResponseOptions: ResponseOptions, _xsrfStrategy: XSRFStrategy) {
        super(_browserXhr, _baseResponseOptions, _xsrfStrategy);
    }

    createConnection(request: Request) {
        let xhrConnection = super.createConnection(request);

        xhrConnection.response = xhrConnection.response.catch((error: Response) => {
            if (error.status === 0) {
                console.log("Server is down...")
            }

            return Observable.throw(error);
        });

        return xhrConnection;
    }
}
