import { Component, OnInit } from '@angular/core';
import { SIDENAV$ } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  sideNav(){
    SIDENAV$.next();
  }

}
