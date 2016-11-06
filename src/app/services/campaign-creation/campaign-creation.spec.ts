import { CampaignCreationService } from './campaign-creation.service';

describe('Service: CampaignCreationService', () => {

    let campaignCreationService: any;
    let router: any;

    beforeEach(() => {
        this.router = new RouterStub();
        this.campaignCreationService = new CampaignCreationService(this.router);
    });

    it('should navigate to correct url', () => {
        this.campaignCreationService.goToStep('template');
        expect(this.router.url[0]).toBe('/marketing/create-campaign/template');
    });

    it('should initialize the campaign', () => {
        expect(this.campaignCreationService.campaign).toBeDefined();
    });
    
});

class RouterStub {
  url: any;
  navigate(url: any) { this.url = url; }
}
