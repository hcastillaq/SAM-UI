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

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
	constructor(private activatedRoute: ActivatedRoute, private jwtService: JwtService) { }

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
