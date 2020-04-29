import { Component, OnInit, Inject } from "@angular/core";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from "@angular/material/snack-bar";
import { Snackbar } from "src/app/interfaces/snackbar";

@Component({
  selector: "app-snackbar-template",
  templateUrl: "./snackbar-template.component.html",
  styleUrls: ["./snackbar-template.component.scss"],
})
export class SnackbarTemplateComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: Snackbar,
    private _snackRef: MatSnackBarRef<SnackbarTemplateComponent>
  ) {}

  ngOnInit() {}
  close() {
    this._snackRef.dismiss();
  }
}
