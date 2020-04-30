import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpadminRoutingModule } from './spadmin-routing.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SpadminRoutingModule
  ]
})
export class SpadminModule { }
