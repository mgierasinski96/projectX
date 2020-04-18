import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

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
      } else { console.log('training comp ngOnInit else call!'); }
    } catch (e) { console.log(e); }
  }

  private prepareData() {
    this.userService.getUserData().subscribe(
      response => {
         this.userData = response[0];
         console.log(this.userData);
         this.getUserSkills();
      },
      error => {
        console.log('error', error);
      },
    );
  }
  private getUserSkills() {
    this.userService.getUserSkills(this.userData).subscribe(
      response => {
        this.userSkills = response[0];
        console.log(this.userSkills);
        this.getSkillPrices();
      },
      error => {
        console.log('error', error);
      },
    );
  }
  private getSkillPrices() {
    this.userService.getSkillPrices(this.userData).subscribe(
      response => {
        this.skillPrices = response
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
        // this.canRender = false;
        // this.prepareData();
        this.ngOnInit();
      },
      error => {
        this.ngOnInit();
      },
    );
  }
}
