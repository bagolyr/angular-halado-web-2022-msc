import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WagonTable } from '../../data/wagons';
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
import { Wagon } from '../../data/wagons';
import { WagonActionTypes } from '../store/wagons.actions';
import { SiteService } from '../../site.service';
import { CustomPipe } from '../../custom-pipe';

@Component({
  selector: 'app-wagon-update',
  templateUrl: './wagon-update.component.html',
  styleUrls: ['./wagon-update.component.css'],
})
export class WagonUpdateComponent implements OnInit {
  wagonForm: FormGroup;

  loadedWagon: Wagon;
  wagons$: Observable<any>;
  wagons;
  sites$: Observable<any>;
  sites;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private wagonService: WagonService,
    private siteService: SiteService
  ) {}

  ngOnInit() {
    const n: number = Number(this.router.url.split('/').pop());

    console.log('Loading wagon id: ' + n);

    this.wagons$ = this.wagonService.getWagon(n);
    this.wagons$.subscribe((result) => {
      this.wagons = result;
    });

    this.sites$ = this.siteService.getSites();
    this.sites$.subscribe((result) => {
      this.sites = result;
    });

    this.wagonForm = this.formBuilder.group({
      id: '',
      identifier: ['', [Validators.required, Validators.maxLength(50)]],
      date_of_production: ['', [Validators.required]],
      track_number: ['', [Validators.required, Validators.maxLength(50)]],
      owner: ['', [Validators.required, Validators.maxLength(50)]],
      siteID: ['', [Validators.required]],
      is_deleted: '',
      siteName: ['', [Validators.required]],
    });
  }

  onSubmit(data) {
    console.log(data);

    this.wagons$ = this.wagonService.updateWagon(data);
    this.wagons$.subscribe((result) => {
      this.wagons = result;
    });
    alert('Update successful!');
    this.router.navigate(['/wagons']);
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
    //console.log('Debug wagon-list getOwnerErrorMessage called');
    if (this.owner.dirty || this.owner.touched) {
      if (this.owner.hasError('required')) return 'You must enter a value!';
      if (this.owner.hasError('maxlength'))
        return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getTrackNumberErrorMessage() {
    //console.log('Debug wagon-list getTrackNumberErrorMessage called');
    if (this.track_number.dirty || this.track_number.touched) {
      if (this.track_number.hasError('required'))
        return 'You must enter a value!';
      if (this.track_number.hasError('maxlength'))
        return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getProdDateErrorMessage() {
    //console.log('Debug wagon-list getProdDateErrorMessage called');
    if (this.date_of_production.dirty || this.date_of_production.touched) {
      if (this.date_of_production.hasError('required'))
        return 'You must enter a value!';
    }
    return '';
  }

  getSiteIDErrorMessage() {
    //console.log('Debug wagon-list getSiteIDErrorMessage called');
    if (this.siteId.dirty || this.siteId.touched) {
      if (this.siteId.hasError('required')) return 'You must enter a value!';
    }
    return '';
  }

  getSiteNameErrorMessage() {
    //console.log('Debug wagon-list getSiteNameErrorMessage called');
    if (this.siteName.dirty || this.siteName.touched) {
      if (this.siteName.hasError('required')) return 'You must enter a value!';
    }
    return '';
  }
}
