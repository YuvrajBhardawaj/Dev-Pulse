import { Routes } from '@angular/router';
import { CreatePostComponent } from './features/post/pages/create-post/create-post.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { EditPostComponent } from './features/post/pages/create-post/edit-post/edit-post.component';
import { RegisterComponent } from './features/user/pages/register/register.component';
import { LoggedInFunctionalityComponent } from './core/components/navbar/logged-in-functionality/logged-in-functionality.component';

export const routes: Routes = [
    {
        path : 'create-post',
        component : CreatePostComponent
    },
    {
        path : 'edit-post/:slug',
        component : EditPostComponent
    },
    {
        path : 'register',
        component : RegisterComponent
    },
    {
        path : 'dashboard',
        component : DashboardComponent
    },
];
