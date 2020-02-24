
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
  realPrevContainer;
  i;
  constructor(private userService: ExamplespringService) { }
  ngOnInit() {
    this.i = 0;
    this.userService.getStudents().subscribe(response => {
      this.heroes = response;
    });
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
  swapElements(oldItemId: string, oldContainerId: string) {
    console.log('swap elements');
    document.getElementById(oldContainerId).appendChild(document.getElementById(oldItemId));

  }
  dragStart(event: CdkDragStart) {
    this.previusDragContainer = event.source.element.nativeElement.parentElement.id; // miejsce z ktorego rozpoczynam drag
    // console.log('drag start' + this.previusDragContainer);
  }
  dragEntered(event: CdkDragEnter) {
      // event.item.element.nativeElement.style.display = 'none';
    console.log(event.container.element.nativeElement.id)
        document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '0.3';
    console.log(event.container.element.nativeElement.children[0])
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

  dragExit(event: CdkDragExit) {
    if (this.wasItemInEnteredSlot) {
      event.container.element.nativeElement.appendChild(document.getElementById(this.idOfItemThatWasInEnteredSlot));
    }
    this.wasItemInEnteredSlot = false;

    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';
  }

  drop(event: any) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';
    document.getElementById(event.container.element.nativeElement.id).append
    (document.getElementById(event.item.element.nativeElement.id));
      console.log('z ' + event.previousContainer.element.nativeElement.id);
      console.log('do ' + event.container.element.nativeElement.id);
      // event.previousContainer.removeItem(event.item);

  }
}
