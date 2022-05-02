import { Component, OnInit } from '@angular/core';
import { WagonTable } from '../../data/wagons';
import { WagonService } from '../../wagon.service';
import { Observable, Observer, fromEvent, of } from 'rxjs';
import {
  mergeMap,
  catchError,
  map,
  startWith,
  debounceTime,
  retry,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-wagon-list',
  templateUrl: './wagon-list.component.html',
  styleUrls: ['./wagon-list.component.css'],
})
export class WagonListComponent implements OnInit {
  public wagons = [];

  constructor(private wagonService: WagonService) {}

  wagons$: Observable<any>;
  //wagons;

  ngOnInit() {
    this.wagons$ = this.wagonService.getWagons();
    this.wagons$.subscribe((result) => {
      this.wagons = result;
    });
  }

  onNotify(wagon) {
    alert("Wagon '" + wagon.name + "' liked");
  }
}
