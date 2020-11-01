import { map, switchMap, take } from 'rxjs/operators';
import { OrderService } from './../../order.service';
import { ActivatedRoute, provideRoutes, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  id;
  path ;
  order$  ;
 
  

  constructor(private route: ActivatedRoute, 
             private orderService: OrderService,
             private router: Router) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.order$= this.orderService.getSingleOrder(this.id);
        
   }

  async ngOnInit(){ }

  delete(){
    
    if (!confirm('Da li ste sigurni da želite da nastavite sa brisanjem?'))
      return;

    this.orderService.deleteOrder(this.id);
    this.router.navigate(['/my/profile']);
  }
}
