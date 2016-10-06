import {
  beforeEachProviders,
  describe,
  inject,
  it
}
from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { CreateCampaign } from './create-campaign.component.ts';

describe('CreateCampaign', () => {
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
    CreateCampaign
  ]);

  it('should log ngOnInit', inject([ CreateCampaign ], (createCampaign) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    createCampaign.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));


});
