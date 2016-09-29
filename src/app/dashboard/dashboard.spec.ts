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
import { Title } from './title';

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
    Title,
    Dashboard
  ]);

  it('should have default data', inject([ Dashboard ], (dashboard) => {
    expect(dashboard.localState).toEqual({ value: '' });
  }));

  it('should have a title', inject([ Dashboard ], (dashboard) => {
    expect(!!dashboard.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ Dashboard ], (dashboard) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    dashboard.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
