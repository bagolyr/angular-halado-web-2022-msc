import { Injectable } from '@angular/core';
import { SiteTable } from './data/sites';
import { Site } from './data/sites';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const SITE_URL = 'api/sites';

@Injectable()
export class SiteService {
  private _url: string = '/assets/sites.json';

  constructor(private requestService: HttpClient) {}

  getSites(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<any>(SITE_URL, httpOptions);
  }
  /*getWagons(): Observable<Wagon[]> {
    return this.requestService.get<Wagon[]>(SITE_URL);
  }*/

  getSite(siteId: number): Observable<any> {
    return this.requestService.get(`${SITE_URL}/${siteId}`);
  }

  createSite(wagon: any): Observable<any> {
    console.log('Create new site: ' + wagon);
    return this.requestService.post(`${SITE_URL}/`, wagon);
  }

  createSiteNew(wagon: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const url = `${SITE_URL}/${wagon}`;
    return this.requestService.post(url, httpOptions);
  }

  updateSite(wagon: any): Observable<any> {
    return this.requestService.put(`${SITE_URL}/`, wagon);
  }

  deleteSite(siteId: number): Observable<any> {
    console.log('Deleted site with the following id ' + siteId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const url = `${SITE_URL}/${siteId}`;
    return this.requestService.delete(url, httpOptions);
  }

  siteNameExists(name: string): Observable<boolean> {
    return this.getSites().pipe(
      map((sites) => {
        return sites.findIndex((site) => site.identifier === name) !== -1;
      })
    );
  }
}
