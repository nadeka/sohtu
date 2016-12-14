import { TemplatesService } from './templates.service';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
    BaseRequestOptions, Http, XHRBackend, HttpModule, ResponseOptions, Response
}
    from '@angular/http';

import { RESPONSE_TEMPLATES } from '../../test-data/test-templates';

describe('Service: TemplatesService', () => {
    let templatesService: TemplatesService;
    let mockBackend: MockBackend;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                TemplatesService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory:
                        (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backend, defaultOptions);
                        }
                }
            ],
            imports: [
                HttpModule
            ]
        }).compileComponents().then(function(arr) {
            templatesService = getTestBed().get(TemplatesService);
            mockBackend = getTestBed().get(MockBackend);
        });
    }));

    function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {
                const responseOptions = new ResponseOptions(options);
                const response = new Response(responseOptions);

                connection.mockRespond(response);
        });
    }

    it('should return 2 templates', async(() => {
        setupConnections(mockBackend, {
            body: RESPONSE_TEMPLATES,
            status: 200
        });

        templatesService.getTemplates()
            .then(templates => expect(templates.length).toBe(2));
    }));
});
