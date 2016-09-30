import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';


import 'jquery';
import 'bootstrap';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.style.less').toString()
  ],
  templateUrl: './app.mainComponent.html'
})

export class App {
  name = 'Sohtu';

  constructor(){}
}
