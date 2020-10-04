import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


interface IBreakPointObserverData {
  name: string,
  breakpoint: string
}

export let BREAK_POINT = "";
export const BREAK_POINT_OBSERVER = new Subject<IBreakPointObserverData>();

export const BREAK_POINTS = {
  extraLarge: '(min-width: 1201px)',
  large: '(max-width: 1200px)',
}


@Injectable({
  providedIn: "root",
})

export class MediaQueriesMatcher {

  constructor(private breakpointObserver: BreakpointObserver) { }

  loadMatches() {
    const bp: Array<any> = Object.keys(BREAK_POINTS).map(key => BREAK_POINTS[key]);
    this.breakpointObserver
      .observe(bp)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          for (let key in BREAK_POINTS) {
            if (this.breakpointObserver.isMatched(BREAK_POINTS[key])) {
              BREAK_POINT = key;
              BREAK_POINT_OBSERVER.next({
                breakpoint: BREAK_POINTS[key],
                name: key
              });
              break;
            }
          }
        }

      });
  }
}