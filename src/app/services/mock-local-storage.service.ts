import { Injectable } from '@angular/core';

@Injectable()
export class MockLocalStorageService {
  retrieve(key: string) {
    return null;
  }
  store(key: string) {
    return null;
  }
}
