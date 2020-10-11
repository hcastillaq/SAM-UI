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


	delete(id: String): Observable<string> {
		const query = `
			mutation($id: String!){
				deleteTransaction(id:$id){
					_id
				}
			}
		`;
		return super.graphqlMutation(query, { id }).pipe(map(resp => String(resp.data.deleteTransaction._id)));
	}


	analytics(format: string, start: String, end: String): Observable<any> {
		const query = `
		  query($format: String! $start: DateTime!, $end: DateTime!){
					analyticsTransactions(format:$format start:$start, end:$end){
					    entries{
								_id,
								total
							},
							expenses{
							_id,
								total
							},
							moneyByEntries,
							moneyByExpenses   
					}
				}
		`;
		return super.graphqlMutation(query, { format, start, end }).pipe(map(resp => resp.data.analyticsTransactions));
	}
}
