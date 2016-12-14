import { Component, OnInit, SecurityContext } from '@angular/core';
import { CampaignCreationService } from '../../../services/campaign-creation/campaign-creation.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'campaign-chosen-template',
  styleUrls: [ 'campaign-chosen-template.style.css' ],
  templateUrl: 'campaign-chosen-template.template.html',
})

export class CampaignChosenTemplate {
  templateContent: SafeHtml = '';
  constructor(private campaignCreationService: CampaignCreationService,
              private sanitized: DomSanitizer) {}

  // for fetching template from the service
  updateTemplate() {
    if (this.campaignCreationService.getExistingModifiedTemplate()) {
      this.templateContent = this.sanitized.bypassSecurityTrustHtml(this.campaignCreationService.getContent().trim());
    } else {
      this.templateContent = this.sanitized.bypassSecurityTrustHtml(this.campaignCreationService.getTemplate().html);
      console.log(this.templateContent);
    }
  }

  getCurrentTemplateContent(): string {
    return document.getElementById('emailContainer').innerHTML;
  }

  saveContent() {
    let content = document.getElementById('emailContainer').innerHTML;
    this.campaignCreationService.setContent(content);
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
    // have to remove "old" editors. Needed for navigating back and forth the pages and having
    // tinyMce load again
    tinymce.remove();
    tinymce.init({
      selector: 'div.editable',
      inline: true,
      menubar: false,
      plugins: ['link'],
      target_list: false,
      toolbar: 'bold italic | alignleft aligncenter alignright alignjustify | link'
    });
  }
}
