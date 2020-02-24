import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../shared/interfaces/user';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  @Input() user: User;
  @Output() removeUser: EventEmitter<string> = new EventEmitter<string>();
  constructor(public userService: UserService) { }

  ngOnInit() {
  }
  delete() {
    this.userService.deleteByAdmin(this.user._id.toString()).subscribe(() => {
      this.removeUser.emit(this.user._id.toString());
    }, () => {
      console.log('eee');
    });
  }
}
