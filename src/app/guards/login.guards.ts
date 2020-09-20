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
import { MODULES_LIST, ROUTERS_LIST } from "../helpers/routes.helpers";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(
    private router$: Router,
    private route$: ActivatedRoute,
    private session: SessionService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {

    switch (route.data.module_name) {
      case MODULES_LIST.AUTH:
        if(this.session.validate()){
          this.router$.navigate(["/"]);
        } 
        break;       
      default:
        break;
    }
    if (!this.session.validate()) {
      this.session.logout();
      this.router$.navigateByUrl(`${ROUTERS_LIST.AUTH.ROOT}/ ${ROUTERS_LIST.AUTH.LOGIN}`);
    }
    return true;
  }
}
