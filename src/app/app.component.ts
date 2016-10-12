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
public status:{isopen:boolean} = {isopen: false};
  name = 'Sohtu';

  constructor(){}
  public toggleDropdown($event:MouseEvent):void {
  $event.preventDefault();
  $event.stopPropagation();
  this.status.isopen = !this.status.isopen;
}
}
