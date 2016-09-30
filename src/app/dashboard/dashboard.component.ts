import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AppState } from '../app.service';
//import { Title } from './title';

@Component({
  selector: 'dashboard',  // <dashboard></dashboard>
  // We need to tell Angular's Dependency Injection which providers are in our app.
//  providers: [
//    Title
//  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],

  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './dashboard.style.css' ],

  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './dashboard.template.html'
})

export class Dashboard  implements OnInit, AfterViewInit {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Dashboard` component');
  }
  ngAfterViewInit(){

  }

}
