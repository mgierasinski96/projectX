import {Component, OnInit} from '@angular/core';
import {PotworService} from '../../services/potwor.service';
import {CdkDragStart} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-potwor',
  templateUrl: './potwor.component.html',
  styleUrls: ['./potwor.component.css']
})
export class PotworComponent implements OnInit {
  monsters;
  items;
  rect;
  infoAboutItem;
  potwory;

  def;
  sil;
  atk;
  int;

  constructor(private potworService: PotworService) {
  }

  ngOnInit() {
  }
  mouseEnter(ev, id) {
    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('inf');
    this.infoAboutItem.style.left = this.rect.left + 100 + 'px';
    this.infoAboutItem.style.top = this.rect.top - 130 + 'px';
    this.infoAboutItem.style.visibility = 'visible';
    console.log(id);
    this.pobierzStatystyki(id);
  }
  mouseOutItem(ev, id) {
    console.log('mouseOut');
    this.infoAboutItem.style.visibility = 'hidden';
    console.log(id);
  }

  pobierzStatystyki(id) {
    for (let i = 0 ; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        this.def = this.items[i].itemDefense;
        this.sil = this.items[i].itemStrength;
        this.atk = this.items[i].itemDamage;
        this.int = this.items[i].itemWidsdom;
      }
    }
  }
  listMonsters() {
    this.potworService.getMonsters().subscribe(response => {
      this.monsters = response;
      this.potwory = response;
    });
  }

  listItems() {
    this.potworService.getItems().subscribe(response => {
      this.items = response;
    });
  }




}
