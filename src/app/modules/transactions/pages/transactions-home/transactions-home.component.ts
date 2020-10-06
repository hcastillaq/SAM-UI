import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ITodoTableConfig } from 'src/app/components/todo-table/todo-table.component';
import { ITransaction } from 'src/app/interfaces/transaction.interface';
import { TransactionEntityService } from 'src/app/store/entity/transactions/transaction.entity.service';
import { DialogTransactionComponent } from '../../components/dialog-transaction/dialog-transaction.component';
import * as moment from 'moment';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { SessionService } from 'src/app/services/session/session.service';
import { ROLES } from 'src/app/helpers/roles.helpers';

@Component({
	selector: 'app-transactions-home',
	templateUrl: './transactions-home.component.html',
	styleUrls: ['./transactions-home.component.scss']
})
export class TransactionsHomeComponent implements OnInit, AfterViewInit {

	transactions$ = this.transactionEntityService.entities$;

	tableConfig: ITodoTableConfig = {
		loading: this.transactionEntityService.loading$,
		data: this.transactionEntityService.entities$.pipe(map((transactions) => {
			return transactions.map((transaction) => ({
				...transaction,
				user: transaction.user.name,
				date: moment(String(transaction.date)).format("DD-MM-YYYY")
			}))
		})),
		headers: ["type", "mount", "description", "date", "user"],
		name: "Transactions",
		createComponent: DialogTransactionComponent,
		updateComponent: this.sessionService.access([ROLES.SUPER_ADMINISTRATOR, ROLES.ADMINISTRATOR]) ? DialogTransactionComponent : undefined,
		delete: this.sessionService.access([ROLES.SUPER_ADMINISTRATOR]) ? {
			confirmationComponent: ConfirmDialogComponent,
			callback: (item: ITransaction) => {
				this.transactionEntityService.delete(item);
			}
		} : undefined,
		reload: () => {
			this.transactionEntityService.clearCache();
			this.transactionEntityService.getAll();
		}
	}

	constructor(
		private transactionEntityService: TransactionEntityService,
		private sessionService: SessionService) { }

	ngAfterViewInit() {

	}
	ngOnInit(): void {
		this.transactionEntityService.clearCache();
		this.transactionEntityService.getAll();
	}

}
