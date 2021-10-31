import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OutherUserPage } from './outher-user.page';
var routes = [
    {
        path: '',
        component: OutherUserPage
    }
];
var OutherUserPageModule = /** @class */ (function () {
    function OutherUserPageModule() {
    }
    OutherUserPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [OutherUserPage]
        })
    ], OutherUserPageModule);
    return OutherUserPageModule;
}());
export { OutherUserPageModule };
//# sourceMappingURL=outher-user.module.js.map