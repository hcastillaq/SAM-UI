import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { ITransaction } from 'src/app/interfaces/transaction.interface';
import { TransactionService } from 'src/app/services/transaction.service';

@Injectable()
export class TransactionEntityDataService extends DefaultDataService<ITransaction> {
	constructor(
		http: HttpClient,
		httpUrlGenerator: HttpUrlGenerator,
		private transactionService: TransactionService
	) {
		super('Transaction', http, httpUrlGenerator);
	}

	getAll(): Observable<ITransaction[]> {
		return this.transactionService.getAll();
	}

	add(transaction: ITransaction): Observable<ITransaction> {
		return this.transactionService.add(transaction);
	}
}