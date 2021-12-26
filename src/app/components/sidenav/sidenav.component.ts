import {
  Component,
  OnInit,
  ViewChild,
  AfterContentInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DICTIONARY } from './../../helpers/dictionary.helpers';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import {
  BREAK_POINT,
  BREAK_POINTS,
  BREAK_POINT_OBSERVER,
} from 'src/app/helpers/media-queries.helper';

export const SIDENAV$ = new Subject<never>();

interface TreeMenuNode {
  name: string;
  to?: string;
  children?: TreeMenuNode[];
  icon?: String;
  access?: boolean;
}

interface menuNode {
  expandable: boolean;
  name: string;
  level: number;
}
export const MENU_ITEMS: TreeMenuNode[] = [
  {
    to: '/transactions',
    name: DICTIONARY.SIDE_NAV.TRANSACTIONS,
    icon: 'poll',
    access: true,
  },
  {
    to: '/analytics',
    name: DICTIONARY.SIDE_NAV.ANALYTICS,
    icon: 'people',
    access: true,
  },

  // {
  //   to: '/users',
  //   name: DICTIONARY.SIDE_NAV.USERS,
  //   icon: 'people',
  //   access: true,
  // },
];
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, AfterContentInit {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  DICTIONARY = DICTIONARY;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = MENU_ITEMS;
    SIDENAV$.subscribe(() => {
      this.sidenav.toggle();
    });
    BREAK_POINT_OBSERVER.subscribe((data) => {
      if (BREAK_POINTS.extraLarge === data.breakpoint) {
        this.sidenav.close();
      }
    });
  }

  ngAfterContentInit(): void {
    this.sidenav.close();
  }

  closeSideNav(node: TreeMenuNode) {
    if (node.to) {
      this.sidenav.close();
    }
  }

  private _transformer = (node: TreeMenuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      to: node.to,
      level: level,
      icon: node.icon,
      access: node.access,
    };
  };

  treeControl = new FlatTreeControl<menuNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: menuNode) => node.expandable;

  close(reason: string) {
    this.sidenav.close();
  }
}
