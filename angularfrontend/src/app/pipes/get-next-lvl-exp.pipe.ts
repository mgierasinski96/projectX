import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getNextLvlExp'
})
export class GetNextLvlExpPipe implements PipeTransform {

  transform(level: number): number {
    console.log('Next lvl exp pipe invoked');
    return 10 * (level + 1) - 10;
  }
}
