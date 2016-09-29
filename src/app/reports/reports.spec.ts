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
import { Reports } from './reports.component.ts';

describe('Reports', () => {
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
    Reports
  ]);

  it('should log ngOnInit', inject([ Reports ], (reports) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    reports.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
