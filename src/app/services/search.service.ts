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
  category: string ='';
  // categories:any;
  listings : Listing[] =[]
  // public item!: Listing;

  constructor(
    private amazonApi: AmazonService,
    private aliApi: AliexpressService,
    private ebayApi: EbayService) {}


  async getListings() : Promise<Listing[]>{
    this.listings = [];
    let ebayListings :any[], amazonListings :any[], aliListings :any[];
     await lastValueFrom(this.ebayApi.getListings(this.query, this.page)).then(
      (results) => {
        ebayListings = results.findItemsByKeywordsResponse[0].searchResult[0].item;
        ebayListings.forEach( element => {
          let item : Listing = {id: '', title: '', url:'', imgUrl:'', price: {value: '', currency: ''}, category: [], marketPlace: 'ebay'};
          item.id = element.itemId[0],
          item.title = element.title[0],
          item.url = element.viewItemURL[0],
          item.imgUrl = element.galleryURL[0],
          item.price.value = element.sellingStatus[0].currentPrice[0].__value__,
          item.category = element.primaryCategory[0].categoryName;
          // console.log(item);
          this.listings.push(item)})},
      (error) => console.log(error),  
    );
    await lastValueFrom(this.amazonApi.getProducts(this.query, this.page, this.category)).then(
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
  setCategory(category:string): string{
    return this.category = category;
  }

  getCatergories(){
    return this.amazonApi.getCategories()
  }
}
