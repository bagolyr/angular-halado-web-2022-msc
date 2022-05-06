import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    //private store: Store,
    private wagonService: WagonService
  ) {}

  ngOnInit() {
    const n: number = Number(this.router.url.split('/').pop());

    console.log('Loading wagon id: ' + n);

    this.wagons$ = this.wagonService.getWagon(n);
    this.wagons$.subscribe((result) => {
      this.wagons = result;
    });

    this.wagonForm = this.formBuilder.group({
      id: '',
      identifier: '',
      date_of_production: '',
      track_number: '',
      owner: '',
      siteID: '',
      is_deleted: '',
      siteName: '',
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
}
