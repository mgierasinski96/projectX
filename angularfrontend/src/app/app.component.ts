import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';

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
  user_data;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.register = {
      username: '',
      password: '',
      email: '',
      profession: ''
    };
    this.login = {
      username: '',
      password: ''
    };
    try {
      if (sessionStorage.getItem('user_data') != null) {
        this.user_data = sessionStorage.getItem('user_data');
      }
      if (sessionStorage.getItem('token') != null) {
        this.token = sessionStorage.getItem('token');
      } else { this.token = ''; }
    } catch (e) { console.log(e);}
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
        sessionStorage.setItem('token', 'token ' + response['token']);
        this.token = 'token ' + response['token'];
        document.getElementById('loggedUsername').innerText = 'Logged as ' + this.login.username;
        this.getUserData();
        alert('User ' + this.login.username + ' has been logged in!');
      },
      error => console.log('error', error)
    );
  }
  getUserData() {
    this.userService.getUserData().subscribe(
      data => {
        data = JSON.stringify(data);
        this.user_data = data;
        console.log(data);
        sessionStorage.setItem('user_data', data);
      },
      error => {
        console.log(error);
      }
    );
  }
  onLogout() {
    sessionStorage.clear();
    this.ngOnInit();
  }
}
