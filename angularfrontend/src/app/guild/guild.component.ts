import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {GuildService} from '../services/guild.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {DialogRemoveFromGuildComponent} from '../userDialogs/dialogRemoveFromGuild/dialogRemoveFromGuild.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-location',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})

export class GuildComponent implements OnInit,OnDestroy {
  newGuildForm = new FormGroup({

    id: new FormControl(''),
    guildName: new FormControl(''),
    guildTag: new FormControl(''),
  });
  newGoldForm = new FormGroup({
    amount: new FormControl('')
  });
  constructor(private userService: UserService, private guildService: GuildService, private toastr: ToastrService,
              private dialog: MatDialog, private router: Router) {
  }
appUser;
  guildLeader;
  guildMembers;
  storeUpgradeCost;
  mainBuildingUpgradeCost;
  mineUpgradeCost;
  loggedUsername;
  interval;

  ngOnInit() {
    this.loggedUsername = 'dden';
    // this.appUser=sessionStorage.getItem('') #TODO GET APP USER FROM SESSION STORAGE AND CHECK IF HE HAS GUILD
    this.userService.getUserByUsername( this.loggedUsername).subscribe(response => {
      this.appUser = response;
      if (this.appUser.guild) {
        this.guildService.getGuildLeaderByGuildName(this.appUser.guild.guildName).subscribe(response2 => {
          document.getElementById('guildLeader').innerText = response2.username + ' o poziomie ' + response2.level;
        });
        this.getGuildData(this.appUser.guild.guildName);
      }

    });
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  donateGuild() {

   // if ( ENTER USER GOLD > this.newGoldForm.controls['amount'].value) { // #TODO ENTER USER GOLD
      this.guildService.donateGuildGold(this.newGoldForm.controls['amount'].value, this.appUser.username).subscribe();
      document.getElementById('goldAmount').innerText = parseInt(document.getElementById('goldAmount').innerText,
        0) + parseInt(this.newGoldForm.controls['amount'].value, 0) + '';
      this.newGoldForm.controls['amount'].setValue('');
      this.toastr.success('Dokonałeś wpłaty');
   // } else {
   // this.toastr.error('Nie masz wystarczająco złota');

  //  }
  }
  getGuildData(guildName) {
    this.guildService.getGuildMembersByGuildName(guildName).subscribe(response => {
      this.guildMembers = response; // find all guild members and among them find guild leeader
      this.guildService.getGuildLeaderByGuildName(guildName).subscribe(response1 => {
        this.guildLeader = response1;
      });
    });
  }

  removeUserFromGuild(event) {
    const dialog = this.dialog.open(DialogRemoveFromGuildComponent, {
      data: {
        username: event.target.parentNode.children[0].children[0].innerText,
        level: event.target.parentNode.children[1].innerText
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.guildService.removeFromGuild(event.target.parentNode.children[0].children[0].innerText).subscribe();
        this.ngOnInit();
      }
    });
  }
  createGuild() {
    if (!this.newGuildForm.valid) {
      return false;
    }
     this.guildService.saveGuild(this.newGuildForm.value,  this.loggedUsername).subscribe(data => {
         this.toastr.success('Sukces!', 'Właśnie załozyłeś swoją gildię');
         this.closeAnyWindow();
        this.ngOnInit();
       },
       error => {
         this.toastr.error('Błąd!', 'Coś poszło nie tak');
       });
  }
  formatLabel(value: number) {
    let format;
    switch (value) {
      case 1:  format = ' godzinę';  break;
      case 5:
      case 6:
      case 7:
      case 8:
        format = ' godzin';
        break;
      case 2:
      case 3:
      case 4:
        format = ' godziny';
        break;
    }

    document.getElementById('reward').innerText = parseInt(document.getElementById('guildMineLevel').innerText, 0)
      * value +  '';
    document.getElementById('hours').innerText = value + '';
    document.getElementById('format').innerText = format;
    return value + 'h';
  }
  hasError(controlName) {
    return this.newGuildForm.get(controlName).hasError;
  }
  createNewGuildWindow() {
    document.getElementById('form').style.display = 'inline-block';
  }
  // GUILD BUILDINGS
  navigateToStore() {
    this.router.navigateByUrl('/guildStore');
  }

  mainBuildingFunc() {
    this.storeUpgradeCost =  1132 * this.appUser.guild.storeLevel;
    this.mainBuildingUpgradeCost =  817 * this.appUser.guild.mainBuildingLevel;
    this.mineUpgradeCost = this.appUser.guild.mineLevel > 0 ? 6806 * this.appUser.guild.mineLevel : 3000;
    document.getElementById('buildingFunc').style.display = 'inline-block';
    document.getElementById('listGuildBuildings').style.display = 'inline-block';
  }

  mineBuildingFunc() {
    document.getElementById('buildingFunc').style.display = 'inline-block';
    document.getElementById('mineFunctionality').style.display = 'inline-block';
    if (!this.appUser.working) {
      document.getElementById('guildMineLevel').innerText = this.appUser.guild?.mineLevel + '';
    } else {
      const begin = this.appUser.workBeginDate;
      const endDate = new Date(begin);
      const howLongWorking = this.appUser.howLongWorking;
      endDate.setTime(endDate.getTime() + (howLongWorking * 60 * 1000));
      // endDate.setTime(endDate.getTime() + (24 * howLongWorking * 60 * 1000));
     this.interval = setInterval(() => {
        const now = new Date();
        const diffMs = endDate.valueOf() - now.valueOf();
        const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        const diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000); // minutes
        const diffSec = Math.round((((diffMs % 86400000) % 3600000) % 60000) / 1000); // secocds
       if (diffMs > 0) {
         document.getElementById('progressBar').style.width = (diffMs / (howLongWorking * 60 * 1000) * 100) + '%';
         document.getElementById('alreadyWorkingHowLongTillEnd').innerText = diffHrs +
           ' godzin ' + diffMins + ' minut ' + diffSec + ' sekund';
       } else {
         document.getElementById('alreadyWorkingHowLongTillEnd').innerText = '---------';
         document.getElementById('progressBar').style.width = '0%';
         document.getElementById('collectReward').style.display = 'inline-block';
         document.getElementById('collectRewardAmount').innerText = this.appUser.workReward;
       }
      }, 1000);
    }
  }

  getRewardForWork() {
    this.userService.getRewardForWork(this.loggedUsername).subscribe(response => {
      this.appUser = response;
    });
    this.closeAnyWindow();
    this.toastr.success('Sukces!', 'Odebrałeś nagrodę!');
    clearInterval(this.interval);
  }

  mineWork() {
    if (!this.appUser.working) {
      this.userService.startWorking(this.loggedUsername, parseInt(document.getElementById('reward').innerText, 0),
        'mining', parseInt(document.getElementById('hours').innerText, 0)).subscribe(response => {
          this.appUser = response;
      });
      this.toastr.success('Sukces!', 'Zacząłeś pracę!');
    }
    this.closeAnyWindow();
  }
  closeAnyWindow() {
    document.getElementById('buildingFunc').style.display = 'none';
    document.getElementById('listGuildBuildings').style.display = 'none';
    document.getElementById('mineFunctionality').style.display = 'none';
    document.getElementById('form').style.display = 'none';
    clearInterval(this.interval);
  }
  upgradeBuilding(event) {
    document.getElementById('notEnoughGoldWarning').style.animation = '';
    if (parseInt(document.getElementById('goldAmount').innerText, 0) <
      parseInt(event.target.parentNode.parentNode.children[2].innerText, 0)) {
      document.getElementById('notEnoughGoldWarning').style.animation = 'changeVisibility 2s';
  } else {
      this.guildService.upgradeGuildBuiling(this.appUser?.username, this.appUser?.guild?.guildName, event.target.id,
        parseInt(event.target.parentNode.parentNode.children[2].innerText, 0)).subscribe(response => {
      this.appUser = response;
      console.log(this.appUser);
      });
      document.getElementById('goldAmount').innerText =
        parseInt(document.getElementById('goldAmount').innerText, 0) -
        parseInt(event.target.parentNode.parentNode.children[2].innerText, 0) + '';
      this.closeAnyWindow();
      this.toastr.success('Sukces!', 'Gratulacje rozbudowałeś budynek!');
    }
  }
}

