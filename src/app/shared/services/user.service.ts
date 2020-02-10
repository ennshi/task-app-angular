import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../interfaces/user';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class UserService {
  public userError$: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient,
              private auth: AuthService) {}
  create(user: User): Observable<any> {
    return this.http.post('/api/users', user)
      .pipe(
        tap(this.auth.setToken),
        catchError(this.handleError.bind(this))
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      this.userError$.next('Email is already registered');
    }
    return throwError(error);
  }
  get(): Observable<any> {
    return this.http.get('/api/users/me');
  }
  update(user: User) {
    return this.http.patch('/api/users/me', user);
  }
  delete() {
    return this.http.delete('/api/users/me');
  }
}
