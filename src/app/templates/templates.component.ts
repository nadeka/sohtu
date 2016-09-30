import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'templates',
  styles: [`
  `],
  templateUrl: './templates.template.html'
})
export class Templates {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Templates` component');
  }

}
