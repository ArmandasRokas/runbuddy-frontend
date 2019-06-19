import { Component, OnInit } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { TextAnimation, Teximate } from 'ngx-teximate';
import { fadeIn } from 'ng-animate';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})

export class AboutUsComponent {

  name = 'Angular';
  text = ' We are group of three dev_ninjas from Danish Technical University. This project is made for the course Advanced programming. We hope that you will enjoy using this application that will help you to arrange the most incredible races you could ever imagined.';

  enterAnimation: TextAnimation = {
    animation: fadeIn,
    delay: 25,
    type: 'letter'
  };

}
