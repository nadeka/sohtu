import { Component } from '@angular/core';
import { DateTimePicker } from './date-time-picker/date-time-picker.component'

@Component({
  selector: 'campaign-schedule',
  templateUrl: 'campaign-schedule.template.html',
  providers: [DateTimePicker]
})

export class CampaignSchedule {
  schedule: Date;
  scheduling: string;

  constructor() {
    this.schedule = new Date();
    this.scheduling = "sendNow";
  }

}
