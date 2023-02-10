import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hour' })
export class HourPipe implements PipeTransform {

    transform(value: number): string {

      const totalMinutes = Math.floor(value / 60);

      const seconds = value % 60;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return  `${hours}:${minutes}:${seconds}`;

    }
}
