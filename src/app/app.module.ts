import { StarService } from './star.service';
import { ShoppingCartService } from './shopping-cart.service';
import { RestaurantService } from './restaurant.service';
import { CustomFormsModule } from 'ng2-validation';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { RouterModule, CanActivate } from '@angular/router';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DataTableModule } from  'angular7-data-table';
import { AgmCoreModule } from '@agm/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrederSuccessComponent } from './oreder-success/oreder-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminRestaurantsComponent } from './admin/admin-restaurants/admin-restaurants.component';
import { RestaurantFormComponent } from './admin/restaurant-form/restaurant-form.component';
import { ProductFormEditComponent } from './admin/product-form-edit/product-form-edit.component';
import { AdminProductsEditComponent } from './admin/admin-products-edit/admin-products-edit.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductQuantityComponent } from './products/product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './check-out/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './check-out/shipping-form/shipping-form.component';
import { RegisterComponent } from './login/register/register.component';
import { PasswordResetComponent } from './login/password-reset/password-reset.component';
import { StarReviewComponent } from './star-review/star-review.component';
import { OrderDetailsComponent } from './my-orders/order-details/order-details.component';
import { BsFooterComponent } from './bs-footer/bs-footer.component';




@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrederSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    AdminRestaurantsComponent,
    RestaurantFormComponent,
    ProductFormEditComponent,
    AdminProductsEditComponent,
    RestaurantsComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    LoginComponent,
    RegisterComponent,
    PasswordResetComponent,
    StarReviewComponent,
    OrderDetailsComponent,
    BsFooterComponent
  ],
  imports: [
    BrowserModule,
    DataTableModule.forRoot(),
    CustomFormsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firabe, 'food-express'),
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAYKYfomH_l0Sh-TMjJrMQ-sfu3j4y_wro',
      libraries: ['places']
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: RestaurantsComponent},
      { path: 'orders/:id', component: ProductsComponent},
      { path: 'verify-email', component: HomeComponent},
      { path: 'password-reset', component: PasswordResetComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'login', component: LoginComponent},
      { path: 'products', component: ProductsComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent},
      
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrederSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/profile/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
      { path: 'my/profile', component: MyOrdersComponent, canActivate: [AuthGuard]},

    
      { path: 'restaurant', component: RestaurantFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      // { path: 'restaurant', component: AdminRestaurantsComponent, canActivate: [AuthGuard, AdminAuthGuard] },

      
      { path: 'products/:id', component: AdminProductsEditComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'restaurants/:id/products/:id', component: ProductFormEditComponent, canActivate: [AuthGuard, AdminAuthGuard] },

      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },

      { path: 'orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ]),
    NgbModule

  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    RestaurantService,
    ShoppingCartService,
    StarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
