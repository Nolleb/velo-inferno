import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

export const FULL_DATE = 'dddd LL';

@Pipe({ name: 'datetime' })
export class DatePipe implements PipeTransform {

    transform(value: string): string {
      if (!value) {
        return ''
      }
      let date = null

      if(typeof value === 'string') {
        date = new Date(moment(value).toISOString())
      }

      return moment(date).format(FULL_DATE)

    }
}
