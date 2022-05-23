import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = new BehaviorSubject(false)
  currentlyLogged = this.logged.asObservable();
  userData: any;
  verified: boolean = false;

  constructor(
    public auth: AngularFireAuth, 
    private router: Router) {
      this.auth.authState.subscribe((user) => {
        if(user){
          this.userData = user;
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
        this.isLoggedIn;
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
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
      user.updateEmail(email).catch(err=>alert(err.message)),
      user.updatePassword(password).catch(err=>alert(err.message)),
      user.updatePhoneNumber(phoneNumber).catch(err=>alert(err.message)),
      user.updateProfile({displayName,photoURL}).catch(err=>alert(err.message))
    }
  }
}
  // setUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //   };
  //   return userRef.set(userData, {
  //     merge: true,
  //   });
  // }
