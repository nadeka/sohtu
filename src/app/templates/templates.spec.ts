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
import { Templates } from './templates.component.ts';

describe('Templates', () => {
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
    Templates
  ]);

  it('should log ngOnInit', inject([ Templates ], (templates) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    templates.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
