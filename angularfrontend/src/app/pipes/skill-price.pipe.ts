import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getSkillPrice'
})
export class SkillPricePipe implements PipeTransform {
  strMulti = 2.6; // multiplier for strength's upgrade price
  wisMulti = 2.6; // multiplier for wisdom's upgrade price
  tghMulti = 2.3; // multiplier for toughness's upgrade price
  lckMulti = 2.4; // multiplier for luck's upgrade price

  transform(name: any, skill: any): number {
    switch (name) {
      case 'strength':
        return Math.floor(Math.pow(skill - 4, this.strMulti));

      case 'wisdom':
        return Math.floor(Math.pow(skill - 4, this.wisMulti));;

      case 'luck':
        return Math.floor(Math.pow(skill - 4, this.lckMulti));;

      case 'toughness':
        return Math.floor(Math.pow(skill - 4, this.tghMulti));;
    }
  }

}
