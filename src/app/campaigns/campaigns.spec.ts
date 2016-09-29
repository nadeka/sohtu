import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../app.service';
import {
  beforeEachProviders,
  describe,
  inject,
  it
} from '@angular/core/testing';

// Load the implementations that should be tested
import { Campaigns } from './campaigns.component.ts';

describe('Campaigns', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    // provide a better mock
    {
      provide: ActivatedRoute,
      useValue: {
        data: {
          subscribe: (fn) => fn({yourData: 'yolo'})
        }
      }
    },
    AppState,
    Campaigns
  ]);

  it('should log ngOnInit', inject([ Campaigns ], (campaigns) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    campaigns.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
