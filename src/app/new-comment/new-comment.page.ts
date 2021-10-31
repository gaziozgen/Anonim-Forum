import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.page.html',
  styleUrls: ['./new-comment.page.scss'],
})
export class NewCommentPage implements OnInit {

  constructor(
    private location: Location,
    private chatService: ChatService,
    private authService: AuthService,
    private route: ActivatedRoute
    ) {
      this.route.params.subscribe(params => {
        this.key = params['key'];
      });
     }

  anonim;
  content;
  key;
  active = true;

  ngOnInit() {
  }

  createComment() {
    if (this.active) {
      this.active = false;
      this.authService.checkAuth().then(user => {
        if (user) {
          this.chatService.createComment(this.key, user.uid , this.content, this.anonim).then(result => {
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
