import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatting',
})
export class DateFormattingPipe implements PipeTransform {

  transform(value: Date | undefined): string {
    if(value === undefined)
      return "";
    return value.toLocaleDateString("de-DE");
  }

}
