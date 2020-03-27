import {AfterViewInit, Component, Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnInit, Output} from '@angular/core';
import {CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragExit, CdkDragStart, DragDrop} from '@angular/cdk/drag-drop';
import {DropService} from '../services/drop.service';
import {UserbackpackService} from '../services/userbackpack.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {GuildService} from '../services/guild.service';

@Component({
  selector: 'app-guildstore-dashboard',
  templateUrl: './guildStore.component.html',
  styleUrls: ['./guildStore.component.scss']
})
export class GuildStoreComponent implements OnInit {
  previusDragContainer;
  infoAboutItem; // div with item info
  userItems;
  userItemSlots;
  guildItemSlots;
  guildItems; // guilds items
  rect; // infoAboutItem is displayed basing on rect
  itemImg; // element html typu obrazek
  actualHoverItem; // item na ktory obecnie najechano
 guildItemOwner;
  loggedUsername;
  loggedUsernameGuild;
  appUser;
  constructor(private guildService: GuildService, private userService: UserService,
              private userItemsService: UserbackpackService, private router: Router) {
  }
  ngOnInit() {
    this.loggedUsername = 'dden'; // #TODO fix both
    this.loggedUsernameGuild = 'gumisie'; // #TODO fix both
    this.guildService.getGuildByGuildName(this.loggedUsernameGuild).subscribe(response => {
      this.guildItems = response.guildItems;
      window.sessionStorage.setItem('guildItems', JSON.stringify(this.guildItems));
      for (const guildItem of this.guildItems) {  // dla wszystkich pobranych elementow
        this.itemImg = document.createElement('img'); // stworzenie nowego elementu html typu img
        this.itemImg.src = '  http://localhost:8080/user/getuserItemImage/' + guildItem.userItem.id;
        this.itemImg.id = guildItem.userItem.id + '-guildItemImg' + guildItem.userItem.itemType.toLowerCase();
        this.itemImg.addEventListener('mouseover', this.mouseOverItem); // dodanie do obrazka obslugi zdarzen
        this.itemImg.addEventListener('mouseout', this.mouseOutItem);
        this.guildItemSlots = document.getElementsByClassName('guildItem');
        for (const guildSlot of  this.guildItemSlots) {
          if (guildSlot.id === guildItem.guildSlot) {
            document.getElementById(guildSlot.id).appendChild(this.itemImg);
          }
        }
      }
    });
    this.userService.getUserByUsername(this.loggedUsername).subscribe(responseUser => { // #TODO ENTER USERNAME
   // #TODO LUB W OGOLE NIE POTRZEBNE JAK USER BEDZIE W PAMIECI
      this.appUser = responseUser;
    this.userItemsService.getUserItems(this.appUser.id).subscribe(response => {
      this.userItems = response;
      window.sessionStorage.setItem('userItems', JSON.stringify(this.userItems));
      for (const item of this.userItems) {
        this.itemImg = document.createElement('img');
        this.itemImg.src = '  http://localhost:8080/user/getuserItemImage/' + item.id;
        this.itemImg.id = item.id + '-userItemImg' + item.itemType.toLowerCase();
        this.itemImg.addEventListener('mouseover', this.mouseOverItem);
        this.itemImg.addEventListener('mouseout', this.mouseOutItem);
        this.userItemSlots = document.getElementsByClassName('userItem');
        for (const userSlot of this.userItemSlots) {
          if (userSlot.id === item.backpackSlot) {
            document.getElementById(userSlot.id).appendChild(this.itemImg);
          }
        }
      }
    });
    });
  }

  mouseOverItem(ev) {
    this.guildItems = JSON.parse(window.sessionStorage.getItem('guildItems'));
    this.userItems = JSON.parse(window.sessionStorage.getItem('userItems'));
    for (const item of this.guildItems) {
      if (ev.target.id.includes(item.userItem.id)) {
        this.actualHoverItem = item;
        this.guildItemOwner = item.ownerUsername;
        break;
      }
    }
    for (const item of this.userItems) {
      if (ev.target.id.includes(item.id)) {
        this.actualHoverItem = item;
        break;
      }
    }
    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('infoAboutItem');

    // UWAGA STULEJARSKIE IFY
    document.getElementById('itemName').innerText = this.actualHoverItem.itemName || this.actualHoverItem.userItem.itemName;
    document.getElementById('itemLevel').innerText = this.actualHoverItem.itemLevel || this.actualHoverItem.userItem.itemLevel;
    if ((this.actualHoverItem.itemDamage !== 0 && this.actualHoverItem.itemDamage != null)  ||
      (this.actualHoverItem.userItem?.itemDamage !== 0 && this.actualHoverItem.userItem?.itemDamage != null)) {
      document.getElementById('itemDamage').parentElement.style.display = 'inline-block';
      document.getElementById('itemDamage').innerText = this.actualHoverItem.itemDamage || this.actualHoverItem.userItem?.itemDamage;
    } else {
      document.getElementById('itemDamage').parentElement.style.display = 'none';
      document.getElementById('itemDamage').innerText = this.actualHoverItem.itemDamage || this.actualHoverItem.userItem?.itemDamage;
    }
    if ((this.actualHoverItem.itemDefense !== 0 && this.actualHoverItem.itemDefense != null)  ||
      (this.actualHoverItem.userItem?.itemDefense !== 0 && this.actualHoverItem.userItem?.itemDefense != null)) {
      document.getElementById('itemDefense').parentElement.style.display = 'inline-block';
      document.getElementById('itemDefense').innerText = this.actualHoverItem.itemDefense || this.actualHoverItem.userItem?.itemDefense;
    } else {
      document.getElementById('itemDefense').parentElement.style.display = 'none';
      document.getElementById('itemDefense').innerText = this.actualHoverItem.itemDefense || this.actualHoverItem.userItem?.itemDefense;
    }
    if ((this.actualHoverItem.itemStrength !== 0 && this.actualHoverItem.itemStrength != null)  ||
      (this.actualHoverItem.userItem?.itemStrength !== 0 && this.actualHoverItem.userItem?.itemStrength != null)) {
      document.getElementById('itemStrength').parentElement.style.display = 'inline-block';
      document.getElementById('itemStrength').innerText = this.actualHoverItem.itemStrength || this.actualHoverItem.userItem?.itemStrength;
    } else {
      document.getElementById('itemStrength').parentElement.style.display = 'none';
      document.getElementById('itemStrength').innerText = this.actualHoverItem.itemStrength || this.actualHoverItem.userItem?.itemStrength;
    }
    // #TODO uwaga na literowke
    if ((this.actualHoverItem.itemWidsdom !== 0 && this.actualHoverItem.itemWidsdom != null)  ||
      (this.actualHoverItem.userItem?.itemWidsdom !== 0 && this.actualHoverItem.userItem?.itemWidsdom != null)) {
      document.getElementById('itemWidsdom').parentElement.style.display = 'inline-block';
      document.getElementById('itemWidsdom').innerText = this.actualHoverItem.itemWidsdom || this.actualHoverItem.userItem?.itemWidsdom;
    } else {
      document.getElementById('itemWidsdom').parentElement.style.display = 'none';
      document.getElementById('itemWidsdom').innerText = this.actualHoverItem.itemWidsdom || this.actualHoverItem.userItem?.itemWidsdom;
    }
    if (ev.target.parentNode.id.includes('guild')) {
      document.getElementById('itemOwner').parentElement.style.display = 'inline-block';
      document.getElementById('itemOwner').innerText = this.guildItemOwner ? this.guildItemOwner : this.loggedUsername;
    } else {
      document.getElementById('itemOwner').parentElement.style.display = 'none';
    }
      document.getElementById('itemValue').innerText = this.actualHoverItem.itemValue ||
        this.actualHoverItem.userItem.itemValue ||  0;
    this.infoAboutItem.style.left = this.rect.left + 121 + 'px';
    this.infoAboutItem.style.top = this.rect.top  - 121 + 'px';
    this.infoAboutItem.style.visibility = 'visible';
  }

  mouseOutItem(ev) {
    this.infoAboutItem.style.visibility = 'hidden';
  }

  dragStart(event: CdkDragStart) {
    this.previusDragContainer = event.source.element.nativeElement.parentElement.id;
  }
  dragEntered(event: CdkDragEnter) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '0.3';
  }

  dragExit(event: CdkDragExit) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';
  }

  drop(event: any) {

    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';
    if (this.previusDragContainer.includes('guild') && event.container.element.nativeElement.id.includes('slot')) {
      console.log('TAK BEDZIESZ ZABIERAL')
      console.log(event.container.element.nativeElement.children[0].children);
      if (event.container.element.nativeElement.children[0].children.length === 0) {
        console.log('I WYWOLUJE SIE SERWIS')
        this.guildService.removeUserItemFromGuildStoreAndAddToUser
        (parseInt(event.item.element.nativeElement.children[0].id.split('-')[0], 0),
          this.loggedUsername, event.container.element.nativeElement.children[0].id).subscribe();

        document.getElementById(event.container.element.nativeElement.children[0].id).append
        (document.getElementById(event.item.element.nativeElement.children[0].id));

      }
      if (event.container.element.nativeElement.children.length >= 2) {
        document.getElementById(this.previusDragContainer).append
        (document.getElementById(event.item.element.nativeElement.id));
        event.previousContainer.addItem(event.item);
      }
    }
    if (event.container.element.nativeElement.id.includes('guild') && this.previusDragContainer.includes('slot')) {
      console.log('DO MAGAZYNU')
      this.guildService.addUserItemToGuildStore(parseInt(event.item.element.nativeElement.children[0].id.split('-')[0], 0),
        event.container.element.nativeElement.children[0].id).subscribe();
      document.getElementById(event.container.element.nativeElement.children[0].id).append
      (document.getElementById(event.item.element.nativeElement.children[0].id));
    }
    // przesuniecie miedzy okienkami magazynu - NIE POZWOL WYKONAC-> trzeba zabrac przedmiot
    if (this.previusDragContainer.includes('guild') && event.container.element.nativeElement.id.includes('guild')) {
      document.getElementById(this.previusDragContainer).append
      (document.getElementById(event.item.element.nativeElement.id));
      event.previousContainer.addItem(event.item);
    }
    if (this.previusDragContainer.includes('slot') && event.container.element.nativeElement.id.includes('slot')) {
      if (event.container.element.nativeElement.children[0].children.length === 0) {
        this.userItemsService.transferItemToDifferentSlot(event.item.element.nativeElement.children[0].id.split('-')[0],
          event.container.element.nativeElement.children[0].id).subscribe();
        document.getElementById(event.container.element.nativeElement.children[0].id).append
        (document.getElementById(event.item.element.nativeElement.children[0].id));
      }
    }
  }


}
