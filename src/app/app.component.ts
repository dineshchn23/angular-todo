import { Component, Injectable, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


@Injectable()
export class AppComponent {
  title = 'angular-todo';
}
