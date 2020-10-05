
import { Injectable } from '@angular/core';
import {
	EntityAction,
	EntityCollectionServiceBase,
	EntityCollectionServiceElementsFactory,
	EntityOp,
	ofEntityOp,
	ofEntityType,
} from '@ngrx/data';
import { Actions } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ITransaction } from 'src/app/interfaces/transaction.interface';

@Injectable({ providedIn: 'root' })
export class TransactionEntityService extends EntityCollectionServiceBase<ITransaction> {

	subDestroyer: Subject<any> = new Subject();
	constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private actions$: Actions) {
		super('Transaction', serviceElementsFactory);

		this.actions$.pipe(
			ofEntityType('Transaction'),
			ofEntityOp(EntityOp.QUERY_ALL_SUCCESS),
		).subscribe((action: EntityAction) => {
			if (action.payload.data.length === 0) this.clearCache();
		});

		this.actions$.pipe(
			ofEntityType('Transaction'),
			ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS),
		).subscribe((action: EntityAction) => {
			this.entities$.pipe(takeUntil(this.subDestroyer)).subscribe((transactions: ITransaction[]) => {
				const transaction: ITransaction = transactions.pop();
				transactions.unshift(transaction);
				this.addAllToCache(transactions);
				this.subDestroyer.next();
			});
		})
	}
}