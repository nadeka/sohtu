import { Component, OnInit} from '@angular/core';
import { CampaignCreationService } from '../../../services/campaign-creation/campaign-creation.service';
import { CampaignTemplate } from '../../../models/campaign-template.model';
import { ModifiedTemplate } from '../../../models/modified-template.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'campaign-chosen-template',
  styleUrls: [ 'campaign-chosen-template.style.css' ],
  templateUrl: 'campaign-chosen-template.template.html',
})

export class CampaignChosenTemplate {
  templateContent : SafeHtml = '';
  modifiedTemplate : ModifiedTemplate;
  constructor(private campaignCreationService: CampaignCreationService,private sanitized: DomSanitizer) {}

  // for fetching template from the service
  updateTemplate() {
    this.templateContent = this.sanitized.bypassSecurityTrustHtml(this.campaignCreationService.getTemplate().content);
  }

  getCurrentTemplateContent() {
    return document.getElementById('emailContainer').outerHTML;
  }

  saveContent() {
    this.modifiedTemplate = new ModifiedTemplate(document.getElementById('emailContainer').innerHTML);
    this.campaignCreationService.setModifiedTemplate(this.modifiedTemplate);
    this.campaignCreationService.setChooseNew(false);
  }

  // load template from service
  ngOnInit() {
    console.log('CampaignChosenTemplate component created');
    this.updateTemplate();
  }

  // load tinyMCE last
  ngAfterViewInit() {
    this.loadTinymce();
  }

  // for loading tinyMCE
  loadTinymce() {
    tinymce.init({
      selector: 'div.tinymce',
      theme: 'inlite',
      insert_toolbar: '',
      selection_toolbar: 'bold italic | quicklink | h1 h2 | alignleft aligncenter alignright alignjustify',
      inline: true,
      paste_data_images: true,
      content_css: [

      ]
    });
  }
}
