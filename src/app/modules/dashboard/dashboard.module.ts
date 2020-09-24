import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './componentes/home/home.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';


@NgModule({
  declarations: [HomeComponent, ToolbarComponent, SidenavComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
