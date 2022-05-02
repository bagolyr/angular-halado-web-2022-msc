import { Injectable } from '@angular/core';
import { WagonTable } from './data/wagons';
import { Wagon } from './data/wagons';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const WAGON_URL = 'api/wagons';

@Injectable()
export class WagonService {
  private _url: string = '/assets/wagons.json';

  constructor(private requestService: HttpClient) {}

  getWagons(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<any>(WAGON_URL, httpOptions);
  }
  /*getWagons(): Observable<Wagon[]> {
    return this.requestService.get<Wagon[]>(WAGON_URL);
  }*/

  getWagon(wagonId): Observable<any> {
    return this.requestService.get(`${WAGON_URL}/${wagonId}`);
  }

  createWagon(wagon: any): Observable<any> {
    return this.requestService.post(`${WAGON_URL}/`, wagon);
  }

  updateWagon(wagon: any): Observable<any> {
    return this.requestService.put(`${WAGON_URL}/`, wagon);
  }

  deleteWagon(wagonId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const url = `${WAGON_URL}/${wagonId}`;
    return this.requestService.delete(url, httpOptions);
  }

  wagonNameExists(name: string): Observable<boolean> {
    return this.getWagons().pipe(
      map((wagons) => {
        return wagons.findIndex((wagon) => wagon.identifier === name) !== -1;
      })
    );
  }
}
