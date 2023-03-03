import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authenticated: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.authenticated = this.auth.IsAuthenticated();
    this.auth.getAuthenticatedSubject().subscribe({
      next: (authenticated) => {
        this.authenticated = authenticated;
      }
    });
  }
}
