import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchTerm: string): any {
    if (searchTerm) {
      value = value.filter((item) => {
        return item.name.startsWith(searchTerm);
      });
    }
    return value;
  }

}
