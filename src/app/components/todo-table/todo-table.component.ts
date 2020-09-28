import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';


export interface ITodoTableConfig {
	data: Observable<any>,
	headers: String[],
	name: String,
}


@Component({
	selector: 'app-todo-table[config]',
	templateUrl: './todo-table.component.html',
	styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit, AfterViewInit {

	@Input() config: ITodoTableConfig;

	displayedColumns: String[];
	dataSource: MatTableDataSource<any>;

	pageSize: number = 5;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	constructor() { }

	ngOnInit(): void {
		if (this.config) {
			this.displayedColumns = this.config.headers;
			this.dataSource = new MatTableDataSource([]);
			this.config.data.subscribe(data => {
				this.dataSource.data = data;
				this.dataSource.paginator = this.paginator;
			});
		}
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

}
