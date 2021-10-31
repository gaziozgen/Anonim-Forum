import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { reject } from 'q';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth
  ) {
  }

  register(email: string, password: string, username: string) {
    const promise = firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
        uid: firebase.auth().currentUser.uid,
        username: username,
        email: email,
        date: Date.now()
      });
    });
    promise.catch(error => console.log(error.message));
  }

  login(email: string, password: string): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve) => {
      const promise = firebase.auth().signInWithEmailAndPassword(email, password);
      promise.then( () => {
        resolve('asdasd');
      }).catch(e => console.log(e.message));
    });
  }

  logout(): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve) => {
      firebase.auth().signOut();
      resolve('nothing');
    });
  }

  checkAuth(): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      const user = firebase.auth().currentUser;
      if (user) {
        console.log('user var');
        firebase.database().ref('/users/' + user.uid).once('value', snapshot => {
          resolve(snapshot.val());
        });
      } else {
        console.log('user yok');
        resolve(false);
      }
    });
  }


  // ANOTHERcheckAuth(): any {
  // let uid;
  //   this.auth.authState.subscribe(user => {
  //     if (user !== null) {
  //       console.log('kullanıcı varmış');
  //       firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/uid').once('value', snapshot => {
  //         uid = snapshot.val();
  //         console.log(snapshot.val());
  //         console.log(uid);
  //         return uid;
  //       });
  //     } else {
  //       console.log('kullanıcı yokmuş');
  //     }
  //   });
  // }

  // isLoggedIn(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     firebase.auth().onAuthStateChanged(firebaseUser => {
  //       if (firebaseUser) {
  //         console.log(firebaseUser.uid);
  //         const uid = firebase.auth().currentUser.uid;
  //         console.log('uid is real', uid);
  //         resolve(uid);
  //       } else {
  //         // console.log('not logged in');
  //         reject('çalışmadı');
  //       }
  //     });
  //   });
  // }

}
