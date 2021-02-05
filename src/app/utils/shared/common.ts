import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as  moment from 'moment';

export function patternValidator(regexp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value;
    if (value === '') {
      return null;
    }
    return !regexp.test(value) ? { 'patternInvalid': { regexp } } : null;
  };
}

export function validationError(form) {
  Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
      if (control.controls) {
          validationError(control);
      }
  });
}


export const priorityList = [
  {
    name: 'Normal',
    value: '1'
  },
  {
    name: 'Mid',
    value: '2'
  },
  {
    name: 'High',
    value: '3'
  }
]

export function formatDate(date) {
  let formattedDate;
  formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
  return formattedDate;
}

export function convertIntoFormData(data) {
  let formData: FormData = new FormData();
  for (let key of Object.keys(data)) {
    formData.append(key, data[key]);
  }

  return formData;
}


export function getPriorityId(name) {
  let priority = priorityList.find(element => {
    return (element.name).toLowerCase() == name;
  });
  if (priority) {
    return priority.value;
  }

  return null;
}