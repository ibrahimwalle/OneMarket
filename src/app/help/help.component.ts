import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.sass']
})
export class HelpComponent implements OnInit {

  emailForm = this.formBuilder.group({
    name:'',
    email:'',
    comments:''
  })
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const url ='https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send'
    let name = this.emailForm.value['name'],
      comments = this.emailForm.value['comments'],
      email = this.emailForm.value['email'];
    const body ={
      "personalizations": [
          {
              "to": [
                  {
                      "email": "ibrahimwalle20@gmail.com"
                  }
              ],
              "subject": `OneMarket: Support ticket from ${name}`
          }
      ],
      "from": {
          "email": `${email}`
      },
      "content": [
          {
              "type": "text/plain",
              "value": `${comments}`
          }
      ]
  }
    
    this.http.post(url,body,{
      headers: environment.emailApirConfig
    }).subscribe((res) => alert('Email Sent!'))
  }
}
