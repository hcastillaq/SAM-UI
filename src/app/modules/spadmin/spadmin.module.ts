import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SpadminRoutingModule } from "./spadmin-routing.module";
import { HomeComponent } from "./pages/home/home.component";
import { MaterialModule } from "src/app/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ToolbarComponent } from "src/app/components/toolbar/toolbar.component";
import { SidenavComponent } from "src/app/components/sidenav/sidenav.component";
import { ComponentesModule } from "src/app/components/componentes.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SpadminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentesModule,
  ],
})
export class SpadminModule {}
