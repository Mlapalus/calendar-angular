import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { LoginData } from '../auth.type';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = "";

  constructor(
    private auth: AuthService, 
    private logger: NGXLogger,
    private router: Router,
    private fb: FormBuilder
    ) {}

  onSubmit() {
    
    if (this.loginForm.invalid) {
      this.errorMessage = "Formulaire non valide !!"
      return;
    }

    const loginData: LoginData = {
      email: this.email.value!,
      password: this.password.value!
    }

    this.auth.login(loginData)
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/calendar')
      },
      error: (error: HttpErrorResponse) => {
        this.logger.error(error.message);
        this.errorMessage = "Une erreur est survenue, essayer de nouveau dans quelques instants";
      }
    });
  }

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern(environment.pattern_password)
    ]]
  })

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }
}
