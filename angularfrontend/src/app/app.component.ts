import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {CheckSkillPossiblePipe} from './pipes/check-skill-possible.pipe';
import {GetNextLvlExpPipe} from './pipes/get-next-lvl-exp.pipe';
import {async} from '@angular/core/testing';
import {ChatService} from './services/chat.service';
import {MessagingService} from './services/messaging.service';
import {Message} from '@stomp/stompjs';
import {StompState} from '@stomp/ng2-stompjs';
import {DropService} from './services/drop.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {UserData} from './models/user-data';
import {filter, map} from 'rxjs/operators';
import {AuthGuardService} from './services/auth-guard.service';

const WEBSOCKET_URL = 'ws://localhost:8080/socket';
const EXAMPLE_URL = '/topic/server-broadcaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService],

})
export class AppComponent implements OnInit {
  private messagingService: MessagingService;
  login;
  userData;
  canRender = false;
  addedExpPoints: number;
  chatResponses;
  messegeContent;
  isChatVisible;
  once;
  token = null;
  loggedIn;
  user: UserData = new UserData();
  error;
  private state;
  message;

  constructor(private userService: UserService, private chatService: ChatService, private router: Router, private authGuard: AuthGuardService) {
  }

  ngOnInit() {
    this.login = {
      username: '',
      password: ''
    };
    try {
      if (localStorage.getItem('token') != null) {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.token = this.userData.token;
      } else {
        this.token = null;
      }
    } catch (e) {
      console.log(e);
    }
    console.log(this.error);
  }

  onLogin() {
    console.log(this.login);
    this.userService.loginUser(this.login).subscribe(
      response => {
        localStorage.setItem('userData', JSON.stringify(response));
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.token = this.userData.token;
        localStorage.setItem('token', this.token);
        this.user = response;
        console.log(this.token);
        // this.router.navigateByUrl('/home');
      },
      error => {
        console.log('error', error);
        // this.loggedIn = false;
      },
    );
  }

  onLogout() {
    localStorage.clear();
    this.ngOnInit();
  }
  navigateToPrivateMessages()
  {
    this.router.navigateByUrl('messages');
  }

  nav() {
    this.router.navigateByUrl('signup');
  }
}
