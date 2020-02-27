import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AvatarService {
  public fallbackUrl = '/assets/images.jpg';
  constructor(private http: HttpClient) {}
  delete() {
    return this.http.delete('/api/users/me/avatar');
  }
  add(image: any) {
    return this.http.post('/api/users/me/avatar', image);
  }
}
