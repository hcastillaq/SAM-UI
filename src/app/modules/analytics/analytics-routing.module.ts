import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AnalyticsHomeComponent } from './pages/analytics-home/analytics-home.component';

const routes: Routes = [
  { path: '', component: AnalyticsHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MaterialModule],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
