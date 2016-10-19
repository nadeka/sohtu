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

  get time(): any {
    return this.internalTime;
  };

  set time(v: any) {
      this.internalTime = v;
      this.internalDateTime.setHours(this.internalTime.getHours());
      this.internalDateTime.setMinutes(this.internalTime.getMinutes());
      this.internalDateTime.setSeconds(this.internalTime.getSeconds());
      this.onChangeCallback(this.internalDateTime);
  }

  get date(): any {
    return this.internalDate;
  };

  set date(v: any) {
      this.internalDate = v;
      this.internalDateTime.setFullYear(this.internalDate.getFullYear());
      this.internalDateTime.setMonth(this.internalDate.getMonth());
      this.internalDateTime.setDate(this.internalDate.getDate());
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
      this.time = obj;
      this.date = obj;
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
