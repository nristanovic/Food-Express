import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable, of, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from './models/app-user';
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>; 
  user: User;

  constructor(
    private userService: UserService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    public  router:  Router
    ) {
    this.user$ = afAuth.authState;
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  loginWithGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);    
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
    .pipe(switchMap(user => {
      if (user) return this.userService.get(user.uid);

      return of(null);
      }));
  }

  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['/']);
}

async register(email: string, password: string, name: string) {
  await (await this.afAuth.createUserWithEmailAndPassword(email, password)).user.updateProfile({displayName: name});
  // (await this.afAuth.currentUser).updateProfile({displayName: name});
  
  this.sendEmailVerification();
  location.reload();
}

async sendEmailVerification() {
  return this.afAuth.currentUser.then(u => u.sendEmailVerification())
  .then(() => {
    this.router.navigate(['verify-email']);
  })
}


async sendPasswordResetEmail(passwordResetEmail: string) {
  return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
}

get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return  user  !==  null;
}
async updatePhone(phone){
  (await this.afAuth.currentUser).updatePhoneNumber(phone);
  
}

async deleteProfile(){
  
  let b = (await this.afAuth.currentUser).delete();
  if(b == null)
      alert('Ova operacija je senzitivna, neophodna je skorasnja prijava. Prijavite se opet!')
      this.logout();
      
  this.router.navigate(['login']);
}

}
 