import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component, ElementRef,
  OnDestroy,
  OnInit, QueryList,
  ViewChild, ViewChildren
} from '@angular/core';
import {DropService} from '../services/drop.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {MatRow, MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {UserItemsService} from '../services/userItems.service';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, AfterViewInit {
dataSource;
  userItemSlots;
  userItems;
  itemImg;
  actualHoverItem;
  infoAboutItem;
  rect;
  rows;

  displayedColumns: string[] = ['position', 'username', 'level', 'total_exp', 'profession'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService, private userItemsService: UserItemsService) {
  }

  ngOnInit() {
    this.userService.getUserRankingOrderByLvlDesc().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
    });
    document.addEventListener('DOMContentLoaded', this.documentReady);
  }

  documentReady() {

  }

  ngAfterViewInit() {

    setTimeout(() => {// call this function 300 ms after view init so the mat table is ready
      this.rows = document.getElementsByClassName('mat-row cdk-row ng-star-inserted');
      if (this.rows.length > 0) {
        for (let i = 0; i < this.rows.length; i++) {
          if (this.rows[i].children[1].innerText === 'admin') { // #TODO == loggedUser.getUsername
            this.rows[i].style.background = 'lightgreen';
            this.rows[i].scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }

      }
    }, 300);
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayUserData(event) {
    // #TODO if loggedUsername!=event.target.parentNode.children[1].innerText (clicked username)????
document.getElementById('userInfo').style.display = 'inline-block';

    for (let i = 0; i < event.target.parentNode.parentNode.children.length; i++) {
      event.target.parentNode.parentNode.children[i].style.background = 'none';
    }
    event.target.parentNode.style.background = 'lightgreen';
   // console.log(event.target.parentNode.children[1].innerText);
    this.userItemSlots = document.getElementsByClassName('userItem');
    for (const userSlot of this.userItemSlots) {
      userSlot.innerHTML = '';
    }

    this.userItemsService.getUserItemsByUsername(event.target.parentNode.children[1].innerText).subscribe(response => {
      this.userItems = response;
      window.sessionStorage.setItem('userItems', JSON.stringify(this.userItems));
      for (const item of this.userItems) {
        for (const userSlot of this.userItemSlots) {
          if (userSlot.id === item.backpackSlot) {
            this.itemImg = document.createElement('img'); // stworzenie nowego elementu html typu img
            this.itemImg.src = '  http://localhost:8080/user/getuserItemImage/' + item.id; // ustawienie zrodla obrazka na backend w springu
            this.itemImg.id = item.id + '-userItemImg' + item.itemType.toLowerCase(); // przypisanie id przedmiotu do id elementu html
            this.itemImg.addEventListener('mouseover', this.mouseOverItem); // dodanie do obrazka obslugi zdarzen
            this.itemImg.addEventListener('mouseout', this.mouseOutItem);
            this.itemImg.style.background = 'rgb(188,183,180)';
            document.getElementById(userSlot.id).appendChild(this.itemImg);
          }
        }
      }
    });
    this.userService.getUserByUsername(event.target.parentNode.children[1].innerText).subscribe(response => {
document.getElementById('userDamageValue').innerText = response.total_damage;
      document.getElementById('userDefenseValue').innerText = response.toughness;
      document.getElementById('userStrenghtValue').innerText = response.strength;
      document.getElementById('userWisdomValue').innerText = response.wisdom;
      document.getElementById('userLuckValue').innerText = response.luck;
      document.getElementById('userStaminaValue').innerText = response.stamina;
    });
  }

  mouseOutItem() {
    document.getElementById(this.actualHoverItem.itemType.toLowerCase() + 'HolderPhoto').style.opacity = '1';
    this.infoAboutItem.style.visibility = 'hidden';

  }
  mouseOverItem(ev) {
    this.userItems = JSON.parse(window.sessionStorage.getItem('userItems'));
    for (const item of this.userItems) {
      if (ev.target.id.includes(item.id)) {
        this.actualHoverItem = item;
        break;
      }
    }
    document.getElementById('itemName').innerText = this.actualHoverItem.itemName;
    document.getElementById('itemLevel').innerText = this.actualHoverItem.itemLevel;
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
    document.getElementById(this.actualHoverItem.itemType.toLowerCase() + 'HolderPhoto').style.opacity = '0.3';
    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('infoAboutItem');
    this.infoAboutItem.style.left = this.rect.left - 170 + 'px';
    this.infoAboutItem.style.top = this.rect.top - 121 + 'px';
    this.infoAboutItem.style.visibility = 'visible';

  }
}

