import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { ITransaction } from 'src/app/interfaces/transaction.interface';

const entityMetadata: EntityMetadataMap = {
	Transaction: {
		selectId: (transaction: ITransaction) => {
			return String(transaction._id);
		},
		entityDispatcherOptions: {
			optimisticAdd: false,
			optimisticUpdate: true,
			optimisticDelete: true,
		}
	}
};

const pluralNames = {
	Transaction: 'Transactions',
};

export const entityConfig: EntityDataModuleConfig = {
	entityMetadata,
	pluralNames
};
