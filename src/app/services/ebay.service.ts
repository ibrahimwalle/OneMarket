import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { xml2json } from 'xml-js';

@Injectable({
  providedIn: 'root'
})
export class EbayService {

  private url :string = "https://svcs.ebay.com/services/search/FindingService/v1";
  private accessTokens: any;
  categories:any;
  // private authToken$ = new BehaviorSubject<string>('');
  // currentAuthToken$ = this.authToken$.asObservable();

  
  // public setAuthToken(token: string){
  //   this.authToken$.next(token);
  // }
  get getAuthToken(): any{
    // return localStorage.getItem('ebayAuth')
    return `v^1.1#i^1#r^0#f^0#p^3#I^3#t^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`
  }

  public setAccessTokens(token: object){
    this.accessTokens = token;
  }
  get getAccessTokens(): string{
    return this.accessTokens.access_token;
  }


  constructor(private http: HttpClient) { }

  //Product fetchers
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

  //Api Access and Authentication
  grantApplicationAccess(){
    let url = 'https://auth.ebay.com/oauth2/authorize';
    // let url = 'https://auth.sandbox.ebay.com/oauth2/authorize';

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
      'Authorization': `Basic ${btoa(environment.ebayConfig.clientID)}:${btoa(environment.ebayConfig.clientSecret)}`,
      'Access-Control-Allow-Origin': 'https://onemarket-2022.web.app'
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
  
  //seller Api actions
  getCategories(){
    let url = 'https://api.ebay.com/ws/api.dll'
    const myHeaders = new HttpHeaders({
      'X-EBAY-API-SITEID':'0',
      'X-EBAY-API-COMPATIBILITY-LEVEL':'967',
      'X-EBAY-API-CALL-NAME':'GetCategories',
      'X-EBAY-API-IAF-TOKEN': this.getAuthToken
    })
    let body = `<?xml version="1.0" encoding="utf-8"?>
    <GetCategoriesRequest xmlns="urn:ebay:apis:eBLBaseComponents">    
      <ErrorLanguage>en_US</ErrorLanguage>
      <WarningLevel>High</WarningLevel>
      <CategorySiteID>0</CategorySiteID>
      <DetailLevel>ReturnAll</DetailLevel>
      <LevelLimit>1</LevelLimit>
    </GetCategoriesRequest>`;

    this.http.post<XMLDocument>(url,body,{
      headers: myHeaders
    }).subscribe({
      next: (res) => {
        this.categories = xml2json(new XMLSerializer().serializeToString(res.documentElement), {compact: true, spaces: 4}),
        console.log(this.categories)},
      error: (err) => alert(err.code + err.message + "Please make sure your Ebay login is not expired!"),
      complete: () => console.log('createInventoryLocation DONE')
    })
    return this.categories
  }

  optinProgram(){
    let url = 'https://api.ebay.com/sell/account/v1/program/opt_in'
    const myHeaders = new HttpHeaders({
      'Authorization': this.getAuthToken,
      'Accept':'application/json',
      'Content-Type':'application/json'
    })

    this.http.post(url,{"programType": "SELLING_POLICY_MANAGEMENT"},{
      headers: myHeaders
    }).subscribe(()=>alert('Application Submitted!'))
  }

  createInventoryLocation(merchantLocationKey: string, reqPayload: object){
    let url = `https://api.ebay.com/sell/inventory/v1/location/${merchantLocationKey}`;
    const myHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthToken,
      'Access-Control-Allow-Origin': 'https://onemarket-2022.web.app'
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
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': 'https://onemarket-2022.web.app'
    })

    return this.http.get<any>(url,{
      headers: myHeaders
    })
  }

  tradingAddItem(itemDetails: any){
    let url = 'https://api.ebay.com/ws/api.dll';
    // let url = 'https://api.sandbox.ebay.com/ws/api.dll';
    let item = {
      Country: itemDetails.Country,
      Description: itemDetails.Description,
      PrimaryCategory: itemDetails.PrimaryCategory,
      StartPrice: itemDetails.StartPrice,
      Title: itemDetails.title,
      pictureUrl: itemDetails.pictureUrl,
      postCode: itemDetails.postalCode
    }
    const myHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.getAuthToken,
      'X-EBAY-API-SITEID': '0',
      'X-EBAY-API-COMPATIBILITY-LEVEL': '967',
      'X-EBAY-API-CALL-NAME': 'VerifyAddItem',
      'X-EBAY-API-IAF-TOKEN': this.getAuthToken,
      'Access-Control-Allow-Origin': 'https://onemarket-2022.web.app',
      "Access-Control-Allow-Headers": "X-EBAY-API-SITEID, X-EBAY-API-COMPATIBILITY-LEVEL, X-EBAY-API-CALL-NAME, X-EBAY-API-IAF-TOKEN, Access-Control-Allow-Origin"
    })

    let body = `
      <?xml version="1.0" encoding="utf-8"?>
      <VerifyAddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">    
        <ErrorLanguage>en_US</ErrorLanguage>
        <WarningLevel>High</WarningLevel>
        <Item>
          <Title>${item.Title}</Title>
          <Description>${item.Description}</Description>
          <PrimaryCategory>
            <CategoryID>${item.PrimaryCategory}</CategoryID>
          </PrimaryCategory>
          <StartPrice currencyID="USD">${item.StartPrice}</StartPrice>
          <Country>US</Country>
          <Currency>USD</Currency>
          <ConditionDescription>used</ConditionDescription>
          <ConditionID>1000</ConditionID>
          <DispatchTimeMax>3</DispatchTimeMax>
          <ListingDuration>Days_7</ListingDuration>
          <ListingType>FixedPriceItem</ListingType>
          <PictureDetails>
            <GalleryType>Gallery</GalleryType>
            <PictureURL>https://image.shutterstock.com/image-vector/summer-mega-sale-75-off-260nw-1914996232.jpg</PictureURL>
            <PictureURL>${item.pictureUrl}</PictureURL>
          </PictureDetails>
          <PostalCode>95125</PostalCode>
          <Quantity>1</Quantity>
          <ReturnPolicy>
            <ReturnsAcceptedOption>ReturnsAccepted</ReturnsAcceptedOption>
            <RefundOption>MoneyBack</RefundOption>
            <ReturnsWithinOption>Days_30</ReturnsWithinOption>
            <Description>If you are not satisfied, return the book for refund.</Description>
            <ShippingCostPaidByOption>Buyer</ShippingCostPaidByOption>
          </ReturnPolicy>
          <ShippingDetails>
            <ShippingType>Flat</ShippingType>
            <ShippingServiceOptions>
              <ShippingServicePriority>1</ShippingServicePriority>
              <ShippingService>USPSMedia</ShippingService>
              <ShippingServiceCost>2.50</ShippingServiceCost>
            </ShippingServiceOptions>
          </ShippingDetails>
          <Site>US</Site>
      </Item>
      </VerifyAddItemRequest>
    `
    this.http.post(url,body,{
      headers : myHeaders
    }).subscribe({
      next: (res) => {
        alert('Item Verified!'),
        this.http.post(url,`
        <?xml version="1.0" encoding="utf-8"?>
        <AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">        
          <ErrorLanguage>en_US</ErrorLanguage>
          <WarningLevel>High</WarningLevel>
          <Item>
            <Title>${item.Title}</Title>
            <Description>${item.Description}</Description>
            <PrimaryCategory>
              <CategoryID>${item.PrimaryCategory}</CategoryID>
            </PrimaryCategory>
            <StartPrice currencyID="USD">${item.StartPrice}</StartPrice>
            <Country>US</Country>
            <Currency>USD</Currency>
            <ConditionDescription>used</ConditionDescription>
            <ConditionID>1000</ConditionID>
            <DispatchTimeMax>3</DispatchTimeMax>
            <ListingDuration>Days_7</ListingDuration>
            <ListingType>FixedPriceItem</ListingType>
            <PictureDetails>
              <GalleryType>Gallery</GalleryType>
              <PictureURL>https://image.shutterstock.com/image-vector/summer-mega-sale-75-off-260nw-1914996232.jpg</PictureURL>
              <PictureURL>${item.pictureUrl}</PictureURL>
            </PictureDetails>
            <PostalCode>95125</PostalCode>
            <Quantity>1</Quantity>
            <ReturnPolicy>
              <ReturnsAcceptedOption>ReturnsAccepted</ReturnsAcceptedOption>
              <RefundOption>MoneyBack</RefundOption>
              <ReturnsWithinOption>Days_30</ReturnsWithinOption>
              <Description>If you are not satisfied, return the book for refund.</Description>
              <ShippingCostPaidByOption>Buyer</ShippingCostPaidByOption>
            </ReturnPolicy>
            <ShippingDetails>
              <ShippingType>Flat</ShippingType>
              <ShippingServiceOptions>
                <ShippingServicePriority>1</ShippingServicePriority>
                <ShippingService>USPSMedia</ShippingService>
                <ShippingServiceCost>2.50</ShippingServiceCost>
              </ShippingServiceOptions>
            </ShippingDetails>
            <Site>US</Site>
        </Item>
        </AddItemRequest>
      `,{
        headers:myHeaders
      }).subscribe(()=>alert('Item Posted!')) 
        console.log(res)},
      error: (err) => alert(err.code + err.message),
      complete: () => console.log('Item added DONE')
    })
  }

  //   getInventoryLocations (and other similar api funtions)
  // createOrReplaceInventoryItem getInventoryItem getInventoryItems deleteInventoryItem	(maybe this)
}
