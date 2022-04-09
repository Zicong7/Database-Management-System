
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from './notification.service';
import {TouristSpot} from '../_models/tourist-spot';
import {HttpClient} from '@angular/common/http';
import {Review} from '../_models/review';
import {User} from '../_models/user';
import {AuthService} from './auth.service';
import {Item} from '../_models/item';


@Injectable({ providedIn: 'root' })
export class UserService {

  currentUser: User;

  constructor(private notif: NotificationService, private http: HttpClient, authService: AuthService) {
    authService.currentUserValue.subscribe(user => {
      this.currentUser = user;
    });
  }

  search(type, category, city) {

    console.log(category);
    console.log(city);

    if (type === 'TouristSpot') {
      return this.http.get<TouristSpot[]>('http://localhost:8080/searchTouristCity?cat=' + category + '&address=' + city);
    } else {
      return this.http.get<TouristSpot[]>('http://localhost:8080/searchRestCity?cus=' + category + '&address=' + city);
    }
  }


  /*
    Favorites
  */
  getFavorites() {
    return this.http.get<TouristSpot[]>('http://localhost:8080/searchFav?fname=' + this.currentUser.user_fname);
  }

  addToFavorite(spot: TouristSpot) {
    const id = spot.place_id;
    return this.http.post<TouristSpot>('http://localhost:8080/insertFav?place=' + id + '&user=' + this.currentUser.user_id, spot);
  }

  removeFromFavorite(spot: TouristSpot) {
    const id = spot.place_id;
    const user = this.currentUser.user_id;
    return this.http.delete<TouristSpot>('http://localhost:8080/deleteFav?place=' + id + '&user=' + user);
  }


  /*
    Want to go
  */
  getWantToGo() {
    return this.http.get<TouristSpot[]>('http://localhost:8080/searchWant?fname=' + this.currentUser.user_fname);
  }

  addToWantToGo(spot: TouristSpot) {
    return this.http.post<TouristSpot>('http://localhost:8080/insertWant?place=' + spot.place_id + '&user=' + this.currentUser.user_id,
      spot);
  }

  removeFromWantToGo(spot: TouristSpot) {
    const id = spot.place_id;
    const user = this.currentUser.user_id;
    return this.http.delete<TouristSpot>('http://localhost:8080/deleteWant?place=' + id + '&user=' + user);
  }

  /*
    Starred
  */
  getStarred() {
    return this.http.get<TouristSpot[]>('http://localhost:8080/searchStar?fname=' + this.currentUser.user_fname);
  }

  addToStarred(spot: TouristSpot) {
    return this.http.post<TouristSpot>('http://localhost:8080/insertStar?place=' + spot.place_id + '&user=' + this.currentUser.user_id,
      spot);
  }

  removeFromStarred(spot: TouristSpot) {
    const id = spot.place_id;
    const user = this.currentUser.user_id;
    return this.http.delete<TouristSpot>('http://localhost:8080/deleteStar?place=' + id + '&user=' + user);
  }

  /*
    visited
  */
  getVisited() {
    return this.http.get<TouristSpot[]>('http://localhost:8080/searchVisit?fname=' + this.currentUser.user_fname);
  }

  addToVisited(spot: TouristSpot) {
    return this.http.post<TouristSpot>('http://localhost:8080/insertVisit?place=' + spot.place_id + '&user=' + this.currentUser.user_id,
      spot);
  }

  removeFromVisited(spot: TouristSpot) {
    const id = spot.place_id;
    const user = this.currentUser.user_id;
    // return this.http.delete<TouristSpot>('');
    return this.http.delete<TouristSpot>('http://localhost:8080/deleteVisit?place=' + id + '&user=' + user);
  }

  /*
    Review
  */
  addReview(spot: TouristSpot, review: Review) {
    const place = spot.place_id;
    const user = this.currentUser.user_id;
    const rating = review.rating;
    const recommended = review.recommended;

    return this.http.post<TouristSpot>('http://localhost:8080/insertReview?place=' + place + '&user=' + user + '&rating=' + rating +
      '&recommended=' + recommended,
      spot);
  }

  getAvgReview(spot: TouristSpot) {
    return this.http.get<number[]>('http://localhost:8080/getAvgReview?place=' + spot.place_id);
  }


  /*
    User services
  */
  register(id, fname, lname, email, gender, dob) {
    // tslint:disable-next-line:max-line-length
    dob = dob.toISOString();

    return this.http.post<User>('http://localhost:8080/insertUser?id=' + id
      + '&fname=' + fname + '&lname=' + lname + '&email=' + email + '&gender=' + gender + '&dob=' + dob.substr(0, dob.indexOf('T')),
      '');
  }

  edit(id, fname, lname, email, gender, dob) {
    console.log(typeof dob);
    console.log(dob);

    if (typeof dob !== 'string') {
      dob = dob.toISOString();
    }

    return this.http.put<string>('http://localhost:8080/updateUser?fname=' + fname
      + '&lname=' + lname + '&email=' + email + '&gender=' + gender + '&dob=' + dob.substr(0, dob.indexOf('T')) + '&id=' + id, 'user');
  }

  /*
    History
  */
  getSearchHistory() {
    return this.http.get<TouristSpot[]>('http://localhost:8080/getSearch?user=' + this.currentUser.user_id);
  }

  addSearchHistory(placeid) {
    // localhost:8080/addSearch?place=3&user=3
    return this.http.post<TouristSpot>('http://localhost:8080/addSearch?place=' + placeid + '&user=' + this.currentUser.user_id, '');
  }

  /*
    Item
  */
  getItems(place: TouristSpot) {
    // localhost:8080/getItems?place=101
    return this.http.get<Item[]>('http://localhost:8080/getItems?place=' + place.place_id);
  }

}
