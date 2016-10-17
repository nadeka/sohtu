import { Component, OnInit} from '@angular/core';
import { TemplatesService } from '../../../services/templates/templates.service';
import { CampaignTemplate } from '../../../models/campaign-template.model';

@Component({
  selector: 'campaign-chosen-template',
  styleUrls: [ 'campaign-chosen-template.style.css' ],
  templateUrl: 'campaign-chosen-template.template.html'
})

export class CampaignChosenTemplate {
  templateContent = '';
  templateTemp;
  constructor(private templatesService: TemplatesService) {}


  updateTemplate() {
    this.templateContent=this.templatesService.getSelectedTemplate().template.content;
    console.log(this.templateContent);
  }

  ngOnInit() {
    console.log('CampaignChosenTemplate component created');
  }
}
