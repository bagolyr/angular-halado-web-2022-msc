import { Injectable } from '@angular/core';
import { WagonTable } from './data/wagon-store.data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const WAGON_URL = 'api/wagons';

@Injectable()
export class WagonService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get(WAGON_URL);
  }

  getEvent(wagonId): Observable<any> {
    return this.http.get(`${WAGON_URL}/${wagonId}`);
  }
}
