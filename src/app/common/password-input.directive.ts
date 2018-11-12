import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[appPasswordInput]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordInputDirective, multi: true}]
})
export class PasswordInputDirective implements Validator {

  static checkPassword(pass: string): boolean {
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(pass);
  }

  validate(c: AbstractControl): ValidationErrors {
    if (!c) {
      return null;
    }
    if (!c.value) {
      return null;
    }
    return this.checkPasswordValidatorFn()(c);
  }

  checkPasswordValidatorFn(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const result = PasswordInputDirective.checkPassword(control.value);
      return result ? null : {'passwordNotValid': {value: control.value}};
    };
  }

  scorePassword(pass: string): number {
    let score = 0;
    if (!pass) {
      return score;
    }

    // award every unique letter until 5 repetitions
    let letters = {};
    for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    let variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    };

    let variationCount = 0;
    for (let check in variations) {
      variationCount += (variations[check] === true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return score;
  }

}
