import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { LoginGuard } from "src/app/guards/login.guards";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginGuard],
    data: {
      auth: true,
      logout: false,
    },
  },
  {
    path: "logout",
    component: LoginComponent,
    canActivate: [LoginGuard],
    data: {
      auth: true,
      logout: true,
    },
  },
  {
    path: "**",
    redirectTo: "/auth/login",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
