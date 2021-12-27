import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TableActionsComponent } from './todo-table/table-actions/table-actions.component';
import { PipesModule } from '../modules/pipes/pipes.module';

@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    ConfirmDialogComponent,
    TodoTableComponent,
    TableActionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    PipesModule,
  ],
  exports: [
    SidenavComponent,
    ToolbarComponent,
    ConfirmDialogComponent,
    TodoTableComponent,
    TableActionsComponent,
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class ComponentsModule {}
