import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'custom',
})
export class CustomPipe implements PipeTransform {
  //track_number: '505520-05555-8' -> '50 55 20-05 555-8''
  newstring: string;
  transform(value: any /*, args: any[]*/): any {
    //console.log('Debug: CustomPipe: ' + value.length);

    this.newstring =
      value.substring(0, 2) +
      ' ' +
      value.substring(2, 4) +
      ' ' +
      value.substring(4, 9) +
      ' ' +
      value.substring(9);
    return this.newstring;
  }
}
