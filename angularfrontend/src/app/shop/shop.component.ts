import {AfterViewInit, Component, Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnInit, Output} from '@angular/core';
import {CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragExit, CdkDragStart, DragDrop} from '@angular/cdk/drag-drop';
import {DropService} from '../services/drop.service';
import {UserbackpackService} from '../services/userbackpack.service';
import {Router} from '@angular/router';

@Component({
  selector: 'shop-dashboard',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  previusDragContainer;
  infoAboutItem; // div with item info
  userItems;
  userItemSlots;
  itemsToShop; // items in shop
  rect; // infoAboutItem is displayed basing on rect
  shopSlotIterator; // zmienna typu calkowitego sluzaca do pobrania wszyskich slotow w sklepie bo maja id shopSlot1, shopSlot2
  itemImg; // element html typu obrazek
  actualHoverItem; // item na ktory obecnie najechano
  myItemPrice;
  myItemValue;
  myItemId;
  boughtItem;
  newShopItem;

  constructor(private dropService: DropService, private userItemsService: UserbackpackService, private router: Router) {
  }

  ngOnInit() {
    this.addShopItems();
    this.listUserItems();
  }

  addShopItems() {
    this.shopSlotIterator = 1; // ustawienie zmiennej na 1 czyli zaczynamy dodawac przedmioty do okien sklepu od okna1
    this.dropService.getShopItemsForUser(4).subscribe(response => {
      this.itemsToShop = response;
      window.sessionStorage.setItem('items', JSON.stringify(this.itemsToShop)); // dodanie itemow do sesji
      // tak zeby mozna sie bylo odwolywac do nich w metodzie mouseOverItem -> kurestwo inaczej mowi ze itemsToShop to undefinied

      for (const item of this.itemsToShop) {  // dla wszystkich pobranych elementow
        this.itemImg = document.createElement('img'); // stworzenie nowego elementu html typu img
        this.itemImg.src = 'http://localhost:8080/item/getItemImage/' + item.id; // ustawienie zrodla obrazka na backend w springu
        this.itemImg.id = item.id; // przypisanie id przedmiotu do id elementu html
        this.itemImg.addEventListener('mouseover', this.mouseOverItem); // dodanie do obrazka obslugi zdarzen
        this.itemImg.addEventListener('mouseout', this.mouseOutItem);

        // dodanie kolejnych przedmiotow do kolejnych okien sklepu
        document.getElementById('shopItem' + this.shopSlotIterator).appendChild(this.itemImg);
        this.shopSlotIterator += 1; // w kazdej iteracji dodajemy do innego okna sklepu -> okna numerowane shopItem od 1 do 6
      }
    });
  }

  listUserItems() {
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
    this.itemsToShop = JSON.parse(window.sessionStorage.getItem('items'));
    this.userItems = JSON.parse(window.sessionStorage.getItem('userItems'));
    for (const item of this.itemsToShop) { // ev.target.id to np shopItemId4 gdzie 4 to id przedmiotu w bazie danych
      if (ev.target.id.includes(item.id)) { // sposrob wszystkich przedmiotow odebranych przez service, trzeba znalezc
        // ten ktorego id jest takie ktore zawiera id przedmiotu na ktory najechano-> id przedmiotu ustawiamy wyzej na podstawie
        // id z bazy
        this.actualHoverItem = item; // przypisanie tego przedmiotu do actualHoverItem
        break;
      }
    }
    for (const item of this.userItems) { // ev.target.id to np shopItemId4 gdzie 4 to id przedmiotu w bazie danych
      if (ev.target.id.includes(item.id)) { // sposrob wszystkich przedmiotow odebranych przez service, trzeba znalezc
        // ten ktorego id jest takie jak id przedmiotu na ktory najechano
        this.actualHoverItem = item; // przypisanie tego przedmiotu do actualHoverItem
        break;
      }
    } // zrob to samo dla przedmiotow uzytkownika, bo moga byc calkowocie rozne  od przedmiotow w sklepie
    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('infoAboutItem');
    // // pobieranie danych z actualHoverItem i przypisywanie ich do tabeli ktorej komorki nazywaja sie itemName i itemDamage
    //
    // // UWAGA STULEJARSKIE IFY
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
    if (ev.target.parentNode.id.includes('shop')) {
      document.getElementById('itemPrice').parentElement.style.display = 'inline-block';
      document.getElementById('itemPrice').innerText = this.actualHoverItem.itemPrice || 0;
      document.getElementById('itemValue').parentElement.style.display = 'none';
    } else {
      document.getElementById('itemValue').parentElement.style.display = 'inline-block';
      document.getElementById('itemValue').innerText = this.actualHoverItem.itemValue || 0;
      document.getElementById('itemPrice').parentElement.style.display = 'none';
    }


    this.infoAboutItem.style.left = this.rect.left + 121 + 'px';
    this.infoAboutItem.style.top = this.rect.top - 121 + 'px';
    this.infoAboutItem.style.visibility = 'visible';
  }

  mouseOutItem(ev) {
    this.infoAboutItem.style.visibility = 'hidden'; // nie wyswietlaj informacji o przedmiocie po odjechaniu myszka
  }

  dragStart(event: CdkDragStart) {
    this.myItemId = document.getElementById('itemId').innerText;
    console.log(this.myItemId);
    if (event.source.element.nativeElement.id.includes('shop')) {
      this.myItemPrice = document.getElementById('itemPrice').innerText ? document.getElementById('itemPrice').innerText : 0;
    } else {
      this.myItemValue = document.getElementById('itemValue').innerText ? document.getElementById('itemValue').innerText : 0;
    }
    document.getElementById('shopAssisantDialog').style.animation = '';
    this.previusDragContainer = event.source.element.nativeElement.parentElement.id; // miejsce z ktorego rozpoczynam drag
  }

  dragEntered(event: CdkDragEnter) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '0.3';
    // from shop to bag// ale nie wykonuj swapa -> musisz przeciagnac przedmiot w puste okno zeby go kupic inaczej nie mozesz
    if (this.previusDragContainer.includes('shop') && event.container.element.nativeElement.id.includes('slot')) {

      // nie rob nic

      // from bag to bag -> nie wykonuj na tym oknie swapa przedmiotow i nie pozwol dodac kolejnego przedmiotu
      // jesli w danym slocie znajduje sie juz inny przedmiot
    } else if (this.previusDragContainer.includes('slot') && event.container.element.nativeElement.id.includes('slot')) {
      // przeciaganie z plecaka do sklepu
    } else if (!(this.previusDragContainer.includes('shop') && event.container.element.nativeElement.id.includes('shop'))) {
      document.getElementById('shopAssisantDialog').style.animation = 'changeVisibility 2s';
      document.getElementById('dialog').innerText = 'Co to za chłam!!';
    }
    // else from eq to shop

  }

  dragExit(event: CdkDragExit) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';
  }

  drop(event: any) {

    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';
    // if (event.container !== event.previousContainer) {
    //   event.previousContainer.removeItem(event.item);
    // }
    // // TODO: Przez to duplikat
    // // document.getElementById(event.container.element.nativeElement.id).append
    // // (document.getElementById(event.item.element.nativeElement.id));
    // //
    // if (event.container === event.previousContainer) {
    //   event.container.addItem(event.item);
    // }
    // upuszczeniu ze sklepu do backpacka czyli odejmij zloto dodaj przedmiot
    if (this.previusDragContainer.includes('shop') && event.container.element.nativeElement.id.includes('slot')) {
      if (event.container.element.nativeElement.children[0].children.length === 0) {
        // SPRAWDZ CZY STAC USERA NA TEN PRZEDMIOT W POWYZSZYM IFIE CENA DOSTEPNA W ZMIENNEJ this.myItemPrice
        document.getElementById('shopAssisantDialog').style.animation = 'changeVisibility 2s';
        document.getElementById('dialog').innerText = 'Dobry wybór!';
        this.userItemsService.addItemToUser(4, event.item.element.nativeElement.children[0].id,
          event.container.element.nativeElement.children[0].id).subscribe(response => {
          this.boughtItem = response;
          this.userItems.push(this.boughtItem);
          window.sessionStorage.removeItem('userItems');
          window.sessionStorage.setItem('userItems', JSON.stringify(this.userItems));
        });
        document.getElementById(event.container.element.nativeElement.children[0].id).
        appendChild(event.item.element.nativeElement.children[0]);
        // # NOW GENERATE NEW ITEM
        this.userItemsService.itemBoughtGenerateNewItem(4, this.myItemId).subscribe(response => {
          this.newShopItem = response;
          this.itemsToShop.push(this.newShopItem);
          window.sessionStorage.removeItem('items');
          window.sessionStorage.setItem('items', JSON.stringify(this.itemsToShop));
          this.itemImg = document.createElement('img'); // stworzenie nowego elementu html typu img
          this.itemImg.src = 'http://localhost:8080/item/getItemImage/' + this.newShopItem.id;
          this.itemImg.id = this.newShopItem.id; // przypisanie id przedmiotu do id elementu html
          this.itemImg.addEventListener('mouseover', this.mouseOverItem); // dodanie do obrazka obslugi zdarzen
          this.itemImg.addEventListener('mouseout', this.mouseOutItem);
          document.getElementById(event.previousContainer.element.nativeElement.children[0].id).appendChild(this.itemImg);
        });
      }
    }

    //  // przeliczaj zloto ODEJMIJ -> cena kupionego przedmiotu dostepna w zmiennej
    // console.log('odejmij zloto ' + this.myItemPrice);
    // window.location.reload();

    // jezeli przeciagniales w miejsce gdzie znajduje sie juz inny przedmot to cofnij cala operacje
    // if (event.container.element.nativeElement.children.length >= 2) {
    //   document.getElementById(this.previusDragContainer).append
    //   (document.getElementById(event.item.element.nativeElement.id));
    //   event.previousContainer.addItem(event.item);
    // }

    // upuszczenie z backpacka do sklepu czyli dodaj zloto usun przedmiot calkowicie i nie patrz na to czy cos tam jest w sklepie
    // w tym okienku
    if (event.container.element.nativeElement.id.includes('shop') && this.previusDragContainer.includes('slot')) {
      // #TODO ID USERA NA SZTYWNO 4
      this.userItemsService.removeItemFromUser(4, 'userItem' + event.previousContainer.element.nativeElement.id.split('-')[1])
        .subscribe();

      // #TODO
      // USUN Z PLECAKA POSTACI I USUN CALKOWICIE I DODAJ ZLOTO
      // wartosc sprzedanego przedmiotu dostepna w zmiennej
      console.log('dodane zloto ' + this.myItemValue);
      // #TODO
      // #TODO
      // #TODO
      // #TODO
      document.getElementById('shopAssisantDialog').style.animation = 'changeVisibility 6s';
      document.getElementById('dialog').innerText = 'Pff masz tu swoje grosze';
      // USUN ZDJECIA Z CALEGO DOKUMENTU, A CDKDRAG APPENDUJ SPOWROTEM DO DROPLISTY Z KTOREJ PRZENOSZONO
      console.log(event.item.element.nativeElement.children[0].id);
      document.getElementById(event.item.element.nativeElement.children[0].id).remove();
      console.log(this.previusDragContainer);
      console.log(event.item.element.nativeElement.id);
      document.getElementById(this.previusDragContainer).appendChild(document.getElementById(event.item.element.nativeElement.id));


    }
    // przesuniecie miedzy okienkami sklepu - NIE POZWOL WYKONAC
    if (this.previusDragContainer.includes('shop') && event.container.element.nativeElement.id.includes('shop')) {
    }
    // przesuniecie miedzy okienkami  backpacka
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
