import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/']);
    }
   }
   

  register(){
    const {email, password, name} = this.registerForm.value;
    this.auth.register(email, password, name);
  }

   

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', [Validators.required]),
      // phone: new FormControl('', [Validators.required, Validators.pattern(this.mobNumberPattern)])
    });
    
  let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  localStorage.setItem('returnUrl', returnUrl);
  }
  
}
