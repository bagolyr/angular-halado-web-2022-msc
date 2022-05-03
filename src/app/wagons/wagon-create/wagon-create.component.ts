import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { WagonActionTypes } from '../store/wagons.actions';

@Component({
  selector: 'app-wagon-create',
  templateUrl: './wagon-create.component.html',
  styleUrls: ['./wagon-create.component.css'],
})
export class WagonCreateComponent implements OnInit {
  wagonForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.wagonForm = this.formBuilder.group({
      identifier: '',
      date_of_production: '',
      track_number: '',
      owner: '',
      siteID: '',
      is_deleted: false,
    });
  }

  onSubmit(wagonData: any) {
    alert('Form submitted:\n' + JSON.stringify(wagonData));
    wagonData.deleted = false;
    //this.store.dispatch(wagonCreateAction(wagonData));
    this.wagonForm.reset();
    this.router.navigate(['/wagons']);
  }
}
