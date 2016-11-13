import { Injectable } from '@angular/core';
import { MAILING_LISTS } from '../../mock-data/mock-mailing-lists';
import { MailingList } from '../../models/mailing-list.model';
import { Campaign } from '../../models/campaign.model';
import { Template } from '../../models/template.model';

@Injectable()
export class MockCampaignCreationService {

  stepParameter: string;
  campaign: Campaign;

  constructor() {
    this.campaign = new Campaign();
  }

  getCampaign() {
    return this.campaign;
  }

  getSchedule() {
    return this.campaign.schedule;
  }

  setSchedule(schedule: Date) {
    this.campaign.schedule = schedule;
  }

  goToStep(step: string) {
    this.stepParameter = step;
  }

  getName() {
    return this.campaign.name;
  }

  setName(name: string) {
    this.campaign.name = name;
  }

  getSubject() {
    return this.campaign.subject;
  }

  setSubject(subject: string) {
    this.campaign.subject = subject;
  }

  getTemplate() {
    return this.campaign.template;
  }

  setTemplate(template: Template) {
    this.campaign.template = template;
  }

  getMailingLists() {
    return this.campaign.mailingLists;
  }

  setMailingLists(mailingLists: Array<MailingList>) {
    this.campaign.mailingLists = mailingLists;
  }


}
