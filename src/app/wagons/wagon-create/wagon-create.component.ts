import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wagon-create',
  templateUrl: './wagon-create.component.html',
  styleUrls: ['./wagon-create.component.css'],
})
export class WagonCreateComponent implements OnInit {
  wagonForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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

  onSubmit(wagonData) {
    alert('Form submitted:\n' + JSON.stringify(wagonData));
    this.wagonForm.reset();
  }
}
