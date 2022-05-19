import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  signupForm = this.formBuilder.group({
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
    let email = this.signupForm.value['email'],
        password = this.signupForm.value['password'];
    this.authService.signup(email,password); 
  }

}
