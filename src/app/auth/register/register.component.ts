import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { RegisterData } from '../auth.type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  regex = environment.pattern_password;
  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private logger: NGXLogger,
    private fb: FormBuilder
    ) {}

  uniqueEmailAsyncValidator(control: AbstractControl) {
    return this.auth
              .exists(control.value)
              .pipe(
                map(exist => exist ? { uniqueEmail: true  } : null)
              )
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const data: RegisterData = {
        email: this.email.value!,
        name: this.name.value!,
        password: this.password.value!
    }
      
    this.auth.register(data)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/calendar')
          this.logger.info(this.registerForm.controls.name + ' a bien été enregistré')
        },
        error: (error: HttpErrorResponse) =>  {
          this.errorMessage = "Un problème est survenu, merci de réessayer plus tard",
          this.logger.error(error.message)
        }

      });
  }

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email], [this.uniqueEmailAsyncValidator.bind(this)]],
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(this.regex)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
  }, {
    validators: confirmPasswordValidator
  })

  ngOnInit(): void {}

  get name() {
    return this.registerForm.controls.name;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }

}

const confirmPasswordValidator: ValidatorFn = (control: AbstractControl) => {

  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  if (password?.value === confirm?.value) {
    return null;
  }

  return { confirmPassword: true }

}

