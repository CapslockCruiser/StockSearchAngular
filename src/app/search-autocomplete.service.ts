import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Autocomplete } from './models/autocomplete';

@Injectable({
  providedIn: 'root'
})
export class SearchAutocompleteService {

  constructor(private http: HttpClient) { }

  getAutocomplete(query: string): Observable<Autocomplete[]> {
    const url = environment.baseURL + '/api/autocomplete';
    const options = new HttpParams().set('string', query);
    if (query !== '') {
      const results = this.http.get<Autocomplete[]>(url, { params: options });
      return results;
    } else {
      return;
    }
  }

}
