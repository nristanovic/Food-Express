import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  resetForm: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/']);
    }
   }

   passworResetEmail(){
    const { email } = this.resetForm.value;
    this.auth.sendPasswordResetEmail(email);
    alert("Poslat je e-mail za resetovanje lozinke na vašu e-mail adresu.")
    this.router.navigate(['/login']) 
   }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl); 
  }

}
