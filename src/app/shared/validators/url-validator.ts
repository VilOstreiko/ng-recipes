import { AbstractControl, ValidatorFn } from '@angular/forms';

export function UrlValidator(urlRegExp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } => {
    return !urlRegExp.test(control.value) ? { 'isUrlInvalid': true } : null;
  };
}
