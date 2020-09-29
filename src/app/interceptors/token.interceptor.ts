import { Injectable, Injector } from "@angular/core";
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
} from "@angular/common/http";
import { EMPTY, Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { catchError, map } from "rxjs/operators";
import { SNACKBAR } from "../components/snackbar/snackbar.component";
import { JwtService } from '../services/jwt/jwt.service';
import { IAppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { SessionService } from '../services/session/session.service';
import { authActionLogout, EAuthActions } from '../store/actions/auth.actions';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
	constructor(private activatedRoute: ActivatedRoute,
		private sessionService: SessionService,
		private jwtService: JwtService, private store: Store<IAppState>) { }

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const headersConfig = {
			"Content-Type": "application/json",
			Accept: "application/json",
		};

		let currentURL: String = this.activatedRoute.snapshot["_routerState"].url;

		if (currentURL.indexOf("auth") == -1) {
			headersConfig['Authorization'] = 'Bearer ' + this.jwtService.getToken();

			if (!this.sessionService.validate()) {
				this.store.dispatch(authActionLogout());
			}
		}


		const request = req.clone({ setHeaders: headersConfig });
		return next.handle(request).pipe(
			map((resp: any) => {
				if (resp.status && resp.body.errors) {
					SNACKBAR.next({
						message: resp.body.errors[0].message.error,
						type: "error",
					});
				}
				return resp;
			}),
			catchError(resp => {
				SNACKBAR.next({
					message: resp.error.errors[0].message,
					type: "error",
				});
				return EMPTY;
			})
		);
	}
}
