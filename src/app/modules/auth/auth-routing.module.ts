import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { LoginGuard } from "src/app/guards/login.guards";
import { ROUTERS_LIST } from "src/app/helpers/routes.helpers";
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: ROUTERS_LIST.AUTH.LOGIN,
    component: LoginComponent,
    canActivate: [LoginGuard],
    data: {
      module_name: 'auth'
    },
  },
  {
    path: ROUTERS_LIST.AUTH.REGISTER,
    component: RegisterComponent,
    canActivate: [LoginGuard],
    data: {
      module_name: 'auth'
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
export class AuthRoutingModule { }
