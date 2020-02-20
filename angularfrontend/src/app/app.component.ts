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
  user_data = [{username: 'anubis', hp: '135'}];

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
      password: '',
      token: ''
    };
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
        this.login.token = response['token'];
        window.sessionStorage.setItem('token', 'token ' + response['token']);
        this.getUserData();
        alert('User ' + this.login.username + ' has been logged in!');
      },
      error => console.log('error', error)
    );
  }
  getUserData() {
    this.userService.getUserData().subscribe(
      data => {
        this.user_data = data;
        console.log(this.user_data);
      },
      error => {
        console.log(error);
      }
    );
  }


}
