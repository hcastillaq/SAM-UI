import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ITodoTableConfig } from 'src/app/components/todo-table/todo-table.component';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { TransactionEntityService } from 'src/app/store/entity/transactions/transaction.entity.service';
import { DialogTransactionComponent } from '../../components/dialog-transaction/dialog-transaction.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-transactions-home',
  templateUrl: './transactions-home.component.html',
  styleUrls: ['./transactions-home.component.scss'],
})
export class TransactionsHomeComponent implements OnInit, AfterViewInit {
  transactions$ = this.transactionEntityService.entities$;

  tableConfig: ITodoTableConfig = {
    loading: this.transactionEntityService.loading$,
    data: this.transactionEntityService.entities$.pipe(
      map((transactions) => {
        return transactions.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date).toISOString().split('T')[0],
        }));
      }),
    ),
    headers: ['type', 'mount', 'date', 'description'],
    name: 'Transactions',
    createComponent: DialogTransactionComponent,
    updateComponent: DialogTransactionComponent,
    delete: {
      confirmationComponent: ConfirmDialogComponent,
      callback: (item: Transaction) => {
        this.transactionEntityService.delete(item);
      },
    },
    reload: () => {
      this.transactionEntityService.clearCache();
      this.transactionEntityService.getAll();
    },
  };

  constructor(
    private transactionEntityService: TransactionEntityService,
    private sessionService: SessionService,
  ) {}

  ngAfterViewInit() {}
  ngOnInit(): void {
    this.transactionEntityService.clearCache();
    this.transactionEntityService.getAll();
  }
}
