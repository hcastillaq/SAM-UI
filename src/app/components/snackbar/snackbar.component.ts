import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarTemplateComponent } from "../snackbar-template/snackbar-template.component";
import { Subject } from "rxjs";
import { Snackbar } from "src/app/interfaces/snackbar";

export const SNACKBAR: Subject<Snackbar> = new Subject<Snackbar>();

@Component({
  selector: "app-snackbar",
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.scss"],
})
export class SnackbarComponent implements OnInit {
  public config: Snackbar = {
    message: "static message",
    type: "success",
    duration: 5000,
  };
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    SNACKBAR.subscribe((options: Snackbar) => {
      this.config = { ...this.config, ...options };
      this.openSnackBar();
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarTemplateComponent, {
      duration: this.config.duration,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ["snackbar", this.config.type],
      data: this.config,
    });
  }
}
