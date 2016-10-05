import { Component } from '@angular/core';

@Component({
  selector: 'contacts',
  styles: [`
  `],
  templateUrl: './contacts.template.html'
})

export class Contacts {
  constructor(public appState: AppState, public route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('hello `Contacts` component');
  }

}
