import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: 'transactions',
				loadChildren: () => import("./../transactions/transactions.module").then((m) => m.TransactionsModule),
			},
			{
				path: 'analytics',
				loadChildren: () => import("./../analytics/analytics.module").then((m) => m.AnalyticsModule),
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
