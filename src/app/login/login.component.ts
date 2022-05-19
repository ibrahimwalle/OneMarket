import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: '',
    password: ''});

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn){
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(){
    let email = this.loginForm.value['email'],
        password = this.loginForm.value['password'];
    this.authService.login(email,password); 
  }

}
