import { Routes } from '@angular/router';
import { Dashboard } from './dashboard';
import { Contacts } from './contacts';
import { Marketing } from './marketing';
import { Campaigns } from './campaigns';
import { MailingLists } from './mailing-lists';
import { Templates } from './templates';
import { SocialMedia } from './social-media';
import { Reports } from './reports';
import { CampaignSettings } from './create-campaign/campaign-settings';
import { CampaignSchedule } from './create-campaign/campaign-schedule';
import { CampaignTemplates } from './create-campaign/campaign-templates';
import { CampaignConfirmation } from './create-campaign/campaign-confirmation';
import { CampaignContent } from './create-campaign/campaign-content';
import { MarketingOverview } from './marketing-overview';

import { NoContent } from './no-content';

export const routes: Routes = [
  { path: '',      component: Dashboard },
  { path: 'dashboard',  component: Dashboard },
  { path: 'contacts', component: Contacts },
  { path: 'marketing', component: Marketing,
    children: [
      { path: 'marketing-overview', component: MarketingOverview },
      { path: 'campaigns', component: Campaigns },
      { path: 'mailing-lists', component: MailingLists },
      { path: 'create-campaign',
        children: [
          {
            path: '',
            component: CampaignSettings
          },
          {
            path: 'template',
            component: CampaignTemplates
          },
          {
            path: 'content',
            component: CampaignContent
          },
          {
            path: 'schedule',
            component: CampaignSchedule
          },
          {
            path: 'confirmation',
            component: CampaignConfirmation
          },
        ]
      },
      { path: 'templates', component: Templates }
    ]
  },
  { path: 'social-media',  component: SocialMedia },
  { path: 'reports',  component: Reports },
  { path: '**',    component: NoContent }
];
