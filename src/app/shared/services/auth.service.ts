import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {User} from '../interfaces/user';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  responseType: 'text' as 'text'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) {
  }
  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('access-token');
  }
  login(user: User): Observable<any> {
    user.isAuth = true;
    return this.http.post('/api/users/login', user, httpOptions)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }
  logout() {
    this.setToken(null);
  }
  isAuthenticated(): boolean {
    return !!this.token;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      this.error$.next('User isn\'t registered or wrong credentials provided');
    }
    return throwError(error);
  }
  private setToken(response) {
    if (response) {
      response = JSON.parse(response);
      const expDate = new Date(new Date().getTime() + +response.token.expiration * 1000);
      localStorage.setItem('access-token', response.token.token);
      localStorage.setItem('token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
