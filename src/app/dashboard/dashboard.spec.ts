import {
  beforeEachProviders,
  describe,
  inject,
  it
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { Dashboard } from './dashboard.component.ts';

describe('Dashboard', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },

    AppState,
    Dashboard
  ]);

  it('should log ngOnInit', inject([ Dashboard ], (dashboard) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    dashboard.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
