
import {ExamplespringService} from '../services/examplespring.service';
import {AfterViewInit, Component, Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnInit, Output} from '@angular/core';
import {CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragExit, CdkDragStart, DragDrop} from '@angular/cdk/drag-drop';
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
  infoAboutItem;//div with item info
  allItems;//contains user items and shop items
  itemsToShop;//items in shop
  rect;//infoAboutItem is displayed basing on rect
  shopSlotIterator;
  itemImg;
  acutalHoverItem;//item na ktory obecnie nejchano
  constructor(private dropService: DropService) {
  }
// shop divs class="shopSlot" id="shop4"
  // img id="plateFromShop" class="exItem" src="../assets/images/exampleItem.png" cdkDrag (cdkDragStarted)="dragStart($event)"
  // (cdkDragEntered)="dragEntered($event)" (cdkDragExited)="dragExit($event)"
  ngOnInit() {
    this.shopSlotIterator = 1;
    this.dropService.getRandomItemsToShop(6).subscribe(response => {
      this.itemsToShop = response;
      window.sessionStorage.setItem('items', JSON.stringify(this.itemsToShop));

      for( const item of this.itemsToShop)
      {      this.itemImg = document.createElement('img');
        this.itemImg.src = 'http://localhost:8080/item/getItemImage/' + item.id;
       // this.dragDropService.createDrag(this.itemImg);
        this.itemImg.id = 'shopItemId' + item.id;
        this.itemImg.addEventListener('mouseover', this.mouseOverItem);
        this.itemImg.addEventListener('mouseout', this.mouseOutItem);
      document.getElementById('shopItem' + this.shopSlotIterator).appendChild(this.itemImg);
        this.shopSlotIterator += 1;
      }
    });

    this.allItems = document.getElementsByClassName('exItem');
    for (let i = 0; i < this.allItems.length; i++) {
      this.allItems[i].addEventListener('mouseover', this.mouseOverItem);
      this.allItems[i].addEventListener('mouseout', this.mouseOutItem);
    }
  }

  mouseOverItem(ev) {

    this.itemsToShop = JSON.parse(window.sessionStorage.getItem('items'));
    for (const item of this.itemsToShop) {
      if (ev.target.id.includes(item.id)) {
        this.acutalHoverItem = item;
        break;
      }
    }
    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('infoAboutItem');
    document.getElementById('itemName').innerText= this.acutalHoverItem.itemName;
    document.getElementById('itemDamage').innerText= this.acutalHoverItem.itemDamage;
    this.infoAboutItem.style.left = this.rect.left + 100 + 'px';
    this.infoAboutItem.style.top = this.rect.top - 130 + 'px';
    this.infoAboutItem.style.visibility = 'visible';
  }

  mouseOutItem(ev) {
    this.infoAboutItem.style.visibility = 'hidden';
  }

  swapElements(oldItemId: string, oldContainerId: string) {
    //console.log('swap elements');
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
    } else if(!(this.previusDragContainer.includes('shop') && event.container.element.nativeElement.id.includes('shop'))){
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
    console.log(event.container.element.nativeElement.id)
    document.getElementById(event.container.element.nativeElement.id).append
    (document.getElementById(event.item.element.nativeElement.id));

    if (event.container === event.previousContainer) {
      event.container.addItem(event.item);
    }
    //upuszczeniu ze sklepu do backpacka czyli odejmij zloto dodaj przedmiot
    if (this.previusDragContainer.includes('shop') && event.container.element.nativeElement.id.includes('slot')) {
      if (event.container.element.nativeElement.children.length < 2) {
        document.getElementById('shopAssisantDialog').style.animation = 'changeVisibility 2s';
        document.getElementById('dialog').innerText = 'Dobry wybór!';
      }
      if (event.container.element.nativeElement.children.length >= 2) {
        document.getElementById(this.previusDragContainer).append
        (document.getElementById(event.item.element.nativeElement.id));
        event.previousContainer.addItem(event.item);
      }
    }
    //upuszczenie z backpacka do sklepu czyli dodaj zloto usun przedmiot NIE DA SIE GO KUPIC PONOWNIE ?
    if (event.container.element.nativeElement.id.includes('shop') && this.previusDragContainer.includes('slot')) {

      document.getElementById('shopAssisantDialog').style.animation = 'changeVisibility 6s';
      document.getElementById('dialog').innerText = 'Pff masz tu swoje grosze';
    }
    if (this.previusDragContainer.includes('shop') && event.container.element.nativeElement.id.includes('shop')) {
      document.getElementById(this.previusDragContainer).append
      (document.getElementById(event.item.element.nativeElement.id));
      event.previousContainer.addItem(event.item);
    }
    if (this.previusDragContainer.includes('slot') && event.container.element.nativeElement.id.includes('slot')) {
      if (event.container.element.nativeElement.children.length >= 2) {
        document.getElementById(this.previusDragContainer).append
        (document.getElementById(event.item.element.nativeElement.id));
        event.previousContainer.addItem(event.item);
      }
    }
  }


}
