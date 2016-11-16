import { Component, ChangeDetectorRef } from '@angular/core';
import { DateTimePicker } from './date-time-picker/date-time-picker.component';
import { CampaignCreationService } from
        '../../services/campaign-creation/campaign-creation.service';
import { CampaignBreadcrumb } from '../campaign-breadcrumb';

@Component({
  selector: 'campaign-schedule',
  templateUrl: 'campaign-schedule.template.html',
  styleUrls: [ '../campaign-creation.style.css', 'campaign-schedule.style.css'],
  providers: [DateTimePicker, CampaignBreadcrumb]
})

export class CampaignSchedule {
  schedule: Date;
  scheduling: string;

  constructor(private campaignCreationService: CampaignCreationService,
              private ref: ChangeDetectorRef) {
    this.scheduling = 'sendNow';
  }

  ngOnInit() {
    this.schedule = this.campaignCreationService.getSchedule();
    if (this.schedule === undefined) {
      this.schedule = new Date();
    }
  }

  ngAfterViewInit() {
    this.campaignCreationService.setCurrentStep('schedule');
    this.ref.detectChanges();
  }

  goToStep(step: string) {
    this.saveChanges();
    this.campaignCreationService.goToStep(step);
  }

  saveChanges() {
    if (this.scheduling === 'sendNow') {
      this.campaignCreationService.setSchedule(new Date());
    } else {
      this.campaignCreationService.setSchedule(this.schedule);
    }
  }

}
