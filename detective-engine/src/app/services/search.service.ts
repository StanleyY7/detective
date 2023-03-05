import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  apiKey = environment.rapidAPIKey;
  constructor(private http: HttpClient) {}

  searchResults = new Subject();

  getResults(searchTerm: string): Observable<any> {
    return this.http.get(
      `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=15&autoCorrect=true`,
      {
        headers: {
          'x-rapidapi-key': this.apiKey,
        },
      }
    );
  }

  passResults(results: any): void {
    this.searchResults.next(results);
  }

  getPassedResults(): Observable<any> {
    return this.searchResults.asObservable();
  }
}
