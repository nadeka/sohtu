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
import { Marketing } from './marketing.component.ts';

describe('Marketing', () => {
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
    Marketing
  ]);

  it('should log ngOnInit', inject([ Marketing ], (marketing) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    marketing.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
