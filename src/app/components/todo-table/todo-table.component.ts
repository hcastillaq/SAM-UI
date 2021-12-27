import { ComponentType } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription } from 'rxjs';
import { FadeUp } from 'src/app/animations/fadeUp';

export interface ITodoTableConfig {
  header?: {
    name: String;
    reload?: Function;
    create?: ComponentType<any> | TemplateRef<any>;
  };
  dataSource: MatTableDataSource<any>;
  loading: Observable<boolean>;
}

@Component({
  selector: 'app-todo-table[config]',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss'],
  animations: FadeUp,
})
export class TodoTableComponent implements OnInit, AfterViewInit, OnDestroy {
  subsDestroyed$ = new Subject<Boolean>();
  dataObserver: Subscription = undefined;

  @Input() config: ITodoTableConfig;
  displayedColumns: string[];

  pageSize: number = 5;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (!this.config) {
      throw new Error('config is required in TodoTableComponent');
    }
  }
  ngAfterViewInit() {
    this.config.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.config.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    if (this.config.header.create) {
      this.dialog.open(this.config.header.create, {
        data: {
          action: 'create',
        },
      });
    }
  }

  reload() {
    if (this.config.header.reload) {
      this.config.dataSource.data = [];
      this.config.header.reload();
    }
  }

  ngOnDestroy() {
    this.subsDestroyed$.next(true);
    this.subsDestroyed$.unsubscribe();
  }
}
