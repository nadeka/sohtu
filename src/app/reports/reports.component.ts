import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'reports',
  styles: [`
  `],
  templateUrl: './reports.template.html'
})

export class Reports {
  constructor() {
  }

  ngOnInit() {
    console.log('hello `Reports` component');
  }
}
