import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Auth } from "../services/auth";
import { catchError, switchMap, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(Auth);

  const token = authService.getAccessToken();

  if (!token) {
    return next(req);
  }

  const authReq = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }): req;

  return next(authReq).pipe(
    catchError(error => {

      if (error.status !== 401) {
        return throwError(() => error);
      }

      return authService.refreshAccessToken().pipe(
        switchMap(response => {

          const retryRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`
            }
          });

          return next(retryRequest);
        }),
        catchError(refreshError => {

          authService.logout();

          return throwError(() => refreshError);
        })
      );
    })
  );
};