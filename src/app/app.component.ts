import { Component, OnInit } from "@angular/core";
import { DFD } from './helpers/globals.helpers';
import { MediaQueriesMatcher } from './helpers/media-queries.helper';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "SAM-UI";

  constructor(private mediaMatches: MediaQueriesMatcher) { }

  ngOnInit(): void {
    this.mediaMatches.loadMatches();
  }
}
