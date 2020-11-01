import { Product } from 'src/app/models/product';
import { map } from 'rxjs/operators';
import { StarService } from './../star.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.css']
})
export class StarReviewComponent implements OnInit {

  @Input() userId;
  @Input() product: Product ;
  @Input() path;
 
  
  stars$: Observable<any>;
  avgRating$: Observable<any>;

  constructor(private starService : StarService) {
  
   }

  ngOnInit(): void {
    console.log(this.product.key);
    this.stars$ = this.starService.getProductStars(this.product.key);

    this.avgRating$ = this.stars$.pipe(map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'bez ocene'
    })) 
  }

  starHandler(value){
    this.starService.setStar(this.userId, this.product.key, value, this.product.title, this.product.imageUrl, this.path);
  }  
}
