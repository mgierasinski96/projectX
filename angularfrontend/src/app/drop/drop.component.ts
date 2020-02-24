import {Component, OnInit} from '@angular/core';
import {DropService} from '../services/drop.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css']
})
export class DropComponent implements OnInit {
  powiazane;
  numer;
  nazwa;


  constructor(private dropService: DropService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.numer = this.route.snapshot.paramMap.get("id");
    this.dropService.getPowiazane(this.numer).subscribe( response => {
      this.powiazane = response;
      this.nazwa = response[0].item.itemName;
    });
  }

}
