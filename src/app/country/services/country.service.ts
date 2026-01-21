import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.toLowerCase();
    return this.http.get(`${API_URL}/capital/${query}`);
  }
}