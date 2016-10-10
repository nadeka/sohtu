import { Component, ViewEncapsulation } from '@angular/core';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [ 'app.style.css' ],
  templateUrl: 'app.component.html'
})

export class App {
  name = 'Sohtu';

  constructor(){}
}
