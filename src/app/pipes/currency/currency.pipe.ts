import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency/currency.service';

@Pipe({
  name: 'customCurrency',
})
export class CurrencyPipe implements PipeTransform {
  constructor(private currencyService: CurrencyService) {}
  transform(value: number, ...args: unknown[]): string {
    return this.currencyService.format(value);
  }
}
