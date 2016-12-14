import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from '../../models/campaign.model';
import { MailingList } from '../../models/mailing-list.model';
import { Template } from '../../models/template.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Settings } from '../../settings';
import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from 'ng2-webstorage';

@Injectable()
export class CampaignCreationService {

  public campaign: Campaign;
  public baseRoute = '/marketing/create-campaign';
  private step: string;
  private existingModifiedTemplate: boolean = false;
  private emailCampaignsURL = Settings.API_BASE_URL() + '/email-campaigns';

  constructor (@Inject(Router) public router: Router,
                private http: Http,
                private storage:LocalStorageService) {
    this.campaign = new Campaign();
    this.campaign.name = this.storage.retrieve('campaign-name');
    this.campaign.subject = this.storage.retrieve('campaign-subject');
    this.campaign.mailingLists = JSON.parse(this.storage.retrieve('campaign-mailing-lists'));
    this.campaign.content = this.storage.retrieve('campaign-content');
    this.campaign.template = JSON.parse(this.storage.retrieve('campaign-template'));
    let time = this.storage.retrieve('campaign-schedule');
    if (time) {
      this.campaign.schedule = new Date(time);
    }
  };

  // This method posts a ready campaign to backend
  // Returns the campaign
  public postCampaign(): Promise<Response> {

    // POST campaign should be sent in the following form
    // {
    // "name":"campaign name",
    // "subject":"campaign subject",
    // "mailingLists":[1,2,3],                // this is mailing list id:s
    // "template":"1"                         // this is the template id
    // "content":"<h1>"                       // html content of the email
    // "schedule":"2016-11-24T09:30:50.621Z"  // date
    // "status:"pending"                      //Only campaigns with status 'pending' are sent
    // }
    let mailingLists = [];
    this.campaign.mailingLists.forEach(mailingList => {
        mailingLists.push(mailingList.id);
    });
    let bodyString = JSON.stringify({name: this.campaign.name,
                                     subject: this.campaign.subject,
                                     mailingLists: mailingLists,
                                     template: this.campaign.template.id,
                                     content: this.campaign.content.replace(/\"/g,'\''),
                                     schedule: this.campaign.schedule,
                                     status: 'pending'}); // Stringify payload

    let headers    = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.emailCampaignsURL, bodyString, options) // ...using post request
                        .toPromise().then((res: Response) => res) // ...returning response
                        .catch((error: any) => Promise.reject(error.json().error || 'Server error')); // ...errors if any
  }

  // This method posts a test campaign to backend
  public postTestCampaign(): Promise<Response> {
    // POST test campaign should be sent in the following form
    // {
    // "subject":"campaign subject",
    // "mailingLists":[1,2,3],                // this is mailing list id:s
    // "content":"<h1>"                       // html content of the email
    // }

    let testEmailAddresses = ''/*get the emails for test mail*/;

    let bodyString = JSON.stringify({
      subject: this.campaign.subject,
      emailAddresses: testEmailAddresses,
      content: this.campaign.content,
    });

    let headers    = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.emailCampaignsURL + '/test', bodyString, options) // ...using post request
      .toPromise().then((res: Response) => res) // Returning response
      .catch((error: any) => Promise.reject(error.json().error || 'Server error')); // ...errors if any
  }

  // Getters and setters
  public setSchedule(schedule: Date) {
    this.storage.store('campaign-schedule', schedule.getTime());
    this.campaign.schedule = schedule;
  }

  public getSchedule() {
    return this.campaign.schedule;
  }

  public setMailingLists(mailingLists: Array<MailingList>) {
    this.storage.store('campaign-mailing-lists', JSON.stringify(Array.from(mailingLists)));
    this.campaign.mailingLists = mailingLists;
  };

  public getMailingLists(): Array<MailingList> {
    return this.campaign.mailingLists;
  };

  public setName(name: string) {
    this.storage.store('campaign-name', name);
    this.campaign.name = name;
  };

  public getName() {
    return this.campaign.name;
  };

  public getSubject() {
    return this.campaign.subject;
  }

  public setSubject(subject: string) {
    this.storage.store('campaign-subject', subject);
    this.campaign.subject = subject;
  }

  public setTemplate(template: Template) {
    this.storage.store('campaign-template', JSON.stringify(template));
    this.campaign.template = template;
  }

  public setContent(content: string) {
    this.campaign.content = content;
    this.storage.store('campaign-content', content);
    this.existingModifiedTemplate = true;
  }

  public getTemplate() {
      return this.campaign.template;
  }

  public getContent() {
    return this.campaign.content;
  }

  public getCampaign() {
    return this.campaign;
  }

  public goToStep(step): any {
    this.router.navigate([this.baseRoute + '/' + step]);
  };

  public setCurrentStep(step: string) {
    this.step = step;
  }

  public getExistingModifiedTemplate(): boolean {
    return this.existingModifiedTemplate;
  }

  public setExistingModifiedTemplate(existingModifiedTemplate: boolean): void {
    this.existingModifiedTemplate = existingModifiedTemplate;
  }

  public getCurrentStep() {
    return this.step;
  }

  // Check if campaign is ready to be sent to backend
  public isReady() {
    if ((this.campaign.name !== '') && (this.campaign.subject !== '') && (this.campaign.mailingLists.length > 0)) {
      return false;
    }
    return true;
  }

  public clearCampaign() {
    this.campaign = new Campaign();
    this.storage.clear('campaign-mailing-lists');
    this.storage.clear('campaign-name');
    this.storage.clear('campaign-subject');
    this.storage.clear('campaign-schedule');
    this.storage.clear('campaign-content');
    this.storage.clear('campaign-template');
    this.existingModifiedTemplate = false;
  }

};
