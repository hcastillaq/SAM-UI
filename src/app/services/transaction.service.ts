import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ITransaction } from '../interfaces/transaction.interface';
import { BaseService } from './base.service';

@Injectable({
	providedIn: 'root'
})
export class TransactionService extends BaseService {
	getAll(): Observable<ITransaction[]> {
		const query = `
			query{
				getAllTransactions{
					_id,
					mount,
					description,
					date,
					user{
						_id,
						name,
						rol
					},
					company{
						_id,
						name
					},
					type
				}
			}
		`;
		return super.graphqlQuery(query).pipe(map((resp: any) => resp.data.getAllTransactions));
	}

	add(transaction: ITransaction): Observable<ITransaction> {
		const query = `
			mutation($transaction: TransactionInputCreate!){
				createTransaction(input: $transaction
				)
				{
					_id,
					company{_id,name},
					user{_id, name},
					description,
					mount,
					type,
					date
				}
			}
		`;
		return super.graphqlMutation(query, { transaction }).pipe(map(resp => resp.data.createTransaction));
	}

	update(transaction: ITransaction): Observable<ITransaction> {
		const query = `
			mutation($transaction: TransactionInputUpdate!, $id: String!){
				updateTransaction(input: $transaction, id:$id)
				{
					_id,
					company{_id,name},
					user{_id, name},
					description,
					mount,
					type,
					date
				}
			}
		`;
		return super.graphqlMutation(query, { transaction, id: transaction._id }).pipe(map(resp => resp.data.updateTransaction));
	}
}
