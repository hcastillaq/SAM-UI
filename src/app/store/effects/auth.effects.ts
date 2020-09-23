import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EAuthActions, authActionLoading } from "../actions/auth.actions";
import {
  mergeMap,
  finalize,
  tap,
  delay,
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
            this.jwt.saveToken(resp.token);
            this.router.navigateByUrl("/");
            return [authActionLoading({ loading: false })];
          }),
          finalize(() => {
            this.store.dispatch(authActionLoading({ loading: false }));
          })
        )
      )
    )
  );

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
