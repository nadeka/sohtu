import { Component } from '@angular/core';
import { DateTimePicker } from './date-time-picker/date-time-picker.component';
import { CampaignCreationService } from
        '../../services/campaign-creation/campaign-creation.service';

@Component({
  selector: 'campaign-schedule',
  templateUrl: 'campaign-schedule.template.html',
  styleUrls: [ '../campaign-creation.style.css', 'campaign-schedule.style.css'],
  providers: [DateTimePicker]
})

export class CampaignSchedule {
  schedule: Date;
  scheduling: string;

  constructor(private campaignCreationService: CampaignCreationService) {
    this.scheduling = 'sendNow';
  }

  ngOnInit() {
    this.schedule = this.campaignCreationService.getSchedule();
    if (this.schedule === undefined) {
      this.schedule = new Date();
    }
  }

  goToStep(step: string) {
    if (this.scheduling === 'sendNow') {
      this.campaignCreationService.setSchedule(new Date());
    } else {
      this.campaignCreationService.setSchedule(this.schedule);
    }
    this.campaignCreationService.goToStep(step);
  }

}
