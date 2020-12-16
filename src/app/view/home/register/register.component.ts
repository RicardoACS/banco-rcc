import { ToastrService } from 'ngx-toastr';
import { ApiBankService } from './../../../services/api-bank.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RutValidator } from 'ng9-rut';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: FormGroup;
  submitted = false;
  load = {
    register: false
  }

  constructor(private fb: FormBuilder,
    private rutValidator: RutValidator,
    private router: Router,
    private apiBank: ApiBankService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.registerUserValidator();
  }

  registerUserValidator() {
    this.registerUser = this.fb.group({
      id: [''],
      rut: ['', [Validators.required, Validators.maxLength(15), this.rutValidator]],
      name: ["", [Validators.required, Validators.maxLength(100)]],
      email: ["", [Validators.required, Validators.maxLength(100), Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern(/^(?=(?:.*\d){2})(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){2})\S{6,10}$/)]],
    })
  }

  get f() {
    return this.registerUser.controls;
  }

  onSubmit() {
    this.load.register = true;
    this.submitted = true;
    if (this.registerUser.invalid) {
      this.load.register = false;
      return;
    }

    this.apiBank.createUser(this.registerUser.value)
      .subscribe((data: HttpErrorResponse) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.toastr.success(null, "Creado con éxito, Pronto entrarás a tu banco online");
        setTimeout(() => {
          this.router.navigate(["/cliente/dashboard/"]);
        }, 4500);
      },
        (error: HttpErrorResponse) => {
          this.load.register = false;
          this.toastr.error(null, error.error.error);
        });
  }
}


