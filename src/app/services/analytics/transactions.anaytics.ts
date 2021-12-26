import { Transaction } from 'src/app/interfaces/transaction.interface';

export class AnalyticTransactionService {
  private transactions: Transaction[];
  private dataFrame: any;

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  createDataFrame() {}

  formatDateColumn() {}
}
