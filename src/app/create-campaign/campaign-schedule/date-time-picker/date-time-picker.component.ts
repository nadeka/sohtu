import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimePicker),
  multi: true
};

@Component({
  selector: 'date-time-picker',
  templateUrl: './date-time-picker.template.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class DateTimePicker implements ControlValueAccessor {
  minDate: Date = new Date();
  internalTime: Date;
  internalDate: Date;
  internalDateTime: Date;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {
    this.internalTime = new Date();
    this.internalDate = new Date();
    this.internalDateTime = new Date();
  }

  get time(): any {
    return this.internalTime;
  };

  set time(v: any) {
    this.internalTime = v;
    this.internalDateTime.setHours(v.getHours());
    this.internalDateTime.setMinutes(v.getMinutes());
    this.internalDateTime.setSeconds(v.getSeconds());
    this.onChangeCallback(this.internalDateTime);
  }

  get date(): any {
    return this.internalDate;
  };

  set date(v: any) {
    this.internalDate = v;
    this.internalDateTime.setFullYear(v.getFullYear());
    this.internalDateTime.setMonth(v.getMonth());
    this.internalDateTime.setDate(v.getDate());
    this.onChangeCallback(this.internalDateTime);
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(obj: any) {
    if (obj === this.internalDateTime) {
      return;
    }
    if (obj && obj instanceof Date) {
      this.internalDateTime = obj;
      this.internalTime.setTime(obj.getTime());
      this.internalDate.setTime(obj.getTime());
      return;
    }
    this.internalDateTime = obj ? new Date(obj) : void 0;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}
