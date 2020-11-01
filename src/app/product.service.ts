import { Product } from './models/product';
import { map, take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/restaurants/' + product.restaurant + '/products').push(product);
  }

  update(id, product) {
    return this.db.object(id).update(product);
  }

  getAll(id): Observable<Product[]> {
    return this.db.list<Product>('/restaurants/' + id +'/products')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.payload.key, ...a.payload.val() }))
        )
      );
  }
  get(productId): Observable<Product> {
    return this.db.object<Product>(productId)
      .valueChanges().pipe((take(1)));
  }

  delete(productID) {
    return this.db.object(productID).remove();
  }

}
