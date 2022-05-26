import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Listing } from '../interfaces/listing';
import { AuthService } from '../services/auth.service';
import { FstoreService } from '../services/fstore.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  verificationForm = this.formBuilder.group({
    email: '',
    password: ''});

  updateForm = this.formBuilder.group({
    displayName: '',
    newEmail: '',
    newPassword: '',
    phoneNumber: '',
    photoURl: ''});

  displayName: string = "";
  // email: string ;
  // emailVerified: boolean;

  savedItems: any[] = [];

  constructor(
    private fstoreService: FstoreService,
    public authService: AuthService,
    private formBuilder: FormBuilder) { 
      // this.displayName = this.authService.userData.displayName,
      // this.email = this.authService.userData.email,
      // this.emailVerified = this.authService.userData.emailVerified
    }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {  
    this.fetchItems();
  }
  test(){
    this.fstoreService.setUserData(this.authService.userData)
  }

  fetchItems(){
    lastValueFrom(this.fstoreService.getSavedItems(this.authService.userData.uid)).then((coll) => {
      if (!coll.empty) {
        coll.forEach((doc: { data: () => any; }) => {
          this.savedItems.push(doc.data())
        });
        // console.log("Collection data:", coll.docs);
      } else {
        console.log("No saved items!");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }

  deleteItem(item:any){
    this.fstoreService.deleteSavedItem(item.id, this.authService.userData.uid).then(() => {
      const index = this.savedItems.indexOf(item);
      if (index > -1) {
        this.savedItems.splice(index, 1);
      }});
  }

  onVerify(){
    let email = this.verificationForm.value['email'],
        password = this.verificationForm.value['password'];
    this.authService.verifyUser(email,password); 
    this.verificationForm.setValue({email: '' , password: ''})
  }

  sendEmail(){
    this.authService.verificationEmail();
  }

  onSubmit(){
    let displayName = this.updateForm.value['displayName'], 
      email = this.updateForm.value['newEmail'],
      password = this.updateForm.value['newPassword'],
      phoneNumber = this.updateForm.value['phoneNumber'],
      photoURL = this.updateForm.value['photoURL'];

    this.authService.updateProfileDetails(email, password, phoneNumber, displayName, photoURL);
  }
}
