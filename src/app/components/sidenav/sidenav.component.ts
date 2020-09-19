import { Component, OnInit, ViewChild, AfterContentInit, ChangeDetectorRef } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { DICTIONARY } from "./../../helpers/dictionary.helpers";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from "@angular/material/tree";
import { MediaMatcher } from '@angular/cdk/layout';
import { Subject } from 'rxjs';

export const SIDENAV$ = new Subject<never>();

interface TreeNode {
  name: string;
  to?: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    to: "/spadmin",
    name: "Single",
  },
  {
    name: "Fruit",
    children: [
      { name: "Apple", to: "/spadmin" },
      { name: "Banana" },
      { name: "Fruit loops" },
    ],
  },
  {
    name: "Vegetables",
    children: [
      {
        name: "Green",
      },
    ],
  },
];


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit, AfterContentInit {
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;
  DICTIONARY = DICTIONARY;
  navigation = [
    {
      to: "/spadmin",
      name: "Dashboard",
      expands: [],
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = TREE_DATA;
    SIDENAV$.subscribe( () => {
      this.sidenav.toggle();
    });
  }
  ngAfterContentInit(): void {
    this.sidenav.close();
  }

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      to: node.to,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  close(reason: string) {
    this.sidenav.close();
  }

  
}
