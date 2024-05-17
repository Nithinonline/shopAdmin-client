import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SupportComponent } from './support/support.component';
import { ViewMoreComponent } from './view-more/view-more.component';
import { MoreDetailsPageComponent } from './more-details-page/more-details-page.component';
import { ShopListPageComponent } from './shop-list-page/shop-list-page.component';

const routes: Routes = [
  {path:"",redirectTo:"home", pathMatch: "full" },
  {path:"home", component:HomeComponent},
  {path:"register", component:RegisterComponent},
  {path:"login", component:LoginComponent},
  {path:"support",component:SupportComponent},
  {path:"more-details",component:MoreDetailsPageComponent},
  {path:"shop-list",component:ShopListPageComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
