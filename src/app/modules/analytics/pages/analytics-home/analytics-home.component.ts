import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMAT } from 'src/app/material.module';
@Component({
  selector: 'app-analytics-home',
  templateUrl: './analytics-home.component.html',
  styleUrls: ['./analytics-home.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT },
  ]
})
export class AnalyticsHomeComponent implements OnInit, AfterViewInit {

  lineal = [];
  barras = [];
  barrasGroup = [];
  colorScheme = {
    domain: ['#2196F3', '#C51162']
  };

  form: FormGroup;

  constructor(private transactionsService: TransactionService, private fb: FormBuilder) { }
  ngAfterViewInit(): void {
    // this.prueba()
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      start: ["", [Validators.required]],
      end: ["", [Validators.required]],
      format: ["%Y-%m-%d", [Validators.required]],
    });
    this.form.controls['start'].valueChanges.subscribe(() => {
      if (this.form.get('start').invalid) this.form.get("end").disabled;

    })
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.transactionsService.analytics(this.form.value.format, this.form.value.start, this.form.value.end).subscribe(resp => {
          if (resp.entries.length !== 0) {

            this.lineal = [];

            this.barras = [
              {
                name: "Ingresos",
                value: resp.moneyByEntries
              },
              {
                name: "Egresos",
                value: resp.moneyByExpenses
              }
            ];

            new Promise(resolve => {
              const series = resp.entries.map((transaction) => {
                return {
                  value: transaction.total,
                  name: new Date(transaction._id)
                };
              })
              this.lineal = [...this.lineal, { name: "Ingresos", series }]
              resolve();
            });

            new Promise(resolve => {
              const series = resp.expenses.map((transaction) => {
                return {
                  value: transaction.total,
                  name: new Date(transaction._id)
                };
              })
              this.lineal = [...this.lineal, { name: "Egresos", series }]
              resolve();
            });

            new Promise(resolve => {
              const data = [];

              for (let entry of resp.entries) {
                for (let [index, expense] of resp.expenses.entries()) {
                  if (entry._id === expense._id) {
                    data.push({
                      name: entry._id,
                      series: [
                        {
                          name: "Ingresos",
                          value: entry.total
                        },
                        {
                          name: "Egresos",
                          value: expense.total
                        }
                      ]
                    });
                    resp.expenses.slice(index, 1);
                    break;
                  }
                }
              }
              this.barrasGroup = data;
              console.log(this.barrasGroup)
              resolve();
            });
          }
        });
      }
    });
  }

}



