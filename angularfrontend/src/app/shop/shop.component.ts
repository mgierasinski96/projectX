
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
  infoAboutItem; // div with item info
  allItems; // contains user items and shop items
  itemsToShop; // items in shop
  rect; // infoAboutItem is displayed basing on rect
  shopSlotIterator; // zmienna typu calkowitego sluzaca do pobrania wszyskich slotow w sklepie bo maja id shopSlot1, shopSlot2
  itemImg; // element html typu obrazek
  actualHoverItem; // item na ktory obecnie najechano
  constructor(private dropService: DropService) {
  }
  ngOnInit() {
    this.shopSlotIterator = 1; // ustawienie zmiennej na 1 czyli zaczynamy dodawac przedmioty do okien sklepu od okna1
    this.dropService.getRandomItemsToShop(6).subscribe(response => {
      this.itemsToShop = response;
      window.sessionStorage.setItem('items', JSON.stringify(this.itemsToShop)); // dodanie itemow do sesji
      // tak zeby mozna sie bylo odwolywac do nich w metodzie mouseOverItem -> kurestwo inaczej mowi ze itemsToShop to undefinied

      for (const item of this.itemsToShop) {  // dla wszystkich pobranych elementow
          this.itemImg = document.createElement('img'); // stworzenie nowego elementu html typu img
        this.itemImg.src = 'http://localhost:8080/item/getItemImage/' + item.id; // ustawienie zrodla obrazka na backend w springu
        this.itemImg.id = 'shopItemId' + item.id; // przypisanie id przedmiotu do id elementu html
        this.itemImg.addEventListener('mouseover', this.mouseOverItem); // dodanie do obrazka obslugi zdarzen
        this.itemImg.addEventListener('mouseout', this.mouseOutItem);

        // dodanie kolejnych przedmiotow do kolejnych okien sklepu
      document.getElementById('shopItem' + this.shopSlotIterator).appendChild(this.itemImg);
        this.shopSlotIterator += 1; // w kazdej iteracji dodajemy do innego okna sklepu -> okna numerowane shopItem1-6
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
    for (const item of this.itemsToShop) { // ev.target.id to np shopItemId4 gdzie 4 to id przedmiotu w bazie danych
      if (ev.target.id.includes(item.id)) { // sposrob wszystkich przedmiotow odebranych przez service, trzeba znalezc
        // ten ktorego id jest takie jak id przedmiotu na ktory najechano
        this.actualHoverItem = item; // przypisanie tego przedmiotu do actualHoverItem
        break;
      }
    }
    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('infoAboutItem');
    // pobieranie danych z actualHoverItem i przypisywanie ich do tabeli ktorej komorki nazywaja sie itemName i itemDamage

    // UWAGA STULEJARSKIE IFY
    document.getElementById('itemName').innerText = this.actualHoverItem.itemName;
    if (this.actualHoverItem.itemDamage !==  0) {
      document.getElementById('itemDamage').parentElement.style.display = 'inline-block';
      document.getElementById('itemDamage').innerText = this.actualHoverItem.itemDamage;
    } else {
      document.getElementById('itemDamage').parentElement.style.display = 'none';
    }
    if (this.actualHoverItem.itemDefense !==  0) {
      document.getElementById('itemDefense').parentElement.style.display = 'inline-block';
      document.getElementById('itemDefense').innerText = this.actualHoverItem.itemDefense;
    } else {
      document.getElementById('itemDefense').parentElement.style.display = 'none';
    }
    if (this.actualHoverItem.itemStrength !== 0) {
      document.getElementById('itemStrength').parentElement.style.display = 'inline-block';
      document.getElementById('itemStrength').innerText = this.actualHoverItem.itemStrength;
    } else {
      document.getElementById('itemStrength').parentElement.style.display = 'none';
    }
    if (this.actualHoverItem.itemWidsdom !== 0) { // #TODO uwaga na literowke
      document.getElementById('itemWidsdom').parentElement.style.display = 'inline-block';
      document.getElementById('itemWidsdom').innerText = this.actualHoverItem.itemWidsdom;
    } else {
      document.getElementById('itemWidsdom').parentElement.style.display = 'none';
    }

    this.infoAboutItem.style.left = this.rect.left + 100 + 'px';
    this.infoAboutItem.style.top = this.rect.top - 130 + 'px';
    this.infoAboutItem.style.visibility = 'visible';
  }

  mouseOutItem(ev) {
    this.infoAboutItem.style.visibility = 'hidden'; // nie wyswietlaj informacji o przedmiocie po odjechaniu myszka
  }

  dragStart(event: CdkDragStart) {

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
      if (event.container.element.nativeElement.children.length > 1) {
        this.idOfItemThatWasInEnteredSlot = event.container.element.nativeElement.children[1].id;
        this.wasItemInEnteredSlot = true;
      }
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
    if (event.container !== event.previousContainer) {
      event.previousContainer.removeItem(event.item);
    }
    console.log(event.container.element.nativeElement.id);
    document.getElementById(event.container.element.nativeElement.id).append
    (document.getElementById(event.item.element.nativeElement.id));

    if (event.container === event.previousContainer) {
      event.container.addItem(event.item);
    }
    // upuszczeniu ze sklepu do backpacka czyli odejmij zloto dodaj przedmiot
    if (this.previusDragContainer.includes('shop') && event.container.element.nativeElement.id.includes('slot')) {
      if (event.container.element.nativeElement.children.length < 2) {
        document.getElementById('shopAssisantDialog').style.animation = 'changeVisibility 2s';
        document.getElementById('dialog').innerText = 'Dobry wybór!';

        // #TODO
        // DODAJ DO PLECAKA POSTACI I ODEJMIJ ZLOTO, ZMIEN ID ITEMU NA JAKIES INNE POKI CO BYLE NIE ZE SLOWEM SHOP


        // DODAJ DO PLECAKA POSTACI I ODEJMIJ ZLOTO
      }
      // jezeli przeciagniales w miejsce gdzie znajduje sie juz inny przedmot to cofnij cala operacje
      if (event.container.element.nativeElement.children.length >= 2) {
        document.getElementById(this.previusDragContainer).append
        (document.getElementById(event.item.element.nativeElement.id));
        event.previousContainer.addItem(event.item);
      }
    }
    // upuszczenie z backpacka do sklepu czyli dodaj zloto usun przedmiot NIE DA SIE GO KUPIC PONOWNIE CZY ZOSTAJE W SKLEPIE
    // I MOZNA SPOWROTEM ODKUPIC?
    if (event.container.element.nativeElement.id.includes('shop') && this.previusDragContainer.includes('slot')) {

      // #TODO
      // USUN Z PLECAKA POSTACI (DODAJ DO SKLEPU CZY USUN CALKOWICIE?) I DODAJ ZLOTO

      // TYMCZASOWO JESLI COS TAM JEST TO NIE POZWOL DODAC -> DO WYRZUCENIA W PRZYSZLOSCI
      if (event.container.element.nativeElement.children.length >= 2) { // jesli jest tam jakis przdmiot to NIE WYKONUJ
        document.getElementById(this.previusDragContainer).append
        (document.getElementById(event.item.element.nativeElement.id));
        event.previousContainer.addItem(event.item);
      }
      // USUN Z PLECAKA POSTACI I DODAJ ZLOTO

      document.getElementById('shopAssisantDialog').style.animation = 'changeVisibility 6s';
      document.getElementById('dialog').innerText = 'Pff masz tu swoje grosze';
    }
    // przesuniecie miedzy okienkami sklepu - NIE POZWOL WYKONAC
    if (this.previusDragContainer.includes('shop') && event.container.element.nativeElement.id.includes('shop')) {
      document.getElementById(this.previusDragContainer).append
      (document.getElementById(event.item.element.nativeElement.id));
      event.previousContainer.addItem(event.item);
    }
    // przesuniecie miedzy okienkami  backpacka
    if (this.previusDragContainer.includes('slot') && event.container.element.nativeElement.id.includes('slot')) {
      if (event.container.element.nativeElement.children.length >= 2) { // jesli jest tam jakis przdmiot to NIE WYKONUJ
        // na tym widoku nie robimy zamieny itemow miejscami, chcesz zamieniac i sie bawic  to idz do mycharactercomponent
        document.getElementById(this.previusDragContainer).append
        (document.getElementById(event.item.element.nativeElement.id));
        event.previousContainer.addItem(event.item);
      }
    }
  }


}
