import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private http: HttpClient) {}

  uniqueEmailAsyncValidator(control: AbstractControl) {
    const url = 'https://x8ki-letl-twmt.n7.xano.io/api:MAi1vckU/user/validation/exist';
    return this.http.post<{exist: boolean}>(url, { email: control.value })
              .pipe(
                map(apiResponse => apiResponse.exist),
                map(exist => exist ? { uniqueEmail: true  } : null)
              )
  }

  onSubmit() {
    console.log(this.registerForm.value)

  }

  registerForm = new FormGroup({
    email: new FormControl('', 
        [Validators.required, Validators.email], 
        [this.uniqueEmailAsyncValidator.bind(this)]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(15)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)$/)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ])
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
