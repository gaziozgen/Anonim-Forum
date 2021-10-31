import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
var OtherUserPage = /** @class */ (function () {
    function OtherUserPage(location, chatService, route) {
        var _this = this;
        this.location = location;
        this.chatService = chatService;
        this.route = route;
        this.route.params.subscribe(function (params) {
            chatService.getUser(params['uid']).then(function (user) {
                _this.userProfile = user;
                _this.uid = params['uid'];
            });
        });
    }
    OtherUserPage.prototype.ngOnInit = function () {
    };
    OtherUserPage.prototype.goBack = function () {
        this.location.back();
    };
    OtherUserPage = tslib_1.__decorate([
        Component({
            selector: 'app-other-user',
            templateUrl: './other-user.page.html',
            styleUrls: ['./other-user.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Location,
            ChatService,
            ActivatedRoute])
    ], OtherUserPage);
    return OtherUserPage;
}());
export { OtherUserPage };
//# sourceMappingURL=other-user.page.js.map