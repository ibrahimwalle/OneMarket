import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FstoreService {

  private dbPath = '/users'
  ref: AngularFirestoreCollection<any>;
  constructor(
    private db: AngularFirestore) {
    this.ref = db.collection(this.dbPath);  
  }

  getSavedItems(uid: string): Observable<any> {
    return this.ref.doc(uid).collection('savedItems').get();
  }

  saveItem(item: any,uid: string) {
    return this.ref.doc(uid).collection('savedItems').doc(item.id).set({
      id: item.id,
      title: item.title,
      url: item.url,
      imgUrl: item.imgUrl,
      price: item.price,
      category: item.category,
      marketPlace: item.marketPlace
    }).then(() => alert('Item Saved!'))
      .catch((error) => {
        console.log("Error Saving item:", error);
      })
  }
  // update(user: any): Promise<void> {
  //   return this.ref.doc(user.uid).update(user);
  // }
  deleteSavedItem(itemid: string, uid: string): Promise<void> {
    return this.ref.doc(uid).collection('savedItems').doc(itemid).delete().catch(error => alert(error.message));
  }  

  setUserData(user: any) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return this.ref.doc(userData.uid).set(userData, {merge: true}).catch((error) => {
      console.log("Error Saving UserData:", error);
    });
  }
  
  setEbayAuthCode(authCode: string) {
    let user = localStorage.getItem('user')
    if(user){
      let id = JSON.parse(user).uid
      const userData = {
        uid: id,
        ebayAuth: authCode
      };
      this.ref.doc(userData.uid).set(userData, {merge: true})
        .then(() => console.log("Ebay AuthCode Set!"))
        .catch((error) => {
          alert("Error Setting Ebay AuthCode:" + error.message);
        });
    }
  }
}
