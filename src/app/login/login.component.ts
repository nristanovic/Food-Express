import { AppUser } from './../models/app-user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';  



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user = <AppUser> {};
  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {

    if (this.auth.isLoggedIn) {
      this.router.navigate(['/']);
    }
   }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }
 
  login() {
    const { email, password } = this.loginForm.value; 
    this.auth.login(email, password);
  }

  
  ngOnInit():void{
   this.loginForm = this.fb.group({
     email: new FormControl('primer@mail.com', [Validators.required, Validators.email]),
     password: new FormControl('123456', [Validators.required, Validators.minLength(6)])
   });

   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }
}
