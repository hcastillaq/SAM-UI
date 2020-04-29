import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EAuthActions } from "../actions/auth.actions";
import { map, mergeMap, catchError } from "rxjs/operators";
import { AuthService } from "src/app/services/auth/auth.service";
import { IAccount } from "src/app/interfaces/account";
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EAuthActions.LOGIN),
      mergeMap((account: IAccount) =>
        this.authService.login(account).pipe(
          mergeMap((resp) => {
            console.log("nooo");
            return [];
          })
        )
      )
    )
  );
}
