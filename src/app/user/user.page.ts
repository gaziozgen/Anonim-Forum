import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(
    private location: Location,
    private authService: AuthService
  ) {
  }

  user;
  email;
  password;

  ngOnInit(): void {
    setTimeout(() => {
      this.authService.checkAuth().then(user => {
        this.user = user;
      });
    }, 1000);
  }

  login() {
    this.authService.login(this.email, this.password)
    .then(() => {
      this.authService.checkAuth().then( user => {
        console.log('user a veri atandı');
        this.user = user;
      });
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.authService.checkAuth().then( user => {
        console.log('user a veri atandı');
        this.user = user;
      });
    });
  }


    // BU BÖLÜM CONSTRUCTOR DAN ALINDI !!!!
    // this.authService.isLoggedIn().then(uid => {
    //   this.user = true;
    //   this.authService.getUser(uid).then(e => {
    //     // this.user = e;
    //   });
    // }).catch(err => {
    //   console.log('HATALI GİRİŞ', err);
    //   this.user = false;
    // });
}
