import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {
  
  isloggedin: boolean = false;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentlyLogged.subscribe(bool => this.isloggedin = bool);
  }

}
