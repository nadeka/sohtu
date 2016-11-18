import { Component, ChangeDetectorRef } from '@angular/core';
import { DateTimePicker } from './date-time-picker/date-time-picker.component';
import { CampaignCreationService } from
        '../../services/campaign-creation/campaign-creation.service';
import { CampaignBreadcrumb } from '../campaign-breadcrumb';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'campaign-schedule',
  templateUrl: 'campaign-schedule.template.html',
  styleUrls: [ '../campaign-creation.style.css', 'campaign-schedule.style.css'],
  providers: [DateTimePicker, CampaignBreadcrumb]
})

export class CampaignSchedule {
  schedule: Date;
  scheduling: string;

  previousLabel = this.language.getWord('PREVIOUS_LABEL');
  nextLabel = this.language.getWord('NEXT_LABEL');
  campaignScheduleLabel = this.language.getWord('CAMPAIGN_SCHEDULE_LABEL');
  campaignWillBeSentLabel = this.language.getWord('CAMPAIGN_WILL_BE_SENT_LABEL');
  setCurrentTimeButton = this.language.getWord('SET_CURRENT_TIME_BUTTON');

  constructor(private language: LanguageService,
              private campaignCreationService: CampaignCreationService,
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
      this.campaignCreationService.setSchedule(this.schedule);
  }

  setCurrentTime() {
    this.schedule = new Date();
  }

}
