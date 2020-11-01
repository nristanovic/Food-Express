import { DataTableResource } from 'angular7-data-table';
import { Restaurant } from './../../models/restaurant';
import { Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnDestroy } from '@angular/core';
import { RestaurantService } from 'src/app/restaurant.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  restaurants: Restaurant[];
  subscription: Subscription;
  tableResource: DataTableResource<Restaurant>;
  items: Restaurant[] = [];
  itemCount: number;

  constructor(
    private productService: ProductService,
    private restaurantService: RestaurantService
    ) {
      this.subscription= this.restaurantService.getAllRestaurants().subscribe((restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
        this.initializeTable(restaurants);
      });
   }

   private initializeTable(restaurant: Restaurant[]) {
    this.tableResource = new DataTableResource(restaurant);
    this.tableResource.query({ offset: 0 }) // Gets all the records for the current page based on the current parameter | offset: 0 means page 1
      .then(items => this.items = items);
    this.tableResource.count() // Total records in out table
      .then(count => this.itemCount = count);
  }
  
  reloadItems(params) {
    if (!this.tableResource)
      return;

    this.tableResource.query(params) // Gets all the records for the current page based on the current parameter | offset: 0 means page 1
      .then(items => this.items = items);
  }

  filter(query: string) {
    const filteredProducts = (query) ?
      this.restaurants.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.restaurants;

    this.initializeTable(filteredProducts);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
