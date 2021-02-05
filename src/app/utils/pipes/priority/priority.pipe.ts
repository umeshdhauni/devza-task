import { Pipe, PipeTransform } from '@angular/core';
import { priorityList } from '../../shared/common';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      let list = priorityList;
      let priority = list.find(element => {
        return element.value == value;
      })

      return priority.name;
    }
    return null;
  }

}
