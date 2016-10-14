import { Injectable } from '@angular/core';

@Injectable()
export class MockHTML2CanvasService {
    canvas = document.createElement('canvas');

    toCanvas() {
        return this;
    }

    then(callback) {
        callback(this.canvas);

        return this;
    }
}
