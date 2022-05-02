import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RequestService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options: object = {}): Observable<T> {
    return this.http.get<T>(url, options).pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: any, options: object = {}): Observable<T> {
    return this.http
      .post<T>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: any, options: object = {}): Observable<T> {
    return this.http
      .put<T>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  delete<T>(url: string, options: object = {}): Observable<T> {
    return this.http.delete<T>(url, options).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
