import { Injectable } from '@angular/core';
import { MAILING_LISTS } from '../../mock-data/mock-mailing-lists';
import { MailingList } from '../../models/mailing-list.model';
import { Campaign } from '../../models/campaign.model';
import { Template } from '../../models/template.model';
import { ModifiedTemplate } from '../../models/modified-template.model';

@Injectable()
export class MockCampaignCreationService {

  stepParameter: string;
  campaign: Campaign;
  step: string;

  constructor() {
    this.campaign = new Campaign();
  }

  postCampaign() {
    return "test";
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

  getModifiedTemplate() {
    return this.campaign.modifiedTemplate;
  }

  setTemplate(template: Template) {
    this.campaign.template = template;
  }

  setModifiedTemplate(modifiedTemplate: ModifiedTemplate) {
    this.campaign.modifiedTemplate = modifiedTemplate;
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
    if((this.campaign.name != '') && (this.campaign.subject != '')) {
      return false;
    }
    return true;
  }

}
