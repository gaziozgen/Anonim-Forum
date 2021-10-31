import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private authService: AuthService
  ) { }

  getPost(key): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, rejact) => {
      firebase.database().ref('posts/' + key).once('value', snapshot => {
        resolve(snapshot.val());
      });
    });
  }

  getPosts(): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, resize) => {
      const users = [];
      firebase.database().ref('posts').once('value', snapshot => {
        snapshot.forEach(child => { users.push({ ...child.val()});
        });
        console.log(users);
      }).then(() => {
        users.sort(function(o1, o2) {
          if (o1.date > o2.date) {
            return -1;
          } else if (o1.date < o2.date) {
            return  1;
          } else {
            return  0;
          }
        });
        resolve(users);
      });
    });
  }

  reportPost(key): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, rejact) => {
      const user = firebase.auth().currentUser;

      if (user) {
        let reportedList = [];
        firebase.database().ref('posts/' + key + '/reportedUsers').once('value', snapshot => {
          reportedList = snapshot.val();
        }).then(() => {

        if ((reportedList == null) || !(reportedList.includes(user.uid))) {
          if (reportedList == null) {
            reportedList = [];
          }
          reportedList.push(user.uid);
          firebase.database().ref('posts/' + key ).update({
            reportedUsers: reportedList
          });
          let report;
          firebase.database().ref('posts/' + key + '/report').once('value', snapshot => {
            report = snapshot.val();
          }).then(() => {
            firebase.database().ref('posts/' + key).update({
              report: report + 1
            }
            ).then(() => {
              resolve(report + 1);
            });
          });
        } else {
          rejact('kullanıcı zaten raporlamış');
        }
        });
      } else {
        rejact('Kullanıcı yok');
      }
    });
  }

  reportComment(key, i): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, rejact) => {
      const user = firebase.auth().currentUser;

      if (user) {
        let reportedList = [];
        firebase.database().ref('posts/' + key + '/comments/' + i + '/reportedUsers').once('value', snapshot => {
          reportedList = snapshot.val();
        }).then(() => {

        if ((reportedList == null) || !(reportedList.includes(user.uid))) {
          if (reportedList == null) {
            reportedList = [];
          }
          reportedList.push(user.uid);
          firebase.database().ref('posts/' + key + '/comments/' + i ).update({
            reportedUsers: reportedList
          });
          let report;
          firebase.database().ref('posts/' + key + '/comments/' + i + '/report').once('value', snapshot => {
            report = snapshot.val();
          }).then(() => {
            firebase.database().ref('posts/' + key + '/comments/' + i).update({
              report: report + 1
            }
            ).then(() => {
              resolve(report + 1);
            });
          });
        } else {
          rejact('kullanıcı zaten raporlamış');
        }
        });
      } else {
        rejact('Kullanıcı yok');
      }
    });
  }

  likePost(key): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, rejact) => {
      const user = firebase.auth().currentUser;

      if (user) {
        let likedList = [];
        firebase.database().ref('posts/' + key + '/likedUsers').once('value', snapshot => {
          likedList = snapshot.val();
        }).then(() => {

        if ((likedList == null) || !(likedList.includes(user.uid))) {
          if (likedList == null) {
            likedList = [];
          }
          likedList.push(user.uid);
          firebase.database().ref('posts/' + key ).update({
            likedUsers: likedList
          });
          let like;
          firebase.database().ref('posts/' + key + '/like').once('value', snapshot => {
            like = snapshot.val();
          }).then(() => {
            firebase.database().ref('posts/' + key).update({
              like: like + 1
            }
            ).then(() => {
              resolve(like + 1);
            });
          });
        } else {
          rejact('kullanıcı zaten beğenmiş');
        }
        });
      } else {
        rejact('Kullanıcı yok');
      }
    });
  }

  likeComment(key, i): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, rejact) => {
      const user = firebase.auth().currentUser;

      if (user) {
        let likedList = [];
        firebase.database().ref('posts/' + key + '/comments/' + i + '/likedUsers').once('value', snapshot => {
          likedList = snapshot.val();
        }).then(() => {

        if ((likedList == null) || !(likedList.includes(user.uid))) {
          if (likedList == null) {
            likedList = [];
          }
          likedList.push(user.uid);
          firebase.database().ref('posts/' + key + '/comments/' + i ).update({
            likedUsers: likedList
          });
          let like;
          firebase.database().ref('posts/' + key + '/comments/' + i + '/like').once('value', snapshot => {
            like = snapshot.val();
          }).then(() => {
            firebase.database().ref('posts/' + key + '/comments/' + i).update({
              like: like + 1
            }
            ).then(() => {
              resolve(like + 1);
            });
          });
        } else {
          rejact('kullanıcı zaten beğenmiş');
        }
        });
      } else {
        rejact('Kullanıcı yok');
      }
    });
  }

  createComment(key, uid, content, anonim): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, rejact) => {
      let name;
      let comments;
      let comment;
      firebase.database().ref('users/' + uid + '/username').once('value', snapshot => {
        if (anonim) {
          name = 'Anonim';
        } else {
          name = snapshot.val();
        }
      }).then(() => {
        firebase.database().ref('posts/' + key + '/comments').once('value', snapshot => {
          comments = snapshot.val();
        }).then(() => {
          if (comments) {
            comments.push({
              like: 0,
              report: 0,
              date: Date.now(),
              content: content,
              uid: uid,
              username: name
            });
          } else {
            comments = [
              {
                like: 0,
                report: 0,
                date: Date.now(),
                content: content,
                uid: uid,
                username: name
              }
            ];
          }
        }).then(() => {
          firebase.database().ref('posts/' + key + '/comments').update(comments);
          firebase.database().ref('posts/' + key + '/comment').once('value', snapshot => {
            comment = snapshot.val();
          }).then(() => {
            firebase.database().ref('posts/' + key ).update({
              comment: comment + 1
            });
            resolve(true);
          });
        });
      });
    });
  }

  createPost(uid, title, content, anonim): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, rejact) => {
      let name;
      firebase.database().ref('users/' + uid + '/username').once('value', snapshot => {
        name = snapshot.val();
      }).then(() => {
        firebase.database().ref('posts').push({
          username: name,
          comment: 0,
          content: content,
          date: Date.now(),
          like: 0,
          report: 0,
          title: title,
          uid: uid,
        }).then((snap) => {
          firebase.database().ref('posts').child(snap.key).update({
            key : snap.key
          });

          if (anonim) {
            firebase.database().ref('posts').child(snap.key).update({
              username: 'Anonim'
            });
          }
        }).then(() => {
          resolve(true);
        });
      });
    });
  }

  getUser(uid): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, rejact) => {
      firebase.database().ref('users/' + uid).once('value', snapshot => {
        resolve(snapshot.val());
      });
    });
  }
}
