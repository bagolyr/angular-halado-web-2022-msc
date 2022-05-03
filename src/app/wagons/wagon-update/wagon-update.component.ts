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

  //constructor(private router: Router) {}

  ngOnInit() {
    this.wagons$ = this.wagonService.getWagons();
    this.wagons$.subscribe((result) => {
      this.wagons = result;
    });
    console.log(this.wagons$);
    console.log('loading wagon id: ' + this.router.url.split('/').pop());
    console.log(this.wagonService.getWagon(this.router.url.split('/').pop()));
    this.wagonForm = this.formBuilder.group({
      id: '',
      identifier: '',
      date_of_production: '',
      track_number: '',
      owner: '',
      siteID: '',
      is_deleted: false,
    });
  }

  /*ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => {
          return this.store.dispatch(
            wagonRequestedAction({ authorId: +params.get('wagonId') })
          );
        })
      )
      .subscribe();
    this.store.pipe(select(selectLoadedWagon)).subscribe((author) => {
      if (author && this.authorsForm) {
        this.authorsForm.controls.id.setValue(author.id);
        this.authorsForm.controls.name.setValue(author.name);
        this.authorsForm.controls.birthYear.setValue(author.birthYear);
        this.authorsForm.controls.nationality.setValue(author.nationality);
      }
    });
  }*/

  onSubmit(data) {}
}
