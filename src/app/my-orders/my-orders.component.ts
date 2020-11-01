import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './../user.service';
import { AppUser } from './../models/app-user';
import { StarService } from './../star.service';
import { switchMap } from 'rxjs/operators';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{
  order$;
  stars$;
  appUser$: AppUser = {};
  id;
  

  user$: Observable<firebase.User>; 

  authState: any = null;

  constructor(private auth: AuthService,
     orderService: OrderService,
      private starService: StarService,
       userService: UserService,
        public afAuth: AngularFireAuth,
         private db: AngularFireDatabase,
          private router: Router) {

    this.order$ = auth.user$
      .pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));

    this.stars$ = auth.user$.pipe(switchMap(u => starService.getUserStars(u.uid)));

    
    this.user$ = afAuth.authState;
  
    this.afAuth.authState.subscribe( authState => {
      this.authState = authState;
    });

    
    
   }

    title = 'FormValidation';  
    mobNumberPattern = "^((\\+381-?)|06)[0-9]{8}$";

   async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser$ = appUser);
    this.id = this.currentUserId;
    console.log(this.id);    
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }
  get currentUserName(): string {
    return this.isAuthenticated ? this.authState.displayName : null;
  }
  get currentUserEmail(): string {
    return this.isAuthenticated ? this.authState.email : null;
  }
  get currentUserPhone(): string {
    return this.isAuthenticated ? this.authState.phoneNumber : null;
  }

  update(){
    this.db.object<AppUser>('/user/' + this.currentUserId ).update({phoneNumber: this.appUser$.phoneNumber});
    alert("Uspešno ste sačuvali broj telefona!");
  }

  delete() {
    if (!confirm('U slučaju brisanja naloga trajno će se izbrisati informacije vezane za porudžbine i omiljene proizvode! Da li ste sigurni da želite da nastavite?'))
      return;

    this.auth.deleteProfile();
   
  }
} 
