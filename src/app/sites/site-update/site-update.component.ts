import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteTable } from '../../data/sites';
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
import { Site } from '../../data/sites';
import { SiteActionTypes } from '../store/sites.actions';

@Component({
  selector: 'app-site-update',
  templateUrl: './site-update.component.html',
  styleUrls: ['./site-update.component.css'],
})
export class SiteUpdateComponent implements OnInit {
  siteForm: FormGroup;
  sites$: Observable<any>;
  sites;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private siteservice: SiteService
  ) {}

  ngOnInit() {
    console.log('Debug: SiteUpdateComponent: ngOnInit');
    const n: number = Number(this.router.url.split('/').pop());

    console.log('Loading site id: ' + n);

    this.sites$ = this.siteservice.getSite(n);
    this.sites$.subscribe((result) => {
      this.sites = result;
    });

    this.siteForm = this.formBuilder.group({
      id: '',
      name: '',
      owner: '',
      address: '',
      code: '',
      is_deleted: false,
    });
  }

  onSubmit(data) {
    console.log(data);

    this.sites$ = this.siteservice.updateSite(data);
    this.sites$.subscribe((result) => {
      this.sites = result;
    });
    alert('Update successful!');
    this.router.navigate(['/sites']);
  }
}
