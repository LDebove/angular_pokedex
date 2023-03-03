import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/models/authentication.model';
import { AuthService } from 'src/app/services/auth.service';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private auth: AuthService) { }

  submitForm(): void {
    let loginData: LoginData = {
      email: this.login.controls['email'].value ?? '',
      password: this.login.controls['password'].value ?? '',
    }
    this.auth.login(loginData).subscribe({
      next: (response) => {
        if(!response.statusCode) {
          this.auth.setAccessToken(response.access_token);
          this.auth.setRefreshToken(response.refresh_token);
          this.auth.setExpiresIn(response.expires_in);
          this.router.navigate(['team']);
        }
      }
    });
  }
}
