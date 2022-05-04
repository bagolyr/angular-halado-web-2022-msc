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
  //public wagons = [];

  wagonForm: FormGroup;

  constructor(
    private wagonService: WagonService,
    private formBuilder: FormBuilder
  ) {}

  wagons$: Observable<any>;
  wagons;

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
    console.log(
      'Adding the following content to the DB: ' + JSON.stringify(data)
    );
    alert('Identifier ' + data.identifier + ' has been added to the database');
    data.id = this.constructor['ɵcmp'].id;
    //const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.wagons.push(data);
    //this.InitForm();
    //forthis.wagons.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  onClick(event: any) {
    console.log(
      'wagon-list component: onClick(Selected siteID): ' + event.target.id
    );
    console.log(
      this.wagons.filter((wagon) => wagon.siteID === Number(event.target.id))
    );
    this.wagons = this.wagons.filter(
      (wagon) => wagon.siteID === Number(event.target.id)
    );

    /*this.wagons$ = this.wagonService.wagonSiteExists(event.target.id);
    this.wagons$.subscribe((result) => {
      this.wagons = result;
    });*/
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
}
