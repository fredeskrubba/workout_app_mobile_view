import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Auth } from "../services/auth";
import { catchError, switchMap, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(Auth);

  const token = authService.getAccessToken();

  console.log('INTERCEPTOR:', req.url);
  console.log('TOKEN:', token);

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq).pipe(
    catchError(error => {

      console.log('INTERCEPTOR ERROR:', error.status, req.url);

      if (error.status !== 401) {
        return throwError(() => error);
      }

      console.log('401 -> REFRESHING');

      return authService.refreshAccessToken().pipe(
        switchMap(response => {

          console.log('REFRESH SUCCESS:', response);
          
          authService.setAccessToken(response.accessToken);

          const retryRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`
            }
          });

          console.log('RETRYING:', retryRequest.url);

          return next(retryRequest);
        }),

        catchError(refreshError => {

          console.log('REFRESH FAILED:', refreshError);

          authService.logout();

          return throwError(() => refreshError);
        })
      );
    })
  );
};