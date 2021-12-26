import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
import {
  asyncScheduler,
  Observable,
  of,
  scheduled,
  Subject,
  Subscription,
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FadeUp } from 'src/app/animations/fadeUp';
import { TRANSLATE } from 'src/app/helpers/dictionary.helpers';

export interface ITodoTableConfig {
  data: Observable<any>;
  loading: Observable<boolean>;
  headers: string[];
  name: String;
  reload?: Function;
  createComponent?: ComponentType<any> | TemplateRef<any>;
  detailComponent?: ComponentType<any> | TemplateRef<any>;
  updateComponent?: ComponentType<any> | TemplateRef<any>;
  delete?: {
    confirmationComponent: ComponentType<any> | TemplateRef<any>;
    callback(item: any): void;
  };
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
  dataSource: MatTableDataSource<any>;

  pageSize: number = 5;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.config) {
      this.config.headers.push('actions');
      this.displayedColumns = this.config.headers;
      this.dataSource = new MatTableDataSource([]);

      this.config.data
        .pipe(takeUntil(this.subsDestroyed$))
        .subscribe((data) => {
          this.observerDataUnsubscribe();
          this.dataSource.data = data;
        });
    }
  }
  observerDataUnsubscribe() {
    if (this.dataObserver) {
      this.dataObserver.unsubscribe();
      this.dataObserver = undefined;
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    if (this.config.createComponent) {
      this.dialog.open(this.config.createComponent, {
        data: {
          action: 'create',
        },
      });
    }
  }

  reload() {
    if (this.config.reload) {
      this.observerDataUnsubscribe();
      this.dataSource.data = [];
      this.config.reload();
    }
  }

  detail(item) {
    if (this.config.detailComponent) {
      this.dialog.open(this.config.detailComponent, {
        data: {
          action: 'detail',
          item: { ...item },
        },
      });
    }
  }

  update(item) {
    if (this.config.updateComponent) {
      this.dialog.open(this.config.updateComponent, {
        data: {
          action: 'update',
          item: { ...item },
        },
      });
    }
  }

  delete(item) {
    if (this.config.delete) {
      this.dialog
        .open(this.config.delete.confirmationComponent)
        .afterClosed()
        .pipe(takeUntil(this.subsDestroyed$))
        .subscribe((resp) => {
          if (resp) {
            this.config.delete.callback(item);
          }
        });
    }
  }

  translate(word: string | String) {
    return TRANSLATE(String(word));
  }

  ngOnDestroy() {
    this.subsDestroyed$.next(true);
    this.subsDestroyed$.unsubscribe();
    this.observerDataUnsubscribe();
  }
}
