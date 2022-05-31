import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
// const EbayAuthToken = require('ebay-oauth-nodejs-client');

@Injectable({
  providedIn: 'root'
})
export class EbayService {

  private url :string = "https://svcs.ebay.com/services/search/FindingService/v1";
  // private ebayAuthToken = new EbayAuthToken({
  //   clientId: environment.ebayKey,
  //   clientSecret: '<your_client_secret>',
  //   redirectUri: '<redirect uri>'
  // });

  constructor(private http: HttpClient) { 

  }

  getListings(query : string, page = 1): Observable<any>{
    let url = this.url;
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += `&SECURITY-APPNAME=${environment.ebayConfig.clientID}`;
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&REST-PAYLOAD";
    url += "&paginationInput.entriesPerPage=3";

    return this.http.get<any>(url,{
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

  getProduct(id:string){
    let url = this.url;
    url += "?OPERATION-NAME=findItemsByProduct";
    url += "&SERVICE-VERSION=1.0.0";
    url += `&SECURITY-APPNAME=${environment.ebayConfig.clientID}`;
    // url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&REST-PAYLOAD";
    url += "&productId.@type=ReferenceID"

    return this.http.get<any>(url,{
      params: {
        productId: id
      }
    })
  }

  grantApplicationAccess(){
    let url = 'https://auth.ebay.com/oauth2/authorize';
    let requestUrl = url + `?client_id=${environment.ebayConfig.clientID}&redirect_uri=${environment.ebayConfig.redirectUri}&response_type=code&scope=${environment.ebayConfig.scope}`

    // const request =  this.http.get(url, {
    //   params:{
    //     client_id: environment.ebayConfig.clientID,
    //     redirect_uri: environment.ebayConfig.redirectUri,
    //     response_type: 'code',
    //     scope: environment.ebayConfig.scope
    //   }
    // })
    // console.log(request);
    // window.open(consentLink, '_blank');
    return requestUrl;

  }

  applicationaccesstoken(client_cred:string){
    let url = 'https://api.ebay.com/identity/v1/oauth2/token';

    return this.http.post(url, {
      grant_type: client_cred,
      scope: environment.ebayConfig.scope
      }, {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${environment.ebayConfig.clientID}:${environment.ebayConfig.clientSecret}`
      }
    })
  }
  

  // async appToken(){
  //   const token = await this.ebayAuthToken.getApplicationToken('PRODUCTION');
  //   console.log(token);
  // }

  // async getAuthUrl(){
  //   const authUrl = this.ebayAuthToken.generateUserAuthorizationUrl('PRODUCTION');
  //   console.log(authUrl);
  // }
}
