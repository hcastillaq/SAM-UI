import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsHomeComponent } from './pages/transactions-home/transactions-home.component';

const routes: Routes = [
	{
		path: '',
		component: TransactionsHomeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TransactionsRoutingModule { }
