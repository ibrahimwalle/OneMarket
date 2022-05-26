import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Listing } from '../interfaces/listing';
import { from, lastValueFrom } from 'rxjs';
import { FstoreService } from '../services/fstore.service';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  checkoutForm = this.formBuilder.group({search: ''});
  results: Listing[] | undefined;  
  isLoggedIn: boolean;

  constructor(
    private fstoreService: FstoreService,
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    public authService: AuthService) { 
      this.isLoggedIn = this.authService.isLoggedIn;
    }

  ngOnInit(): void {}

  
  saveItem(item: any){
    this.fstoreService.saveItem(item,this.authService.userData.uid);
  }

  search():void{
    lastValueFrom(from(this.searchService.getListings())).then(
      (listing) => {
        console.log(listing);
        this.results = listing},
      error => console.log(error),
    );
  }

  onSubmit(): void{
    console.log(this.checkoutForm.value['search']);
    let searchquery: string = this.checkoutForm.value['search'];
    if(searchquery === null || searchquery == ""){
      alert('Please Enter a Search Query!');
    }else{
      this.searchService.setQuery(searchquery);
      this.search();
    }
  }
  onChangePage(plusOrMinus:string):void{
    (plusOrMinus == '+') ? this.searchService.setPage(plusOrMinus) : this.searchService.setPage(plusOrMinus);
    this.onSubmit();
  }
}


