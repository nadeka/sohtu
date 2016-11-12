import { TestBed, async} from '@angular/core/testing';
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
        DateTimePicker
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

  it('should navigate to correct pages through the service using workflow navigation', () => {
    page.breadCrumbLinks[0].triggerEventHandler('click', null);
    expect(campaignCreationService.stepParameter).toBe('');
    page.breadCrumbLinks[1].triggerEventHandler('click', null);
    expect(campaignCreationService.stepParameter).toBe('template');
    page.breadCrumbLinks[2].triggerEventHandler('click', null);
    expect(campaignCreationService.stepParameter).toBe('content');
    page.breadCrumbLinks[3].triggerEventHandler('click', null);
    expect(campaignCreationService.stepParameter).toBe('confirmation');
  });

  it('should save campaign schedule to service when moving to another step', () => {
    const testSchedule = new Date(2017, 9, 10, 15, 55, 12, 0);
    const spy = spyOn(campaignCreationService, 'setSchedule');
    component.schedule = testSchedule;
    component.scheduling = 'schedule';
    fixture.detectChanges();
    page.navButtons[1].triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith(testSchedule);
  });

});
