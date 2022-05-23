import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AliexpressService {
  private url: string = 'https://magic-aliexpress1.p.rapidapi.com/api/products/search'

  constructor(private http: HttpClient) { }

  getProducts(query: string, page = 1): Observable<any>{ 
    return this.http.get<any>(this.url,{
      headers: environment.aliConfig,
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
