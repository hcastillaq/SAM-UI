import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
export class CustomDateAdapter extends NativeDateAdapter {
  parse(value: string | Date): Date | null {
    return new Date(value);
  }

  format(date: Date, displayFormat: any): string {
    return new Date(date).toISOString().split('T')[0];
  }
}
