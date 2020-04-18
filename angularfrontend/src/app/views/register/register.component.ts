import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {error} from 'selenium-webdriver';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }


  register;

  ngOnInit(): void {
    this.register = {
      username: '',
      email: '',
      password: ''
    };
  }
  onRegister() {
    console.log(this.register);
    this.userService.registerUser(this.register).subscribe(response => {
      this.router.navigateByUrl('');
      },
      error => {
        console.log('error', error);
      }
    );

  }

}
