import { Injectable } from '@angular/core';
let domtoimage = require('dom-to-image');

@Injectable()
export class HTML2ImageService {

    // Put the HTML string in an IFrame element and use html2image to take
    // a "snapshot" of the IFrame.
    toImage(htmlString: string): Promise<string> {
        let iframe = document.createElement('iframe');
        iframe.setAttribute('hidden', 'true');

        $('body').append($(iframe));

        let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
        iframedoc.body.innerHTML = htmlString;

        return Promise.resolve(domtoimage.toPng(iframedoc.body, { height: 532, width: 750 }));
    }
}
