import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNameDestination'
})
export class FilterNameDestinationPipe implements PipeTransform {

  transform(items: Array<any>, name: string): Array<any> {
    return items.filter(item => item.name.toUpperCase().includes(name.toUpperCase()));
  }

}
