import { Component, OnInit} from '@angular/core';
import { TemplatesService } from '../../../services/templates/templates.service';
import { CampaignTemplate } from '../../../models/campaign-template.model';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'campaign-chosen-template',
  styleUrls: [ 'campaign-chosen-template.style.css' ],
  templateUrl: 'campaign-chosen-template.template.html',
})

export class CampaignChosenTemplate {
  templateContent = '';

  constructor(private templatesService: TemplatesService, private sanitized: DomSanitizer) {}

  updateTemplate() {
    this.templateContent = this.sanitized.bypassSecurityTrustHtml(this.templatesService.getSelectedTemplate().template.content);

    console.log(this.getCurrentTemplateContent());
  //  tinymce.remove();
    this.loadTinymce();
  }

  loadTinymce() {
    tinymce.init({
      selector: 'div.tinymce',
      theme: 'inlite',
      plugins: '',
      insert_toolbar: '',
      selection_toolbar: 'bold italic | quicklink | h1 h2 | alignleft aligncenter alignright alignjustify',
      inline: true,
      paste_data_images: true,
      content_css: [

      ]
    });
  }

  getCurrentTemplateContent() {
    return document.getElementById('emailContainer').outerHTML;
  }

  ngOnInit() {
    console.log('CampaignChosenTemplate component created');

    // Text editor for editing emails
    this.loadTinymce();
  }
}
