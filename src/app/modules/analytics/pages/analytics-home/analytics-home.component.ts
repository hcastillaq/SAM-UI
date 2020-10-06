import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DFD } from 'src/app/helpers/globals.helpers';
import { ITransaction } from 'src/app/interfaces/transaction.interface';
import { TransactionService } from 'src/app/services/transaction.service';
import * as moment from 'moment';
@Component({
  selector: 'app-analytics-home',
  templateUrl: './analytics-home.component.html',
  styleUrls: ['./analytics-home.component.scss']
})
export class AnalyticsHomeComponent implements OnInit, AfterViewInit {

  saleData = [];
  colorScheme = {
    domain: ['#4caf50', '#f44336']
  };

  constructor(private transactionsService: TransactionService) { }
  ngAfterViewInit(): void {
    this.prueba()
  }

  ngOnInit(): void {


  }

  prueba() {
    this.transactionsService.getAll().subscribe((transactions: ITransaction[]) => {

      let TOTAL_DINERO_EN_MOVIMIENTO = 0;
      let TOTAL_DINERO_EN_GASTOS = 0;
      let TOTAL = 0;

      let allTransactionsDF = new DFD.DataFrame(transactions);

      allTransactionsDF.drop({
        columns: ["_id", "company", "__typename", "user"],
        inplace: true
      });

      allTransactionsDF.addColumn({
        column: "date",
        inplace: true,
        value: allTransactionsDF["date"].apply((e) => {
          return moment(e).format("YYYY-MM-DD");
        }).values
      });

      let entryDFD = allTransactionsDF
        .query({ column: "type", is: "==", to: "entry" })
        .rename({
          mapper: {
            "date": "name",
            "mount": "value"
          }
        }).drop({ columns: ["description", "type"] })

      let expenseDFD = allTransactionsDF
        .query({ column: "type", is: "==", to: "expense" })
        .rename({
          mapper: {
            "date": "name",
            "mount": "value"
          }
        }).drop({ columns: ["description", "type"] });

      expenseDFD.print();
      entryDFD.print();

      entryDFD.to_json().then(result => {
        console.log()
        this.saleData = [...this.saleData, {
          "name": "Entrada",
          "series": JSON.parse(result)
        }]
      })
      expenseDFD.to_json().then(result => {
        this.saleData = [...this.saleData, {
          "name": "Gasto",
          "series": JSON.parse(result)
        }]
      })



    });
  }
}

// {
//   "name": "Qatar",
//     "series": [
//       {
//         "value": 2239,
//         "name": "2016-09-13T07:59:07.067Z"
//       },
//       {
//         "value": 3648,
//         "name": "2016-09-23T05:59:27.668Z"
//       },
//       {
//         "value": 3604,
//         "name": "2016-09-14T09:05:38.321Z"
//       },
//       {
//         "value": 6492,
//         "name": "2016-09-15T10:40:49.556Z"
//       },
//       {
//         "value": 3613,
//         "name": "2016-09-14T02:32:34.283Z"
//       },
//       {
//         "name": "2016-09-19T17:53:23.375Z",
//         "value": 4277
//       },
//       {
//         "name": "2016-09-13T16:41:27.137Z",
//         "value": 3016
//       },
//       {
//         "name": "2016-09-16T05:20:53.186Z",
//         "value": 5501
//       },
//       {
//         "name": "2016-09-19T16:43:04.961Z",
//         "value": 3505
//       },
//       {
//         "name": "2016-09-21T07:56:29.639Z",
//         "value": 3663
//       }
//     ]
// },