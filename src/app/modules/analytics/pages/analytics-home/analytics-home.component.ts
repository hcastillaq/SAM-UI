import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ChartComponent } from 'ng-apexcharts';
import { FadeUp } from 'src/app/animations/fadeUp';
import { CustomDateAdapter } from 'src/app/helpers/date/adapter';
import { Analitycs } from 'src/app/interfaces/transaction.interface';

import { TransactionService } from 'src/app/services/transactions/transaction.service';
@Component({
  selector: 'app-analytics-home',
  templateUrl: './analytics-home.component.html',
  styleUrls: ['./analytics-home.component.scss'],
  providers: [{ provide: DateAdapter, useClass: CustomDateAdapter }],
  animations: FadeUp,
})
export class AnalyticsHomeComponent implements OnInit {
  lineal = [];
  barras = [];
  barrasGroup = [];
  loading = false;
  isSearched = false;
  form: FormGroup;
  @ViewChild('chart') chart: ChartComponent;
  @ViewChild('chart-bar') chartBar: ChartComponent;
  expense = 100000000;
  entry = 500000000;
  entryMinusExpense = 0;
  public chartOptions: any;
  public chartOptions2: any;
  public chartOptions3: any;

  constructor(
    private transactionsService: TransactionService,
    private fb: FormBuilder,
  ) {}

  getAnalitycs() {
    this.loading = true;
    this.isSearched = true;
    this.transactionsService
      .analytics({
        start: new Date(this.form.get('start').value).getTime() / 1000,
        end: new Date(this.form.get('end').value).getTime() / 1000,
        periodicity: this.form.get('periodicity').value,
      })
      .subscribe({
        next: (resp: Analitycs) => {
          const categories = Object.keys(resp.transactions);
          this.entry = resp.entry;
          this.expense = resp.expense;
          this.entryMinusExpense = this.entry - this.expense;
          const series = [
            {
              name: 'Ingresos',
              data: categories.map((cat) => resp.transactions[cat].entry),
            },
            {
              name: 'Egresos',
              data: categories.map((cat) => resp.transactions[cat].expense),
            },
          ];

          this.buildLineGraph(series, categories);
          this.buildLineGraphBar(series, categories);
          this.buildGraphPie([this.entry, this.expense]);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  buildGraphPie(series) {
    this.chartOptions3 = {
      series,
      chart: {
        type: 'pie',
        height: 200,
      },
      fill: {
        colors: ['#44ad00', '#C51162'],
      },
      labels: ['Ingresos', 'Egresos'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
  buildLineGraphBar(series, categories) {
    this.chartOptions2 = {
      series,
      chart: {
        type: 'bar',
        height: 400,
      },
      colors: ['#44ad00', '#C51162'],
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories,
      },
    };
  }
  buildLineGraph(series, categories) {
    this.chartOptions = {
      series,
      chart: {
        type: 'area',
        stacked: false,
        zoom: {
          enabled: true,
        },
        height: 400,
      },
      colors: ['#44ad00', '#C51162'],
      markers: {
        size: 5,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Ingresos vs Egresos',
        align: 'left',
      },
      grid: false,
      xaxis: {
        categories,
      },
      yaxis: {},
    };
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      periodicity: ['', [Validators.required]],
    });
  }
}
