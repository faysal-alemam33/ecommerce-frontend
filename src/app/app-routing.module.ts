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
const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'signin' },
  { path: 'register', component: RegisterComponent, title: 'register' },
  { path: 'about', component: AboutComponent, title: 'about' },
  { path: 'shop', component: ShopComponent, title: 'shop' },
  { path: 'news', component: NewsComponent, title: 'news' },
  { path: 'pages', component: PagesComponent, title: 'pages' },
  { path: 'home', component: HomeComponent },
  { path: 'profile/:email', component: ProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
