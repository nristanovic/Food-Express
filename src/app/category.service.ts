import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories', query => query.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.payload.key, ...(a.payload.val() as {}) }))
        )
      );
  }

}
