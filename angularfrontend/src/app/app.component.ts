import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {CheckSkillPossiblePipe} from './pipes/check-skill-possible.pipe';
import {GetNextLvlExpPipe} from './pipes/get-next-lvl-exp.pipe';
import {async} from '@angular/core/testing';
import {ChatService} from './services/chat.service';

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
  chatResponses;
  constructor(private userService: UserService, private chatService: ChatService) { }

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
        this.userData = this.getUserData();
        // this.canRender = true;
        // this.getUserData();
      } else {
        this.token = '';
      }
    } catch (e) {
      console.log(e);
    }
  }
  showChatBox() {
    document.getElementById('chatBox').style.display = 'inline-block';
    this.chatService.getAllChatMessages().subscribe(response => {
      this.chatResponses = response;

    });

  }

  closeChatBox() {
    document.getElementById('chatBox').style.display = 'none';
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
}
