import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {

  constructor(
    private location: Location,
    private chatService: ChatService,
    private authService: AuthService
    ) { }

  anonim;
  content;
  title;
  active = true;

  ngOnInit() {
  }

  createPost() {
    if (this.active) {
      this.active = false;
      this.authService.checkAuth().then(user => {
        if (user) {
          this.chatService.createPost(user.uid , this.title, this.content, this.anonim).then(result => {
            if (result) {
              this.active = true;
              this.location.back();
            }
          });
        } else {
          this.active = true;
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
