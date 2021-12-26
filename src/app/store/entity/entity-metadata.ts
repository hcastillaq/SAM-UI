import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { Transaction } from 'src/app/interfaces/transaction.interface';

const entityMetadata: EntityMetadataMap = {
  Transaction: {
    selectId: (transaction: Transaction) => {
      return String(transaction.id);
    },
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticUpdate: false,
      optimisticDelete: false,
    },
  },
};

const pluralNames = {
  Transaction: 'Transactions',
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
