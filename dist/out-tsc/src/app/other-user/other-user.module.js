import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OtherUserPage } from './other-user.page';
var routes = [
    {
        path: '',
        component: OtherUserPage
    }
];
var OtherUserPageModule = /** @class */ (function () {
    function OtherUserPageModule() {
    }
    OtherUserPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [OtherUserPage]
        })
    ], OtherUserPageModule);
    return OtherUserPageModule;
}());
export { OtherUserPageModule };
//# sourceMappingURL=other-user.module.js.map