import {
    TestBed,
    async
}
from '@angular/core/testing';

import { CampaignCreationService } from '../../services/campaign-creation/campaign-creation.service';
import { MockCampaignCreationService } from '../../services/campaign-creation/mock-campaign-creation.service';
import { CampaignSchedule } from './campaign-schedule.component';
import { FormsModule } from '@angular/forms';
import { DateTimePicker } from './date-time-picker/date-time-picker.component';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

describe('Component: CampaignSchedule', () => {
    let fixture: any;
    let component: any;
    let campaignCreationService: any;

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
              }
            ],
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(CampaignSchedule);
            component = fixture.componentInstance;
            campaignCreationService = TestBed.get(CampaignCreationService);
            fixture.detectChanges();
          });
    }));

    // it('should fetch schedule from service', () => {
    //     expect(campaignCreationService.getSchedule).toHaveBeenCalled();
    // });
    //
    // it('should initialize schedule', () => {
    //     expect(component.schedule).toBeDefined();
    // });
    //
    // it('should initialize scheduling as sendNow', () => {
    //     expect(component.scheduling).toBe('sendNow');
    // });

});
