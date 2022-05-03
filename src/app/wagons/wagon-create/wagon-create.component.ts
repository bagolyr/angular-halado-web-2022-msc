import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { WagonActionTypes } from '../store/wagons.actions';
import { WagonService } from '../../wagon.service';
import { Wagon } from '../../data/wagons';

@Component({
  selector: 'app-wagon-create',
  templateUrl: './wagon-create.component.html',
  styleUrls: ['./wagon-create.component.css'],
})
export class WagonCreateComponent implements OnInit {
  wagonForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, //private store: Store
    private wagonService: WagonService
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

  onCreateWagon(wagon: Wagon): void {
    this.wagonService.createWagon(wagon);
  }

  onSubmit(wagonData: any) {
    wagonData.id = 4;
    wagonData.is_deleted = false;
    alert('Form submitted:\n' + JSON.stringify(wagonData));
    this.wagonService.createWagon(wagonData);
    //this.store.dispatch(wagonCreateAction(wagonData));
    this.wagonForm.reset();
    this.router.navigate(['/wagons']);
  }
}
