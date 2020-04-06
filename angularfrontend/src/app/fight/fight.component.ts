import { Component, OnInit } from '@angular/core';
import {LocationService} from '../services/location.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {

  loggedUser = 'kaziczek';
  miejsceWyprawy;
  monsterID;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.miejsceWyprawy = window.sessionStorage.getItem('destiny');
    console.log(this.miejsceWyprawy);
    this.locationService.getLocationFight(this.miejsceWyprawy, this.loggedUser).subscribe(response => {
      this.monsterID = response[0].id;
      // potwor
      document.getElementById('monsterName').innerText =  response[0].monsterName;
      document.getElementById('monsterLevel').innerText = 'Poziom: ' + response[0].monsterLevel;
      document.getElementById('monsterHP').innerText = 'Zycie ' + response[0].monsterHealth;
      document.getElementById('monsterDMG').innerText = 'Obrazenia ' + response[0].monsterDamage;

      //gracz
      document.getElementById('playerName').innerText = response[1].username;
      document.getElementById('playerLevel').innerText = 'Poziom: ' + response[1].level;
      document.getElementById('playerHP').innerText = 'Zycie ' + response[1].max_hp;
      document.getElementById('playerDMG').innerText = 'Obrazenia ' + response[1].total_damage;

    });
    // this.locationService.giveMeFight().subscribe(response => {
    // });
  }

}
