import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IntradayService {

  constructor(private http: HttpClient) { }

  getIntraday(ticker: string): Observable<any[]> {
    const url = environment.baseURL + '/api/today';
    const options = new HttpParams().set('ticker', ticker);
    const results = this.http.get<any[]>(url, { params: options });

    return results;
  }
}
