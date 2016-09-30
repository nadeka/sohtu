import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'social-media',
  styles: [`
  `],
  templateUrl: './social-media.template.html'
})

export class SocialMedia {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `SocialMedia` component');
  }

}
