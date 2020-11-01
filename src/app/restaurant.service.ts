import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Restaurant } from './models/restaurant';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private db: AngularFireDatabase) { }

  createRestaurant(restaurant) {
    return this.db.list('/restaurants').push(restaurant);
  }
  getAllRestaurants(): Observable<Restaurant[]> {
    return this.db.list<Restaurant>('/restaurants')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.payload.key, ...a.payload.val() }))
        )
      );
  }

  getRest(restaurantId): Observable<Product> {
    return this.db.object<Product>('/restaurants/' + restaurantId )
      .valueChanges().pipe(take(1));
  }

}
