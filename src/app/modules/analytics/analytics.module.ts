import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsHomeComponent } from './pages/analytics-home/analytics-home.component';
import { MaterialModule } from 'src/app/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AnalyticsHomeComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    MaterialModule,
  ]
})
export class AnalyticsModule { }
