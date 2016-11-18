import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from '../../models/campaign.model';
import { MailingList } from '../../models/mailing-list.model';
import { Template } from '../../models/template.model';
import { ModifiedTemplate } from '../../models/modified-template.model'

@Injectable()
export class CampaignCreationService {

  public campaign: Campaign;
  public baseRoute = '/marketing/create-campaign';
  private step: string;

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
    this.campaign.mailingLists = mailingLists;
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

  public getSubject() {
    return this.campaign.subject;
  }

  public setSubject(subject: string) {
    this.campaign.subject = subject;
  }

  public setTemplate(template: Template) {
    this.campaign.template = template;
  }

  public setModifiedTemplate(modifiedTemplate: ModifiedTemplate) {
    this.campaign.modifiedTemplate = modifiedTemplate;
  }

  public getTemplate() {
      return this.campaign.template;
  }

  public getModifiedTemplate() {
    return this.campaign.modifiedTemplate;
  }

  public getCampaign() {
    return this.campaign;
  }

  public setChooseNew(b: boolean) {
    this.chooseNew = b;
  }

  public getChooseNew() {
    return this.chooseNew;
  }

  public goToStep(step): any {
    this.router.navigate([this.baseRoute + '/' + step]);
  };

  public setCurrentStep(step: string) {
    this.step = step;
  }

  public getCurrentStep() {
    return this.step;
  }

};
