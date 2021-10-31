import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.page.html',
  styleUrls: ['./other-user.page.scss'],
})
export class OtherUserPage implements OnInit {

  constructor(
    private location: Location,
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      chatService.getUser(params['uid']).then(user => {
        this.userProfile = user;
        this.uid = params['uid'];
      });
    });
   }

  uid;
  userProfile;

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }
}
