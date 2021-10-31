import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PostPage } from './post.page';
var routes = [
    {
        path: '',
        component: PostPage
    }
];
var PostPageModule = /** @class */ (function () {
    function PostPageModule() {
    }
    PostPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PostPage]
        })
    ], PostPageModule);
    return PostPageModule;
}());
export { PostPageModule };
//# sourceMappingURL=post.module.js.map