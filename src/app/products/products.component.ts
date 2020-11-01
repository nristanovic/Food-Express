import { UserService } from './../user.service';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { ShoppingCart } from './../models/shopping-cart';
import { switchMap } from 'rxjs/operators';
import { Subscription, Observable, of } from 'rxjs';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  appUser: AppUser;
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;
  // path;
  userId: string ;
  user: User;

  user$: Observable<firebase.User>; 

  authState: any = null;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth,
    private auth: AuthService,
    private userService: UserService
  ) {
    

    console.log(this.path);

    this.user$ = afAuth.authState;
  
    this.afAuth.authState.subscribe( authState => {
      this.authState = authState;
    });
  
    
   }

   async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart(); // Used here because constructors cannot be async
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll(this.path)
    .pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
    )
    .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }
 
  get path(): string {
    return this.route.snapshot.paramMap.get('id');
  }


  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }


}
