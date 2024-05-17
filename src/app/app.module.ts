import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NoopAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from './data.service';
import { MoreDetailsCardComponent } from './more-details-card/more-details-card.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarModule } from 'ng-cdbangular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support/support.component';
import { SupportFormComponent } from './support-form/support-form.component';
import { ViewMoreComponent } from './view-more/view-more.component';
import { MoreDetailsPageComponent } from './more-details-page/more-details-page.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { PaginatorModule } from 'primeng/paginator';
import {CarouselModule} from 'primeng/carousel';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonModule } from 'primeng/button'; 
import { ImageModule } from 'primeng/image';
import { ShopListPageComponent } from './shop-list-page/shop-list-page.component';
import { AddShopComponent } from './add-shop/add-shop.component'; 
import { DropdownModule } from 'primeng/dropdown';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    MoreDetailsCardComponent,
    SidebarComponent,
    DashboardComponent,
    NavbarComponent,
    SupportComponent,
    SupportFormComponent,
    ViewMoreComponent,
    MoreDetailsPageComponent,
    PaginatorComponent,
    ShopListPageComponent,
    AddShopComponent,
   
   
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,  
    NoopAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    SocialLoginModule,
    MatMenuModule,
    MatSelectModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    SidebarModule,
    CommonModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    PaginatorModule,
    CarouselModule,
    ButtonModule,
    ImageModule,
    DropdownModule
    
    
    
   
  ], 
  providers: [DataService,provideAnimations(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '476766832814-9f968vfp1dhp5cla0mg7c1tek767q795.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
