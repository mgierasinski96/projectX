import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {GuildService} from '../../services/guild.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {DialogRemoveFromGuildComponent} from '../../userDialogs/dialogRemoveFromGuild/dialogRemoveFromGuild.component';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ChatService} from '../../services/chat.service';
import {MatRow, MatTable} from '@angular/material/table';
import {SanitizeHtmlPipe} from '../../pipes/SanitizeHtmlPipe';


@Component({
  selector: 'app-location',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})


export class MessageComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataMessageSource;
  displayedColumns: string[] = ['messageDate', 'messageContent', 'sender.username', 'action'];
  loggedUsername
  newMessageForm = new FormGroup({
    id: new FormControl(''),
    receiver: new FormControl(''),
    content: new FormControl(''),
    sender: new FormControl(''),
  });
  constructor(private toastr: ToastrService, private chatService: ChatService ) {
  }

  ngOnInit() {
    this.loggedUsername = 'maciek'
    this.chatService.getPrivateMessages(this.loggedUsername).subscribe(response => {
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

  hasError(controlName) {
    return this.newMessageForm.get(controlName).hasError;
  }
  sendPrivateMessage(event) {
    document.getElementById('messageFormContainer').style.display = 'inline-block';
    this.newMessageForm.controls['receiver'].setValue(event.target.parentNode.parentNode.children[2].innerText);
    this.newMessageForm.controls['sender'].setValue(this.loggedUsername);
    document.getElementById('textAreaContent').focus();
  }

  sendMessage() {
    if (!this.newMessageForm.valid) {
      return false;
    }
    this.chatService.writePrivateMessage(this.newMessageForm.value).subscribe(data => {
        this.toastr.success('Sukces!', 'Wiadomość została wysłana');
        this.closeMessageWindow();
      },
      error => {
        this.toastr.error('Błąd!', 'Coś poszło nie tak');
      });

  }

  closeMessageWindow() {
    document.getElementById('messageFormContainer').style.display = 'none';
  }


}

