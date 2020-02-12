import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../shared/services/task.service';
import {Observable, Subscription} from 'rxjs';
import {Task} from '../shared/interfaces/task';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit, OnDestroy {
  showCreateForm = false;
  form: FormGroup;
  constructor(public taskService: TaskService) { }
  // tasks$: Observable<Task[]>;
  tasks: Array<Task>;
  pSub: Subscription;
  submitted = false;

  ngOnInit() {
    this.pSub = this.taskService.getAll().subscribe((response: Task[]) => {
      this.tasks = response;
    });
   this.form = new FormGroup({
     description: new FormControl(null, [Validators.required]),
     priority: new FormControl('low', [Validators.required])
   });
  }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  showForm() {
    this.showCreateForm = !this.showCreateForm;
  }
  reset() {
    this.form.reset({priority: 'low'});
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
      this.form.reset({priority: 'low'});
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
}
