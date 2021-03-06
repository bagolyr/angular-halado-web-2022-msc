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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteService } from '../../site.service';
import { Sort } from '@angular/material/sort';
import { CustomPipe } from '../../custom-pipe';

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
  show_deleted = false;

  InitForm() {
    this.wagonForm = this.formBuilder.group({
      id: '',
      identifier: ['', [Validators.required, Validators.maxLength(50)]],
      date_of_production: ['', [Validators.required]],
      track_number: ['', [Validators.required, Validators.maxLength(50)]],
      owner: ['', [Validators.required, Validators.maxLength(50)]],
      siteID: ['', [Validators.required]],
      is_deleted: false,
      siteName: ['', [Validators.required]],
    });
  }

  initializeWagons() {
    this.wagons$ = this.wagonService.getWagons();
    this.wagons$.subscribe((result) => {
      this.wagons = result;
    });
  }

  initializeSites() {
    this.sites$ = this.siteService.getSites();
    this.sites$.subscribe((result) => {
      this.sites = result;
    });
  }

  ngOnInit() {
    console.log('Debug: WagonListComponent ngOnInit');
    this.initializeWagons();
    this.initializeSites();
    this.InitForm();
    this.increasingID = 4;
  }

  resetPerspective() {
    this.initializeWagons();
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

  /* "Click to expand and hide" module */

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

  /* Sort the content of the table */

  sortData(sort: Sort) {
    const data = this.wagons.slice();
    if (!sort.active || sort.direction === '') {
      this.wagons = data;
      return;
    }

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

  /* Filter the content of the table */

  text = '';
  searchFunction(text) {
    console.log('Debug: wagon-list searchFunction: ' + text);
    console.log(
      (this.wagons = this.wagons.filter((e) => {
        return (
          e.identifier.toLowerCase() === text.toLowerCase() ||
          e.identifier.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
          e.track_number.toLowerCase() === text.toLowerCase() ||
          e.track_number.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
          e.siteName.toLowerCase() === text.toLowerCase() ||
          e.siteName.toLowerCase().indexOf(text.toLowerCase()) >= 0
        );
      }))
    );
    if (text === '') {
      this.resetPerspective();
    }
  }

  /* validators */
  get identifier() {
    return this.wagonForm.get('identifier');
  }
  get owner() {
    return this.wagonForm.get('owner');
  }
  get track_number() {
    return this.wagonForm.get('track_number');
  }
  get date_of_production() {
    return this.wagonForm.get('date_of_production');
  }
  get siteId() {
    return this.siteId.get('siteId');
  }
  get siteName() {
    return this.siteName.get('siteName');
  }

  getIdentifierErrorMessage() {
    //console.log('Debug wagon-list getIdentifierErrorMessage called');
    if (this.identifier.dirty || this.identifier.touched) {
      if (this.identifier.hasError('required'))
        return 'You must enter a value!';
      if (this.identifier.hasError('maxlength'))
        return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getOwnerErrorMessage() {
    //console.log('Debug wagon-list getIdentifierErrorMessage called');
    if (this.owner.dirty || this.owner.touched) {
      if (this.owner.hasError('required')) return 'You must enter a value!';
      if (this.owner.hasError('maxlength'))
        return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getTrackNumberErrorMessage() {
    //console.log('Debug wagon-list getIdentifierErrorMessage called');
    if (this.track_number.dirty || this.track_number.touched) {
      if (this.track_number.hasError('required'))
        return 'You must enter a value!';
      if (this.track_number.hasError('maxlength'))
        return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getProdDateErrorMessage() {
    //console.log('Debug wagon-list getIdentifierErrorMessage called');
    if (this.date_of_production.dirty || this.date_of_production.touched) {
      if (this.date_of_production.hasError('required'))
        return 'You must enter a value!';
    }
    return '';
  }

  getSiteIDErrorMessage() {
    //console.log('Debug wagon-list getIdentifierErrorMessage called');
    if (this.siteId.dirty || this.siteId.touched) {
      if (this.siteId.hasError('required')) return 'You must enter a value!';
    }
    return '';
  }

  getSiteNameErrorMessage() {
    //console.log('Debug wagon-list getIdentifierErrorMessage called');
    if (this.siteName.dirty || this.siteName.touched) {
      if (this.siteName.hasError('required')) return 'You must enter a value!';
    }
    return '';
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
