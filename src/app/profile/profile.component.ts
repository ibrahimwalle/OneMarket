import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  displayName: string ="";
  savedItems: any[] = [
    {product_id: 'B07ZPKN6YR',
    title: 'Apple iPhone 11, 64GB, Black - Unlocked (Renewed)', 
    galleryURL: 'https://m.media-amazon.com/images/I/51DSrXcUphL._AC_UY218_.jpg', 
    price: '345.00',
    itemUrl: 'https://www.amazon.com/dp/B07ZPKN6YR'},
    // {title: 'Kirby Star Allies - Nintendo Switch', 
    // galleryURL: 'https://i.ebayimg.com/thumbs/images/g/mbIAAOSw~p1bk0rI/s-l140.jpg', 
    // price: '47.99',
    // itemUrl: 'https://www.ebay.com/itm/Kirby-Star-Allies-Nintendo-Switch-/194593639006'},
    {title: 'Nikon Ai-s Nikkor 24mm F/2.8 MF Wide Angle Lens Ais ', 
    galleryURL: 'https://i.ebayimg.com/thumbs/images/g/ICEAAOSwRBtigKCJ/s-l140.jpg', 
    price: '149.0',
    itemUrl: 'https://www.ebay.com/itm/Nikon-Ai-s-Nikkor-24mm-F-2-8-MF-Wide-Angle-Lens-Ais-/224987109446'},
    {title: `Seiko 5 Sports Green Men's Automatic Watch  Green Dial  SRPD63`, 
    galleryURL: 'https://i.ebayimg.com/thumbs/images/g/6aIAAOSw7Ptg70pp/s-l140.jpg', 
    price: '169.99',
    itemUrl: 'https://www.ebay.com/itm/Seiko-5-Sports-Green-Mens-Automatic-Watch-Green-Dial-SRPD63-/234551285561'}];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    // this.displayName = this.authService.userData.displayName;
  }

}
