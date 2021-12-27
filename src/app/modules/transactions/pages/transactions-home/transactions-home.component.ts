import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ITodoTableConfig } from 'src/app/components/todo-table/todo-table.component';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { TransactionEntityService } from 'src/app/store/entity/transactions/transaction.entity.service';
import { DialogTransactionComponent } from '../../components/dialog-transaction/dialog-transaction.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { TRANSLATE } from 'src/app/helpers/dictionary.helpers';
import { MatTableDataSource } from '@angular/material/table';
import { FadeUp } from 'src/app/animations/fadeUp';
import { TableActions } from 'src/app/components/todo-table/table-actions/table-actions.component';

@Component({
  selector: 'app-transactions-home',
  templateUrl: './transactions-home.component.html',
  styleUrls: ['./transactions-home.component.scss'],
  animations: FadeUp,
})
export class TransactionsHomeComponent implements OnInit, AfterViewInit {
  transactions$ = this.transactionEntityService.entities$;
  displayedColumns = ['type', 'mount', 'date', 'description', 'actions'];
  dataSource = new MatTableDataSource<Transaction>();
  tableConfig: ITodoTableConfig = {
    loading: this.transactionEntityService.loading$,
    dataSource: this.dataSource,
    header: {
      reload: () => {
        this.transactionEntityService.clearCache();
        this.transactionEntityService.getAll();
      },
      create: DialogTransactionComponent,
      name: this.translate('Transactions'),
    },
  };

  actionsConfig: TableActions = {
    update: DialogTransactionComponent,
    delete: {
      confirm: ConfirmDialogComponent,
      callback: (item: Transaction) => {
        this.transactionEntityService.delete(item);
      },
    },
  };

  constructor(
    private transactionEntityService: TransactionEntityService,
    private currencyService: CurrencyService,
  ) {}

  ngAfterViewInit() {}

  ngOnInit(): void {
    this.transactionEntityService.clearCache();
    this.transactionEntityService.getAll();
    this.transactionEntityService.entities$
      .pipe(
        map((transactions) => {
          return transactions.map((transaction) => ({
            ...transaction,
            mountFormat: this.currencyService.format(transaction.mount),
            date: new Date(transaction.date).toISOString().split('T')[0],
          }));
        }),
      )
      .subscribe((transactions) => {
        this.dataSource.data = transactions;
      });
  }

  translate(word: string | String) {
    return TRANSLATE(String(word));
  }
}
