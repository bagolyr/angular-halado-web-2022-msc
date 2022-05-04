import { Component, OnInit, ViewChild } from '@angular/core';
import { Wagon, WagonTable } from '../../data/wagons';
import { WagonService } from '../../wagon.service';
import { Observable, Observer, fromEvent, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  mergeMap,
  catchError,
  map,
  startWith,
  debounceTime,
  retry,
  tap,
} from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  id: number;
  identifier: string;
  date_of_production: number;
  track_number: string;
  owner: string;
  siteID: number;
  is_deleted: boolean;
  siteName?: string;
}

const ELEMENT_DATA: Wagon[] = [
  {
    id: 4,
    identifier: 'Bhv',
    date_of_production: 2020,
    track_number: '50 55 20-05 555-7',
    owner: 'WagonOwner1',
    siteID: 1,
    is_deleted: false,
  },
];

@Component({
  selector: 'app-wagon-list',
  templateUrl: './wagon-list.component.html',
  styleUrls: ['./wagon-list.component.css'],
})
export class WagonListComponent implements OnInit {
  //public wagons = [];

  constructor(private wagonService: WagonService) {}

  wagons$: Observable<any>;
  wagons;

  ngOnInit() {
    this.wagons$ = this.wagonService.getWagons();
    this.wagons$.subscribe((result) => {
      this.wagons = result;
    });
  }

  onDeleteWagon(eventId: number): void {
    this.wagonService
      .deleteWagon(eventId)
      .pipe(switchMap((res) => this.wagonService.getWagons()))
      .subscribe((result) => (this.wagons = result));
  }

  displayedColumns: string[] = [
    'identifier',
    'track_number',
    'siteName',
    'edit',
    'delete',
  ];

  @ViewChild(MatTable) table: MatTable<PeriodicElement>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.wagons.push(ELEMENT_DATA[0]);
    this.table.renderRows();
  }

  removeData() {
    this.wagons.pop();
    this.table.renderRows();
  }
}
