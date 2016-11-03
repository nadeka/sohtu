
// Load the implementations that should be tested
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignBasicInfo } from './campaign-basic-info.component.ts';
import { LanguageService } from '../../../services/language.service';

describe('CampaignBasicInfo', () => {
  let comp:    CampaignBasicInfo;
  let fixture: ComponentFixture<CampaignBasicInfo>;
  let lang: LanguageService;

  beforeEach(() => {
     TestBed.configureTestingModule({
       declarations: [ CampaignBasicInfo ], // declare the test component
       imports: [ FormsModule ],
       providers: [
           LanguageService
       ]
     });

     fixture = TestBed.createComponent(CampaignBasicInfo);

     comp = fixture.componentInstance; // CampaignBasicInfo test instance
     lang = new LanguageService();

   });

  it('Labels should have correct text value', () => {
    expect(comp.campaignNameLabel).toBe(lang.getWord('CAMPAIGN_NAME_LABEL'));
    expect(comp.campaignSubjectLabel).toBe(lang.getWord('CAMPAIGN_SUBJECT_LABEL'));
  });

  it('Changing campaign name should work', function() {
    comp.onNameChange('new name');
    expect(comp.campaignName).toBe('new name');
  });

  it('Getting campaign name should work', function() {
    comp.onNameChange('new name');
    expect(comp.getName()).toBe('new name');
  });

  it('Changing subject should work', function() {
    comp.onSubjectChange('new subject');
    expect(comp.campaignSubject).toBe('new subject');
  });

  it('Getting campaign subject should work', function() {
    comp.onSubjectChange('new subject');
    expect(comp.getSubject()).toBe('new subject');
  });

});
