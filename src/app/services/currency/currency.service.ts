import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  format(mount: number): string {
    return new Intl.NumberFormat('de-DE').format(mount);
  }
}
