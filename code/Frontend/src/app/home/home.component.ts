import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../_services/user.service';
import {TouristSpot} from '../_models/tourist-spot';
import {NotificationService} from '../_services/notification.service';


@Component({
  selector: 'app-main-view',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tabs = ['Search', 'Favorite', 'Want to Go', 'Starred', 'Visited'];
  selected = new FormControl(0);

  type = 'TouristSpot';
  category = '';
  city = '';

  places: TouristSpot[] = [];
  favorites: TouristSpot[] = [];
  wantToGo: TouristSpot[] = [];
  starred: TouristSpot[] = [];
  visited: TouristSpot[] = [];

  constructor(private userService: UserService, private notif: NotificationService) { }

  ngOnInit(): void {
     this.getAllFavorites();
     this.getAllWantToGo();
     this.getAllStarred();
     this.getAllVisited();
  }

  searchPlaces(): void {
    this.userService.search(this.type, this.category, this.city).subscribe(result => {
      console.log(result);
      this.places = result;

      for (const place of result) {
        this.addToHistory(place);
      }

    }, error => {
      this.notif.showNotif(error.toString(), 'warning');
    });
    this.notif.showNotif(this.category + ' ' + this.type + ' in ' + this.city, 'dismiss');
  }

  addToHistory(place: TouristSpot) {
    this.userService.addSearchHistory(place.place_id).subscribe(result => {
      console.log('Added ' + place.place_id + ' to history');
    });
  }

  getAllFavorites() {
    // console.log('called');
    this.userService.getFavorites().subscribe(result => {
      // console.log(result);
      this.favorites = result;
    }, error => {
      this.notif.showNotif(error.toString(), 'warning');
    });
  }

  getAllWantToGo() {
    this.userService.getWantToGo().subscribe(result => {
      this.wantToGo = result;
    }, error => {
      this.notif.showNotif(error.toString(), 'warning');
    });
  }

  getAllStarred() {
    this.userService.getStarred().subscribe(result => {
      this.starred = result;
    }, error => {
      this.notif.showNotif(error.toString(), 'warning');
    });
  }

  getAllVisited() {
    this.userService.getVisited().subscribe(result => {
      this.visited = result;
    }, error => {
      this.notif.showNotif(error.toString(), 'warning');
    });
  }

}
