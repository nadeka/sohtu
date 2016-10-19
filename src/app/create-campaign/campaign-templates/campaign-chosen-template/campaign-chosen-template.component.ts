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

    // Text editor for editing emails
    tinymce.init({
      selector: 'div.tinymce',
      theme: 'inlite',
      plugins: '',
      insert_toolbar: '',
      selection_toolbar: 'bold italic | quicklink | h1 h2 | alignleft aligncenter alignright alignjustify',
      inline: true,
      paste_data_images: true,
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        '//www.tinymce.com/css/codepen.min.css'
      ]
    });
  }
}
