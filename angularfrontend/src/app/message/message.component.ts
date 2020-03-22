import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {GuildService} from '../services/guild.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {DialogRemoveFromGuildComponent} from '../userDialogs/dialogRemoveFromGuild/dialogRemoveFromGuild.component';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ChatService} from '../services/chat.service';
import {MatRow, MatTable} from '@angular/material/table';
import {SanitizeHtmlPipe} from '../pipes/SanitizeHtmlPipe';


@Component({
  selector: 'app-location',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataMessageSource;
  displayedColumns: string[] = ['messageDate', 'messageContent', 'sender.username'];
  // newGuildForm = new FormGroup({
  //
  //   id: new FormControl(''),
  //   guildName: new FormControl(''),
  //   guildTag: new FormControl(''),
  // });
  constructor(private toastr: ToastrService, private chatService: ChatService) {
  }


  ngOnInit() {
    this.chatService.getPrivateMessages('maciek').subscribe(response => {
      this.dataMessageSource = new MatTableDataSource(response);
      this.dataMessageSource.sortingDataAccessor = (item, property) => {
        if (property.includes('.')) {
          return property.split('.').reduce((o, i) => o[i], item);
        }
        return item[property];
      };

      this.dataMessageSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
  this.dataMessageSource.filter = filterValue.trim().toLowerCase();
  }


  displayOrHideMessage(event) {
    // const invit = document.getElementsByClassName('guildInvitation');
    // console.log(invit[0].innerHTML); //name of guilds than invited player
    if (event.target.parentNode.nodeName === 'TR') {
      if (event.target.parentNode.children[1].style.textOverflow === 'clip') {
        event.target.parentNode.style.maxHeight = '35px';
        event.target.parentNode.style.height = '35px';
        event.target.parentNode.children[1].style.whiteSpace = 'nowrap';
        event.target.parentNode.children[1].style.overflow = 'hidden';
        event.target.parentNode.children[1].style.textOverflow = 'ellipsis';
      } else {
        event.target.parentNode.style.maxHeight = 'none';
        event.target.parentNode.style.height = '150px';
        event.target.parentNode.children[1].style.whiteSpace = 'normal';
        event.target.parentNode.children[1].style.overflow = 'visible';
        event.target.parentNode.children[1].style.textOverflow = 'clip';

      }
    }
  }

  // hasError(controlName) {
  //   return this.newGuildForm.get(controlName).hasError;
  // }
  // createNewGuildWindow() {
  //   document.getElementById('form').style.display = 'inline-block';
  // }
  //
  // closeCreatingGuildWindow() {
  //   document.getElementById('form').style.display = 'none';
  // }


}

