import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ROUTERS_LIST } from "./helpers/routes.helpers";
import { LoginGuard } from "./guards/login.guards";

const routes: Routes = [
  {
    path: ROUTERS_LIST.AUTH.ROOT,
    loadChildren: () =>
      import("./modules/auth/auth.module").then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
