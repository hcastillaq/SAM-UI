import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EAuthActions, authActionLoading, authActionLoginSuccess, authActionSetUser } from "../actions/auth.actions";
import {
  mergeMap,
  finalize,
  tap,
  delay, map
} from "rxjs/operators";
import { AuthService } from "src/app/services/auth/auth.service";
import { IAccount } from "src/app/interfaces/account";
import { IAppState } from "../state/app.state";
import { Store } from "@ngrx/store";
import { JwtService } from "src/app/services/jwt/jwt.service";
import { Router } from "@angular/router";
import { SessionService } from 'src/app/services/session/session.service';
import { ROUTERS_LIST } from 'src/app/helpers/routes.helpers';
import { SNACKBAR } from 'src/app/components/snackbar/snackbar.component';
import { IRegister } from 'src/app/interfaces/register.interface';
import { IUser } from 'src/app/interfaces/user.interface';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private authService: AuthService,
    private jwt: JwtService,
    private router: Router,
    private sessionServicie: SessionService
  ) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EAuthActions.LOGIN),
      tap(() => {
        this.store.dispatch(authActionLoading({ loading: true }));
      }),
      mergeMap((account: IAccount) =>
        this.authService.login(account).pipe(
          delay(1000),
          mergeMap((resp) => {
            return [authActionLoading({ loading: false }), authActionLoginSuccess(resp)];
          }),
          finalize(() => {
            this.store.dispatch(authActionLoading({ loading: false }));
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EAuthActions.REGISTER),
      tap(() => {
        this.store.dispatch(authActionLoading({ loading: true }));
      }),
      mergeMap((data: IRegister) => this.authService.register(data).pipe(
        delay(1000),
        mergeMap((resp) => {
          return [authActionLoading({ loading: false }), authActionLoginSuccess(resp)];
        }),
        finalize(() => {
          this.store.dispatch(authActionLoading({ loading: false }));
        })
      )),
    )
  );

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EAuthActions.LOGIN_SUCCESS),
    map((resp: any) => {
      const user: IUser = { ...resp.user }
      this.jwt.saveToken(resp.token);
      this.router.navigate(["/"]);
      return authActionSetUser(user);
    })
  ));


  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EAuthActions.LOGOUT),
      tap(() => {
        this.sessionServicie.logout();
        SNACKBAR.next({
          message: 'Hasta la proxima!',
          type: "success",
        });
        this.router.navigateByUrl(`${ROUTERS_LIST.AUTH.ROOT}/${ROUTERS_LIST.AUTH.LOGIN}`);
      })
    ),
    {
      dispatch: false
    }
  );
}
