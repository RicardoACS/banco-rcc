import { Account } from 'src/app/class/account';
import { User } from './../../../../class/user';
import { ApiBankService } from './../../../../services/api-bank.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  user: User = new User;
  dataAccount: Account = new Account;
  recharge: FormGroup;
  submitted = false;
  load = {
    account: false,
    createRechage: false
  }

  constructor(private fb: FormBuilder,
    private router: Router, private apiBank: ApiBankService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loginValidator();
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user == undefined || this.user == null) {
      this.router.navigate(["/"]);
    }
    this.getAccount();
  }

  loginValidator() {
    this.recharge = this.fb.group({
      ammount: ['', [Validators.required, Validators.maxLength(15), Validators.min(0)]],
    })
  }

  get f() {
    return this.recharge.controls;
  }

  onSubmit() {
    this.load.createRechage = true;
    this.submitted = true;
    if (this.recharge.invalid) {
      return;
    }

    var dataTransaction = {
      ammount: this.recharge.get("ammount").value,
      account_id: this.dataAccount.account_id,
      transaction_type_id: 2,
      destination_id: undefined,
      description: null
    }

    this.createTransaction(dataTransaction);
  }

  getAccount() {
    this.load.account = false;
    this.apiBank.getAccountById(this.user.user_id)
      .subscribe((data: Account) => {
        this.dataAccount = data;
        this.load.account = true;
      },
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }

  createTransaction(data) {
    this.apiBank.createTransaction(data)
      .subscribe((data: HttpErrorResponse) => {
        this.toastr.success(null, 'Transacción realizada con éxito');
        this.clearForm();
        this.getAccount();
        this.load.createRechage = false;
      },
        (error: HttpErrorResponse) => {
          this.toastr.error(null, error.error.error);
          this.load.createRechage = false;
        });
  }

  clearForm() {
    this.recharge.reset();
    this.submitted = false;
  }

}
