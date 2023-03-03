import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/models/authentication.model';
import { AuthService } from 'src/app/services/auth.service';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private auth: AuthService) { }

  submitForm(): void {
    let signupData: LoginData = {
      email: this.signup.controls['email'].value ?? '',
      password: this.signup.controls['password'].value ?? '',
    }
    this.auth.signup(signupData).subscribe({
      next: (response) => {
        if(!response.statusCode) {
          this.auth.setAccessToken(response.idToken);
          this.auth.setRefreshToken(response.refreshToken);
          this.auth.setExpiresIn(response.expiresIn);
          this.router.navigate(['team']);
        }
      }
    });
  }
}
