import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getNextLvlExp'
})
export class GetNextLvlExpPipe implements PipeTransform {

  transform(level: number): number {
    return 10 * (level + 1) - 10;
  }
}
