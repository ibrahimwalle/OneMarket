import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

// let appid:string = environment.ebayKey;

@Injectable({
  providedIn: 'root'
})
export class EbayService {
  private url :string = "http://svcs.ebay.com/services/search/FindingService/v1";

  constructor(private http: HttpClient) { }

  constructUrl(): string{
    let url = this.url;
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += `&SECURITY-APPNAME=${environment.ebayKey}`;
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&REST-PAYLOAD";
    url += "&paginationInput.entriesPerPage=3";   
    return url
  }

  getListings(query : string, page = 1): Observable<any>{
    return this.http.get<any>(this.constructUrl(),{
      params: {
        'keywords' : query, 
        'paginationInput.pageNumber' : page,
        'GLOBAL-ID': 'EBAY-US',
        'RESPONSE-DATA-FORMAT' : 'JSON',
        'paginationInput.entriesPerPage' : '3'    
        }
      }
    )
  }
}
