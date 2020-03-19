import {Component, OnInit} from '@angular/core';
import {DropService} from '../services/drop.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-temporary',
  templateUrl: './temporary.component.html',
  styleUrls: ['./temporary.component.css']
})
export class TemporaryComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  choseMage() {

    document.getElementById('characterImage').style.left='-700px';
    document.getElementById('characterImage').style.animation = 'changeHeight 3s';
    document.getElementById('characterImage').addEventListener( "animationend",  function() {

      document.getElementById('characterImage').style.animation = '';

    } );
  }

  choseWarrior() {
    document.getElementById('characterImage').style.left='-1200px';
    document.getElementById('characterImage').style.animation = 'changeHeight 3s';
    document.getElementById('characterImage').addEventListener( "animationend",  function() {

      document.getElementById('characterImage').style.animation = '';

    } );
  }

}
