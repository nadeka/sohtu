import { Injectable } from '@angular/core';
import { MAILING_LISTS } from '../../mock-data/mock-mailing-lists';
import { MailingList } from '../../models/mailing-list.model';
import { Campaign } from '../../models/campaign.model';
import { Template } from '../../models/template.model';

@Injectable()
export class MockCampaignCreationService {

  stepParameter: string;
  campaign: Campaign;
  step: string;

  constructor() {
    this.campaign = new Campaign();
  }

  postCampaign() {
    return 'test';
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

  getContent() {
    return this.campaign.content;
  }

  setTemplate(template: Template) {
    this.campaign.template = template;
  }

  setContent(content: string) {
    this.campaign.content = content;
  }

  getMailingLists() {
    return this.campaign.mailingLists;
  }

  setMailingLists(mailingLists: Array<MailingList>) {
    this.campaign.mailingLists = mailingLists;
  }

  setCurrentStep(step: string) {
    this.step = step;
  }

  getCurrentStep(): string {
    return this.step;
  }

  isReady() {
    if ((this.campaign.name !== '') && (this.campaign.subject !== '')) {
      return false;
    }
    return true;
  }

}
