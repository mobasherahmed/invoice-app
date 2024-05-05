import { Pipe, PipeTransform } from '@angular/core';
import { Invoice } from '../interfaces/invoice.interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Invoice[], filter: string): Invoice[] | undefined {
    if (!filter) {
      return value;
    }

    if (value) {
      return value.filter(
        (invoice) => invoice.status.toLowerCase() === filter.toLowerCase()
      );
    }

    return undefined; // Add a return statement for the case when value is undefined
  }
}
