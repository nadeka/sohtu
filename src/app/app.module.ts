import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routes }   from './app.routes';

import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { ENV_PROVIDERS } from './environment';
import { AppState, InternalStateType } from './app.service';

// Main component
import { App } from './app.component';

// Other components
import { Dashboard } from './dashboard/dashboard.component';
import { Contacts } from './contacts/contacts.component';
import { Marketing } from './marketing/marketing.component';
import { Campaigns } from './campaigns/campaigns.component';
import { MailingLists } from './mailing-lists/mailing-lists.component';
import { Templates } from './templates/templates.component';
import { SocialMedia } from './social-media/social-media.component';
import { Reports } from './reports/reports.component';
import { CampaignSettings } from './create-campaign/campaign-settings/campaign-settings.component';
import { CampaignBasicInfo } from './create-campaign/campaign-settings/campaign-basic-info/campaign-basic-info.component';
import { CampaignMailingLists } from './create-campaign/campaign-settings/campaign-mailing-lists/campaign-mailing-lists.component';
import { CampaignTemplates } from './create-campaign/campaign-templates/campaign-templates.component';
import { CampaignTemplatesList } from './create-campaign/campaign-templates/campaign-templates-list/campaign-templates-list.component';
import { CampaignSchedule } from './create-campaign/campaign-schedule/campaign-schedule.component';
import { NoContent } from './no-content/no-content';
import { HTML2CanvasService } from './services/html2canvas/html2canvas.service';

// Services
import { MailingListsService } from './services/mailing-lists/mailing-lists.service';
import { TemplatesService } from './services/templates/templates.service';

// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState
];

type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(routes, { useHash: true }),
        FormsModule,
        DropdownModule
    ],
    declarations: [
        App,
        Dashboard,
        Contacts,
        Marketing,
        Campaigns,
        MailingLists,
        Templates,
        SocialMedia,
        Reports,
        CampaignSettings,
        CampaignBasicInfo,
        CampaignMailingLists,
        CampaignTemplates,
        CampaignTemplatesList,
        CampaignSchedule,
        NoContent
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        APP_PROVIDERS,
        MailingListsService,
        TemplatesService,
        HTML2CanvasService
    ],
    bootstrap: [ App ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) {}

    hmrOnInit(store: StoreType) {
        if (!store || !store.state) return;
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // save state
        const state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues  = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
