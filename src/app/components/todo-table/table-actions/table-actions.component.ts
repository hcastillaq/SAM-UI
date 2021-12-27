import { ComponentType } from '@angular/cdk/portal';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface TableActions {
  update?: ComponentType<any> | TemplateRef<any>;
  detail?: ComponentType<any> | TemplateRef<any>;
  delete?: {
    confirm: ComponentType<any> | TemplateRef<any>;
    callback(item: any): void;
  };
}

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
})
export class TableActionsComponent implements OnInit {
  @Input('config') config: TableActions;
  @Input('item') item: any;

  subsDestroyed$ = new Subject<Boolean>();
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (!this.config) {
      throw new Error('config is required in app-table-actions');
    }

    if (!this.item) {
      throw new Error('item is required in app-table-actions');
    }
  }

  ngOnDestroy(): void {
    this.subsDestroyed$.next();
    this.subsDestroyed$.complete();
  }

  detail() {
    if (this.config.detail) {
      this.dialog.open(this.config.detail, {
        data: {
          action: 'detail',
          item: { ...this.item },
        },
      });
    }
  }

  update() {
    if (this.config.update) {
      this.dialog.open(this.config.update, {
        data: {
          action: 'update',
          item: { ...this.item },
        },
      });
    }
  }

  delete() {
    if (this.config.delete) {
      this.dialog
        .open(this.config.delete.confirm)
        .afterClosed()
        .pipe(takeUntil(this.subsDestroyed$))
        .subscribe((resp) => {
          if (resp) {
            this.config.delete.callback(this.item);
          }
        });
    }
  }
}
