import { TemplatesService } from './templates.service';

describe('Service: TemplatesService', () => {

    beforeEach(function() {
        this.templatesService = new TemplatesService();
    });

    it('should return 9 templates', function() {
        this.templatesService.getTemplates()
            .then(templates => validateTemplates(templates));
    });
});

function validateTemplates(templates) {
    expect(templates.length).toBe(9);
}
