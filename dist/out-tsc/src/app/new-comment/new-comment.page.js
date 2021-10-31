import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
var NewCommentPage = /** @class */ (function () {
    function NewCommentPage(location, chatService, authService, route) {
        var _this = this;
        this.location = location;
        this.chatService = chatService;
        this.authService = authService;
        this.route = route;
        this.active = true;
        this.route.params.subscribe(function (params) {
            _this.key = params['key'];
        });
    }
    NewCommentPage.prototype.ngOnInit = function () {
    };
    NewCommentPage.prototype.createComment = function () {
        var _this = this;
        if (this.active) {
            this.active = false;
            this.authService.checkAuth().then(function (user) {
                if (user) {
                    _this.chatService.createComment(_this.key, user.uid, _this.content, _this.anonim).then(function (result) {
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
    NewCommentPage.prototype.goBack = function () {
        this.location.back();
    };
    NewCommentPage = tslib_1.__decorate([
        Component({
            selector: 'app-new-comment',
            templateUrl: './new-comment.page.html',
            styleUrls: ['./new-comment.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Location,
            ChatService,
            AuthService,
            ActivatedRoute])
    ], NewCommentPage);
    return NewCommentPage;
}());
export { NewCommentPage };
//# sourceMappingURL=new-comment.page.js.map