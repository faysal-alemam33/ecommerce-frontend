import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { NewsComponent } from './news/news.component';
import { ProfileComponent } from './profile/profile.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './Auth/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'login' },
  { path: 'register', component: RegisterComponent, title: 'register' },
  { path: 'about', component: AboutComponent, title: 'about', canActivate: [AuthGuard] },
  { path: 'shop', component: ShopComponent, title: 'shop', canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent, title: 'news', canActivate: [AuthGuard] },
  { path: 'pages', component: PagesComponent, title: 'pages', canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile/:email', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
