import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TaskService {
  constructor(private http: HttpClient) {
  }
  getAll() {
    return this.http.get('/api/tasks')
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map( key => ({
            ...response[key]
          }));
      }));
  }
  create(task) {
    return this.http.post('/api/tasks', task);
  }
  update(id, task) {
    return this.http.patch(`/api/tasks/${id}`, task);
  }
  delete(id) {
    return this.http.delete(`/api/tasks/${id}`);
  }
  getPage(page) {
    return this.http.get(`/api/tasks?limit=5&skip=${page * 5}`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map( key => ({
            ...response[key]
          }));
      }));
  }
}
