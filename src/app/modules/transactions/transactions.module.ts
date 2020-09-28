import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsHomeComponent } from './pages/transactions-home/transactions-home.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TodoTableComponent } from 'src/app/components/todo-table/todo-table.component';


@NgModule({
	declarations: [TransactionsHomeComponent, TodoTableComponent],
	imports: [
		CommonModule,
		TransactionsRoutingModule,
		MaterialModule,
		FlexLayoutModule
	]
})
export class TransactionsModule { }
