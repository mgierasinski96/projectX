import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  skillPrices;
  userSkills;
  token;
  userData;
  canRender = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    try {
      if (localStorage.getItem('token') != null) {
        this.token = localStorage.getItem('token');
        this.prepareData();
        console.log('finish oninit');
      } else { console.log('training comp ngOnInit else call!'); }
    } catch (e) { console.log(e); }
  }

  private prepareData() {
    console.log('Start prepare Data');
    this.userService.getUserData().subscribe(
      response => {
         this.userData = response[0];
         console.log('Finish get user data');
         this.getUserSkills();
      },
      error => {
        console.log('error', error);
      },
    );
  }
  private getUserSkills() {
    console.log('Start Get User Skills');
    this.userService.getUserSkills(this.userData).subscribe(
      response => {
        this.userSkills = response[0];
        console.log('finish get user skills', this.userSkills);
        this.getSkillPrices();
      },
      error => {
        console.log('error', error);
      },
    );
  }
  private getSkillPrices() {
    console.log('Start Get User Skills');
    this.userService.getSkillPrices(this.userData).subscribe(
      response => {
        this.skillPrices = response
        console.log('Finish get skill prices');
        console.log(this.skillPrices);
        this.canRender = true;
      },
      error => {
        console.log('error', error);
      },
    );
  }
  addSkill(skill) {
    this.userService.addSkill(this.userData, skill).subscribe(
      response => {
        this.skillPrices = response;
        this.canRender = false;
        this.ngOnInit();
      },
      error => {
        this.ngOnInit();
      },
    );
  }
}
