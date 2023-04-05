import { Component, OnInit } from '@angular/core';
import { MatTableHead, MatTableList } from 'src/app/shared/components/mat-list/mat-list.component';
@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {
  displayedColumns: MatTableHead[] = [
    { key: 'materialName', value: 'Name' },
    { key: 'quality', value: 'Quality' },
    { key: 'totalVolume', value: 'Purchased' },
    { key: 'sellVolume', value: 'Sell' },
    { key: 'remainingVolume', value: 'Remaining' },
    { key: 'buyingRate', value: 'Purchase Rate' },
    { key: 'sellingRate', value: 'Sell Rate' },
    { key: 'labourCost', value: 'Labour Cost' },
    { key: 'transportCost', value: 'Transport Cost' },
    { key: 'otherCost', value: 'Other Cost' },
    { key: 'marginProfit', value: 'Profit Margin' },
    { key: 'unit', value: 'Unit' },
  ];
  dataSource: MatTableList = {
    headList: [],
    dataList: []
  };
  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.headList = this.displayedColumns;
    this.dataSource.dataList = [{
      materialName: 'Stone',
      totalVolume: 10.5,
      remainingVolume: 5,
      sellVolume: 5.5,
      quality: 'A Grade',
      unit: 'ft',
      buyingRate: 82,
      sellingRate: 92,
      labourCost: 1,
      transportCost: 3,
      otherCost: 0.5,
      marginProfit: 5.5,
      currency: 'INR',
      firstUpdate: new Date(),
      lastUpdate: new Date()
    }, {
      materialName: 'Cement',
      totalVolume: 800,
      remainingVolume: 300,
      sellVolume: 500,
      quality: 'A Grade',
      unit: 'ft',
      buyingRate: 82,
      sellingRate: 92,
      labourCost: 1,
      transportCost: 3,
      otherCost: 0.5,
      marginProfit: 5.5,
      currency: 'INR',
      firstUpdate: new Date(),
      lastUpdate: new Date()
    }, {
      materialName: 'Stone',
      totalVolume: 10.5,
      remainingVolume: 5,
      sellVolume: 5.5,
      quality: 'B Grade',
      unit: 'ft',
      buyingRate: 82,
      sellingRate: 92,
      labourCost: 1,
      transportCost: 3,
      otherCost: 0.5,
      marginProfit: 5.5,
      currency: 'INR',
      firstUpdate: new Date(),
      lastUpdate: new Date()
    }, {
      materialName: 'TMT',
      totalVolume: 10.5,
      remainingVolume: 5,
      sellVolume: 5.5,
      quality: 'tata',
      unit: 'kg',
      buyingRate: 82,
      sellingRate: 92,
      labourCost: 1,
      transportCost: 3,
      otherCost: 0.5,
      marginProfit: 5.5,
      currency: 'INR',
      firstUpdate: new Date(),
      lastUpdate: new Date()
    }, {
      materialName: 'Bricks',
      totalVolume: 7000,
      remainingVolume: 5,
      sellVolume: 5.5,
      quality: 'A Grade',
      unit: 'ft',
      buyingRate: 82,
      sellingRate: 92,
      labourCost: 1,
      transportCost: 3,
      otherCost: 0.5,
      marginProfit: 5.5,
      currency: 'INR',
      firstUpdate: new Date(),
      lastUpdate: new Date()
    }];
  }

}
