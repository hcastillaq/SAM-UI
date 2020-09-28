
import { Injectable } from '@angular/core';
import {
	EntityAction,
	EntityCollectionServiceBase,
	EntityCollectionServiceElementsFactory,
	EntityOp,
	ofEntityOp,
	ofEntityType,
	OP_ERROR,
} from '@ngrx/data';
import { Actions } from '@ngrx/effects';
import { ITransaction } from 'src/app/interfaces/transaction.interface';

@Injectable({ providedIn: 'root' })
export class TransactionEntityService extends EntityCollectionServiceBase<ITransaction> {
	constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private actions$: Actions) {
		super('Transaction', serviceElementsFactory);

		this.actions$.pipe(
			ofEntityOp(EntityOp.QUERY_ALL_SUCCESS),
			ofEntityType('Transaction'),
		).subscribe(action => {
			if (action.payload.data.length === 0) this.clearCache();
		})
	}


}