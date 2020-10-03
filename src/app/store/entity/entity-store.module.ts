import { NgModule } from '@angular/core';
import { EntityDataService, EntityActionFactory } from '@ngrx/data';
import { TransactionEntityDataService } from './transactions/transactoins.entity.data.service';


@NgModule({
	imports: [],
	providers: [
		TransactionEntityDataService
	],
})
export class EntityStoreModule {
	constructor(
		entityDataService: EntityDataService,
		transactionEntityDataService: TransactionEntityDataService
	) {
		entityDataService.registerService('Transaction', transactionEntityDataService);
	}
}
