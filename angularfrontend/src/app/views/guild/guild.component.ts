import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {GuildService} from '../../services/guild.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {DialogRemoveFromGuildComponent} from '../../userDialogs/dialogRemoveFromGuild/dialogRemoveFromGuild.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-location',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})

export class GuildComponent implements OnInit {
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

  ngOnInit() {
    // this.appUser=sessionStorage.getItem('') #TODO GET APP USER FROM SESSION STORAGE AND CHECK IF HE HAS GUILD
    this.userService.getUserByUsername('dden').subscribe(response => {

      this.appUser = response;
      if (this.appUser.guild) {
        this.guildService.getGuildLeaderByGuildName(this.appUser.guild.guildName).subscribe(response2 => {
          document.getElementById('guildLeader').innerText = response2.username + ' o poziomie ' + response2.level;
        });
        this.getGuildData(this.appUser.guild.guildName);
      }

    });
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
     this.guildService.saveGuild(this.newGuildForm.value, 'dden').subscribe(data => {
         this.toastr.success('Sukces!', 'Właśnie załozyłeś swoją gildię');
         this.closeCreatingGuildWindow();
        this.ngOnInit();
       },
       error => {
         this.toastr.error('Błąd!', 'Coś poszło nie tak');
       });
  }

  hasError(controlName) {
    return this.newGuildForm.get(controlName).hasError;
  }
  createNewGuildWindow() {
    document.getElementById('form').style.display = 'inline-block';
  }

  closeCreatingGuildWindow() {
    document.getElementById('form').style.display = 'none';
  }
  // GUILD BUILDINGS
  showStore()
  {
    this.router.navigateByUrl('/guildStore');
  }


}

