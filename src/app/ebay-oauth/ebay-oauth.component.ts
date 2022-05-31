import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EbayService } from '../services/ebay.service';

@Component({
  selector: 'app-ebay-oauth',
  templateUrl: './ebay-oauth.component.html',
  styleUrls: ['./ebay-oauth.component.sass']
})
export class EbayOauthComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private ebayApi: EbayService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let code = params.get('code');
      if(code != null){
        console.log(code)
        this.ebayApi.applicationaccesstoken(code).subscribe(res => console.log(res))
      }else{
        alert('Login Failed!')  
      }
    })
  }

}
