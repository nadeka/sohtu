import { TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CampaignCreationService } from
    '../../services/campaign-creation/campaign-creation.service';
import { MockCampaignCreationService } from
    '../../services/campaign-creation/mock-campaign-creation.service';
import { CampaignSchedule } from './campaign-schedule.component';
import { FormsModule } from '@angular/forms';
import { DateTimePicker } from './date-time-picker/date-time-picker.component';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CampaignBreadcrumb } from '../campaign-breadcrumb';
import { LanguageService } from '../../services/language.service';
import { TestEmail } from './test-email/test-email.component';
import { AlertsService } from '../../services/alerts/alerts.service';
import { Router } from '@angular/router';

describe('Component: CampaignSchedule', () => {
  let fixture: any;
  let component: any;
  let campaignCreationService: any;
  let page: Page;

  class Page {
    breadCrumbLinks: Array<DebugElement>;
    navButtons: Array<DebugElement>;

    addPageElements() {
      this.navButtons = fixture.debugElement.queryAll(By.css('button'));
      this.breadCrumbLinks = fixture.debugElement.queryAll(By.css('a'));
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CampaignSchedule,
        DateTimePicker,
        CampaignBreadcrumb,
        TestEmail
      ],
      imports: [
        FormsModule,
        TimepickerModule,
        DatepickerModule
      ],
      providers: [
        {
          provide: CampaignCreationService,
          useClass: MockCampaignCreationService
        },
        {
          provide: Router,
          useClass: MockRouter
        },
        LanguageService,
        AlertsService
      ],
    }).compileComponents().then(function(arr) {
      fixture = TestBed.createComponent(CampaignSchedule);
      component = fixture.componentInstance;
      campaignCreationService = TestBed.get(CampaignCreationService);
      page = new Page();
      page.addPageElements();
      fixture.detectChanges();
    });
  }));

  it('should save campaign schedule to service when moving to another step', () => {
    const testSchedule = new Date(2017, 9, 10, 15, 55, 12, 0);
    const spy = spyOn(campaignCreationService, 'setSchedule');
    component.schedule = testSchedule;
    component.scheduling = 'schedule';
    fixture.detectChanges();
    page.navButtons[1].triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith(testSchedule);
  });

  it('when no template is chosen user can not move to content page', () => {
    campaignCreationService.setCurrentStep('schedule');
    page.navButtons[0].triggerEventHandler('click', null);
    expect(campaignCreationService.getCurrentStep()).toBe('schedule');
  });

});

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}
