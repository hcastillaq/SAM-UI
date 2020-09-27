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
			mutation{
				createTransaction(input:
					{
						description: "${transaction.description}",
						type: "${transaction.type}",
						mount: ${transaction.mount},
						date: "${transaction.date}" 
					}
				)
				{
					_id,
					company{_id,name},
					user{_id, name},
					description,
					mount,
					type
				}
			}
		`;
		return super.graphqlMutation(query).pipe(map(resp => resp.data.createTransaction));
	}
}
