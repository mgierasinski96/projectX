import { Component, OnInit } from '@angular/core';
import {ExamplespringService} from '../services/examplespring.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './mycharacter.component.html',
  styleUrls: ['./mycharacter.component.scss']
})
export class MycharacterComponent implements OnInit {
  heroes;
  constructor(private userService: ExamplespringService) { }
  ngOnInit() {
    this.userService.getStudents().subscribe(response => {
      this.heroes = response;
    });
  }
}
