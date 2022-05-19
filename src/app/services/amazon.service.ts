import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AmazonService {
  private url: string = 'https://amazon24.p.rapidapi.com/api/product';

  constructor(private http: HttpClient) { }

  getProducts(query : string, page = 1): Observable<any>{ 
    return this.http.get<any>(this.url,{
      headers: {
        'X-RapidAPI-Host': 'amazon24.p.rapidapi.com',
        'X-RapidAPI-Key': '10b7c99da9msh2986224a5664299p1c3824jsn55e312146d3d'
      },
      params: {
        'categoryID': '', 
        'keyword': query, 
        'country': 'US', 
        'page': page,}
      }
    )
  }
}
