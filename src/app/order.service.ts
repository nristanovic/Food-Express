import { map } from 'rxjs/operators';
import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }


  async placeOrder(order) {
    const result = await this.db.list('/order').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/order').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/order', query => query.orderByChild('userId').equalTo(userId))
      .valueChanges();
  }

  getSingleOrder(map: string) {
    return this.db.list('/order', query => query.orderByChild('map').equalTo(map))
    .valueChanges();
  }

  getItems() {
    return this.db.list('/items').valueChanges();
  }

  deleteOrder(map: string) {
    return this.db.list('/order', query => query.orderByChild('map').equalTo(map)).remove();
  }
}
