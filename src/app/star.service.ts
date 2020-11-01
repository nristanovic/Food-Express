import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';


export interface Star{
  userId: any;
  productId: any;
  value: number;
  productTitle: any;
  imageUrl: any;
  path: string;
}

@Injectable({
  providedIn: 'root'
})

export class StarService {

  constructor(private afs: AngularFirestore) { }


  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId));
    return starsRef.valueChanges();  
  }

  getProductStars(productId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('productId', '==', productId));
    return starsRef.valueChanges();  
  }

  setStar(userId, productId, value, productTitle,  imageUrl, path) {
    const star: Star = {userId, productId, value, productTitle, imageUrl, path};

    const starPath = `stars/${star.userId}_${star.productId}`;

    return this.afs.doc(starPath).set(star);
  }
}
