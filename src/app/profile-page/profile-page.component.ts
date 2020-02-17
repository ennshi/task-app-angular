import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/interfaces/user';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  user: User;
  pSub: Subscription;
  form: FormGroup;
  name: string;
  email: string;
  submitted: boolean;
  changeAvatar = false;
  constructor(public userService: UserService,
              public router: Router) { }

  ngOnInit() {
    this.pSub = this.userService.get().subscribe( user => {
      this.user = user;
      this.name = user.name;
      this.email = user.email;
      this.form = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(20)])
      });
    });
  }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }
  submit() {
    const user = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password
    };
    if (this.form.invalid) {
      return;
    }
    this.userService.update(user)
      .subscribe(() => {
        this.submitted = false;
        this.name = this.user.name;
        this.email = this.user.email;
      }, () => {
        this.submitted = false;
      });
  }
  reset() {
    this.form.reset({name: this.name, email: this.email, password: ''});
  }
  delete() {
    const answer = confirm('Are you sure you want to delete your account?');
    if (answer) {
      this.userService.delete()
        .subscribe(() => {
          this.router.navigate(['/']);
          localStorage.clear();
        });
    }
  }
  showForm() {
    this.changeAvatar = !this.changeAvatar;
  }
}
