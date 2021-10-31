import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
var PostPage = /** @class */ (function () {
    function PostPage(actionSheetController, authService, chatService, alertController, location, route) {
        var _this = this;
        this.actionSheetController = actionSheetController;
        this.authService = authService;
        this.chatService = chatService;
        this.alertController = alertController;
        this.location = location;
        this.route = route;
        this.active = true;
        this.route.params.subscribe(function (params) {
            chatService.getPost(params['key']).then(function (post) {
                _this.post = post;
                console.log(_this.post);
                _this.key = params['key'];
            });
        });
        this.authService.checkAuth().then(function (user) {
            _this.user = user;
        });
    }
    PostPage.prototype.ngOnInit = function () {
    };
    PostPage.prototype.refresh = function (event) {
        var _this = this;
        this.authService.checkAuth().then(function (user) {
            _this.user = user;
        });
        this.chatService.getPost(this.key).then(function (post) {
            _this.post = post;
        });
        setTimeout(function () {
            console.log('Async operation has ended');
            event.target.complete();
        }, 500);
    };
    PostPage.prototype.likePost = function (key) {
        var _this = this;
        this.authService.checkAuth().then(function (user) {
            if (user) {
                if (_this.active) {
                    _this.active = false;
                    console.log('like tapped ' + key);
                    _this.chatService.likePost(key).then(function (like) {
                        _this.post.like = like;
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
    PostPage.prototype.likeComment = function (key, i) {
        var _this = this;
        this.authService.checkAuth().then(function (user) {
            if (user) {
                if (_this.active) {
                    _this.active = false;
                    console.log('like tapped ' + key);
                    _this.chatService.likeComment(key, i).then(function (like) {
                        _this.post.comments[i].like = like;
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
    PostPage.prototype.presentAlert = function () {
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
    PostPage.prototype.optionsPost = function (key) {
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
    PostPage.prototype.optionsComment = function (key, i) {
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
                                                    console.log('report tapped ' + key + i);
                                                    _this.chatService.reportComment(key, i).then(function () {
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
    PostPage.prototype.goBack = function () {
        this.location.back();
    };
    PostPage = tslib_1.__decorate([
        Component({
            selector: 'app-post',
            templateUrl: './post.page.html',
            styleUrls: ['./post.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActionSheetController,
            AuthService,
            ChatService,
            AlertController,
            Location,
            ActivatedRoute])
    ], PostPage);
    return PostPage;
}());
export { PostPage };
//# sourceMappingURL=post.page.js.map