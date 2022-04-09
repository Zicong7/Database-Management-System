import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TouristSpot} from '../_models/tourist-spot';
import {ReviewComponent} from '../review/review.component';
import {MatDialog} from '@angular/material';
import {UserService} from '../_services/user.service';
import {NotificationService} from '../_services/notification.service';
import {Item} from '../_models/item';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  avgRating = 0;
  isResturanut = false;
  menu: Item[] = [];
  ratingText = '';

  @Input() place: TouristSpot;
  @Input() tab: number;

  @Output() deleteFavoriteEvent = new EventEmitter<number>();
  @Output() addFavoriteEvent = new EventEmitter<number>();

  @Output() deleteWantEvent = new EventEmitter<number>();
  @Output() addWantEvent = new EventEmitter<number>();

  @Output() deleteStarEvent = new EventEmitter<number>();
  @Output() addStarEvent = new EventEmitter<number>();

  @Output() deleteVisitEvent = new EventEmitter<number>();
  @Output() addVisitEvent = new EventEmitter<number>();

  @Output() addReviewEvent = new EventEmitter<number>();

  constructor(public dialog: MatDialog,
              private userService: UserService,
              private notif: NotificationService) { }

  ngOnInit() {
    this.getAvgRating();
    this.getMenuItems();
  }

  getAvgRating() {
    this.userService.getAvgReview(this.place).subscribe(rating => {
      // console.log(rating[0]);
      // @ts-ignore
      this.avgRating = rating[0].avg;
      if (this.avgRating) {
        this.ratingText = this.avgRating + ' stars';
      } else {
        this.ratingText = 'No rating yet';
      }
    });
  }

  getMenuItems() {
    this.userService.getItems(this.place).subscribe(result => {
      if (result.length > 0) {
        // console.log(result);
        this.menu = result;
        this.isResturanut = true;
      } else {
        this.isResturanut = false;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReviewComponent, {
      width: '320px',
      data: {
        title: this.place.place_name,
        // text: '',
        rating: null,
        recommended: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const review = {
          // text: result.text,
          rating: result.rating,
          recommended: result.recommended
        };

        this.userService.addReview(this.place, review).subscribe(response => {
          this.notif.showNotif('Review added for ' + this.place.place_name, 'dismiss');
          this.addReviewEvent.emit(1);
        });
      }
      console.log('In Home component');
      console.log(result);
    });
  }

  // ==============================================================================================

  addFavorite() {
    this.userService.addToFavorite(this.place).subscribe(result => {
      this.notif.showNotif('Added ' + this.place.place_name + ' to favorites', 'dismiss');
      this.addFavoriteEvent.emit(1);
    }, error => {
      this.notif.showNotif(error.toString(), 'warning');
    });
  }

  removeFavorite() {
    this.userService.removeFromFavorite(this.place).subscribe(result => {
      this.notif.showNotif('Removed ' + this.place.place_name + ' from favorites', 'dismiss');
      this.deleteFavoriteEvent.emit(1);
    }, error => {
      this.notif.showNotif(error.toString(), 'warning');
    });
  }

  // ==============================================================================================

  addWantToGo() {
    this.userService.addToWantToGo(this.place).subscribe(result => {
      this.notif.showNotif('Added ' + this.place.place_name + ' to Want To Go', 'dismiss');
      this.addWantEvent.emit(1);
    }, error => {
      this.notif.showNotif(error.toString(), 'warning');
    });
  }

  removeWantToGo() {
    this.userService.removeFromWantToGo(this.place).subscribe(result => {
      this.notif.showNotif('Removed ' + this.place.place_name + ' from Want To Go', 'dismiss');
      this.deleteWantEvent.emit(1);
    }, error => {
      this.notif.showNotif(error.toString(), 'warning');
    });
  }

  // ==============================================================================================

  addStarred() {
    this.userService.addToStarred(this.place).subscribe(result => {
      this.notif.showNotif('Added ' + this.place.place_name + ' to starred', 'dismiss');
      this.addStarEvent.emit(1);
    }, error => {
      this.notif.showNotif(error.toString(), 'warning');
    });
  }

  removeStarred() {
    this.userService.removeFromStarred(this.place).subscribe(result => {
      this.notif.showNotif('Removed ' + this.place.place_name + ' from starred', 'dismiss');
      this.deleteStarEvent.emit(1);
    }, error => {
      this.notif.showNotif(error.toString(), 'warning');
    });
  }

  // ==============================================================================================

  addVisited() {
    this.userService.addToVisited(this.place).subscribe(result => {
      this.notif.showNotif('Added ' + this.place.place_name + ' to visited', 'dismiss');
      this.addVisitEvent.emit(1);
    }, error => {
      this.notif.showNotif(error.toString(), 'warning');
    });
  }

  removeVisited() {
    this.userService.removeFromVisited(this.place).subscribe(result => {
      this.notif.showNotif('Removed ' + this.place.place_name + ' from visited', 'dismiss');
      this.deleteVisitEvent.emit(1);
    }, error => {
      this.notif.showNotif(error.toString(), 'warning');
    });
  }

}
