import { Component, OnInit} from '@angular/core';

import { AppState } from '../app.service';

@Component({
  selector: 'dashboard',  // <dashboard></dashboard>


  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './dashboard.style.css' ],

  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './dashboard.template.html'
})

export class Dashboard {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Dashboard` component');
  }

}
