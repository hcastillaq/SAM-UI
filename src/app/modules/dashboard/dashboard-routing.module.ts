import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsHomeComponent } from '../transactions/pages/transactions-home/transactions-home.component';
import { HomeComponent } from './componentes/home/home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: 'transactions',
				loadChildren: () => import("./../transactions/transactions.module").then((m) => m.TransactionsModule),
			}
		]
	},

	{
		path: "**",
		redirectTo: `/`,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
