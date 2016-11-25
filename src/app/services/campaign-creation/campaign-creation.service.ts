import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from '../../models/campaign.model';
import { MailingList } from '../../models/mailing-list.model';
import { Template } from '../../models/template.model';
import { ModifiedTemplate } from '../../models/modified-template.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Settings } from '../../settings';

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

  public postCampaign(): void/*Observable<Campaign[]>*/ {
    this.campaign.template.htmlImage = '';
    let bodyString = JSON.stringify(this.campaign); // Stringify payload
    let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option

  //  return this.http.post(this.emailCampaignsURL, this.campaign, options) // ...using post request
    //                    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      //                  .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
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
    if((this.campaign.name != '') && (this.campaign.subject != '')) {
      return false;
    }
    return true;
  }

};
