import {Component, OnInit} from '@angular/core';
import {DropService} from '../services/drop.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragEnter, CdkDragExit, CdkDragStart} from '@angular/cdk/drag-drop';
import {UserbackpackService} from '../services/userbackpack.service';


@Component({
  selector: 'app-temporary',
  templateUrl: './upgradeItem.component.html',
  styleUrls: ['./upgradeItem.component.css']
})
export class UpgradeItemComponent implements OnInit {
  previusDragContainer;
  infoAboutItem; // div with item info
  userItems;
  userItemSlots;
  rect; // infoAboutItem is displayed basing on rect
  itemImg; // element html typu obrazek
  actualHoverItem; // item na ktory obecnie najechano
  upgradeStatBoost;
  actualItemInBlacksmith;
  myItemDefense;
  myItemDamage;
  myItemStrength;
  myItemWisdom;
  myItemValue;
  myItemId;
  itemInBlacksmithSlotId;

  constructor(private userItemsService: UserbackpackService) {
  }

  ngOnInit() {
    this.upgradeStatBoost = 1; // #TODO ILE BONUSU DO STATOW DAJE KAZDE ULEPSZENIE
    (<HTMLButtonElement>document.getElementById('upgradeButton')).disabled = true;
    this.userItemsService.getUserItems(4).subscribe(response => { // W PRZYSZLOSCI NIE MOZNA POBIERAC LOSOWYCH OFC
      this.userItems = response;
      window.sessionStorage.setItem('userItems', JSON.stringify(this.userItems));
      for (const item of this.userItems) {  // dla wszystkich pobranych elementow
        this.itemImg = document.createElement('img'); // stworzenie nowego elementu html typu img
        this.itemImg.src = '  http://localhost:8080/user/getuserItemImage/' + item.id; // ustawienie zrodla obrazka na backend w springu
        this.itemImg.id = item.id + '-userItemImg' + item.itemType.toLowerCase(); // przypisanie id przedmiotu do id elementu html
        this.itemImg.addEventListener('mouseover', this.mouseOverItem); // dodanie do obrazka obslugi zdarzen
        this.itemImg.addEventListener('mouseout', this.mouseOutItem);
        this.userItemSlots = document.getElementsByClassName('userItem');
        for (const userSlot of this.userItemSlots) {
          if (userSlot.id === item.backpackSlot) {
            document.getElementById(userSlot.id).appendChild(this.itemImg);
          }
        }

      }
    });
  }
  mouseOverItem(ev) {
    this.userItems = JSON.parse(window.sessionStorage.getItem('userItems'));
    for (const item of this.userItems) { // ev.target.id to np shopItemId4 gdzie 4 to id przedmiotu w bazie danych
      if (ev.target.id.includes(item.id)) { // sposrob wszystkich przedmiotow odebranych przez service, trzeba znalezc
        // ten ktorego id jest takie jak id przedmiotu na ktory najechano
        this.actualHoverItem = item; // przypisanie tego przedmiotu do actualHoverItem
        break;
      }
    } // zrob to samo dla przedmiotow uzytkownika, bo moga byc calkowocie rozne  od przedmiotow w sklepie
    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('infoAboutItem');
    // pobieranie danych z actualHoverItem i przypisywanie ich do tabeli ktorej komorki nazywaja sie itemName i itemDamage

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
    if (this.actualHoverItem.itemWidsdom !== 0) { // #TODO uwaga na literowke
      document.getElementById('itemWidsdom').parentElement.style.display = 'inline-block';
      document.getElementById('itemWidsdom').innerText = this.actualHoverItem.itemWidsdom;
    } else {
      document.getElementById('itemWidsdom').parentElement.style.display = 'none';
      document.getElementById('itemWidsdom').innerText = this.actualHoverItem.itemWidsdom;
    }
      document.getElementById('itemValue').parentElement.style.display = 'inline-block';
      document.getElementById('itemValue').innerText = this.actualHoverItem.itemValue || 0;
    this.infoAboutItem.style.left = this.rect.left + 121 + 'px';
    this.infoAboutItem.style.top = this.rect.top  - 121 + 'px';
    this.infoAboutItem.style.visibility = 'visible';
  }

  mouseOutItem(ev) {
    this.infoAboutItem.style.visibility = 'hidden'; // nie wyswietlaj informacji o przedmiocie po odjechaniu myszka
  }
  dragStart(event: CdkDragStart) {
    this.myItemId = document.getElementById('itemId').innerText;
    this.myItemDefense = document.getElementById('itemDefense').innerText ? document.getElementById('itemDefense').innerText : 0;
    this.myItemDamage = document.getElementById('itemDamage').innerText ? document.getElementById('itemDamage').innerText : 0;
    this.myItemStrength = document.getElementById('itemStrength').innerText ? document.getElementById('itemStrength').innerText : 0;
    this.myItemWisdom = document.getElementById('itemWidsdom').innerText ? document.getElementById('itemWidsdom').innerText : 0;
    this.myItemValue = document.getElementById('itemValue').innerText ? document.getElementById('itemValue').innerText : 0;
    // document.getElementById('shopAssisantDialog').style.animation = ''; // #TODO EDIT THIS
    this.previusDragContainer = event.source.element.nativeElement.parentElement.id; // miejsce z ktorego rozpoczynam drag
  }
  dragEntered(event: CdkDragEnter) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '0.3';
  }

  dragExit(event: CdkDragExit) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';
  }

  drop(event: any) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';

    // przesuniecie miedzy okienkami  backpacka
    if (this.previusDragContainer.includes('slot') && event.container.element.nativeElement.id.includes('slot')) {
      if (event.container.element.nativeElement.children[0].children.length === 0 &&
        event.container.element.nativeElement.children[0].id !== this.actualItemInBlacksmith) {
        this.userItemsService.transferItemToDifferentSlot(event.item.element.nativeElement.children[0].id.split('-')[0],
          event.container.element.nativeElement.children[0].id).subscribe();
        document.getElementById(event.container.element.nativeElement.children[0].id).append
        (document.getElementById(event.item.element.nativeElement.children[0].id));
      }
    }  else if (this.previusDragContainer.includes('blacksmith') && event.container.element.nativeElement.id.includes('slot')) {
      if (event.container.element.nativeElement.children[0].children.length === 0) {
        document.getElementById(this.actualItemInBlacksmith).parentElement.style.border = '';
        this.actualItemInBlacksmith =  '';
        this.userItemsService.transferItemToDifferentSlot(event.item.element.nativeElement.children[0].id.split('-')[0],
          event.container.element.nativeElement.children[0].id).subscribe();

        document.getElementById(event.container.element.nativeElement.children[0].id).append
        (document.getElementById(event.item.element.nativeElement.children[0].id));
        (<HTMLButtonElement>document.getElementById('upgradeButton')).disabled = true;
        this.itemInBlacksmithSlotId = 0;
        document.getElementById('upgradeStatsTable').style.display = 'none';
      }
    } else if (this.previusDragContainer.includes('slot') && event.container.element.nativeElement.id.includes('blacksmith')) {
      if (event.container.element.nativeElement.children[0].children.length === 0) {
        this.actualItemInBlacksmith = event.item.element.nativeElement.id;

        document.getElementById(this.actualItemInBlacksmith).parentElement.style.border = '1px solid blue';
        document.getElementById(event.container.element.nativeElement.children[0].id).append
        (document.getElementById(event.item.element.nativeElement.children[0].id));
        document.getElementById('upgradeStatsTable').style.display = 'inline-block';
        document.getElementById('oldItemStrength').innerText = this.myItemStrength;
        document.getElementById('oldItemDefense').innerText = this.myItemDefense;
        document.getElementById('oldItemDamage').innerText = this.myItemDamage;
        document.getElementById('oldItemWisdom').innerText = this.myItemWisdom;
        document.getElementById('oldItemValue').innerText = this.myItemValue;
        document.getElementById('newItemStrength').innerText = Number(this.myItemStrength) + this.upgradeStatBoost;
        document.getElementById('newItemDefense').innerText = Number(this.myItemDefense) + this.upgradeStatBoost;
        document.getElementById('newItemDamage').innerText = Number(this.myItemDamage) + this.upgradeStatBoost;
        document.getElementById('newItemWisdom').innerText = Number(this.myItemWisdom) + this.upgradeStatBoost;
        document.getElementById('newItemValue').innerText = Number(this.myItemValue) + this.upgradeStatBoost;
        // #TODO KOSZT ULEPSZENIA LICZONY JAKO KWADRAT WARTOSCI PRZEDMIOTU
        document.getElementById('upgradePrice').innerText = this.myItemValue * this.myItemValue + '';
        this.itemInBlacksmithSlotId = this.myItemId;
        (<HTMLButtonElement>document.getElementById('upgradeButton')).disabled = false;

      }
    }

  }

  upgradeItem() {
    // # TODO GET USER GOLD AMD DECREASE USER GOLD BY UPGRADE PRICE
    // # TODO GET USER GOLD AMD DECREASE USER GOLD BY UPGRADE PRICE
    // # TODO GET USER GOLD AMD DECREASE USER GOLD BY UPGRADE PRICE
    // if (userGold > Number(document.getElementById('upgradePrice').innerText)) {
      document.getElementById(this.actualItemInBlacksmith).append
      (document.getElementById(document.getElementById('blacksmithSlot').children[0].id));
      document.getElementById('upgradeStatsTable').style.display = 'none';
      document.getElementById(this.actualItemInBlacksmith).parentElement.style.border = '';
      this.actualItemInBlacksmith = '';
      this.userItemsService.upgradeItem(this.itemInBlacksmithSlotId).subscribe();
    document.getElementById('shopAssisantDialog').style.animation = 'changeVisibility 2s';
    document.getElementById('dialog').innerText = 'Gratulacje';
      window.location.reload();
    // } else {
    //   console.log('Masz za mało złota');
    // }
  }
}
