import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
var ChatService = /** @class */ (function () {
    function ChatService(authService) {
        this.authService = authService;
    }
    ChatService.prototype.getPost = function (key) {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise(function (resolve, rejact) {
            firebase.database().ref('posts/' + key).once('value', function (snapshot) {
                resolve(snapshot.val());
            });
        });
    };
    ChatService.prototype.getPosts = function () {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise(function (resolve, resize) {
            var users = [];
            firebase.database().ref('posts').once('value', function (snapshot) {
                snapshot.forEach(function (child) {
                    users.push(tslib_1.__assign({}, child.val()));
                });
                console.log(users);
            }).then(function () {
                users.sort(function (o1, o2) {
                    if (o1.date > o2.date) {
                        return -1;
                    }
                    else if (o1.date < o2.date) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
                resolve(users);
            });
        });
    };
    ChatService.prototype.reportPost = function (key) {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise(function (resolve, rejact) {
            var user = firebase.auth().currentUser;
            if (user) {
                var reportedList_1 = [];
                firebase.database().ref('posts/' + key + '/reportedUsers').once('value', function (snapshot) {
                    reportedList_1 = snapshot.val();
                }).then(function () {
                    if ((reportedList_1 == null) || !(reportedList_1.includes(user.uid))) {
                        if (reportedList_1 == null) {
                            reportedList_1 = [];
                        }
                        reportedList_1.push(user.uid);
                        firebase.database().ref('posts/' + key).update({
                            reportedUsers: reportedList_1
                        });
                        var report_1;
                        firebase.database().ref('posts/' + key + '/report').once('value', function (snapshot) {
                            report_1 = snapshot.val();
                        }).then(function () {
                            firebase.database().ref('posts/' + key).update({
                                report: report_1 + 1
                            }).then(function () {
                                resolve(report_1 + 1);
                            });
                        });
                    }
                    else {
                        rejact('kullanıcı zaten raporlamış');
                    }
                });
            }
            else {
                rejact('Kullanıcı yok');
            }
        });
    };
    ChatService.prototype.reportComment = function (key, i) {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise(function (resolve, rejact) {
            var user = firebase.auth().currentUser;
            if (user) {
                var reportedList_2 = [];
                firebase.database().ref('posts/' + key + '/comments/' + i + '/reportedUsers').once('value', function (snapshot) {
                    reportedList_2 = snapshot.val();
                }).then(function () {
                    if ((reportedList_2 == null) || !(reportedList_2.includes(user.uid))) {
                        if (reportedList_2 == null) {
                            reportedList_2 = [];
                        }
                        reportedList_2.push(user.uid);
                        firebase.database().ref('posts/' + key + '/comments/' + i).update({
                            reportedUsers: reportedList_2
                        });
                        var report_2;
                        firebase.database().ref('posts/' + key + '/comments/' + i + '/report').once('value', function (snapshot) {
                            report_2 = snapshot.val();
                        }).then(function () {
                            firebase.database().ref('posts/' + key + '/comments/' + i).update({
                                report: report_2 + 1
                            }).then(function () {
                                resolve(report_2 + 1);
                            });
                        });
                    }
                    else {
                        rejact('kullanıcı zaten raporlamış');
                    }
                });
            }
            else {
                rejact('Kullanıcı yok');
            }
        });
    };
    ChatService.prototype.likePost = function (key) {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise(function (resolve, rejact) {
            var user = firebase.auth().currentUser;
            if (user) {
                var likedList_1 = [];
                firebase.database().ref('posts/' + key + '/likedUsers').once('value', function (snapshot) {
                    likedList_1 = snapshot.val();
                }).then(function () {
                    if ((likedList_1 == null) || !(likedList_1.includes(user.uid))) {
                        if (likedList_1 == null) {
                            likedList_1 = [];
                        }
                        likedList_1.push(user.uid);
                        firebase.database().ref('posts/' + key).update({
                            likedUsers: likedList_1
                        });
                        var like_1;
                        firebase.database().ref('posts/' + key + '/like').once('value', function (snapshot) {
                            like_1 = snapshot.val();
                        }).then(function () {
                            firebase.database().ref('posts/' + key).update({
                                like: like_1 + 1
                            }).then(function () {
                                resolve(like_1 + 1);
                            });
                        });
                    }
                    else {
                        rejact('kullanıcı zaten beğenmiş');
                    }
                });
            }
            else {
                rejact('Kullanıcı yok');
            }
        });
    };
    ChatService.prototype.likeComment = function (key, i) {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise(function (resolve, rejact) {
            var user = firebase.auth().currentUser;
            if (user) {
                var likedList_2 = [];
                firebase.database().ref('posts/' + key + '/comments/' + i + '/likedUsers').once('value', function (snapshot) {
                    likedList_2 = snapshot.val();
                }).then(function () {
                    if ((likedList_2 == null) || !(likedList_2.includes(user.uid))) {
                        if (likedList_2 == null) {
                            likedList_2 = [];
                        }
                        likedList_2.push(user.uid);
                        firebase.database().ref('posts/' + key + '/comments/' + i).update({
                            likedUsers: likedList_2
                        });
                        var like_2;
                        firebase.database().ref('posts/' + key + '/comments/' + i + '/like').once('value', function (snapshot) {
                            like_2 = snapshot.val();
                        }).then(function () {
                            firebase.database().ref('posts/' + key + '/comments/' + i).update({
                                like: like_2 + 1
                            }).then(function () {
                                resolve(like_2 + 1);
                            });
                        });
                    }
                    else {
                        rejact('kullanıcı zaten beğenmiş');
                    }
                });
            }
            else {
                rejact('Kullanıcı yok');
            }
        });
    };
    ChatService.prototype.createComment = function (key, uid, content, anonim) {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise(function (resolve, rejact) {
            var name;
            var comments;
            var comment;
            firebase.database().ref('users/' + uid + '/username').once('value', function (snapshot) {
                if (anonim) {
                    name = 'Anonim';
                }
                else {
                    name = snapshot.val();
                }
            }).then(function () {
                firebase.database().ref('posts/' + key + '/comments').once('value', function (snapshot) {
                    comments = snapshot.val();
                }).then(function () {
                    if (comments) {
                        comments.push({
                            like: 0,
                            report: 0,
                            date: Date.now(),
                            content: content,
                            uid: uid,
                            username: name
                        });
                    }
                    else {
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
                }).then(function () {
                    firebase.database().ref('posts/' + key + '/comments').update(comments);
                    firebase.database().ref('posts/' + key + '/comment').once('value', function (snapshot) {
                        comment = snapshot.val();
                    }).then(function () {
                        firebase.database().ref('posts/' + key).update({
                            comment: comment + 1
                        });
                        resolve(true);
                    });
                });
            });
        });
    };
    ChatService.prototype.createPost = function (uid, title, content, anonim) {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise(function (resolve, rejact) {
            var name;
            firebase.database().ref('users/' + uid + '/username').once('value', function (snapshot) {
                name = snapshot.val();
            }).then(function () {
                firebase.database().ref('posts').push({
                    username: name,
                    comment: 0,
                    content: content,
                    date: Date.now(),
                    like: 0,
                    report: 0,
                    title: title,
                    uid: uid,
                }).then(function (snap) {
                    firebase.database().ref('posts').child(snap.key).update({
                        key: snap.key
                    });
                    if (anonim) {
                        firebase.database().ref('posts').child(snap.key).update({
                            username: 'Anonim'
                        });
                    }
                }).then(function () {
                    resolve(true);
                });
            });
        });
    };
    ChatService.prototype.getUser = function (uid) {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise(function (resolve, rejact) {
            firebase.database().ref('users/' + uid).once('value', function (snapshot) {
                resolve(snapshot.val());
            });
        });
    };
    ChatService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService])
    ], ChatService);
    return ChatService;
}());
export { ChatService };
//# sourceMappingURL=chat.service.js.map