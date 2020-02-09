import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/interfaces/user';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(20)])
    });
  }
  submit() {
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    };
    console.log(user);
  }
}
