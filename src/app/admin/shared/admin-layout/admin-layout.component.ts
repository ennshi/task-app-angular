import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  constructor(private router: Router,
              public userService: UserService) { }
  ngOnInit() {
  }


  logout() {
    this.router.navigate(['/', 'login']);
  }
}
