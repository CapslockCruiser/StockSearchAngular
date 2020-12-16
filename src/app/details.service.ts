import { Injectable } from '@angular/core';
import { Details } from './models/details';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http: HttpClient) { }

  getDetails(ticker: string): Observable<Details> {
    const url = environment.baseURL + '/api/summary';
    const options = new HttpParams().set('ticker', ticker);
    const results = this.http.get<Details>(url, { params: options });

    return results;
  }
}
