import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Injectable()
export class TransactionEntityDataService extends DefaultDataService<Transaction> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private transactionService: TransactionService,
  ) {
    super('Transaction', http, httpUrlGenerator);
  }

  getAll(): Observable<Transaction[]> {
    return this.transactionService.getAll();
  }

  add(transaction: Transaction): Observable<Transaction> {
    return this.transactionService.add(transaction);
  }

  update(transaction: Update<Transaction>): Observable<Transaction> {
    return this.transactionService.update(transaction.changes);
  }

  delete(transactionId: string): Observable<string> {
    return this.transactionService.delete(transactionId);
  }
}
