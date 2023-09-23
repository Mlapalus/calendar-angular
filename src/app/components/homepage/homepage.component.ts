import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private auth: AuthService) {}

  isLogged$ = new Observable<boolean>;

  ngOnInit(): void {
    this.isLogged$ = this.auth.authStatus$;
  }
}
