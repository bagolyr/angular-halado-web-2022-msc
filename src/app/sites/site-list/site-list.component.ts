import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Site, SiteTable } from '../../data/sites';
import { SiteService } from '../../site.service';
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
import { Sort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

export interface DialogData {
  filtered_wagons: any;
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
    private wagonService: WagonService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  increasingID: number;
  sites$: Observable<any>;
  sites;
  wagons$: Observable<any>;
  wagons;
  show_deleted = false;
  tmp: Site;

  InitForm() {
    this.siteForm = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required, Validators.maxLength(50)]],
      owner: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      code: ['', [Validators.required, Validators.maxLength(50)]],
      is_deleted: false,
    });
  }

  initializeSites() {
    this.sites$ = this.siteService.getSites();
    this.sites$.subscribe((result) => {
      this.sites = result;
    });
  }

  initializeWagons() {
    this.wagons$ = this.wagonService.getWagons();
    this.wagons$.subscribe((result) => {
      this.wagons = result;
    });
  }

  ngOnInit() {
    console.log('Debug: SiteListComponent: ngOnInit');
    this.initializeSites();
    this.initializeWagons();
    this.InitForm();
    this.increasingID = 4;
    console.log('Debug: SiteListComponent: ngOnInit finished.');
  }

  resetPerspective() {
    this.initializeSites();
    this.initializeWagons();
    this.InitForm();
  }

  onDeleteSite(eventId: number): void {
    this.siteService
      .deleteSite(eventId)
      .pipe(switchMap((res) => this.siteService.getSites()))
      .subscribe((result) => (this.sites = result));
  }

  isSiteEmpty(eventId: number): boolean {
    //console.log('isSiteEmpty: ' + eventId);
    //console.log(
    //  this.wagons.filter((wagons) => wagons.siteID === eventId)[0] == null
    //);
    return this.wagons.filter((wagons) => wagons.siteID === eventId)[0] == null;
  }

  displayedColumns: string[] = [
    'name',
    'owner',
    'address',
    'code',
    'edit',
    'show_wagons',
    'restore_site',
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
      'site-list component: onClickFilterWagonsBySiteId(Selected siteID): ' +
        event.target.id
    );
    console.log(
      this.wagons.filter((wagon) => wagon.siteID === Number(event.target.id))
    );

    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      width: '550px',
      height: '300px',
      data: {
        filtered_wagons: JSON.stringify(
          this.wagons.filter(
            (wagons) => wagons.siteID === Number(event.target.id)
          ),
          ['identifier']
        ),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog closed.`);
      this.initializeWagons();
    });
  }

  onClickRestoreWagonsBySiteId(event: any) {
    console.log(
      'site-list component: onClickRestoreWagonsBySiteId(Selected siteID): ' +
        event.target.id
    );
    this.tmp = this.sites.filter(
      (site) => site.id === Number(event.target.id)
    )[0];
    this.tmp.is_deleted = false;
    console.log(this.tmp);

    this.sites$ = this.siteService.updateSite(this.tmp);
    this.sites$.subscribe((result) => {
      this.sites = result;
    });
    this.resetPerspective();
  }

  removeData() {
    this.sites.pop();
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
    const data = this.sites.slice();
    if (!sort.active || sort.direction === '') {
      this.sites = data;
      return;
    }

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

  /* Filter the content of the table */

  text = '';
  searchFunction(text) {
    console.log('Debug: site-list searchFunction: ' + text);
    console.log(
      (this.sites = this.sites.filter((e) => {
        return (
          e.name.toLowerCase() === text.toLowerCase() ||
          e.name.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
          e.owner.toLowerCase() === text.toLowerCase() ||
          e.owner.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
          e.address.toLowerCase() === text.toLowerCase() ||
          e.address.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
          e.code.toLowerCase() === text.toLowerCase() ||
          e.code.toLowerCase().indexOf(text.toLowerCase()) >= 0
        );
      }))
    );
    if (text === '') {
      this.resetPerspective();
    }
  }

  /* validators */
  get name() {
    return this.siteForm.get('name');
  }
  get owner() {
    return this.siteForm.get('owner');
  }
  get address() {
    return this.siteForm.get('address');
  }
  get code() {
    return this.siteForm.get('code');
  }

  getNameErrorMessage() {
    //console.log('Debug wagon-list getNameErrorMessage called');
    if (this.name.dirty || this.name.touched) {
      if (this.name.hasError('required')) return 'You must enter a value!';
      if (this.name.hasError('maxlength'))
        return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getOwnerErrorMessage() {
    //console.log('Debug wagon-list getOwnerErrorMessage called');
    if (this.owner.dirty || this.owner.touched) {
      if (this.owner.hasError('required')) return 'You must enter a value!';
      if (this.owner.hasError('maxlength'))
        return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getAddressErrorMessage() {
    //console.log('Debug wagon-list getAddressErrorMessage called');
    if (this.address.dirty || this.address.touched) {
      if (this.address.hasError('required')) return 'You must enter a value!';
      if (this.address.hasError('maxlength'))
        return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getCodeErrorMessage() {
    //console.log('Debug wagon-list getCodeErrorMessage called');
    if (this.code.dirty || this.code.touched) {
      if (this.code.hasError('required')) return 'You must enter a value!';
      if (this.code.hasError('maxlength'))
        return 'You can enter at most 50 characters!';
    }
    return '';
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'site-list-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log('DialogDataExampleDialog: ' + data.filtered_wagons);
  }
}
