import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(
    public actionSheetController: ActionSheetController,
    private authService: AuthService,
    private chatService: ChatService,
    public alertController: AlertController
    ) {
      chatService.getPosts().then( posts => {
        this.posts = posts;
      });
  }

  user;
  posts;
  active = true;

  ngOnInit() {
    setTimeout(() => {
      this.authService.checkAuth().then(user => {
        this.user = user;
      });
    }, 1000);
  }

  refresh(event) {
    this.authService.checkAuth().then( user => {
      this.user = user;
    });
    this.chatService.getPosts().then( posts => {
      this.posts = posts;
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

  likePost(key, i) {
    this.authService.checkAuth().then( user => {
      if (user) {
        if (this.active) {
          this.active = false;
          console.log('like tapped ' + key);
          this.chatService.likePost(key).then((like) => {
            this.posts[i].like = like;
            this.active = true;
          }).catch(err => {
            console.log(err);
            this.active = true;
          });
        }
      } else {
        this.presentAlert();
      }
    });
  }

  postPage(key) {
    console.log('post tapped');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'HATA',
      message: 'Bu işlemi gerçekleştirmek için giriş yapmalısınız.',
      buttons: ['Tamam']
    });

    await alert.present();
  }

  async optionsPost(key) {
    const actionSheet = await this.actionSheetController.create({
      header: 'İşlemler',
      buttons: [{
        text: 'Bildir',
        role: 'destructive',
        icon: 'alert',
        handler: () => {
          this.authService.checkAuth().then( user => {
            if (user) {
              if (this.active) {
                this.active = false;
                  console.log('report tapped ' + key);
                  this.chatService.reportPost(key).then(() => {
                    this.active = true;
                  }).catch(err => {
                    console.log(err);
                    this.active = true;
                  });
              }
            } else {
              this.presentAlert();
            }
          });
        }
      },
       {
        text: 'İptal',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
