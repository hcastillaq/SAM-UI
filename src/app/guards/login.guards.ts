import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from "@angular/router";
import { Observable } from "rxjs";
import { SessionService } from "../services/session/session.service";
import { ROUTERS_LIST, GO_ROL_HOME } from "../helpers/routes.helpers";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(
    private router$: Router,
    private route$: ActivatedRoute,
    private session: SessionService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log(route.data);

    if (!this.session.validate()) {
      if (!route.data.auth) {
        this.router$.navigateByUrl(ROUTERS_LIST.AUTH.LOGIN);
        return false;
      }
    } else {
      if (route.data.auth !== undefined && route.data.auth) {
        if (route.data.logout !== undefined && route.data.logout) {
          this.session.logout();
          this.router$.navigateByUrl(ROUTERS_LIST.AUTH.LOGIN);
          return false;
        }
        this.router$.navigateByUrl(GO_ROL_HOME(this.session.getUser().rol.rol));
        return false;
      }
      if (!this.session.rolAccess(route.data.access)) {
        alert("no tienes acceso a este modulo");
        return false;
      }
    }
    return true;
  }
}
