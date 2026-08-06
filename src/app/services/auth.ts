import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/DTOs/loginResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class Auth {
  http = inject(HttpClient);
  router = inject(Router)
  private accessToken = signal("");
  private refreshToken = signal("");

  async login(email:string, password:string) {
    const credentials = {
      email: email,
      password: password
    };

    this.http
      .post<LoginResponse>(
        'https://localhost:7293/api/login',
        credentials
      )
      .subscribe({
        next: (response) => {
          console.log(response.accessToken);
          console.log(response.refreshToken);
          
          this.accessToken.set(response.accessToken);
          this.refreshToken.set(response.refreshToken);

          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
  }


  async refreshAccessToken(userId: number){
    const credentials = {
      userId: userId,
      refreshToken: this.refreshToken
    };


    this.http
      .post<LoginResponse>(
        'https://localhost:7293/api/refresh-token',
        credentials
      )
      .subscribe({
        next: (response) => {
          console.log(response.accessToken);
          console.log(response.refreshToken);
          
          this.accessToken.set(response.accessToken);
          this.refreshToken.set(response.refreshToken);

        },
        error: (error) => {
          console.error('Refresh failed:', error);
        }
      });
  }

  getAccessToken(){
    return this.accessToken();
  } 

  getRefreshToken(){
    return this.refreshToken();
  }
}
