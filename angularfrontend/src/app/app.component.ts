import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';

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
        this.getUserData();
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
    this.userService.loginUser(this.login).subscribe(
      response => {
        localStorage.setItem('token', 'token ' + response.token);
        this.token = 'token ' + response.token;
        document.getElementById('loggedUsername').innerText = 'Logged as ' + this.login.username;
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
          this.userData.skills = {
            // strength: ['Strength', this.userData.strength],
            // wisdom: ['Wisdom', this.userData.wisdom],
            // luck: ['Luck', this.userData.luck],
            // toughness: ['Toughness', this.userData.toughness],
            strength: this.userData.strength,
            wisdom: this.userData.wisdom,
            luck: this.userData.luck,
            toughness: this.userData.toughness,
          };
          this.canRender = true;
        }
        // localStorage.setItem('userData', JSON.stringify(data));
      },
      error => {
        console.log('error', error);
      }
    );
  }

  // checkSkillPossible(name) {
  //   if (name === 'strength') {
  //     return;
  //   }
  //   if (name === 'wisdom') {
  //     return;
  //   }
  //   if (name === 'luck') {
  //     return;
  //   }
  //   if (name === 'toughness') {
  //     return;
  //   }
  // }

  onLogout() {
    localStorage.clear();
    this.ngOnInit();
  }

    addSkill(skill) {
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
}
