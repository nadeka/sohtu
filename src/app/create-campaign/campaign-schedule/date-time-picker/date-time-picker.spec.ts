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
    let newTime: Date = new Date(2008, 9, 9, 15, 55, 12, 0);

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
        component.internalDateTime = new Date(2006, 1, 2, 14, 54, 45, 0);
        component.internalDate = new Date(2006, 1, 2, 14, 54, 45, 0);
        component.internalTime = new Date(2006, 1, 2, 14, 54, 45, 0);
    }));

    // it('changing time should change time', () => {
    //     component.time = newTime;
    //     expect(component.internalDateTime.getHours()).toBe(15);
    //     expect(component.internalDateTime.getMinutes()).toBe(55);
    //     expect(component.internalDateTime.getSeconds()).toBe(12);
    // });
    //
    // it('changing time should not change date', () => {
    //     component.time = newTime;
    //     expect(component.internalDateTime.getFullYears()).toBe(2006);
    //     expect(component.internalDateTime.getMinutes()).toBe(1);
    //     expect(component.internalDateTime.getSeconds()).toBe(2);
    // });
    //
    // it('changing date should change date', () => {
    //     component.date = newTime;
    //     expect(component.internalDateTime.getHours()).toBe(2008);
    //     expect(component.internalDateTime.getMinutes()).toBe(9);
    //     expect(component.internalDateTime.getSeconds()).toBe(9);
    // });
    //
    // it('changing date should not change time', () => {
    //     component.date = newTime;
    //     expect(component.internalDateTime.getFullYears()).toBe(14);
    //     expect(component.internalDateTime.getMinutes()).toBe(54);
    //     expect(component.internalDateTime.getSeconds()).toBe(45);
    // });

});
