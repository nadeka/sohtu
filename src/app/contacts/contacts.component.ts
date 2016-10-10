import { Component } from '@angular/core';

@Component({
  selector: 'contacts',
  styles: [`
  `],
  templateUrl: 'contacts.template.html'
})

export class Contacts {
  constructor() {}

  ngOnInit() {
    console.log('hello `Contacts` component');
  }

}
