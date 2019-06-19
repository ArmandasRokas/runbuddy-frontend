import { Component, OnInit } from '@angular/core';
import { TextAnimation } from 'ngx-teximate';
import { fadeIn } from 'ng-animate';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent{

  constructor() { }

  text = 'Thanks for using RunBuddy'  ;

  enterAnimation: TextAnimation = {
    animation: fadeIn,
    delay: 25,
    type: 'letter'
  };
}
