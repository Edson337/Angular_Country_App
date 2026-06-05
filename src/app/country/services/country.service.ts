import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    if (this.queryCacheCapital.has(query)) of(this.queryCacheCapital.get(query) ?? []);
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError((error) => {
        console.log('Error in searchByCapital:', error);
        return throwError(
          () => new Error(`No se encontro un pais con esa capital: ${query}`),
        );
      }),
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    if (this.queryCacheCountry.has(query)) of(this.queryCacheCountry.get(query) ?? []);
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      delay(2000),
      catchError((error) => {
        console.log('Error in searchByCountry:', error);
        return throwError(
          () => new Error(`No se encontro un pais con ese nombre: ${query}`),
        );
      }),
    );
  }

  searchCountryByAlphaCode(code: string) {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map(countries => countries.at(0)),
      catchError((error) => {
        console.log('Error in searchCountryByAlphaCode:', error);
        return throwError(
          () => new Error(`No se encontro un pais con ese codigo: ${code}`),
        );
      }),
    );
  }
}
