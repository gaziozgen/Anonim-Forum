import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  constructor(
    public actionSheetController: ActionSheetController,
    private authService: AuthService,
    private chatService: ChatService,
    public alertController: AlertController,
    private location: Location,
    private route: ActivatedRoute
    ) {
      this.route.params.subscribe(params => {
        chatService.getPost(params['key']).then(post => {
          this.post = post;
          console.log(this.post);
          this.key = params['key'];
        });
      });
      this.authService.checkAuth().then( user => {
        this.user = user;
      });
     }

  key;
  user;
  post;
  active = true;

  ngOnInit() {
  }

  refresh(event) {
    this.authService.checkAuth().then( user => {
      this.user = user;
    });
    this.chatService.getPost(this.key).then( post => {
      this.post = post;
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

  likePost(key) {
    this.authService.checkAuth().then( user => {
      if (user) {
        if (this.active) {
          this.active = false;
          console.log('like tapped ' + key);
          this.chatService.likePost(key).then((like) => {
            this.post.like = like;
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

  likeComment(key, i) {
    this.authService.checkAuth().then( user => {
      if (user) {
        if (this.active) {
          this.active = false;
          console.log('like tapped ' + key);
          this.chatService.likeComment(key, i).then((like) => {
            this.post.comments[i].like = like;
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

  async optionsComment(key, i) {
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
                  console.log('report tapped ' + key + i);
                  this.chatService.reportComment(key, i).then(() => {
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

  goBack(): void {
    this.location.back();
  }
}
