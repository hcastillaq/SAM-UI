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
import { MatTableDataSource } from '@angular/material/table';
import { ChartComponent } from 'ng-apexcharts';
import { FadeUp } from 'src/app/animations/fadeUp';
import { CustomDateAdapter } from 'src/app/helpers/date/adapter';
import { TRANSLATE } from 'src/app/helpers/dictionary.helpers';
import {
  Analitycs,
  TransactionAnalytic,
} from 'src/app/interfaces/transaction.interface';
import { CurrencyService } from 'src/app/services/currency/currency.service';

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
  chartOptions: any;
  chartOptions2: any;
  chartOptions3: any;
  chartUtility: any;
  dataSourceUtility = new MatTableDataSource<any>();
  displayedColumnsUtility = ['date', 'entry', 'expense', 'utility'];
  constructor(
    private transactionsService: TransactionService,
    private fb: FormBuilder,
    private currencyService: CurrencyService,
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      start: ['2021-12-01', [Validators.required]],
      end: ['2021-12-31', [Validators.required]],
      periodicity: ['diary', [Validators.required]],
    });

    this.getAnalitycs();
  }

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
          const seriesUtility = [
            {
              name: 'Utilidad',
              data: categories.map((cat) => resp.transactions[cat].utility),
            },
          ];

          this.buildLineGraph(series, categories);
          this.buildLineGraphBar(series, categories);
          this.buildGraphPie([this.entry, this.expense]);
          this.buildGraphUtility(seriesUtility, categories);
          this.buildTableUtility(resp.transactions);
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
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          colors: ['#fafafa'],
        },
      },
      fill: {
        colors: ['#44ad00', '#C51162'],
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: '16px',
        },
        y: {
          formatter: (value) => {
            return this.currencyService.format(value);
          },
        },
      },
      labels: ['Ingresos', 'Egresos'],
    };
  }

  buildLineGraphBar(series, categories) {
    this.chartOptions2 = {
      series,
      chart: {
        type: 'bar',
        height: 400,
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: true,
        },
      },
      colors: ['#44ad00', '#C51162'],
      plotOptions: {
        bar: {
          borderRadius: 10,
          horizontal: false,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: false,
        offsetY: -20,
        style: {
          fontSize: '10px',
          colors: ['#000'],
        },
        formatter: (value) => {
          return this.currencyService.format(value, false);
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'Ingresos vs Egresos',
        align: 'left',
      },
      tooltip: {
        style: {
          fontSize: '16px',
        },
      },
      xaxis: {
        categories,
        tickPlacement: 'on',
      },
      yaxis: {
        labels: {
          formatter: (value) => {
            return this.currencyService.format(value, false);
          },
        },
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
          type: 'x',
          autoScaleYaxis: true,
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
      tooltip: {
        style: {
          fontSize: '16px',
        },
      },
      grid: false,
      xaxis: {
        categories,
      },
      yaxis: {
        labels: {
          formatter: (value) => {
            return this.currencyService.format(value, false);
          },
        },
      },
    };
  }

  buildGraphUtility(series, categories) {
    this.chartUtility = {
      series,
      chart: {
        type: 'area',
        stacked: false,
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: true,
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
        text: 'Utilidad',
        align: 'left',
      },
      grid: false,
      xaxis: {
        categories,
      },
      tooltip: {
        style: {
          fontSize: '16px',
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => {
            return this.currencyService.format(value, false);
          },
        },
      },
    };
  }

  buildTableUtility(data: TransactionAnalytic) {
    const resp = [];
    Object.keys(data).forEach((date) => {
      resp.push({
        date,
        entry: data[date].entry,
        expense: data[date].expense,
        utility: data[date].utility,
      });
    });
    this.dataSourceUtility.data = resp;
  }

  translate(word: string): string {
    return TRANSLATE(word);
  }
}
