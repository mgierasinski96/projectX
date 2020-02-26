import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getExpBarWidth'
})
export class GetExpBarWidthPipe implements PipeTransform {

  transform(value: number): number {
    const expToGo = parseInt(document.getElementById('expToGo').innerText, 10);
    return value * 100 / expToGo;
  }

}
