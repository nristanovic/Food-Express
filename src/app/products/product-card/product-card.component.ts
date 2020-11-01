import { Observable } from 'rxjs';
import { ShoppingCart } from './../../models/shopping-cart';
import { ShoppingCartService } from './../../shopping-cart.service';
import { Product } from './../../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  @Input('userId') userId;
  @Input ('path') path;

  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(private shoppingCartService: ShoppingCartService) { }

 

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }




}
