
// Load the implementations that should be tested
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, async} from '@angular/core/testing';
import { CampaignBasicInfo } from './campaign-basic-info.component.ts';
import { LanguageService } from '../../../services/language.service';
import { DebugElement }    from '@angular/core';
import { By }              from '@angular/platform-browser';

describe('CampaignBasicInfo', () => {
  let comp:     CampaignBasicInfo;
  let fixture:  ComponentFixture<CampaignBasicInfo>;
  let lang:     LanguageService;

  beforeEach(async(() => {

     TestBed.configureTestingModule({
       declarations: [ CampaignBasicInfo ], // declare the test component
       imports: [ FormsModule ],
       providers: [
           LanguageService
       ]
     }).compileComponents().then(() => {

         fixture = TestBed.createComponent(CampaignBasicInfo);

         comp = fixture.componentInstance; // CampaignBasicInfo test instance
         lang = new LanguageService();
       });
   }));


  // Tests for the functions
  it('Labels should have correct text value', () => {
    expect(comp.campaignNameLabel).toBe(lang.getWord('CAMPAIGN_NAME_LABEL'));
    expect(comp.campaignSubjectLabel).toBe(lang.getWord('CAMPAIGN_SUBJECT_LABEL'));
  });

  it('Changing campaign name should work', function() {
    comp.onNameChange('new name');
    expect(comp.campaignName).toBe('new name');

    comp.campaignName = 'test';
    expect(comp.getName()).toBe('test');
  });

  it('Getting campaign name should work', function() {
    comp.onNameChange('new name');
    expect(comp.getName()).toBe('new name');
  });

  it('Changing subject should work', function() {
    comp.onSubjectChange('new subject');
    expect(comp.campaignSubject).toBe('new subject');

    comp.campaignSubject = 'test';
    expect(comp.getSubject()).toBe('test');
  });

  it('Getting campaign subject should work', function() {
    comp.onSubjectChange('new subject');
    expect(comp.getSubject()).toBe('new subject');
  });


  // Test for the UI
  it('Input field for name should be binded correctly', function()  {
      // trigger bindings
      fixture.detectChanges();

      let nameInput:    HTMLInputElement;
      this.nameInput = fixture.debugElement.query(By.css('input')).nativeElement;

      // Set input and detect changes
      this.nameInput.value = 'test';
      this.nameInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(comp.getName()).toBe('test');
  });

  it('Input field for subject should be binded correctly', function() {
      // trigger bindings
      fixture.detectChanges();

      let subjectInput:    HTMLInputElement;
      this.subjectInput = fixture.debugElement.query(By.css('#new-campaign-subject')).nativeElement;

      // Set subject and detect changes
      this.subjectInput.value = 'test subject';
      this.subjectInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(comp.getSubject()).toBe('test subject');
  });
});
