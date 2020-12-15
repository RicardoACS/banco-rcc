import { User } from './../../../class/user';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiBankService } from './../../../services/api-bank.service';
import { RutValidator } from 'ng9-rut';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
    private rutValidator: RutValidator,
    private router: Router,
    private apiBank: ApiBankService) {
  }

  ngOnInit(): void {
    this.loginValidator();
  }

  loginValidator() {
    this.login = this.fb.group({
      rut: ['', [Validators.required, Validators.maxLength(15), this.rutValidator]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern(/^(?=(?:.*\d){2})(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){2})\S{6,10}$/)]],
    })
  }

  get f() {
    return this.login.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.login.invalid) {
      return;
    }

    this.apiBank.login(this.login.value)
      .subscribe((data: User) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(["/cliente/dashboard/"]);       
      },
        (error: HttpErrorResponse) => {
          console.log(error);
          // if (error.error != undefined && error.error != null) {
          //   this.toastr.showError(null, error.error.message);
          // } else {
          //   this.toastr.showError(null, error.message);
          // }
        });
  }




}
