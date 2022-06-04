import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EbayService } from '../services/ebay.service';

@Component({
  selector: 'app-ebay-oauth',
  templateUrl: './ebay-oauth.component.html',
  styleUrls: ['./ebay-oauth.component.sass']
})
export class EbayOauthComponent implements OnInit {

  private authCode!: string;
  loginSuccess!: boolean;

  setAuthCode(code: string){
    this.authCode = code;
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private ebayApi: EbayService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (params) => {
      let authparams = params;
      if(authparams['code'] != null){
        console.log('Authorization Params Recieved:',authparams);
        this.setAuthCode(authparams['code']);
        this.ebayApi.setAuthToken(this.authCode);
        this.loginSuccess = true;
        this.exchangeAuthCode()
      }},
      error: (err) => {
        alert(err.message)
        this.loginSuccess = false},
      complete: () => console.log('Recieved Authorization Code!')
    })
  }

  exchangeAuthCode(){
    this.ebayApi.applicationaccesstoken(this.authCode)
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
