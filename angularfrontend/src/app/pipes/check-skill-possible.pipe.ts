import { Pipe, PipeTransform } from '@angular/core';
import {SkillPricePipe} from './skill-price.pipe';
@Pipe({
  name: 'checkSkillPossible'
})
export class CheckSkillPossiblePipe implements PipeTransform {

  transform(value: any, gold: any): boolean {
    // const price1 = new SkillPricePipe().transform(value, );
    switch (value) {
      case 'strength':
        const price1 = parseInt(document.getElementById('strUpgrade').innerText, 10);
        return gold - price1 >= 0;

      case 'wisdom':
        const price2 = parseInt(document.getElementById('wisUpgrade').innerText, 10);
        return gold - price2 >= 0;

      case 'luck':
        const price3 = parseInt(document.getElementById('lckUpgrade').innerText, 10);
        return gold - price3 >= 0;

      case 'toughness':
        const price4 = parseInt(document.getElementById('tghUpgrade').innerText, 10);
        return gold - price4 >= 0;
    }
  }
}
