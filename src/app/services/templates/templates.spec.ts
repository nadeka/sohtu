import { TemplatesService } from './templates.service';

describe('Service: TemplatesService', () => {
    let templatesService: TemplatesService;

    beforeEach(function() {
        templatesService = new TemplatesService();
    });

    it('should return 9 templates', function() {
        templatesService.getTemplates()
            .then(templates => validateTemplates(templates));
    });
});

function validateTemplates(templates) {
    expect(templates.length).toBe(9);
}
