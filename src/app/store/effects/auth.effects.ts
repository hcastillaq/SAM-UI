import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EAuthActions, authActionLoading } from "../actions/auth.actions";
import {
  map,
  mergeMap,
  catchError,
  finalize,
  tap,
  delay,
} from "rxjs/operators";
import { AuthService } from "src/app/services/auth/auth.service";
import { IAccount } from "src/app/interfaces/account";
import { EMPTY } from "rxjs";
import { IAppState } from "../state/app.state";
import { Store } from "@ngrx/store";
import { JwtService } from "src/app/services/jwt/jwt.service";
import { Router } from "@angular/router";
import { GO_ROL_HOME } from "src/app/helpers/routes.helpers";
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private authService: AuthService,
    private jwt: JwtService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EAuthActions.LOGIN),
      tap(() => {
        this.store.dispatch(authActionLoading({ loading: true }));
      }),
      mergeMap((account: IAccount) =>
        this.authService.login(account).pipe(
          delay(500),
          mergeMap((resp) => {
            this.jwt.saveToken(resp.token);
            this.router.navigateByUrl(GO_ROL_HOME(resp.user.rol.rol));
            return [authActionLoading({ loading: false })];
          }),
          finalize(() => {
            this.store.dispatch(authActionLoading({ loading: false }));
          })
        )
      )
    )
  );
}
