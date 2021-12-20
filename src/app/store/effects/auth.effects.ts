import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AuthActions,
  authActionLoading,
  authActionLoginSuccess,
  authActionSetData,
} from '../actions/auth.actions';
import { mergeMap, finalize, tap, delay, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Account } from 'src/app/interfaces/account';
import { IAppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { ROUTERS_LIST } from 'src/app/helpers/routes.helpers';
import { User } from 'src/app/interfaces/user.interface';
import { LoginResponse } from 'src/app/interfaces/auth.interface';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private authService: AuthService,
    private jwt: JwtService,
    private router: Router,
    private sessionServicie: SessionService,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN),
      tap(() => {
        this.store.dispatch(authActionLoading({ loading: true }));
      }),
      mergeMap((account: Account) =>
        this.authService.login(account).pipe(
          delay(1000),
          mergeMap((resp: any) => {
            return [
              authActionLoading({ loading: false }),
              authActionLoginSuccess(resp),
            ];
          }),
          finalize(() => {
            this.store.dispatch(authActionLoading({ loading: false }));
          }),
        ),
      ),
    ),
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.REGISTER),
      tap(() => {
        this.store.dispatch(authActionLoading({ loading: true }));
      }),
      mergeMap((data: LoginResponse) =>
        this.authService.register({ ...data }).pipe(
          mergeMap((resp: LoginResponse) => {
            return [
              authActionLoading({ loading: false }),
              authActionLoginSuccess(resp),
            ];
          }),
          finalize(() => {
            this.store.dispatch(authActionLoading({ loading: false }));
          }),
        ),
      ),
    ),
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_SUCCESS),
      map((data: LoginResponse) => {
        const user: User = data.user;
        this.jwt.saveToken(data.token);
        this.router.navigate(['/']);
        return authActionSetData({ user, company: data.company });
      }),
    ),
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.sessionServicie.logout();
          this.router.navigateByUrl(
            `${ROUTERS_LIST.AUTH.ROOT}/${ROUTERS_LIST.AUTH.LOGIN}`,
          );
        }),
      ),
    {
      dispatch: false,
    },
  );
}
