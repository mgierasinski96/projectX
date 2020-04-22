import {Component, OnInit} from '@angular/core';
import {DropService} from '../../services/drop.service';
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

  rotuj() {
    const el1 = document.getElementById('characterImage1');
    const el2 = document.getElementById('characterImage2');
    const el3 = document.getElementById('characterImage3');
    const el4 = document.getElementById('characterImage4');
    el1.style.left = '300px';
   el1.style.top = '0px';
   el4.style.left = '300px';
   el4.style.top = '300px';
   el2.style.left = '0px';
  el2.style.top = '300px';
   el3.style.left = '0px';
   el3.style.top = '0px';
      el1.id = 'characterImage4';
      el2.id = 'characterImage3';
      el3.id = 'characterImage1';
      el4.id = 'characterImage2';
  }
}
