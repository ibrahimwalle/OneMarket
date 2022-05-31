import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpComponent } from './help/help.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { EbayOauthComponent } from './ebay-oauth/ebay-oauth.component';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "home"},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: "help", component: HelpComponent},
  {path: "ebayOauth/:code", component: EbayOauthComponent},
  {path: "listing/:id", component: ListingDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }