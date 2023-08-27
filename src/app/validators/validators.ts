import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export function greaterThan(otherField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const otherControl = control.parent?.get(otherField);

    if (!otherControl)
      return null;

    const value = control.value;
    if (!value)
      return null;

    const otherFieldValue = otherControl.value;

    if (!otherFieldValue)
      return null;

    if (otherFieldValue < value)
      return null;

    return { valueTooLow: 'Value of the input should be grater than ' + otherField };
  }
}

export function updateValidityOf(otherField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const otherControl = control.parent?.get(otherField);

    otherControl?.updateValueAndValidity();
    return null;
  }
}
