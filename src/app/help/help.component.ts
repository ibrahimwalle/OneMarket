import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let name = this.emailForm.value['name'],
      comments = this.emailForm.value['comments'];
    window.open(`mailto:test@example.com?subject=CommentsAndSuggestions${name}&body=${comments}`);
  }
}
