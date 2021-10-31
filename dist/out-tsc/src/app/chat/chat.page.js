import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
var ChatPage = /** @class */ (function () {
    function ChatPage(actionSheetController, authService, chatService, alertController) {
        var _this = this;
        this.actionSheetController = actionSheetController;
        this.authService = authService;
        this.chatService = chatService;
        this.alertController = alertController;
        this.active = true;
        chatService.getPosts().then(function (posts) {
            _this.posts = posts;
        });
    }
    ChatPage.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.authService.checkAuth().then(function (user) {
                _this.user = user;
            });
        }, 1000);
    };
    ChatPage.prototype.refresh = function (event) {
        var _this = this;
        this.authService.checkAuth().then(function (user) {
            _this.user = user;
        });
        this.chatService.getPosts().then(function (posts) {
            _this.posts = posts;
        });
        setTimeout(function () {
            console.log('Async operation has ended');
            event.target.complete();
        }, 500);
    };
    ChatPage.prototype.likePost = function (key, i) {
        var _this = this;
        this.authService.checkAuth().then(function (user) {
            if (user) {
                if (_this.active) {
                    _this.active = false;
                    console.log('like tapped ' + key);
                    _this.chatService.likePost(key).then(function (like) {
                        _this.posts[i].like = like;
                        _this.active = true;
                    }).catch(function (err) {
                        console.log(err);
                        _this.active = true;
                    });
                }
            }
            else {
                _this.presentAlert();
            }
        });
    };
    ChatPage.prototype.postPage = function (key) {
        console.log('post tapped');
    };
    ChatPage.prototype.presentAlert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'HATA',
                            message: 'Bu işlemi gerçekleştirmek için giriş yapmalısınız.',
                            buttons: ['Tamam']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatPage.prototype.optionsPost = function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: 'İşlemler',
                            buttons: [{
                                    text: 'Bildir',
                                    role: 'destructive',
                                    icon: 'alert',
                                    handler: function () {
                                        _this.authService.checkAuth().then(function (user) {
                                            if (user) {
                                                if (_this.active) {
                                                    _this.active = false;
                                                    console.log('report tapped ' + key);
                                                    _this.chatService.reportPost(key).then(function () {
                                                        _this.active = true;
                                                    }).catch(function (err) {
                                                        console.log(err);
                                                        _this.active = true;
                                                    });
                                                }
                                            }
                                            else {
                                                _this.presentAlert();
                                            }
                                        });
                                    }
                                },
                                {
                                    text: 'İptal',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatPage = tslib_1.__decorate([
        Component({
            selector: 'app-chat',
            templateUrl: './chat.page.html',
            styleUrls: ['./chat.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActionSheetController,
            AuthService,
            ChatService,
            AlertController])
    ], ChatPage);
    return ChatPage;
}());
export { ChatPage };
//# sourceMappingURL=chat.page.js.map