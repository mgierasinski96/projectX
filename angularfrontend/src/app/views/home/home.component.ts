import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username;
  userData;
  token;

  constructor(private userService: UserService, private router: Router) {
  }


  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.username = this.userData.username;
    this.token = this.userData.token;
    console.log(this.userData);
    console.log('Zalogowany jako ' + this.userData.username);

  }
  showUserBaoard() {
    if (this.userData && this.userData.roles) {
      return this.userData.roles.includes('ROLE_USER');
    }
  }

  showAdminBoard() {
    if (this.userData && this.userData.roles) {
      return this.userData.roles.includes('ROLE_ADMIN');
    }
  }


  onLogout() {
    localStorage.clear();
    this.router.navigate(['']);

  }

  test() {
    console.log(this.token);
  }
}
