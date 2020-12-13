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

  constructor(private fb: FormBuilder, 
    private rutValidator: RutValidator, 
    private router: Router) {
   }

  ngOnInit(): void {
    this.registerUserValidator();
  }

  registerUserValidator(){
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
    this.submitted = true;
    if (this.registerUser.invalid) {
      return;
    }

    // this.serviceBank.createIser(this.registerUser.value)
    //   .subscribe((data: HttpErrorResponse) => {
    //     this.router.navigate(["/login"]);
    //   },
    //     (error: HttpErrorResponse) => {
    //       if (error.error != undefined && error.error != null) {
    //         this.toastr.showError(null, error.error.message);
    //       } else {
    //         this.toastr.showError(null, error.message);
    //       }
    //     });
  }
}


