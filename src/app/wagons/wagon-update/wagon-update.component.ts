import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wagon-update',
  templateUrl: './wagon-update.component.html',
  styleUrls: ['./wagon-update.component.css'],
})
export class WagonUpdateComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.router.url);
  }
}
