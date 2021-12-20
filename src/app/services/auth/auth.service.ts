import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { IAccount } from 'src/app/interfaces/account';
import { IRegister } from 'src/app/interfaces/register.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  path = environment.api + '/auth';
  login(account: IAccount) {
    return this.post(this.path + '/login', account);
  }
  register(account: IRegister) {
    return this.post(this.path + '/register', account);
  }
}
