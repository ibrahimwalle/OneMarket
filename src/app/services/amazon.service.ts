import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmazonService {
  private url: string = 'https://amazon24.p.rapidapi.com/api/product';

  constructor(private http: HttpClient) { }

  getProducts(query : string, page = 1): Observable<any>{ 
    return this.http.get<any>(this.url,{
      headers: environment.amazonConfig,
      params: {
        'categoryID': '', 
        'keyword': query, 
        'country': 'US', 
        'page': page,}
      }
    )
  }
}
