import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Auth } from './auth';
import { GetUserSessionsResponse } from '../models/DTOs/getUserSessionsResponse';


@Injectable({
  providedIn: 'root',
})
export class Session {

  http = inject(HttpClient);
  authService = inject(Auth);

  getAllUserSessions(){
    let accessToken = this.authService.getAccessToken();
    const payload = accessToken ? JSON.parse(atob(accessToken.split('.')[1])) : "";

     return this.http.get<GetUserSessionsResponse>(`${environment.apiUrl}/session`);
  }

}
