import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialogAddGuild.component.html',
  styleUrls: ['./dialogAddGuild.component.css']
})
export class DialogAddGuildComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
