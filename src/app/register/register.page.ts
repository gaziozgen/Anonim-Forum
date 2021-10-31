import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private location: Location,
    private authService: AuthService
    ) { }

  email: string;
  password: string;
  passwordT: string;
  username: string;

  ngOnInit() {
  }

  register() {
    this.authService.register(this.email, this.password, this.username);
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }

}
