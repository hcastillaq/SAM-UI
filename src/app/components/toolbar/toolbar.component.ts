import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { SIDENAV$ } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  data: { [key: string]: any } = this.jwtService.getObjectToken();
  constructor(private jwtService: JwtService) { }

  ngOnInit() {
  }

  sideNav() {
    SIDENAV$.next();
  }

}
