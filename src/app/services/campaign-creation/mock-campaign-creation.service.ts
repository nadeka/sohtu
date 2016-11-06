import { Injectable } from '@angular/core';
import { MAILING_LISTS } from '../../mock-data/mock-mailing-lists';
import { MailingList } from '../../models/mailing-list.model';

@Injectable()
export class MockCampaignCreationService {

  stepParameter: string;
  name: string;
  subject: string;
  mailingLists: Array<MailingList>;

  getSchedule() {
    return new Date(2017, 1, 2, 14, 54, 45, 0);
  }

  goToStep(step: string) {
    this.stepParameter = step;
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getSubject() {
    return this.subject;
  }

  setSubject(subject: string) {
    this.subject = subject;
  }

  getMailingLists() {
    return this.mailingLists;
  }

  setMailingLists(mailingLists: Array<MailingList>) {
    this.mailingLists = mailingLists;
  }


}
