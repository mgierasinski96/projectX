import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialogRemoveFromGuild.component.html',
  styleUrls: ['./dialogRemoveFromGuild.component.css']
})
export class DialogRemoveFromGuildComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
