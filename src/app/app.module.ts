import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from "@angular/platform-browser";
import {AuthenticationService} from "./service/authentication.service";
import {UserService} from "./service/user.service";
import {AuthInterceptor} from "./interceptor/auth.interceptor";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
  ],
  providers: [
    AuthenticationService,
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor , multi: true},//multi instence of injection into the interceptor
  ],
})

export class AppModule { }






