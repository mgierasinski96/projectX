import {Component, OnInit} from '@angular/core';
import {PotworService} from '../services/potwor.service';
import {LocationService} from '../services/location.service';
import {UserService} from '../services/user.service';
import {last} from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  oneMoster;
  fightDiv;
  description;
  id;
  loggedUser = 'kaziczek';
  userinfo;
  czynawyprawie;
  czas;
  counter;
  m;
  s;
  interval;
  lastAdventure;
  diffMins;
  diffSecs;
  naTymWidoku;
  miejsceWyprawy;
  nazwa;
  constructor(private potworService: PotworService, private locationService: LocationService,
              private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.isOnAdventure(this.loggedUser).subscribe(response => {
      this.czynawyprawie = response;
      if (this.czynawyprawie) {
        this.miejsceWyprawy = window.sessionStorage.getItem('destiny');
        this.nazwa = window.sessionStorage.getItem('destinyName');
        document.getElementById('naWyprawie').style.display = 'block';
        document.getElementById('opiss').innerText = 'Jestes na wyprawie do ' + this.nazwa;
      }
    });
  }

  templatefunkcja(evt) {
    console.log(evt.target.id);
    this.locationService.getLocationDescription(evt.target.id).subscribe(response => {
      this.description = response;
      this.id = this.description.id;
      document.getElementById('fightWindow').style.display = 'inline-block';
      document.getElementById('title').innerText = this.description.locationName;
      document.getElementById('opis').innerText = this.description.locationDescription;
    });
    //   this.potworService.getOneRandomMonsterForLocation(evt.target.id).subscribe(response => {
    //     this.oneMoster = response;
    //     document.getElementById('fightWindow').style.display = 'inline-block';
    //     document.getElementById('monsterName').innerText = this.oneMoster.monsterName;
    //     document.getElementById('monsterLevel').innerText = this.oneMoster.monsterLevel;
    //     document.getElementById('monsterHealth').innerText = this.oneMoster.monsterHealth;
    //     document.getElementById('monsterDamage').innerText = this.oneMoster.monsterDamage;
    //     document.getElementById('monsterExp').innerText = this.oneMoster.monsterExp;
    //     (<HTMLImageElement>document.getElementById('monsterImage'))
    //       .src = 'http://localhost:8080/monster/getMonsterImage/' + this.oneMoster.id;
    //   });
    //   this.ngOnInit();
  }

  adventure(locationID: string) {
    this.userService.newAdventure(this.loggedUser).subscribe(response => {
      this.userinfo = response;
      this.czynawyprawie = this.userinfo.onAdventure;
      console.log(this.czynawyprawie);
      this.locationService.getLocationDescriptionByID(locationID).subscribe(data => {
        console.log(data);
         window.sessionStorage.setItem('destinyName', data.locationName);
         window.sessionStorage.setItem('destiny', data.id);
         this.miejsceWyprawy = data.id;
         this.nazwa = data.locationName;
        this.funkcjaPrzeliczajaca();
      });

    });
  }

  closeFightWindow() {
    document.getElementById('fightWindow').style.display = 'none';
    console.log(document.getElementById('fightWindow').style.display);
  }

  funkcjaPrzeliczajaca() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('naWyprawie').style.display = 'block';
    document.getElementById('opiss').innerText = 'Jestes na wyprawie do ' + this.nazwa;
    this.userService.lastAdventure(this.loggedUser).subscribe(response => {
      // this.lastAdventure = response;
      const beginDate = new Date(response);
      const endDate = new Date(beginDate);
      endDate.setTime(endDate.getTime() + 10 * 1000); // czas wyprawy + 10 kminut
      this.interval = setInterval(() => {
        const now = new Date();
        const diffMs = endDate.valueOf() - now.valueOf();
        // const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        const diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000);
        const diffSecs = Math.floor((((diffMs % 86400000) % 3600000) % 60000) / 1000);
        if ((this.czynawyprawie) > 0 && (diffMs > 0)) { // (document.getElementById('fightWindow').style.display.includes('block'))) {
          document.getElementById('czas').innerText = 'Na miejscu za ' + diffMins + ':' + diffSecs;
          if (diffSecs < 10) {
            document.getElementById('czas').innerText = 'Na miejscu za ' + diffMins + ':0' + diffSecs;
          }
        } else if (diffMs < 0) {
          this.koniecWyprawy(this.loggedUser);
          console.log(this.czynawyprawie);
          clearInterval(this.interval);
        }
      }, 1000);
    });

  }

  koniecWyprawy(userName: string) {
    this.userService.endAdventure(userName).subscribe(response => {
      this.czynawyprawie = response;
      console.log(this.czynawyprawie);
      // document.getElementById('naWyprawie').style.display = 'none';
      // document.getElementById('fightWindow').style.display = 'none';
      // document.getElementById('container').style.display = 'block';
      this.router.navigateByUrl('/fight');
    });
  }

  // startCountdown(seconds) {
  //    this.counter = seconds;
  //   const interval = setInterval(() => {
  //     this.counter--;
  //     this.m = Math.floor(this.counter % 3600 / 60);
  //     this.s = Math.floor(this.counter % 3600 % 60);
  //
  //     if (this.counter < 0 ) {
  //
  //       // The code here will run when
  //       // the timer has reached zero.
  //
  //       clearInterval(interval);
  //       console.log('Ding!');
  //     }
  //   }, 1000);
  // }
}

