import { Component, OnInit } from '@angular/core';
import {ExamplespringService} from '../services/examplespring.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes;
  constructor(private userService: ExamplespringService) { }
  ngOnInit() {
    this.userService.getStudents().subscribe(response => {
      this.heroes = response;
    });
  }
}
