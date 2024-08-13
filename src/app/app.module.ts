import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from "@angular/platform-browser";
import {AuthenticationService} from "./service/authentication.service";
import {UserService} from "./service/user.service";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {RegisterComponent} from "./register/register.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    AuthenticationGuard,
    AuthenticationService,
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor , multi: true},//multi instence of injection into the interceptor
  ],
})

export class AppModule { }






