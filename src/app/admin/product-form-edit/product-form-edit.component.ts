import { ProductService } from './../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../category.service';
import { RestaurantService } from 'src/app/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form-edit',
  templateUrl: './product-form-edit.component.html',
  styleUrls: ['./product-form-edit.component.css']
})
export class ProductFormEditComponent implements OnInit {
  categories$;


  product = <Product>{};
  course;



  constructor(
    private productService: ProductService,
    private restaurantService: RestaurantService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {


    this.course = this.route.snapshot.url.join('/');
    if (this.course)
      this.productService.get(this.course)
        .subscribe(p => this.product = p);

    this.categories$ = categoryService.getCategories();

  }

  ngOnInit(): void {
  }

  save(product) {
    this.productService.update(this.course, product);
    alert('Uspešno ste izmenili prozvod!')
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Da li ste sigurni da želite da izbrišete proizvod?'))
      return;

    this.productService.delete(this.course);
    this.router.navigate(['/admin/products']);
  }

}
