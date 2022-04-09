import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../_services/notification.service';
import {User} from '../_models/user';
import {AuthService} from '../_services/auth.service';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;

  firstName: string;
  lastName: string;
  username: number;
  email: string;
  gender: string;
  dob: Date;

  constructor(private notif: NotificationService,
              private authService: AuthService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.initiateUserValues();
  }

  initiateUserValues() {
    this.authService.currentUserValue.subscribe(user => {
      this.currentUser = user;

      this.firstName = user.user_fname;
      this.lastName = user.user_lname;
      this.username = user.user_id;
      this.email = user.user_email;
      this.gender = user.user_gender;
      this.dob = user.user_dob;
    });
  }

  updateProfile() {
    this.userService.edit(this.username, this.firstName, this.lastName, this.email, this.gender, this.dob).subscribe(result => {
      this.notif.showNotif('User profile updated', 'Dismiss');
    });
  }

}
