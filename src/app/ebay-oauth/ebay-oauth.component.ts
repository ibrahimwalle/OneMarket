import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EbayService } from '../services/ebay.service';
import { FstoreService } from '../services/fstore.service';

@Component({
  selector: 'app-ebay-oauth',
  templateUrl: './ebay-oauth.component.html',
  styleUrls: ['./ebay-oauth.component.sass']
})
export class EbayOauthComponent implements OnInit {

  loginSuccess!: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ebayApi: EbayService,
    private fstore: FstoreService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (params) => {
      let authparams = params;
      if(authparams['code'] != null){
        console.log('Authorization Params Recieved:',authparams);
        this.setAuthCode(authparams['code']);
      }},
      error: (err) => {
        alert(err.message)
        this.loginSuccess = false
      },
      complete: () => console.log('Recieved Authorization Code!')
    })
  }

  setAuthCode(code: string){
    localStorage.setItem('ebayAuth', code);
    this.fstore.setEbayAuthCode(code);
    this.exchangeAuthCode(code);
    this.loginSuccess = true;
  }
  
  exchangeAuthCode(code: string){
    this.ebayApi.applicationaccesstoken(code)
    // .subscribe({
    //   next: (res) => {
    //     console.log(res),
    //     this.ebayApi.setAccessToken(res)
    //     this.loginSuccess = true},
    //   error: (err) => {
    //     alert(err.message),
    //     this.loginSuccess = false},
    //   complete:() => console.log('Done')
    // })
  }

}
