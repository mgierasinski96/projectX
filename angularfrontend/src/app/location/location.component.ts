import { Component, OnInit } from '@angular/core';
import {PotworService} from '../services/potwor.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  oneMoster;
  fightDiv;
  constructor(private potworService: PotworService) {
  }

  ngOnInit() {
  }

  fight(evt) {
    this.potworService.getOneRandomMonsterForLocation(evt.target.id).subscribe(response => {
this.oneMoster = response;
document.getElementById('fightWindow').style.display='inline-block';
      document.getElementById('monsterName').innerText = this.oneMoster.monsterName;
      document.getElementById('monsterLevel').innerText  = this.oneMoster.monsterLevel;
      document.getElementById('monsterHealth').innerText  = this.oneMoster.monsterHealth;
      document.getElementById('monsterDamage').innerText  = this.oneMoster.monsterDamage;
      document.getElementById('monsterExp').innerText  = this.oneMoster.monsterExp;
      (<HTMLImageElement>document.getElementById('monsterImage'))
        .src = 'http://localhost:8080/monster/getMonsterImage/' + this.oneMoster.id;
    });
    this.ngOnInit();
  }
  closeFightWindow()
  {
    document.getElementById('fightWindow').style.display='none';
  }
}

