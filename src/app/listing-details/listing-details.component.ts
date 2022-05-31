import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Listing } from '../interfaces/listing';
import { EbayService } from '../services/ebay.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.sass']
})
export class ListingDetailsComponent implements OnInit {

  id!: any;
  listing!: Listing;
  constructor(
    // private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private ebayApi: EbayService) { 
    }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.id = params.get('id');
      // this.ebayApi.getProduct(this.id).subscribe(listing => {
      //   this.listing = listing;
      //   console.log(this.listing);
      // });
    })
  }

}
