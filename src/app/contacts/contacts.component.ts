import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'contacts',
  styles: [`
  `],
  templateUrl: './contacts.template.html'
})
export class Contacts {
  localState = { value: '' };
  constructor(public appState: AppState, public route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('hello `Contacts` component');
    // this.title.getData().subscribe(data => this.data = data);
  }
  submitState(value) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
