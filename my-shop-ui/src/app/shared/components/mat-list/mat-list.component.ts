import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mat-list',
  templateUrl: './mat-list.component.html',
  styleUrls: ['./mat-list.component.scss']
})
export class MatListComponent implements OnInit {
  dataSource: any;
  displayedColumns: any[] = [];
  @ViewChild(MatSort) sort: MatSort | undefined;
  @Input() data: MatTableList = {
    headList: [],
    dataList: []
  };
  columnNames = this.data['headList'];
  constructor() {
    console.log(this.data)
  }

  ngOnInit(): void {
    this.displayedColumns = this.columnNames.map((x: MatTableHead) => x.key);
    this.createTable();
  }
  createTable() {
    let tableArr: any[] = this.data.dataList;
    this.dataSource = new MatTableDataSource(tableArr);
    this.dataSource.sort = this.sort;
  }
}

export class MatTableHead {
  constructor(
    public key: string,
    public value: string
  ) { }
}
export class MatTableList {
  constructor(
    public headList: MatTableHead[],
    public dataList: any[]
  ) { }
}
