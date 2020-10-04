import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DICTIONARY } from 'src/app/helpers/dictionary.helpers';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { authActionLogout } from 'src/app/store/actions/auth.actions';
import { IAppState } from 'src/app/store/state/app.state';
import { MENU_ITEMS, SIDENAV$ } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  navigationItem = MENU_ITEMS;
  dictionary = DICTIONARY;
  data: { [key: string]: any } = this.jwtService.getObjectToken();
  constructor(private jwtService: JwtService, private store: Store<IAppState>) { }

  ngOnInit() {
  }

  sideNav() {
    SIDENAV$.next();
  }

  logout() {
    this.store.dispatch(authActionLogout());
  }

}
