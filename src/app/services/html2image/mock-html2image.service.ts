import { Injectable } from '@angular/core';

@Injectable()
export class MockHTML2ImageService {
    imageUrl = '<div>Hello</div>';

    toImage(content: string) {
        return this;
    }

    then(callback) {
        callback(this.imageUrl);

        return this;
    }

    catch(callback) {}
}
