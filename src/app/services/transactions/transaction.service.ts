import { Injectable } from '@angular/core';
import { EMPTY, merge, Observable, of } from 'rxjs';
import { delay, map, mergeAll } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Analitycs, Transaction } from '../../interfaces/transaction.interface';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends BaseService {
  private path = environment.api + '/transaction';
  getAll(): Observable<Transaction[]> {
    return this.get(this.path).pipe(
      map((resp) =>
        resp.map((transaction) => {
          transaction.date = new Date(transaction.date * 1000);
          return transaction;
        }),
      ),
    );
  }

  add(transaction: Transaction): Observable<Transaction> {
    transaction.date = new Date(transaction.date).getTime() / 1000;
    return this.post(this.path, transaction).pipe(
      map((transaction) => {
        transaction.date = new Date(transaction.date * 1000);
        return transaction;
      }),
    );
  }

  update(transaction: Transaction): Observable<Transaction> {
    transaction.date = new Date(transaction.date).getTime() / 1000;
    return this.put(this.path, transaction).pipe(
      map((transaction) => {
        transaction.date = new Date(transaction.date * 1000);
        return transaction;
      }),
    );
  }

  delete(id: String): Observable<string> {
    return of('');
  }

  analytics(analitycs: Analitycs): Observable<any> {
    return this.post(this.path + '/analytics', analitycs);
  }
}
