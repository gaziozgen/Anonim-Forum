import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NewCommentPage } from './new-comment.page';
var routes = [
    {
        path: '',
        component: NewCommentPage
    }
];
var NewCommentPageModule = /** @class */ (function () {
    function NewCommentPageModule() {
    }
    NewCommentPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [NewCommentPage]
        })
    ], NewCommentPageModule);
    return NewCommentPageModule;
}());
export { NewCommentPageModule };
//# sourceMappingURL=new-comment.module.js.map