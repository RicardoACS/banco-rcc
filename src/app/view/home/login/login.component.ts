import { ToastrService } from 'ngx-toastr';
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
  load = {
    login: false
  }

  constructor(private fb: FormBuilder,
    private rutValidator: RutValidator,
    private router: Router,
    private apiBank: ApiBankService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loginValidator();
  }

  loginValidator() {
    this.login = this.fb.group({
      rut: ['', [Validators.required, this.rutValidator]],
      password: ["", [Validators.required]],
    })
  }

  get f() {
    return this.login.controls;
  }

  onSubmit() {
    this.load.login = true;
    this.submitted = true;
    if (this.login.invalid) {
      this.load.login = false;
      return;
    }

    this.apiBank.login(this.login.value)
      .subscribe((data: User) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.toastr.success(null, "Acceso concedido, Pronto entrarás a tu banco online");
        setTimeout(() => {
          this.router.navigate(["/cliente/dashboard/"]);
        }, 4500);     
      },
        (error: HttpErrorResponse) => {
          this.load.login = false;
          this.toastr.error(null, error.error.error);
        });
  }




}
