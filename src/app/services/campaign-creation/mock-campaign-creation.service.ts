import { Injectable } from '@angular/core';

@Injectable()
export class MockCampaignCreationService {

  stepParameter: string;

  getSchedule() {
    return new Date(2017, 1, 2, 14, 54, 45, 0);
  }

  goToStep(step: string) {
    this.stepParameter = step;
  }

}
