import { Injectable } from '@angular/core';
import * as numeral from 'numeral';

numeral.register('locale', 'es', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  ordinal: function (number) {
    return number === 1 ? 'er' : 'ème';
  },
  currency: {
    symbol: 'COP',
  },
});
numeral.locale('es');
@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor() {}
  format(mount: number, compact = false): string {
    if (compact) {
      return numeral(mount).format('0a');
    }
    return numeral(mount).format();
  }
}
