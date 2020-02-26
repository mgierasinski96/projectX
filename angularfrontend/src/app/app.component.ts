import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {CheckSkillPossiblePipe} from './pipes/check-skill-possible.pipe';
import {GetNextLvlExpPipe} from './pipes/get-next-lvl-exp.pipe';
import {async} from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  register;
  login;
  token = '';
  userData;
  canRender = false;
  addedExpPoints: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.register = {
      username: '',
      password: '',
      email: '',
      profession: '',

    };
    this.login = {
      username: '',
      password: ''
    };
    try {
      if (localStorage.getItem('token') != null) {
        this.token = localStorage.getItem('token');
        this.userData = JSON.parse(localStorage.getItem('userData'))[0];
        console.log(this.userData);
        this.canRender = true;
        // this.getUserData();
      } else { this.token = ''; }
    } catch (e) { console.log(e); }
  }
  onRegister() {
    this.userService.registerUser(this.register).subscribe(
      response => {
        alert('User ' + this.register.username + ' has been created');
      },
      error => console.log('error', error)
    );
  }
  onLogin() {
    console.log(this.login);
    this.userService.loginUser(this.login).subscribe(
      response => {
        localStorage.setItem('token', 'token ' + response.token);
        this.token = 'token ' + response.token;
        this.getUserData();
        // alert('User ' + this.login.username + ' has been logged in!');
      },
      error => {
        console.log('error', error);
      },
    );
  }
  getUserData() {
    this.userService.getUserData().subscribe(
      data => {
        if (data[0]) {
          this.userData = data[0];
          this.canRender = true;
        }
        localStorage.setItem('userData', JSON.stringify(data));
      },
      error => {
        console.log('error', error);
      }
    );
  }

  onLogout() {
    localStorage.clear();
    this.ngOnInit();
  }

  addSkill(skill) {
    this.ngOnInit();
   // window.addEventListener("mo")
    const safetyCheck = new CheckSkillPossiblePipe().transform(skill, this.userData.gold);
    if (safetyCheck) {
      switch (skill) {
        case 'strength':
          this.addStrength();
          break;

        case 'wisdom':
          this.addWisdom();
          break;

        case 'luck':
          this.addLuck();
          break;

        case 'toughness':
          this.addToughness();
          break;
      }
    } else { alert('Check if you have enough money!'); }
  }

  addStrength() {
    this.userService.addStat(this.userData, 'strength').subscribe(
      data => {
        this.getUserData();
      },
      error => {
        console.log(error);
      }

    );
  }

  addWisdom() {
    this.userService.addStat(this.userData, 'wisdom').subscribe(
      data => {
        this.getUserData();
      },
      error => {
        console.log(error);
      }
    );
  }

  addLuck() {
    this.userService.addStat(this.userData, 'luck').subscribe(
      data => {
        this.getUserData();
      },
      error => {
        console.log(error);
      }
    );
  }

  addToughness() {
    this.userService.addStat(this.userData, 'toughness').subscribe(
      data => {
        this.getUserData();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateUserData() {
    // update userdata by changes in database, since user is stored in localSessionStorage simple refresh is not enough
    // delete it later
    this.getUserData();
    console.log(this.userData);
  }

  addExpPoints() {
    // custom function to add exp points
    // delete it later

    this.userService.addExpPoints(this.userData, this.addedExpPoints).subscribe(
      response => {
        if (response) {
          this.userData = response;
          localStorage.setItem('userData', this.userData);
          this.checkLvlUp();
        }
        // this.checkLvlUp();
      },
      error => {
        console.log('error', error);
      },
    );
  }


  private checkLvlUp() {
    const expToGo = new GetNextLvlExpPipe().transform(this.userData.level);

    if (expToGo <= this.userData.exp) {
      this.userData.exp -= expToGo;
      this.userData.level += 1;
      this.userService.addLevel(this.userData).subscribe(
        response => {
          this.getUserData();
          this.checkLvlUp();
        },
        error => {
          console.log('error', error);
        },
      );
    } else { this.getUserData(); }
  }
}
