import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from '../../models/campaign.model';
import { MailingList } from '../../models/mailing-list.model';

@Injectable()
export class CampaignCreationService {

  public campaign: Campaign;
  public baseRoute = '/marketing/create-campaign';
  public steps = [
    '',
    'template',
    'schedule',
    'confirmation'
  ];

  constructor (@Inject(Router) public router: Router) {
    this.campaign = new Campaign();
  };

  public setSchedule(schedule: Date) {
    this.campaign.schedule = schedule;
  }

  public getSchedule() {
    return this.campaign.schedule;
  }

  public setMailingLists(mailingLists: Array<MailingList>) {
    console.log('Editing');
    console.log(mailingLists);
    this.campaign.mailingLists = mailingLists;
    console.log(this.campaign.mailingLists);
  };

  public getMailingLists() {
    return this.campaign.mailingLists;
  };

  public setName(name: string) {
    this.campaign.name = name;
  };

  public getName() {
    return this.campaign.name;
  };

  public getInitialStep() {
    this.router.navigate([this.baseRoute + '/' + this.steps[0]]);
  };

  public goToStep(step): any {
    this.router.navigate([this.baseRoute + '/' + step]);
  };

};
