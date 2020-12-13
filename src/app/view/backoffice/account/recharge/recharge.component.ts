import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  recharge: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, 
    private router: Router) {
   }

   ngOnInit(): void {
    this.loginValidator();
  }

  loginValidator(){
    this.recharge = this.fb.group({
      ammount: ['', [Validators.required, Validators.maxLength(15)]],
    })
  }

  get f() {
    return this.recharge.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.recharge.invalid) {
      return;
    }
  }

}
