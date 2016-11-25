import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from '../../models/campaign.model';
import { MailingList } from '../../models/mailing-list.model';
import { Template } from '../../models/template.model';
import { ModifiedTemplate } from '../../models/modified-template.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Settings } from '../../settings';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CampaignCreationService {

  public campaign: Campaign;
  public baseRoute = '/marketing/create-campaign';
  private step: string;
  private existingModifiedTemplate: boolean = false;
  private emailCampaignsURL = Settings.API_BASE_URL() + '/email_campaigns';

  constructor (@Inject(Router) public router: Router, private http: Http) {
    this.campaign = new Campaign();
  };

  public postCampaign(): Promise<Campaign> {

    // POST campaign should be sent in the following form
    // {
    // "name":"campaign name",
    // "subject":"campaign subject",
    // "mailingLists":[1,2,3],                // this is mailing list id:s
    // "template":"1"                         // this is the template id
    // "content":"<h1>"                       // html content of the email
    // "schedule":"2016-11-24T09:30:50.621Z"  // date

    let bodyString = JSON.stringify({name: this.campaign.name,
                                     subject: this.campaign.subject,
                                     mailingLists: this.getMailingListsIds(),
                                     template: this.campaign.template.id,
                                     content: this.campaign.modifiedTemplate,
                                     schedule: this.campaign.schedule}); // Stringify payload

    let headers    = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.emailCampaignsURL, bodyString, options) // ...using post request
                        .toPromise().then((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error:any) => Promise.reject(error.json().error || 'Server error')); //...errors if any
  }

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

  public getMailingListsIds() {
    let temp = []
    this.campaign.mailingLists.forEach(function(list) {
      temp.push(list.id);
    });
    return temp;
  }

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
    this.existingModifiedTemplate = true;
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

  public isReady() {
    if((this.campaign.name != '') && (this.campaign.subject != '') && (this.campaign.mailingLists.length > 0)) {
      return false;
    }
    return true;
  }

};
