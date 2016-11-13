import { Injectable } from '@angular/core';
let papa = require('papaparse');

@Injectable()
export class File2JSONService {

    CSV2JSON(csvFile: File, callback): void {
        let config = {	skipEmptyLines: true,
                        header: true,
                        complete: function(results) {
                            callback(results);
                        }};

        papa.parse(csvFile, config);
    }
}
