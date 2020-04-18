import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {PotworService} from '../../services/potwor.service';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.css']
})
export class UserItemsComponent implements OnInit {
  itemyUsera;
  rect;
  infoAboutItem;

  nazwa;
  def;
  atk;
  sil;
  int;

  constructor(public zone: NgZone, private potworService: PotworService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.potworService.listUserItems().subscribe( response => {
    //   this.itemyUsera = response;
    //   console.log('Listuje itemy');
    // });
  }


  removeItem(id) {
    this.potworService.removeItem(id).subscribe( response => {
      console.log('Usuwam item');
      this.listUserItems();
    });
  }
  listUserItems() {
    this.potworService.listUserItems().subscribe( response => {
      this.itemyUsera = response;
      console.log('Listuje itemy');
    });
  }
  mouseEnter(ev, id) {
    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('informacja');
    this.infoAboutItem.style.left = this.rect.left + 50 + 'px';
    this.infoAboutItem.style.top = this.rect.top - 100 + 'px';
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
    for (let i = 0 ; i < this.itemyUsera.length; i++) {
      if (this.itemyUsera[i].id === id) {
        this.nazwa = this.itemyUsera[i].itemName;
        this.def = this.itemyUsera[i].itemDefense;
        this.sil = this.itemyUsera[i].itemStrength;
        this.atk = this.itemyUsera[i].itemDamage;
        this.int = this.itemyUsera[i].itemWidsdom;
      }
    }
  }


}
