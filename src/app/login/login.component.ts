import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
import { HeaderType } from '../enum/header-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading: boolean | undefined;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public onLogin(user: User): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe({
        next: (response: HttpResponse<any> | HttpErrorResponse) => {
          if (response instanceof HttpResponse) {
            const token = response.headers.get(HeaderType.JWT_TOKEN);
            if (token) {
              this.authenticationService.saveToken(token);
            }
            if (response.body) {
              this.authenticationService.addUserToLocalCache(response.body);
            }
            this.router.navigateByUrl('/user/management');
          }
          this.showLoading = false;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.showLoading = false;
          console.error('Login error:', errorResponse.message);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
