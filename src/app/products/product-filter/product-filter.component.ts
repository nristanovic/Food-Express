import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  id;
  @Input('category') category: string;

  constructor(
    private route: ActivatedRoute,
    categoryService: CategoryService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.categories$ = categoryService.getCategories();
    console.log(this.id);
   }
   

}
