import { Component, OnInit } from '@angular/core';
import {TouristSpot} from '../_models/tourist-spot';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  places: TouristSpot[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getSearchHistory().subscribe(places => {
      this.places = places;
    });
  }

}
