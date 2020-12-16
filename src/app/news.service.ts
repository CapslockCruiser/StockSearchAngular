import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { News } from './models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(ticker: string): Observable<News[]> {
    const url = environment.baseURL + '/api/news';
    const options = new HttpParams().set('ticker', ticker);
    const results = this.http.get<News[]>(url, { params: options });

    return results;
  }
}
