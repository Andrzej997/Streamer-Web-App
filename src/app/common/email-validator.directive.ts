import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators} from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements Validator {

  validate(c: AbstractControl): ValidationErrors | null {
    if (!c) {
      return null;
    }
    if (!c.value) {
      return null;
    }
    return Validators.email(c);
  }

}
