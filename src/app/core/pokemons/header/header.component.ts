import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authenticated: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authenticated = this.auth.IsAuthenticated();
    this.auth.getAuthenticatedSubject().subscribe({
      next: (authenticated) => {
        this.authenticated = authenticated;
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/pokemons']);
  }
}
