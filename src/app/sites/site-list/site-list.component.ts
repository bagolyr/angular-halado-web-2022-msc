import { Component, OnInit, ViewChild } from '@angular/core';
import { Site, SiteTable } from '../../data/sites';
import { SiteService } from '../../site.service';
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

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent implements OnInit {
  siteForm: FormGroup;

  constructor(
    private siteService: SiteService,
    private formBuilder: FormBuilder
  ) {}

  increasingID: number;
  sites$: Observable<any>;
  sites;

  InitForm() {
    this.siteForm = this.formBuilder.group({
      id: '',
      name: '',
      owner: '',
      address: '',
      code: '',
      is_deleted: 'false',
    });
  }

  ngOnInit() {
    console.log('Debug: SiteListComponent: ngOnInit');
    this.sites$ = this.siteService.getSites();
    this.sites$.subscribe((result) => {
      this.sites = result;
    });
    this.InitForm();
    this.increasingID = 4;
  }

  resetPerspective() {
    this.sites$ = this.siteService.getSites();
    this.sites$.subscribe((result) => {
      this.sites = result;
    });
    this.InitForm();
  }

  onDeleteSite(eventId: number): void {
    this.siteService
      .deleteSite(eventId)
      .pipe(switchMap((res) => this.siteService.getSites()))
      .subscribe((result) => (this.sites = result));
  }

  displayedColumns: string[] = [
    'name',
    'owner',
    'address',
    'code',
    'edit',
    'delete',
  ];
  @ViewChild(MatTable) table: MatTable<PeriodicElement>;

  addFormData(data: Site) {
    data.id = this.increasingID;
    console.log(
      'Adding the following content to the DB: ' + JSON.stringify(data)
    );
    alert('Identifier ' + data.name + ' has been added to the database');
    this.sites.push(data);
    this.table.renderRows();
    this.increasingID = this.increasingID + 1;
  }

  onClickFilterWagonsBySiteId(event: any) {
    console.log(
      'wagon-list component: onClick(Selected siteID): ' + event.target.id
    );
    console.log(
      this.sites.filter((wagon) => wagon.siteID === Number(event.target.id))
    );
    this.sites = this.sites.filter(
      (sites) => sites.siteID === Number(event.target.id)
    );
  }

  removeData() {
    this.sites.pop();
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
  /* Sort the content of the table */

  //sortedData: Wagon[];

  sortData(sort: Sort) {
    const data = this.sites.slice();
    if (!sort.active || sort.direction === '') {
      //this.sortedData = data;
      this.sites = data;
      return;
    }

    //this.sortedData = data.sort((a, b) => {
    this.sites = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'owner':
          return compare(a.owner, b.owner, isAsc);
        case 'address':
          return compare(a.address, b.address, isAsc);
        case 'code':
          return compare(a.code, b.code, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
