import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { GetUserResponse } from '../models/DTOs/getUserResponse';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class User {

  http = inject(HttpClient);
  authService = inject(Auth);
  
  getUserInfo(){
    let accessToken = this.authService.getAccessToken();
    const payload = accessToken ? JSON.parse(atob(accessToken.split('.')[1])) : "";
    console.log(accessToken);
    console.log(payload);

    return this.http.get<GetUserResponse>(`${environment.apiUrl}/users/${Number(payload.sub)}`);
  }


}
