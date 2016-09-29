import { RouterConfig } from '@angular/router';
import { Dashboard } from './dashboard';
import { Contacts } from './contacts';
import { Marketing } from './marketing';
import { Campaigns } from './campaigns';
import { MailingLists } from './mailing-lists';
import { Templates } from './templates';
import { SocialMedia } from './social-media';
import { Reports } from './reports';

import { NoContent } from './no-content';

export const routes: RouterConfig = [
  { path: '',      component: Dashboard },
  { path: 'dashboard',  component: Dashboard },
  { path: 'contacts', component: Contacts },
  { path: 'marketing', component: Marketing,
    children: [
      { path: '', component: Dashboard },
      { path: 'dashboard', component: Dashboard },
      { path: 'campaigns', component: Campaigns },
      { path: 'mailing-lists', component: MailingLists },
      { path: 'templates', component: Templates }
    ]},
  { path: 'social-media',  component: SocialMedia },
  { path: 'reports',  component: Reports },
  { path: '**',    component: NoContent }
];
