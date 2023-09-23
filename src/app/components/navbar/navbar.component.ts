import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  projet: string = 'Des projets utilisables par tous';

  constructor(private router: Router, private auth: AuthService) {}

  onDeconect = () => {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
