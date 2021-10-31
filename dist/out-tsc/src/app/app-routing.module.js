import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
    { path: 'new-comment/:key', loadChildren: './new-comment/new-comment.module#NewCommentPageModule' },
    { path: 'new-post', loadChildren: './new-post/new-post.module#NewPostPageModule' },
    { path: 'post/:key', loadChildren: './post/post.module#PostPageModule' },
    { path: 'other-user/:uid', loadChildren: './other-user/other-user.module#OtherUserPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map