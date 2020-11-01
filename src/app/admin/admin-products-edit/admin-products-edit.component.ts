import { Product } from './../../models/product';
import { Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { RestaurantService } from 'src/app/restaurant.service';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableResource } from 'angular7-data-table';


@Component({
  selector: 'app-admin-products-edit',
  templateUrl: './admin-products-edit.component.html',
  styleUrls: ['./admin-products-edit.component.css']
})
export class AdminProductsEditComponent implements OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  public id;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private restaurantService: RestaurantService
    ) {
    
    
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.productService.getAll(this.id).subscribe((products: Product[]) => {
      this.products = products;
      this.initializeTable(products);
    });
    }

    private initializeTable(products: Product[]) {
      this.tableResource = new DataTableResource(products);
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
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
