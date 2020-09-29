import { Component, OnInit } from '@angular/core';
import { ITodoTableConfig } from 'src/app/components/todo-table/todo-table.component';
import { ITransaction } from 'src/app/interfaces/transaction.interface';
import { TransactionEntityService } from 'src/app/store/entity/transactions/transaction.entity.service';

@Component({
	selector: 'app-transactions-home',
	templateUrl: './transactions-home.component.html',
	styleUrls: ['./transactions-home.component.scss']
})
export class TransactionsHomeComponent implements OnInit {

	transactions$ = this.transactionEntityService.entities$;

	tableConfig: ITodoTableConfig = {
		data: this.transactionEntityService.entities$,
		headers: ["type", "mount", "description", "date"],
		name: "Transactions",
		reload: () => {
			this.transactionEntityService.clearCache();
			this.transactionEntityService.getAll();
		}
	}

	constructor(private transactionEntityService: TransactionEntityService) { }

	ngOnInit(): void {
		this.transactionEntityService.getAll();
	}

	add() {
		const transaction: ITransaction = {
			description: "soy la description " + Math.floor(Math.random() * 10),
			mount: parseFloat(String((Math.random() * 10) * (Math.random() * 10))),
			type: 'entry',
			date: "2020-09-26"
		}
		this.transactionEntityService.add(transaction);
	}

}
