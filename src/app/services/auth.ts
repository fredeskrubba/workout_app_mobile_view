import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/DTOs/loginResponse';
import { Router } from '@angular/router';
import { RefreshTokenResponse } from '../models/DTOs/refreshTokenResponse';
import { environment } from 'src/environments/environment.development';
import { LogoutResponse } from '../models/DTOs/logoutResponse';

@Injectable({
  providedIn: 'root',
})

export class Auth {
  http = inject(HttpClient);
  router = inject(Router)
  private accessToken = signal<string | null>(null);


  login(email:string, password:string) {
    const credentials = {
      email: email,
      password: password
    };

    this.http
      .post<LoginResponse>(
        environment.apiUrl + '/login',
        credentials,
        {
          withCredentials: true
        }
      )
      .subscribe({
        next: (response) => {
          console.log(response.accessToken);
          
          this.accessToken.set(response.accessToken);
       
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
  }


  refreshAccessToken() {
    return this.http.put<RefreshTokenResponse>(
      environment.apiUrl + '/refresh-token',
      {},
      {
        withCredentials: true
      }
    );
  }

  getAccessToken(){
    return this.accessToken();
  } 

  setAccessToken(newToken:string){
    this.accessToken.set(newToken);
  }

  logout(){
    const credentials = {
     
    };

    this.http
      .post<LogoutResponse>(
        environment.apiUrl + '/logout',
        credentials,
        {
          withCredentials: true
        }
      )
      .subscribe({
        next: (response) => {
          
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Logout failed:', error);
        }
      });
  }

  isAuthenticated(): boolean {
    return this.accessToken() !== null;
  }
}
