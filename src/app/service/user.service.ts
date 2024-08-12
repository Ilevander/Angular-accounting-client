import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../model/user";
import {readBooleanType} from "@angular/compiler-cli/src/ngtsc/metadata/src/util";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[] | HttpErrorResponse> {
      return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUsers(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public resetPassword(email: string): Observable<any | HttpErrorResponse> {
    return this.http.get<User>(`${this.host}/user/resetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage/` , formData ,
      {reportProgress: true,
              observe: 'events'
      });
  }

  public deleteUser(userId: number): Observable<any | HttpErrorResponse> {
    return this.http.delete<any>(`${this.host}/user/delete/${userId}`);
  }

  public addUsersToLocalCache(user: User[]): void {
     localStorage.setItem('users', JSON.stringify(user));
  }

  public getUsersFromLocalCache(): User[] | null {
    const users = localStorage.getItem('users');
    if (users) {
      return JSON.parse(users) as User[];
    }
    return null;
  }

  public createUserFormData(): User[] | null {
    const users = localStorage.getItem('users');
    if (users) {
      return JSON.parse(users) as User[];
    }
    return null;
  }





}
