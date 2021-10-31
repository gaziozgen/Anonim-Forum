import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'new-comment/:key', loadChildren: './new-comment/new-comment.module#NewCommentPageModule' },
  { path: 'new-post', loadChildren: './new-post/new-post.module#NewPostPageModule' },
  { path: 'post/:key', loadChildren: './post/post.module#PostPageModule' },
  { path: 'other-user/:uid', loadChildren: './other-user/other-user.module#OtherUserPageModule' },
  // { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  // { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
