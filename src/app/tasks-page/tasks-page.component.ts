import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../shared/services/task.service';
import {Observable, Subscription} from 'rxjs';
import {Task} from '../shared/interfaces/task';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, map} from 'rxjs/operators';
import {AvatarService} from '../shared/services/avatar.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit, OnDestroy {
  tasks: Array<Task>;
  pSub: Subscription;
  showCreateForm = false;
  form: FormGroup;
  page: number;
  gotAll = false;
  query = 'updatedAt:desc';
  // tasks$: Observable<Task[]>;
  submitted = false;
  id = localStorage.getItem('id');
  username = localStorage.getItem('username');
  avatarUrl = `/api/users/${(this.id).toString()}/avatar`;
  date = new Date();
  constructor(public taskService: TaskService,
              public avatar: AvatarService) { }
  ngOnInit() {
    this.page = 0;
    this.newPage(this.page, this.query);
    this.form = new FormGroup({
      description: new FormControl(null, [Validators.required]),
      priority: new FormControl(0, [Validators.required])
    });
  }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }
  newPage(page, query) {
    this.pSub = this.taskService.getPage(page, query).subscribe((response: Task[]) => {
      this.tasks = this.tasks ? this.tasks.concat(response) : response;
      if (!response.length) { this.gotAll = true; console.log(this.gotAll); }
    });
  }
  showForm() {
    this.showCreateForm = !this.showCreateForm;
  }
  reset() {
    this.form.reset({priority: 0});
    this.showForm();
  }
  createTask() {
    this.submitted = true;
    const task = {
      description: this.form.value.description,
      priority: this.form.value.priority
    };
    this.taskService.create(task).subscribe((response: Task) => {
      this.tasks.unshift(response);
      this.form.reset({priority: 0});
      this.showForm();
      // this.tasks$ = this.tasks$.pipe(map((tasks) => {
      //   tasks.unshift(response);
      //   return tasks;
      // }));
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
  refreshTasks(id) {
    // this.tasks$ = this.tasks$
    //   .pipe(map((tasks) => tasks.filter(task => (task._id.toString() !== id))));
    this.tasks = this.tasks.filter(task => task._id !== id);
  }
  fallbackImage() {
    this.avatarUrl = this.avatar.fallbackUrl;
  }

  onScroll() {
    this.page++;
    this.newPage(this.page, this.query);
  }

  setQuery() {
    if (this.gotAll) {
      const parts = this.query.split(':');
      const asc = (par, a, b) => (a[par] > b[par]) ? 1 : ((b[par] > a[par]) ? -1 : 0);
      const desc = (par, a, b) => (a[par] < b[par]) ? 1 : ((b[par] < a[par]) ? -1 : 0);
      if (parts[1] === 'asc') {
        this.tasks = this.tasks.sort(asc.bind(null, parts[0]));
      } else {
        this.tasks = this.tasks.sort(desc.bind(null, parts[0]));
      }
    } else {
      this.page = 0;
      this.tasks = [];
      this.newPage(this.page, this.query);
    }
  }
}
