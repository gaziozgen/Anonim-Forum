import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(location, authService) {
        this.location = location;
        this.authService = authService;
    }
    RegisterPage.prototype.ngOnInit = function () {
    };
    RegisterPage.prototype.register = function () {
        this.authService.register(this.email, this.password, this.username);
        this.location.back();
    };
    RegisterPage.prototype.goBack = function () {
        this.location.back();
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Location,
            AuthService])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map