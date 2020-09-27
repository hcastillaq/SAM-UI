
import { Injectable } from '@angular/core';
import {
	EntityCollectionServiceBase,
	EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITransaction } from 'src/app/interfaces/transaction.interface';
import { TransactionService } from 'src/app/services/transaction.service';

@Injectable({ providedIn: 'root' })
export class TransactionEntityService extends EntityCollectionServiceBase<ITransaction> {
	constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private transactionService: TransactionService) {
		super('Transaction', serviceElementsFactory);
	}

}