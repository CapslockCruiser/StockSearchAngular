import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getHistory(ticker: string): Observable<any[]> {
    const url = environment.baseURL + '/api/history';
    const options = new HttpParams().set('ticker', ticker);
    const results = this.http.get<any[]>(url, { params: options });

    return results;
  }
}
