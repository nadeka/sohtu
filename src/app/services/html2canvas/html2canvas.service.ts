import { Injectable } from '@angular/core';
let html2canvas = require('html2canvas');

@Injectable()
export class HTML2CanvasService {

    // Put the HTML string in an IFrame element and use html2canvas to take
    // a "snapshot" of the IFrame.
    toCanvas(htmlString: string): Promise<any> {
        let iframe = document.createElement('iframe');
        iframe.setAttribute('hidden', 'true');

        $('body').append($(iframe));

        let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
        iframedoc.body.innerHTML = htmlString;

        return Promise.resolve(html2canvas(iframedoc.body));
    }
}
