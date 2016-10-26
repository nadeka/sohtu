import {
    TestBed,
    async
}
from '@angular/core/testing';

import { DateTimePicker } from './date-time-picker.component';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

describe('Component: DateTimePicker', () => {
    let fixture: any;
    let component: any;
    let newTime: Date = new Date(2008, 9, 10, 15, 55, 12, 0);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DateTimePicker
            ],
            imports: [
              TimepickerModule,
              DatepickerModule
            ],
            providers: []
        }).compileComponents().then(function(arr) {
            fixture = TestBed.createComponent(DateTimePicker);
            component = fixture.componentInstance;

            // Detect changes to wire up the `fixture.nativeElement` as necessary:
            fixture.detectChanges();
        });
    }));

    it('changing time should change internal time', () => {
        component.time = newTime;
        expect(component.internalDateTime.getHours()).toBe(15);
        expect(component.internalDateTime.getMinutes()).toBe(55);
        expect(component.internalDateTime.getSeconds()).toBe(12);
    });

    it('changing date should change internal date', () => {
        component.date = newTime;
        expect(component.internalDateTime.getFullYear()).toBe(2008);
        expect(component.internalDateTime.getMonth()).toBe(9);
        expect(component.internalDateTime.getDate()).toBe(10);
    });

});
