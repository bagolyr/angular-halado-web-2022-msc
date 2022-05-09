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
import { FormBuilder, FormGroup } from '@angular/forms';
import { SiteService } from '../../site.service';
import { Sort } from '@angular/material/sort';

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
    siteName: 'Name1',
  },
];

@Component({
  selector: 'app-wagon-list',
  templateUrl: './wagon-list.component.html',
  styleUrls: ['./wagon-list.component.css'],
})
export class WagonListComponent implements OnInit {
  wagonForm: FormGroup;

  constructor(
    private wagonService: WagonService,
    private siteService: SiteService,
    private formBuilder: FormBuilder
  ) {}

  increasingID: number;
  wagons$: Observable<any>;
  wagons;
  sites$: Observable<any>;
  sites;

  InitForm() {
    this.wagonForm = this.formBuilder.group({
      id: '',
      identifier: '',
      date_of_production: '',
      track_number: '',
      owner: '',
      siteID: '',
      is_deleted: false,
      siteName: '',
    });
  }

  ngOnInit() {
    console.log('Debug: WagonListComponent ngOnInit');
    this.wagons$ = this.wagonService.getWagons();
    this.wagons$.subscribe((result) => {
      this.wagons = result;
    });

    this.sites$ = this.siteService.getSites();
    this.sites$.subscribe((result) => {
      this.sites = result;
    });

    this.InitForm();
    this.increasingID = 4;
  }

  resetPerspective() {
    this.wagons$ = this.wagonService.getWagons();
    this.wagons$.subscribe((result) => {
      this.wagons = result;
    });
    this.InitForm();
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
    this.wagons.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  addFormData(data: Wagon) {
    data.id = this.increasingID;
    console.log(
      'Adding the following content to the DB: ' + JSON.stringify(data)
    );
    alert('Identifier ' + data.identifier + ' has been added to the database');
    this.wagons.push(data);
    this.table.renderRows();
    this.increasingID = this.increasingID + 1;
  }

  onClickFilterWagonsBySiteId(event: any) {
    console.log(
      'wagon-list component: onClickFilterWagonsBySiteId(Selected siteID): ' +
        event.target.id
    );
    console.log(
      this.wagons.filter((wagon) => wagon.siteID === Number(event.target.id))
    );
    this.wagons = this.wagons.filter(
      (wagon) => wagon.siteID === Number(event.target.id)
    );
  }

  removeData() {
    this.wagons.pop();
    this.table.renderRows();
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  sortedData: Wagon[];

  sortData(sort: Sort) {
    const data = this.wagons.slice();
    if (!sort.active || sort.direction === '') {
      //this.sortedData = data;
      this.wagons = data;
      return;
    }

    //this.sortedData = data.sort((a, b) => {
    this.wagons = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'identifier':
          return compare(a.identifier, b.identifier, isAsc);
        case 'track_number':
          return compare(a.track_number, b.track_number, isAsc);
        case 'siteName':
          return compare(a.siteName, b.siteName, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
