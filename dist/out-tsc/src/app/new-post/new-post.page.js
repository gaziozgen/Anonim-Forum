import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
var NewPostPage = /** @class */ (function () {
    function NewPostPage(location, chatService, authService) {
        this.location = location;
        this.chatService = chatService;
        this.authService = authService;
        this.active = true;
    }
    NewPostPage.prototype.ngOnInit = function () {
    };
    NewPostPage.prototype.createPost = function () {
        var _this = this;
        if (this.active) {
            this.active = false;
            this.authService.checkAuth().then(function (user) {
                if (user) {
                    _this.chatService.createPost(user.uid, _this.title, _this.content, _this.anonim).then(function (result) {
                        if (result) {
                            _this.active = true;
                            _this.location.back();
                        }
                    });
                }
                else {
                    _this.active = true;
                }
            });
        }
    };
    NewPostPage.prototype.goBack = function () {
        this.location.back();
    };
    NewPostPage = tslib_1.__decorate([
        Component({
            selector: 'app-new-post',
            templateUrl: './new-post.page.html',
            styleUrls: ['./new-post.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Location,
            ChatService,
            AuthService])
    ], NewPostPage);
    return NewPostPage;
}());
export { NewPostPage };
//# sourceMappingURL=new-post.page.js.map