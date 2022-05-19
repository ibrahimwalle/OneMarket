import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AliexpressService {
  private url: string = 'https://magic-aliexpress1.p.rapidapi.com/api/products/search'

  constructor(private http: HttpClient) { }

  getProducts(query: string, page = 1): Observable<any>{ 
    return this.http.get<any>(this.url,{
      headers: {
        'X-RapidAPI-Host': 'magic-aliexpress1.p.rapidapi.com',
        'X-RapidAPI-Key': '10b7c99da9msh2986224a5664299p1c3824jsn55e312146d3d'
      },
      params: {
        name: query,
        minSalePrice: '',
        shipToCountry: 'US',
        sort: '',
        page: page,
        shipFromCountry: '',
        fastDelivery: '',
        getShopInformation: ''}
      }
    )
  }
}
