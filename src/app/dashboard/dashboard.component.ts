import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'dashboard',  // <dashboard></dashboard>
  styleUrls: [ 'dashboard.style.css' ],
  templateUrl: 'dashboard.template.html'
})

export class Dashboard {

  ngOnInit() {
    console.log('hello `Dashboard` component');
  }
}
