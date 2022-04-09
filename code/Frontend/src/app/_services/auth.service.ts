import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models/user';

import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {NotificationService} from './notification.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  // Added HttpClient
  constructor(private http: HttpClient, private notif: NotificationService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): Observable<User> {
    return this.currentUserSubject;
  }

  login(username: string, password: string): Observable<any> {
    console.log('In login');
    // Read more here: https://angular.io/guide/http
    return this.http.get<User[]>(`http://localhost:8080/getUser?user=` + username)
      .pipe(map(user => {
        if (user[0]) {
          // console.log(user[0]);
          localStorage.setItem('currentUser', JSON.stringify(user[0]));
          this.currentUserSubject.next(user[0]);
          this.notif.showNotif('Logged in as ' + user[0].user_fname, 'Confirmation');
        }
        // console.log('Could not find user!');
        return user[0];
      }));
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify all subscribers that user has logged out.
    this.currentUserSubject.next(null);
  }


}
