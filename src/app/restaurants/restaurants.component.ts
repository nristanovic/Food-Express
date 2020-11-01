import { DataTableResource } from 'angular7-data-table';
import { Subscription } from 'rxjs';
import { Restaurant } from './../models/restaurant';
import { RestaurantService } from './../restaurant.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { query } from '@angular/animations';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnDestroy {
  restaurants: Restaurant[] ;
  subscription: Subscription;
  filteredRestaurants: any[];

  constructor(
    private restaurantService: RestaurantService
  ) { 
    this.subscription= this.restaurantService.getAllRestaurants().subscribe(restaurants => this.filteredRestaurants = this.restaurants = restaurants);
      // this.initializeTable(restaurants);
    ;
  }

  // private initializeTable(restaurant: Restaurant[]) {
  //   this.tableResource = new DataTableResource(restaurant);
  //   this.tableResource.query({ offset: 0 }) // Gets all the records for the current page based on the current parameter | offset: 0 means page 1
  //     .then(items => this.items = items);
  //   this.tableResource.count() // Total records in out table
  //     .then(count => this.itemCount = count);
  // }

  filter(query: string) {
     this.filteredRestaurants = (query) ?
      this.restaurants.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.restaurants;

    // this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  clear(){
    
    this.filteredRestaurants = this.restaurants;
    
  }

}
