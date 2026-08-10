import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(seconds: number): string {
    const minutes = Math.floor(seconds / 60);

    return `${minutes}`;
  }
}
