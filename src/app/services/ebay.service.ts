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
    return localStorage.getItem('ebayAuth')
    // return 
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
    url += "&paginationInput.entriesPerPage=10";

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

  uploadSiteHostedPictures(event:any){
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    const file = event.target.files[0];
    let url = 'https://api.ebay.com/ws/api.dll';
    const myHeaders= {
      'X-EBAY-API-SITEID':'0',
      'X-EBAY-API-COMPATIBILITY-LEVEL':'967',
      'X-EBAY-API-CALL-NAME':'UploadSiteHostedPictures',
      'X-EBAY-API-IAF-TOKEN':this.getAuthToken,
    }
    let body =`
      <?xml version="1.0" encoding="utf-8"?>
      <UploadSiteHostedPicturesRequest xmlns="urn:ebay:apis:eBLBaseComponents">    
        <ErrorLanguage>en_US</ErrorLanguage>
        <WarningLevel>High</WarningLevel>
        <PictureData>${file}</PictureData>
        <PictureName>Developer Page Banner</PictureName>
      </UploadSiteHostedPicturesRequest>
    `
    let imgUrl;
    if(validImageTypes.includes(file['type'])){
      this.http.post(url,body,{headers:myHeaders}).subscribe({
        next:(res) => imgUrl = res,
        error: (err)=> alert(err.message),
        complete: ()=> console.log('Upload Done')
      })
    }else{
      alert('Invalid File! Supported files(jpg,jpeg,png,gif)')}
      return imgUrl
    }
}
