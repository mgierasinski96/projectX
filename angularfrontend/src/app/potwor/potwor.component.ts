import { Component, OnInit } from '@angular/core';
import {PotworService} from '../services/potwor.service';

@Component({
  selector: 'app-potwor',
  templateUrl: './potwor.component.html',
  styleUrls: ['./potwor.component.css']
})
export class PotworComponent implements OnInit {
  monsters;
  items;


  constructor(private potworService: PotworService) { }

  ngOnInit() {
  }
  listMonsters() {
    this.potworService.getMonsters().subscribe(response => {
      this.monsters = response;
    });
  }
  listItems() {
    this.potworService.getItems().subscribe( response => {
      this.items = response;
    });
  }

}
