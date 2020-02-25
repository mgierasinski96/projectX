import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkSkillPossible'
})
export class CheckSkillPossiblePipe implements PipeTransform {

  transform(value: any, gold: any): boolean {
    const price = parseInt(document.getElementById(value).innerText, 10);
    console.log('CheckSkillPrice price: ', price);
    switch (value) {
      case 'strength':
        return gold - price >= 0;

      case 'wisdom':
        return gold - price >= 0;

      case 'luck':
        return gold - price >= 0;

      case 'toughness':
        return gold - price >= 0;
    }
  }
}
