import {Component, OnInit, ViewChild} from '@angular/core';
import {UserbackpackService} from '../../services/userbackpack.service';
import {CdkDragEnter, CdkDragExit, CdkDragStart} from '@angular/cdk/drag-drop';
import {DropService} from '../../services/drop.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {GuildService} from '../../services/guild.service';
import {RankingComponent} from '../ranking/ranking.component';
import {Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})

export class MarketPlaceComponent implements OnInit {
  userItems;
  itemImage;
  userItemSlots;
  dataSource;
  rect;
  actualHoverItem;
  infoAboutItem;
  name;
  myItemValue;
  previusDragContainer;
  actualItemInBlacksmith;
  myItemId;
  przedmiotyNaRynku;
  typeTemps;
  xds;
  wiersze;

  newItem;
  wolnySlot;
  przedmioty;
  userData;
  // TODO: tymczasowo
  loggedUsername;

  lookingFor = 'Wszystko';
  private itemInBlacksmithSlotId: any;
  itemTypes = ['Wszystko', 'EARRING', 'HELMET', 'NECKLACE', 'WEAPON', 'PLATE', 'SHIELD', 'GAUNTLETS', 'BOOTS', 'RING'];
  itemNames = ['Wszystko', 'Kolczyki', 'Helm', 'Naszyjnik', 'Bron', 'Zbroja', 'Tarcza', 'Rekawice', 'Buty', 'Pierscien'];

  displayedColumns: string[] = ['item', 'sellerName', 'userItem.itemLevel', 'price', 'buttons'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private router: Router;

  constructor(private userItemService: UserbackpackService, private  dropService: DropService) {
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log('Zalogowany jako' + this.userData.username);
    this.loggedUsername = this.userData.username;
    this.inicjalizujPzredmioty();
    this.inicjalizujWidok();
  }

  inicjalizujDane() {
    this.userItemService.listMarketItems().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.przedmioty = response;
      this.dataSource.sortingDataAccessor = (item, property) => {
        if (property.includes('.')) {
          return property.split('.').reduce((o, i) => o[i], item);
        }
        return item[property];
      };
      this.dataSource.sort = this.sort;
    });
  }

  inicjalizujPzredmioty() {
    // this.dropService.getShopItemsForUser(4).subscribe(response => {
    //   this.dataSource = new MatTableDataSource(response);
    //   this.dataSource.sort = this.sort;
    // });
    this.inicjalizujDane();
    // TODO: tutaj
    this.userItemService.getUserItems(
      this.userData.id).subscribe(response => {
      this.userItems = response;
      window.sessionStorage.setItem('userItems', JSON.stringify(this.userItems));
      for (const item of this.userItems) {
        this.itemImage = document.createElement('img');
        this.itemImage.src = 'http://localhost:8080/user/getuserItemImage/' + item.id;
        this.userItemSlots = document.getElementsByClassName('userItem');
        // this.itemImage.id = item.id + '-userItemImg' + item.itemType.toLowerCase();
        this.itemImage.id = item.id;
        this.itemImage.addEventListener('mouseover', this.mouseOverItem);
        this.itemImage.addEventListener('mouseout', this.mouseOutItem);
        for (const userSlot of this.userItemSlots) {
          if (userSlot.id === item.backpackSlot) {
            document.getElementById(userSlot.id).appendChild(this.itemImage);
          }
        }
      }
      this.ktorySlotWolny();
    });
  }

  inicjalizujWidok() {
    (<HTMLButtonElement>document.getElementById('btnAnuluj')).disabled = true;
    (<HTMLButtonElement>document.getElementById('btnSell')).disabled = true;
  }

  mouseOverItem(ev) {
    this.userItems = JSON.parse(window.sessionStorage.getItem('userItems'));
    for (const item of this.userItems) {
      if (ev.target.id.includes(item.id)) {
        this.actualHoverItem = item;
        break;
      }
    }
    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('infoAboutItem');
    // UWAGA STULEJARSKIE IFY
    document.getElementById('itemName').innerText = this.actualHoverItem.itemName;
    document.getElementById('itemLevel').innerText = this.actualHoverItem.itemLevel;
    document.getElementById('itemId').innerText = this.actualHoverItem.id;
    if (this.actualHoverItem.itemDamage !== 0) {
      document.getElementById('itemDamage').parentElement.style.display = 'inline-block';
      document.getElementById('itemDamage').innerText = this.actualHoverItem.itemDamage;
    } else {
      document.getElementById('itemDamage').parentElement.style.display = 'none';
      document.getElementById('itemDamage').innerText = this.actualHoverItem.itemDamage;
    }
    if (this.actualHoverItem.itemDefense !== 0) {
      document.getElementById('itemDefense').parentElement.style.display = 'inline-block';
      document.getElementById('itemDefense').innerText = this.actualHoverItem.itemDefense;
    } else {
      document.getElementById('itemDefense').parentElement.style.display = 'none';
      document.getElementById('itemDefense').innerText = this.actualHoverItem.itemDefense;
    }
    if (this.actualHoverItem.itemStrength !== 0) {
      document.getElementById('itemStrength').parentElement.style.display = 'inline-block';
      document.getElementById('itemStrength').innerText = this.actualHoverItem.itemStrength;
    } else {
      document.getElementById('itemStrength').parentElement.style.display = 'none';
      document.getElementById('itemStrength').innerText = this.actualHoverItem.itemStrength;
    }
    if (this.actualHoverItem.itemWidsdom !== 0) {
      document.getElementById('itemWidsdom').parentElement.style.display = 'inline-block';
      document.getElementById('itemWidsdom').innerText = this.actualHoverItem.itemWidsdom;
    } else {
      document.getElementById('itemWidsdom').parentElement.style.display = 'none';
      document.getElementById('itemWidsdom').innerText = this.actualHoverItem.itemWidsdom;
    }
    // document.getElementById('itemValue').parentElement.style.display = 'inline-block';
    // document.getElementById('itemValue').innerText = this.actualHoverItem.itemValue || 0;
    this.infoAboutItem.style.left = this.rect.left + 121 + 'px';
    this.infoAboutItem.style.top = this.rect.top - 121 + 'px';
    this.infoAboutItem.style.visibility = 'visible';

  }

  mouseOutItem(ev) {
    this.infoAboutItem.style.visibility = 'hidden';
  }

  dragStart(event: CdkDragStart) {
    this.myItemId = document.getElementById('itemId').innerText;
    // this.myItemValue = document.getElementById('itemValue').innerText ? document.getElementById('itemValue').innerText : 0;
    this.previusDragContainer = event.source.element.nativeElement.parentElement.id; // miejsce z ktorego rozpoczynam drag
  }

  dragEntered(event: CdkDragEnter) {
    console.log('entered');
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '0.3';
  }

  dragExit(event: CdkDragExit) {
    console.log('exit');
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';
  }

  // console.log(event.item.element.nativeElement.children[0].id); // ID itemu
  // console.log(event.container.element.nativeElement.children[0].id); // id diva do ktorego wrzucamy
  // console.log(event.container.element.nativeElement.id); // id rodzica diva do tkorego wrzucamy
  // console.log(event.item.element.nativeElement.id);

  drop(event: any) {
    // plecka -> plecak
    if (this.previusDragContainer.includes('slot') && event.container.element.nativeElement.id.includes('slot')) {
      if ((event.container.element.nativeElement.children[0].children.length === 0) &&
        (event.container.element.nativeElement.children[0].id !== this.actualItemInBlacksmith)) {
        this.userItemService.transferItemToDifferentSlot(
          event.item.element.nativeElement.children[0].id.split('-')[0],
          event.container.element.nativeElement.children[0].id).subscribe();

        document.getElementById(event.container.element.nativeElement.children[0].id).append
        (document.getElementById(event.item.element.nativeElement.children[0].id));
      }
      // plecak -> sprzedaz
    } else if (this.previusDragContainer.includes('slot') && event.container.element.nativeElement.id.includes('market')) {
      if (event.container.element.nativeElement.children[0].children.length === 0) {
        console.log(event.item.element.nativeElement.children[0].id);
        document.getElementById(event.container.element.nativeElement.children[0].id).append(document.getElementById(event.item.element.nativeElement.children[0].id));
        this.itemInBlacksmithSlotId = this.myItemId;
        this.actualItemInBlacksmith = event.item.element.nativeElement.id;
        document.getElementById(this.actualItemInBlacksmith).parentElement.style.border = '3px solid blue';
        (<HTMLButtonElement>document.getElementById('btnAnuluj')).disabled = false;
        (<HTMLButtonElement>document.getElementById('btnSell')).disabled = false;
      }
      // sprzedaz -> plecak
    } else if (false) {
    }
  }

  sellItem() {
    const price = +(<HTMLInputElement>document.getElementById('priceHolder')).value;
    if (price > 0) {
      console.log(this.actualItemInBlacksmith);
      this.userItemService.sellItem(price, this.myItemId).subscribe(response => {
        this.inicjalizujDane();
      });
      document.getElementById(this.actualItemInBlacksmith).parentElement.style.border = '';
      document.getElementById('marketPlaceSlot').children[0].remove();
      document.getElementById('marketPlaceSlotHolder').appendChild(document.getElementById('marketPlaceSlot'));
      (<HTMLButtonElement>document.getElementById('btnAnuluj')).disabled = true;
      (<HTMLButtonElement>document.getElementById('btnSell')).disabled = true;
      (<HTMLInputElement>document.getElementById('priceHolder')).value = '';
      this.ktorySlotWolny();
      // document.getElementById(this.actualItemInBlacksmith.children[0].id).remove();
      // this.actualItemInBlacksmith = '';
    } else {
      console.log('wprowadz cene');
    }
    // console.log(document.getElementById('userItem3').children.length); // zwaraca 1 jak jes tam imte
    // console.log(document.getElementById('slot-3').children[0].children.length); // to samo co wyzej zalezy ktory div
  }

  anuluj() {
    document.getElementById(this.actualItemInBlacksmith).appendChild(document.getElementById(this.itemInBlacksmithSlotId));
    document.getElementById(this.actualItemInBlacksmith).parentElement.style.border = '';
    this.actualItemInBlacksmith = '';
    (<HTMLButtonElement>document.getElementById('btnAnuluj')).disabled = true;
    (<HTMLButtonElement>document.getElementById('btnSell')).disabled = true;
  }

  kup(itemID: any, userName: string) {
    // TODO: tutaj
    console.log(this.userData.username);
    if (this.wolnySlot === null) {
      console.log('nie masz miejsca w plecaku zeby kupic ten przedmiot');
    } else if (this.wolnySlot !== null) {
      this.removeItemFromMarket(itemID, this.wolnySlot);
    }
  }

  brandNewItem(itemID: number) {
    this.userItemService.getBrandNewItem(itemID).subscribe(response => {
      this.newItem = response;
      this.userItems = JSON.parse(window.sessionStorage.getItem('userItems'));
      this.userItems.push(this.newItem);

      window.sessionStorage.setItem('userItems', JSON.stringify(this.userItems));
      window.sessionStorage.clear();
      window.sessionStorage.setItem('userItems', JSON.stringify(this.userItems));
      this.itemImage = document.createElement('img');
      this.itemImage.src = 'http://localhost:8080/user/getuserItemImage/' + this.newItem.id;
      this.itemImage.id = this.newItem.id;
      this.itemImage.addEventListener('mouseover', this.mouseOverItem);
      this.itemImage.addEventListener('mouseout', this.mouseOutItem);
      // TODO : tu zmienilem
      document.getElementById(this.wolnySlot).appendChild(this.itemImage);
      this.ktorySlotWolny();
    });
  }

  removeItemFromMarket(itemID: number, freeSlot: string) {
    this.userItemService.removeItemFromMarket(itemID).subscribe(response => {
      // TODO: tutaj
      this.addItemToNewOwner(itemID, this.userData.username, freeSlot);
    });
  }

  addItemToNewOwner(itemID: number, newOnwer: string, slot: string) {
    this.userItemService.addItemToNewOwner(itemID, newOnwer, slot).subscribe(response => {
      this.inicjalizujDane();
      this.brandNewItem(itemID);
    });
  }

  ktorySlotWolny() {
    for (const slot of this.userItemSlots) {
      if (document.getElementById(slot.id).children.length === 0) {
        if (slot.id !== 'marketPlaceSlot') {
          console.log('pierwszym znalezionym wolnym slotem jest' + slot.id);
          this.wolnySlot = slot.id;
          break;
        }
      } else {
        this.wolnySlot = null;
      }
    }
    if (this.wolnySlot === null) {
      console.log('brak wolnych miejsc w pleacku');
    }
    console.log(this.wolnySlot);
  }

  anulujAukcje(userItemID: number) {
    if (this.wolnySlot === null) {
      console.log('najpierw zrob miejsce w plecaku!');
    } else if (this.wolnySlot !== null) {
      this.removeItemFromMarket(userItemID, this.wolnySlot);
    }
  }

  selectedType(id: any) {
    console.log(id);
    this.lookingFor = id;
  }

  filtrInput() {
    this.clearInput();
    if (this.lookingFor === 'Wszystko') {
      for (const type of this.itemTypes) {
        this.typeTemps = document.getElementsByClassName(type);
        for (const typeTemp of this.typeTemps) {
          typeTemp.parentNode.style.display = 'table-row';
        }
      }
    } else {
      this.xds = document.getElementsByClassName(this.lookingFor);
      for (const xd of this.xds) {
        xd.parentNode.style.display = 'table-row';
      }
    }
  }

  clearInput() {
    for (const type of this.itemTypes) {
      this.typeTemps = document.getElementsByClassName(type);
      for (const typeTemp of this.typeTemps) {
        typeTemp.parentNode.style.display = 'none';
      }
    }
  }

  mouseEnter(ev, id) {
    console.log(id);
    for (let i = 0; i < this.przedmioty.length; i++) {
      if (this.przedmioty[i].userItem.id === id) {
        this.actualHoverItem = this.przedmioty[i];
        break;
      }
    }
    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('infoAboutItem');
    // UWAGA STULEJARSKIE IFY
    document.getElementById('itemName').innerText = this.actualHoverItem.userItem.itemName;
     document.getElementById('itemLevel').innerText = this.actualHoverItem.userItem.itemLevel;
     document.getElementById('itemId').innerText = this.actualHoverItem.userItem.id
     if (this.actualHoverItem.userItem.itemDamage !== 0) {
       document.getElementById('itemDamage').parentElement.style.display = 'inline-block';
       document.getElementById('itemDamage').innerText = this.actualHoverItem.userItem.itemDamage;
     } else {
      document.getElementById('itemDamage').parentElement.style.display = 'none';
      document.getElementById('itemDamage').innerText = this.actualHoverItem.userItem.itemDamage;
    }
    if (this.actualHoverItem.userItem.itemDefense !== 0) {
      document.getElementById('itemDefense').parentElement.style.display = 'inline-block';
      document.getElementById('itemDefense').innerText = this.actualHoverItem.userItem.itemDefense;
    } else {
      document.getElementById('itemDefense').parentElement.style.display = 'none';
      document.getElementById('itemDefense').innerText = this.actualHoverItem.userItem.itemDefense;
    }
    if (this.actualHoverItem.userItem.itemStrength !== 0) {
      document.getElementById('itemStrength').parentElement.style.display = 'inline-block';
      document.getElementById('itemStrength').innerText = this.actualHoverItem.userItem.itemStrength;
    } else {
      document.getElementById('itemStrength').parentElement.style.display = 'none';
      document.getElementById('itemStrength').innerText = this.actualHoverItem.userItem.itemStrength;
    }
    if (this.actualHoverItem.userItem.itemWidsdom !== 0) {
      document.getElementById('itemWidsdom').parentElement.style.display = 'inline-block';
      document.getElementById('itemWidsdom').innerText = this.actualHoverItem.userItem.itemWidsdom;
    } else {
      document.getElementById('itemWidsdom').parentElement.style.display = 'none';
      document.getElementById('itemWidsdom').innerText = this.actualHoverItem.userItem.itemWidsdom;
    }
  //  document.getElementById('itemValue').parentElement.style.display = 'inline-block';
  //  document.getElementById('itemValue').innerText = this.actualHoverItem.itemValue || 0;
    this.infoAboutItem.style.left = this.rect.left + 121 + 'px';
    this.infoAboutItem.style.top = this.rect.top - 121 + 'px';
    this.infoAboutItem.style.visibility = 'visible';
  }

  mouseOutt(ev, id) {
    this.infoAboutItem.style.visibility = 'hidden';
  }
}
