import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';
import { FstoreService } from './fstore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = new BehaviorSubject(false)
  currentlyLogged = this.logged.asObservable();
  userData: any;
  verified: boolean = false;

  constructor(
    private fstoreService: FstoreService,
    public auth: AngularFireAuth,
    private storage: AngularFireStorage, 
    private router: Router) {
      this.auth.authState.subscribe((user) => {
        if(user){
          this.userData = user;
          this.fstoreService.setUserData(user);
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        }else{
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      })
    }

  login(email:string, password:string){
    this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(userCredential.user);
        this.isLoggedIn;
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  signup(email:string, password:string){
    this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(userCredential.user);
        this.isLoggedIn;
        this.verificationEmail;
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  signout(){
    return this.auth.signOut()
      .then(() => {
        // Sign-out succesful 
        console.log('Signed out');
        localStorage.removeItem('user');
        localStorage.removeItem('ebayAuth');
        this.isLoggedIn;
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  resetPassword(email:string){
    this.auth.sendPasswordResetEmail(email)
      .then(() => {
        alert('Password reset email sent!');
      })
      .catch((error) => {
        alert(error.message)
      });
  }

  // Returns true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    console.log(user);
    if(user !== null){
      this.logged.next(true);
      return true;
    }else{
      this.logged.next(false);
      return false;
    }
    //return user !== null && user.emailVerified !== false ? true : false;
  }

  verifyUser(email: string, password: string){
    var credential = firebase.auth.EmailAuthProvider.credential(email,password);
    this.auth.currentUser.then(user => {
      user? user.reauthenticateWithCredential(credential).then(
        (userCredential) => {
          const user = userCredential.user;
          this.verified = true;
          setTimeout(() => {
            this.verified = false;
          }, 100000 );//300000
        }
      ).catch(error => alert(error.message)) : console.log('user not found');
    });
  }

  async verificationEmail(){
    let user = await this.auth.currentUser;
    if(user != null){
      user.sendEmailVerification().then(
        () => alert("Email sent.. please confirm!"),
        (error) => alert(error.message))
    }
  }
  
  async updateProfileDetails(email?: any ,password?: any, phoneNumber?: any, displayName?: any, photoURL?: any){
    let user = await this.auth.currentUser;
    if(user != null){
      user.updateEmail(email).then(()=>console.log('Email updated!')).catch(err=>alert(err.message)),
      user.updatePassword(password).then(()=>console.log('Password updated!')).catch(err=>alert(err.message)),
      user.updatePhoneNumber(phoneNumber).then(()=>console.log('Phone number updated!')).catch(err=>alert(err.message)),
      user.updateProfile({displayName,photoURL}).then(()=>console.log('Profile updated!')).catch(err=>alert(err.message))
    }
  }

  uploadProfilePic(event: any){
    const file = event.target.files[0]; 
    const filePath = `userProfilePics/${this.userData.uid}`;
    const task = this.storage.upload(filePath, file);
    let urlRef = this.storage.ref(`userProfilePics`).child(`${this.userData.uid}`).getDownloadURL();
    urlRef.subscribe({
      next:(url) => {
        this.auth.currentUser.then(user => user?.updateProfile({photoURL:url})
        .then(()=>console.log('Profile Picture updated!'))
        .catch((err) => alert(err.message)))},
      error: (err) => alert(err.message),
      complete: ()=> console.log('Upload Complete!')
    })
    return task.percentageChanges()
  }

}
