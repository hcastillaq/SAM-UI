import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Account } from 'src/app/interfaces/account';
import { Register } from 'src/app/interfaces/register.interface';
import { environment } from 'src/environments/environment';
import { LoginResponse } from 'src/app/interfaces/auth.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  path = environment.api + '/auth';
  login(account: Account) {
    return this.post(this.path + '/login', account);
  }
  register(account: Register): Observable<LoginResponse> {
    return this.post(this.path + '/register', account);
  }
}
