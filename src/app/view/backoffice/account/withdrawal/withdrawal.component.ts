import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {

  withdrawal: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, 
    private router: Router) {
   }

   ngOnInit(): void {
    this.loginValidator();
  }

  loginValidator(){
    this.withdrawal = this.fb.group({
      ammount: ['', [Validators.required, Validators.maxLength(15)]],
    })
  }

  get f() {
    return this.withdrawal.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.withdrawal.invalid) {
      return;
    }
  }

}
