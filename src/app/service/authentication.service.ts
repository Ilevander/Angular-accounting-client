import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../model/user";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  public host = environment.apiUrl;
  private token: string | null = null;
  private loggedInUsername: string | null = null;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public login(user: User) : Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/user/login`, user,{observe:'response'});
  }

  public register(user: User) : Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>(`${this.host}/user/register`, user);
  }

  public logout():void {
      this.token = null;
      this.loggedInUsername = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('users');
  }

  public saveToken(token: string):void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User):void {
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUserFromLocalCache(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    if (this.token === null) {
      throw new Error('Token is not available');
    }
    return this.token;
  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      if (decodedToken.sub != null && decodedToken.sub !== '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = decodedToken.sub;
          return true;
        }
      }
    }
    this.logout();
    return false;
  }




}
