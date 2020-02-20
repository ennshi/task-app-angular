import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/interfaces/user';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  pSub: Subscription;
  users: User[];
  constructor(private router: Router,
              public userService: UserService) { }

  ngOnInit() {
    this.pSub = this.userService.getAll().subscribe((response: User[]) => {
      this.users = response;
    });
  }
  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

}
