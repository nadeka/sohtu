import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'campaigns',
  templateUrl: './campaigns.template.html'
})
export class Campaigns {

  constructor() {

  }

  ngOnInit() {
    console.log('Capaigns component created');
  }

}
