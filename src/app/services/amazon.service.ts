import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmazonService {
  constructor(private http: HttpClient) { }

  getProducts(query : string, page = 1, category= ''): Observable<any>{ 
    let url: string = 'https://amazon24.p.rapidapi.com/api/product';

    return this.http.get<any>(url,{
      headers: environment.amazonConfig,
      params: {
        'categoryID': category, 
        'keyword': query, 
        'country': 'US', 
        'page': page,}
      }
    )
  }

  getCategories(){
    let categories: any;
    let url = 'https://amazon24.p.rapidapi.com/api/category';
    lastValueFrom(this.http.get(url,{headers: environment.amazonConfig}))
      .then((res :any) => categories = res[0])
      .catch((err) => alert(err.message))

    return categories;
  }
}
