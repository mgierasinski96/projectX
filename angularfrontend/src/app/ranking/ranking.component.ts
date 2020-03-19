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
import {UserbackpackService} from '../services/userbackpack.service';
import {MatPaginator} from '@angular/material/paginator';
import {GuildService} from '../services/guild.service';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, AfterViewInit {
  dataSource;
  dataGuildSource;
  userItemSlots;
  userItems;
  itemImg;
  actualHoverItem;
  infoAboutItem;
  rect;
  rows;
  guildMembers
  loggedUsername;

  displayedColumns: string[] = ['position', 'username', 'level', 'total_exp', 'profession', 'guild'];
  displayedGuildColumns: string[] = ['position', 'guild_name', 'guild_tag'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService, private userItemsService: UserbackpackService, private guildService: GuildService) {
  }

  ngOnInit() {
    this.loggedUsername = 'dden'; // #TODO == loggedUser.getUsername
    this.userService.getUserRankingOrderByLvlDesc().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
    });
    this.guildService.getAllGuilds().subscribe(response => {
      this.dataGuildSource = new MatTableDataSource(response);
      this.dataGuildSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.scrollTo(this.loggedUsername);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showGuilds(event) {
    if (event.target.parentNode.children[5]?.innerText === '-') {
    } else {
      document.getElementById('rankingTable').style.display = 'none';
      document.getElementById('users').style.background = 'none';
      document.getElementById('rankingGuildTable').style.display = 'inline-block';
      document.getElementById('guilds').style.background = 'red';
      document.getElementById('userInfo').style.display = 'none';
      this.rows = document.getElementsByClassName('mat-row cdk-row ng-star-inserted');
      for (const row of this.rows) {
        row.style.background = 'none';
      }
      if (event.target.parentNode.children[5]?.innerText) { // przejscie do gildii bezposrednio od usera
        this.rows = document.getElementsByClassName('mat-row cdk-row ng-star-inserted');
        for (let i = 0; i < this.rows.length; i++) {
          if (this.rows[i].children[2].innerText === event.target.parentNode.children[5].innerText) {
            this.scrollTo(this.rows[i].children[1].innerText);
              this.getGuildData(this.rows[i].children[1].innerText);
          }
        }
      }
    }
  }

  showUsers() {
    document.getElementById('rankingGuildTable').style.display = 'none';
    document.getElementById('guilds').style.background = 'none';
    document.getElementById('rankingTable').style.display = 'inline-block';
    document.getElementById('users').style.background = 'red';
    document.getElementById('guildInfo').style.display = 'none';
    this.rows = document.getElementsByClassName('mat-row cdk-row ng-star-inserted');
    for (const row of this.rows) {
      row.style.background = 'none';
    }
  }

  displayGuildData(event) {
    for (let i = 0; i < event.target.parentNode.parentNode.children.length; i++) {
      event.target.parentNode.parentNode.children[i].style.background = 'none';
    }
    event.target.parentNode.style.background = 'lightgreen';
    this.getGuildData(event.target.parentNode.children[1].innerText);
  }

  displayUserData(event) {
    // #TODO if loggedUsername!=event.target.parentNode.children[1].innerText (clicked username)????
    // czy user moze wyswietlic dane o samym sobie ?
document.getElementById('userInfo').style.display = 'inline-block';
    for (let i = 0; i < event.target.parentNode.parentNode.children.length; i++) {
      event.target.parentNode.parentNode.children[i].style.background = 'none';
    }
    event.target.parentNode.style.background = 'lightgreen';
   this.getUserItemsAndStats(event.target.parentNode.children[1].innerText);
  }

  displayGuildMemberInUserRanking(event) {
    this.showUsers();
    this.scrollTo(event.target.parentNode.children[0].innerText);
    document.getElementById('userInfo').style.display = 'inline-block';
    this.getUserItemsAndStats(event.target.parentNode.children[0].innerText);
  }

  getGuildData(guildName: string) {
    document.getElementById('guildInfo').style.display = 'inline-block';
    this.guildService.getGuildByGuildName(guildName).subscribe(response => {
      document.getElementById('guildName').innerText = response.guildName;
      document.getElementById('guildTag').innerText = response.guildTag;
    });

    this.guildService.getGuildMembersByGuildName(guildName).subscribe(response => {
      this.guildMembers = response;

    });
  }
  getUserItemsAndStats(username: string) {
    this.userItemSlots = document.getElementsByClassName('userItem');
    for (const userSlot of this.userItemSlots) {
      userSlot.innerHTML = '';
    }
    this.userItemsService.getUserItemsByUsername(username).subscribe(response => {
      this.userItems = response;
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
    this.userService.getUserByUsername(username).subscribe(response => {
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
  scrollTo(userNameOrGuildName: string) {
    setTimeout(() => {// wait 300 ms until mat-table data is ready
      this.rows = document.getElementsByClassName('mat-row cdk-row ng-star-inserted');
      if (this.rows.length > 0) {
        for (let i = 0; i < this.rows.length; i++) {
          if (this.rows[i].children[1].innerText === userNameOrGuildName) {
            this.rows[i].style.background = 'lightgreen';
            this.rows[i].scrollIntoView({
              behavior: 'smooth', // or auto
              block: 'center'
            });
          }
        }
      }
    }, 300);
  }
}

