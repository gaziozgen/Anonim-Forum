import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
var UserPage = /** @class */ (function () {
    function UserPage(location, authService) {
        this.location = location;
        this.authService = authService;
    }
    UserPage.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.authService.checkAuth().then(function (user) {
                _this.user = user;
            });
        }, 1000);
    };
    UserPage.prototype.login = function () {
        var _this = this;
        this.authService.login(this.email, this.password)
            .then(function () {
            _this.authService.checkAuth().then(function (user) {
                console.log('user a veri atandı');
                _this.user = user;
            });
        });
    };
    UserPage.prototype.logout = function () {
        var _this = this;
        this.authService.logout().then(function () {
            _this.authService.checkAuth().then(function (user) {
                console.log('user a veri atandı');
                _this.user = user;
            });
        });
    };
    UserPage = tslib_1.__decorate([
        Component({
            selector: 'app-user',
            templateUrl: './user.page.html',
            styleUrls: ['./user.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Location,
            AuthService])
    ], UserPage);
    return UserPage;
}());
export { UserPage };
//# sourceMappingURL=user.page.js.map