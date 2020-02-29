
import {ExamplespringService} from '../services/examplespring.service';
import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDragStart} from '@angular/cdk/drag-drop';
import {DropService} from '../services/drop.service';

@Component({
  selector: 'shop-dashboard',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  previusDragContainer;
  idOfItemThatWasInEnteredSlot;
  wasItemInEnteredSlot;
  infoAboutItem; //div with item info
  allItems; //contains user items and shop items
  itemsToShop; //items in shop
  rect; //infoAboutItem is displayed basing on rect

  constructor(private dropService: DropService) {
  }

  ngOnInit() {
    this.dropService.getRandomItemsToShop(6).subscribe(response => {
      this.itemsToShop = response;
    });
    this.allItems = document.getElementsByClassName('exItem');
    console.log(this.allItems.length);
    for (let i = 0; i < this.allItems.length; i++) {
      this.allItems[i].addEventListener('mouseover', this.mouseOverItem);
      this.allItems[i].addEventListener('mouseout', this.mouseOutItem);
    }
  }

  mouseOverItem(ev) {
    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('infoAboutItem');
    this.infoAboutItem.style.left = this.rect.left + 100 + 'px';
    this.infoAboutItem.style.top = this.rect.top - 130 + 'px';
    this.infoAboutItem.style.visibility = 'visible';
  }

  mouseOutItem(ev) {
    console.log('mouseOut');
    this.infoAboutItem.style.visibility = 'hidden';
  }

  swapElements(oldItemId: string, oldContainerId: string) {
    console.log('swap elements');
    document.getElementById(oldContainerId).appendChild(document.getElementById(oldItemId));

  }

  dragStart(event: CdkDragStart) {
    document.getElementById('shopAssisantDialog').style.animation = '';
    this.previusDragContainer = event.source.element.nativeElement.parentElement.id; // miejsce z ktorego rozpoczynam drag
    // console.log('drag start' + this.previusDragContainer);
  }

  dragEntered(event: CdkDragEnter) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '0.3';
    //from shop to bag// ale nie wykonuj swapa
    if (this.previusDragContainer.includes('shop') && event.container.element.nativeElement.id.includes('slot')) {

      //moze postawic boolean ?

      //from bag to bag -> jesli jest tam jakis item w slocie w plecaku to wykonaj po prostu swapa
    } else if (this.previusDragContainer.includes('slot') && event.container.element.nativeElement.id.includes('slot')) {
        if (event.container.element.nativeElement.children.length > 1) {
          this.idOfItemThatWasInEnteredSlot = event.container.element.nativeElement.children[1].id;
          this.wasItemInEnteredSlot = true;
          // this.swapElements(event.container.element.nativeElement.children[1].id,
          //   this.previusDragContainer); //z plecaka do plecaka
      }
    } else if (!(this.previusDragContainer.includes('shop') && event.container.element.nativeElement.id.includes('shop'))) {
      document.getElementById('shopAssisantDialog').style.animation = 'changeVisibility 2s';
      document.getElementById('dialog').innerText = 'Co to za chłam!!';
    }
    //else from eq to shop

  }

  dragExit(event: CdkDragExit) {

    // if (this.wasItemInEnteredSlot) {
    //   event.container.element.nativeElement.appendChild(document.getElementById(this.idOfItemThatWasInEnteredSlot));
    // }
    // this.wasItemInEnteredSlot = false;

    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';
  }

  drop(event: any) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';
      if (event.container !== event.previousContainer) {
        event.previousContainer.removeItem(event.item);
      }
      console.log(event.container.element.nativeElement.id);
      document.getElementById(event.container.element.nativeElement.id).append
      (document.getElementById(event.item.element.nativeElement.id));

      if (event.container === event.previousContainer) {
        event.container.addItem(event.item);
      }
      //upuszczeniu ze sklepu do backpacka czyli odejmij zloto dodaj przedmiot
      if (this.previusDragContainer.includes('shop') && event.container.element.nativeElement.id.includes('slot')) {
        document.getElementById('shopAssisantDialog').style.animation = 'changeVisibility 2s';
        document.getElementById('dialog').innerText = 'Dobry wybór!';
      }
    //upuszczenie z backpacka do sklepu czyli dodaj zloto usun przedmiot
    if (event.container.element.nativeElement.id.includes('shop') && this.previusDragContainer.includes('slot')) {

      document.getElementById('shopAssisantDialog').style.animation = 'changeVisibility 6s';
      document.getElementById('dialog').innerText = 'Pff masz tu swoje grosze';
    }
    }

}
