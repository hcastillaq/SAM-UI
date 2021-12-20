import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsHomeComponent } from './pages/transactions-home/transactions-home.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TodoTableComponent } from 'src/app/components/todo-table/todo-table.component';
import { DialogTransactionComponent } from './components/dialog-transaction/dialog-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';


@NgModule({
    declarations: [TransactionsHomeComponent, TodoTableComponent, DialogTransactionComponent, ConfirmDialogComponent],
    imports: [
        CommonModule,
        TransactionsRoutingModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        NgxCurrencyModule.forRoot({
            align: "left",
            allowNegative: false,
            allowZero: false,
            decimal: ",",
            precision: 0,
            prefix: "$ ",
            suffix: "",
            thousands: ".",
            nullable: false,
            min: 0,
            max: null,
            inputMode: CurrencyMaskInputMode.FINANCIAL
        })
    ]
})
export class TransactionsModule { }
