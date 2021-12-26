import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsHomeComponent } from './pages/analytics-home/analytics-home.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [AnalyticsHomeComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
  ],
})
export class AnalyticsModule {}
