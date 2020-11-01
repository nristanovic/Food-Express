import { Product } from './../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/restaurant.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  restaurants$;



  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.restaurants$ = restaurantService.getAllRestaurants();
    this.categories$ = categoryService.getCategories();



  }



  save(product) {

    this.productService.create(product);

    alert('Uspešno ste dodali novi proizvod!')

    this.router.navigate(['/admin/products']);
  }


}