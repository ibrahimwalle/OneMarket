import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EbayService {

  private url :string = "https://svcs.ebay.com/services/search/FindingService/v1";
  private accessTokens: any;
  private authToken: string | undefined;
  public setAccessTokens(token: object){
    this.accessTokens = token;
  }
  get getAccessTokens(): string{
    return this.accessTokens.access_token;
  }
  public setAuthToken(token: string){
    this.authToken = token;
  }
  get getAuthToken(): any{
    return this.authToken;
  }

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
    return requestUrl;

  }

  applicationaccesstoken(authCode:string){
    let url = 'https://api.ebay.com/identity/v1/oauth2/token';
    console.log(authCode);
    let response;

    const myHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization': `Basic ${environment.ebayConfig.clientID}:${environment.ebayConfig.clientSecret}`,
      'Authorization': `Basic ${btoa(environment.ebayConfig.clientID)}:${btoa(environment.ebayConfig.clientSecret)}`,
      // "Access-Control-Allow-Origin": "http://localhost:4200/",
      // "preflightContinue": 'true',
      // "Access-Control-Allow-Credentials": "true",
      // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token",
      // "Access-Control-Max-Age": '86400'
    })

    this.http.post(url, {
      grant_type: 'authorization_code',
      redirect_uri: environment.ebayConfig.redirectUri,
      code: authCode,
      }, {
      headers:myHeaders
    }).subscribe({
      next: (res) => {
        console.log(res),
        response = res;
        this.setAccessTokens(res);
      },
      error: (err) => alert(err.message),
      complete: () => console.log("done fetching application accesstoken!")
    })
    return response;
  }
  
  createInventoryLocation(merchantLocationKey: string, reqPayload: object){
    let url = `https://api.ebay.com/sell/inventory/v1/location/${merchantLocationKey}`;
    const myHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthToken,
    })

    this.http.post(url, reqPayload, {
      headers: myHeaders
    }).subscribe({
      next: () => alert('Inventory Created!'),
      error: (err) => alert(err.code + err.message + "Please make sure your Ebay login is not expired!"),
      complete: () => console.log('createInventoryLocation DONE')
    })
  }

  getInventoryLocations(){
    let url = 'https://api.ebay.com/sell/inventory/v1/location?';
    const myHeaders = new HttpHeaders({
      'Authorization': this.getAuthToken,
    })

    return this.http.get<any>(url,{
      headers: myHeaders
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

  //   getInventoryLocations (and other similar api funtions)
  // createOrReplaceInventoryItem getInventoryItem getInventoryItems deleteInventoryItem	(maybe this)
}
