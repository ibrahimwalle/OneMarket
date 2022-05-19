import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = new BehaviorSubject(false)
  currentlyLogged = this.logged.asObservable();
  userData: any;

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

  // presistance(){
  //   this.auth.setPersistence('local')
  //     .then(() => console.log('Logged in to local session'))
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       alert(errorMessage);
  //     })
  // }