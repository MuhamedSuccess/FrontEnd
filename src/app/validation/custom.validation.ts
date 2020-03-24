import { AbstractControl } from '@angular/forms';

export function urlValidator(control: AbstractControl) {
  if (!control.value.startsWith('https') || !control.value.includes('.me')) {
    return { urlValid: true };
  }
  return null;
}

export function usernameValidator(control: AbstractControl){

}

//password validator
// Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$');
