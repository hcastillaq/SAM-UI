import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { LoginGuard } from "src/app/guards/login.guards";
import { ROUTERS_LIST } from "src/app/helpers/routes.helpers";

const routes: Routes = [
  {
    path: ROUTERS_LIST.AUTH.LOGIN,
    component: LoginComponent,
    canActivate: [LoginGuard],
    data: {
      auth: true,
      logout: false,
    },
  },
  {
    path: ROUTERS_LIST.AUTH.LOGOUT,
    component: LoginComponent,
    canActivate: [LoginGuard],
    data: {
      auth: true,
      logout: true,
    },
  },
  {
    path: "**",
    redirectTo: `/${ROUTERS_LIST.AUTH.ROOT}/${ROUTERS_LIST.AUTH.LOGIN}`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
