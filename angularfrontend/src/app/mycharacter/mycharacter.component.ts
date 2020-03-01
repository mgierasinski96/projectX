import {ExamplespringService} from '../services/examplespring.service';
import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDragStart, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './mycharacter.component.html',
  styleUrls: ['./mycharacter.component.scss']
})
export class MycharacterComponent implements OnInit {
  heroes;
  previusDragContainer;
  idOfItemThatWasInEnteredSlot;
  wasItemInEnteredSlot;
  infoAboutItem;
  allItems;
  rect;

  constructor(private userService: ExamplespringService) {
  }

  ngOnInit() {
    this.userService.getStudents().subscribe(response => {
      this.heroes = response;
    });
    this.allItems = document.getElementsByClassName('exItem');
    console.log(this.allItems.length);
    for (let i = 0; i < this.allItems.length; i++) {
      this.allItems[i].addEventListener('mouseover', this.mouseOverItem);
      this.allItems[i].addEventListener('mouseout', this.mouseOutItem);
    }
  }

  // obsluga zdarzenie przenoszenia przedmiotow z eq/plecak i plecak/eq
  // id slotow w plecaku
  // slot1
  // slot2
  // .
  // .
  // id miejsc w eq
  // earring
  // helmet
  // .
  // .
  // swapElements funkcja sluzaca do zamiany przedmitoow miejscami przy przeciaganiu
  // pod warunkiem ze w miejscu najechania znajduje sie juz inny przedmuot
  // 2 parametry
  // oldItemId odpowiada za przedmiot ktory znajdowal sie kontenerze przy draggowaniu nowego przedmiotu
  // oldContainerId odpowiada za miejsce z ktorego rozpoczeto przenoszenie nowego przedmiotu

  // TODO
  // przemyslec sprawe czy chce sie aby wlasciwe miejsce w ekwipunku podswietlalo sie od razu przy wykonaniu on dragStart

  mouseOverItem(ev) {
    // ev.target to zdjecie aktualnego przedmiotu
    // wypelnic infoAboutItem statystykami przedmiotu
    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('infoAboutItem');
    this.infoAboutItem.style.left = this.rect.left - 720 + 'px';
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

    document.getElementById('wrongItemWarning').style.animation = '';
    this.previusDragContainer = event.source.element.nativeElement.parentElement.id; // miejsce z ktorego rozpoczynam drag
    // console.log('drag start' + this.previusDragContainer);
  }

  dragEntered(event: CdkDragEnter) {

    if ((event.container.element.nativeElement.id.includes('slot') && this.previusDragContainer.includes('slot')) || event.item.element.nativeElement.id.includes(event.container.element.nativeElement.id)) {
      // event.item.element.nativeElement.style.display = 'none';
      document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '0.3';
      // document.getElementById(event.container.element.nativeElement.id).removeChild
      // (document.getElementsByClassName('cdk-drag exItem cdk-drag-placeholder')[0]);
      if (event.container.element.nativeElement.children.length > 1) {
        if (event.container.element.nativeElement.children[0].id !== '') {
          // console.log('w ifie '+ event.container.element.nativeElement.children[0].id)
          this.idOfItemThatWasInEnteredSlot = event.container.element.nativeElement.children[0].id;
          this.wasItemInEnteredSlot = true;
          this.swapElements(event.container.element.nativeElement.children[0].id, this.previusDragContainer); // z plecaka do eq
        } else if (event.container.element.nativeElement.children[1].id != null) {
          this.idOfItemThatWasInEnteredSlot = event.container.element.nativeElement.children[1].id;
          this.wasItemInEnteredSlot = true;
          // console.log('w else ifie '+ event.container.element.nativeElement.children[1].id)
          this.swapElements(event.container.element.nativeElement.children[1].id,
            this.previusDragContainer); // z eq do plecaka i z plecaka do plecaka

        }
      }
    }
  }

  dragExit(event: CdkDragExit) {
    if (this.wasItemInEnteredSlot) {
      event.container.element.nativeElement.appendChild(document.getElementById(this.idOfItemThatWasInEnteredSlot));
    }
    this.wasItemInEnteredSlot = false;

    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';
  }

  drop(event: any) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';

    // sprawdz czy przeniesienie jest mozliwe
    if (event.item.element.nativeElement.id.includes(event.container.element.nativeElement.id) || event.container.element.nativeElement.id.includes('slot')) {

      if (event.container != event.previousContainer) {
        event.previousContainer.removeItem(event.item);
      }
      document.getElementById(event.container.element.nativeElement.id).append
      (document.getElementById(event.item.element.nativeElement.id));
      // event.previousContainer.removeItem(event.item);
      if (event.container === event.previousContainer) {
        event.container.addItem(event.item);
      }

      // PRZELICZANIE STATYSTYK
      if (!(event.container.element.nativeElement.id.includes('slot') && this.previusDragContainer.includes('slot'))) {
        // jesli przenosisz z innego miejsca niz relacja plecak-plecak to... -> CZYLI
        // DZIALAJ DLA KAZDEGO MOZLIWEGO PRZENIESIA ZA WYJATKIEM PLECAK-PLECAK
        console.log('tak trzeba przeliczyc staty');

        // przy zamianie przedmiotow najwygodniej bedzie odwolac sie do bazy danych, sprawdzic aktualnie zalozony przedmiot
        //  zdjac jego statystyki od statystyk postaci, a nastepnie dodac nowy przedmiot i zupdatowac baze danych
        // ZAMIANY PRZEDMIOTOW MOZNA DOKONYWAC TYLKO PRZENOSZAC PRZEDMIOT Z PLECAKA DO EQ
        // NIE MOZNA DOKONAC ZAMIANY PRZEDMIOTOW PRZENOSZAC PRZEDMIOT Z EQ DO PLECAKA

        // MIEJSCE NA KOD PRZELICZAJACY STATYSTYKI PO UPUSZCZENIU PRZEDMIOTU






        // MIEJSCE NA KOD PRZELICZAJACY STATYSTYKI PO UPUSZCZENIU PRZEDMIOTU
      }

    }
    // jesli przeniesienie w ogole nie bylo niemozliwe to:
    else {
      document.getElementById('wrongItemWarning').style.animation = 'changeVisibility 2s';

    }
  }
}
