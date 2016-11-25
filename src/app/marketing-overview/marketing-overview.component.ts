import { Component, Injectable } from '@angular/core';
import { AlertsService } from '../services/alerts/alerts.service';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'marketing-overview',
  templateUrl: 'marketing-overview.template.html'
})

export class MarketingOverview {

  private campaignCreatedAlerts = [];

  constructor(private alertsService: AlertsService) {

  }

  ngOnInit() {
    console.log('marketing-overview componen created');
    let alert: string = this.alertsService.getCampaignCreatedAlert();
    if(alert != '') {
      this.campaignCreatedAlerts = [{
                                    type:'success',
                                    msg: alert,
                                    closable: true
                                  }];
    }
  }
}
