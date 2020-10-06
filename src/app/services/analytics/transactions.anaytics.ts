import { ITransaction } from 'src/app/interfaces/transaction.interface';

export class AnalyticTransactionService {
  private transactions: ITransaction[];
  private dataFrame: any;

  constructor(transactions: ITransaction[]) {
    this.transactions = transactions;
  }

  createDataFrame() {

  }

  formatDateColumn() {

  }
}