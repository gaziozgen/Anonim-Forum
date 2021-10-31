import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NewPostPage } from './new-post.page';
var routes = [
    {
        path: '',
        component: NewPostPage
    }
];
var NewPostPageModule = /** @class */ (function () {
    function NewPostPageModule() {
    }
    NewPostPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [NewPostPage]
        })
    ], NewPostPageModule);
    return NewPostPageModule;
}());
export { NewPostPageModule };
//# sourceMappingURL=new-post.module.js.map