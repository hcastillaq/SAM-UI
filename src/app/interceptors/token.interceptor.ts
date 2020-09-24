import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { SNACKBAR } from "../components/snackbar/snackbar.component";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private activatedRoute: ActivatedRoute) {}

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
      // headersConfig['Authorization'] = this.jwtService.getToken();
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request).pipe(
      map((resp: any) => {
        if (resp.status && resp.body.errors) {
          SNACKBAR.next({
            message: resp.body.errors[0].message,
            type: "error",
          });
        }
        return resp;
      })
    );
  }
}
