import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
var AuthService = /** @class */ (function () {
    function AuthService(auth) {
        this.auth = auth;
    }
    AuthService.prototype.register = function (email, password, username) {
        var promise = firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                uid: firebase.auth().currentUser.uid,
                username: username,
                email: email,
                date: Date.now()
            });
        });
        promise.catch(function (error) { return console.log(error.message); });
    };
    AuthService.prototype.login = function (email, password) {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise(function (resolve) {
            var promise = firebase.auth().signInWithEmailAndPassword(email, password);
            promise.then(function () {
                resolve('asdasd');
            }).catch(function (e) { return console.log(e.message); });
        });
    };
    AuthService.prototype.logout = function () {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise(function (resolve) {
            firebase.auth().signOut();
            resolve('nothing');
        });
    };
    AuthService.prototype.checkAuth = function () {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise(function (resolve, reject) {
            var user = firebase.auth().currentUser;
            if (user) {
                console.log('user var');
                firebase.database().ref('/users/' + user.uid).once('value', function (snapshot) {
                    resolve(snapshot.val());
                });
            }
            else {
                console.log('user yok');
                resolve(false);
            }
        });
    };
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map