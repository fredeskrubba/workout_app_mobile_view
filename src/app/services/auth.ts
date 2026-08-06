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
  private accessToken = signal<string | null>(null);


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
          
          this.accessToken.set(response.accessToken);
       
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
  }


  refreshAccessToken() {
    return this.http.post<LoginResponse>(
      'https://localhost:7293/api/refresh-token',
      {},
      {
        withCredentials: true
      }
    );
}

  getAccessToken(){
    return this.accessToken();
  } 

  logout(){
    console.log("Logged out");
  }

  isAuthenticated(): boolean {
    return this.accessToken() !== null;
  }
}
