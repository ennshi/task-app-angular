import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Task } from '../interfaces/task';

@Injectable({providedIn: 'root'})
export class TaskService {
  constructor(private http: HttpClient) {
  }
  create(task: Task) {
    return this.http.post('/api/tasks', task);
  }
  update(id: string, task: Task) {
    return this.http.patch(`/api/tasks/${id}`, task);
  }
  delete(id: string) {
    return this.http.delete(`/api/tasks/${id}`);
  }
  getNumTasks() {
    return this.http.get('/api/tasksNumber');
  }
  getPage(page: number, query: string) {
    return this.http.get(`/api/tasks?sortBy=${query}&limit=5&skip=${page * 5}`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map( key => ({
            ...response[key]
          }));
      }));
  }
}
