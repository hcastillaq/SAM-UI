import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material.module";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { TodoTableComponent } from './todo-table/todo-table.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
	declarations: [SidenavComponent, ToolbarComponent, TodoTableComponent, ConfirmDialogComponent],
	imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule],
	exports: [SidenavComponent, ToolbarComponent],
	entryComponents: [ConfirmDialogComponent]
})
export class ComponentesModule { }
