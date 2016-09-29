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
import { SocialMedia } from './social-media.component.ts';

describe('SocialMedia', () => {
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
    SocialMedia
  ]);

  it('should log ngOnInit', inject([ SocialMedia ], (socialMedia) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    socialMedia.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
