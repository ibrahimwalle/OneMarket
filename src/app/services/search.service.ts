import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Listing } from '../interfaces/listing';
import { AliexpressService } from './aliexpress.service';
import { AmazonService } from './amazon.service';
import { EbayService } from './ebay.service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  page:number = 1;
  query:string = '';
  listings : Listing[] =[];

  constructor(
    private http: HttpClient,
    private amazonApi: AmazonService,
    private aliApi: AliexpressService,
    private ebayApi: EbayService) {}


  async getListings() : Promise<Listing[]>{
    let ebayListings :any[], amazonListings :any[], aliListings :any[];
     await lastValueFrom(this.ebayApi.getListings(this.query, this.page)).then(
      (results) => {
        ebayListings = results.findItemsByKeywordsResponse[0].searchResult[0].item;
        ebayListings.forEach( element => {
          let item : Listing = {id: '', title: '', url:'', imgUrl:'', price: {value: '', currency: ''}, category: [], marketPlace: 'ebay'};
          item.id = element.itemId,
          item.title = element.title[0],
          item.url = element.viewItemURL[0],
          item.imgUrl = element.galleryURL[0],
          item.price = element.sellingStatus[0].currentPrice,
          item.category = element.primaryCategory.categoryName;
          // console.log(item);
          this.listings.push(item)})},
      (error) => console.log(error),  
    );
    await lastValueFrom(this.amazonApi.getProducts(this.query, this.page)).then(
      (results) => {
        amazonListings = results.docs;
        amazonListings.forEach( element => {
          let item : Listing = {id: '', title: '', url:'', imgUrl:'', price: {value: '', currency: ''}, category: [], marketPlace: 'amazon'};
          item.id = element.product_id,
          item.title = element.product_title,
          item.url = element.product_detail_url,
          item.imgUrl = element.product_main_image_url,
          item.price.value = element.app_sale_price,
          item.price.currency = element.app_sale_price_currency,
          // item.category = ;
          // console.log(item);
          this.listings.push(item)})},
      (error) => console.log(error),  
    )
    await lastValueFrom(this.aliApi.getProducts(this.query, this.page)).then(
      (results) => {
        aliListings = results.docs;
        aliListings.forEach( element => {
          let item : Listing = {id: '', title: '', url:'', imgUrl:'', price: {value: '', currency: ''}, category: [], marketPlace: 'aliexpress'};
          item.id = element.product_id,
          item.title = element.product_title,
          item.url = element.product_detail_url,
          item.imgUrl = element.product_main_image_url,
          item.price.value = element.app_sale_price,
          item.price.currency = element.app_sale_price_currency,
          // item.category = ;
          // console.log(item);
          this.listings.push(item);})},
      (error) => console.log(error),
    )
    return this.listings;
  }

  setPage(plusOrMinus:string): number{
    if(plusOrMinus == '+'){
      this.page ++;
    }else if(plusOrMinus == '-' && this.page > 1){
      this.page --;
    }
    return this.page;
  }
  setQuery(searchQuery:string): string{
    return this.query = searchQuery;
  }

}

  // constructUrl() : string {
  //     let url = this.url;
  //     url += "?OPERATION-NAME=findItemsByKeywords";
  //     url += "&SERVICE-VERSION=1.0.0";
  //     url += `&SECURITY-APPNAME=${appid}`;
  //     url += "&GLOBAL-ID=EBAY-US";
  //     url += "&RESPONSE-DATA-FORMAT=JSON";
  //     url += "&REST-PAYLOAD";
  //     url += "&paginationInput.entriesPerPage=3";    
  //   return url;
  // }

  // getSearchRes(): Observable<response>{
  //   console.log(this.constructUrl()); 
  //   return this.http.get<response>(this.constructUrl(),{
  //     params: {
  //       'keywords' : this.query, 
  //       'paginationInput.pageNumber' : this.page}
  //     }
  //   )
  // }

      // this.ebayApi.getListings(this.query, this.page).subscribe({
    //   next(results) { 
    //     ebayListings = results.findItemsByKeywordsResponse[0].searchResult[0].item;
    //     ebayListings.forEach( element => {
    //       let item : Listing = {id: '', title: '', url:'', imgUrl:'', price: {value: '', currency: ''}, category: [], marketPlace: 'ebay'};
    //       item.id = element.itemId,
    //       item.title = element.title[0],
    //       item.url = element.viewItemURL[0],
    //       item.imgUrl = element.galleryURL[0],
    //       item.price = element.sellingStatus[0].currentPrice,
    //       item.category = element.primaryCategory.categoryName;
    //       console.log(item);
    //       listings.push(item);
    //     })},
    //   error(err) { console.error('something wrong occurred: ' + err.errorMessage); },
    //   complete() { console.log('done'); }
    // });