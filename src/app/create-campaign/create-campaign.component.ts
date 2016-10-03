import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../app.service';


@Component({
  selector: 'create-campaign',
  templateUrl: './create-campaign.template.html'
})

export class CreateCampaign {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Create-campaign` component');
  }

}
