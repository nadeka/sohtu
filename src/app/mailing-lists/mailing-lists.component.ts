import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'mailing-lists',
  styles: [`
  `],
  templateUrl: './mailing-lists.template.html'
})
export class MailingLists {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Mailing-lists` component');
  }
}