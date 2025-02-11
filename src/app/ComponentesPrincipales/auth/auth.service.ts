import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Admin } from '../../Interface/admin';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  apiURL = "http://localhost:8080/admin/login"

  isLogin:boolean = false;

  http = inject(HttpClient);

  logIn(credentials: Admin): Observable<boolean> {  // Regresar un booleano para indicar si el login es exitoso
    return this.http.post<boolean>(this.apiURL, credentials).pipe(
      tap(isAuthenticated => {
        this.isLogin = isAuthenticated;  
      })
    );
  }

  logOut() {
    this.isLogin = false;
    
  }

  getIsLoggedIn(): boolean {
    return this.isLogin;
  }

  
}
