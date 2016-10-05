import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'marketing',
  styles: [`
  `],
  templateUrl: './marketing.template.html'
})
export class Marketing {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Marketing` component');
  }
}
