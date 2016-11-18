import { Component, ViewEncapsulation } from '@angular/core';
import { LanguageService } from './services/language.service';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [ 'app.style.css' ],

  templateUrl: 'app.component.html'
})

export class App {
public status:{isopen:boolean} = {isopen: false};
  name = 'Sohtu';

  dashboardLabel = this.language.getWord('DASBHOARD_LABEL');
  contactsLabel = this.language.getWord('CONTACTS_LABEL');
  marketingLabel = this.language.getWord('MARKETING_LABEL');
  overviewLabel = this.language.getWord('OVERVIEW_LABEL');
  campaignsLabel = this.language.getWord('CAMPAIGNS_LABEL');
  createNewCampaignLabel = this.language.getWord('CREATE_NEW_CAMPAIGN_LABEL');
  mailingListsLabel = this.language.getWord('MAILING_LISTS_LABEL');
  templatesLabel = this.language.getWord('TEMPLATES_LABEL');
  socialMediaLabel = this.language.getWord('SOCIAL_MEDIA_LABEL');
  reportsLabel = this.language.getWord('REPORTS_LABEL');

  constructor(private language: LanguageService){}
  public toggleDropdown($event:MouseEvent):void {
  $event.preventDefault();
  $event.stopPropagation();
  this.status.isopen = !this.status.isopen;
}
}
