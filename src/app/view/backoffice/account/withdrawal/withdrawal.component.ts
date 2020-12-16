import { User } from './../../../../class/user';
import { Account } from 'src/app/class/account';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiBankService } from './../../../../services/api-bank.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {

  user: User = new User;
  dataAccount: Account = new Account;
  withdrawal: FormGroup;
  submitted = false;
  load = {
    account: false,
    createWithdrawal: false
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
    this.withdrawal = this.fb.group({
      ammount: ['', [Validators.required, Validators.maxLength(15), Validators.min(0)]],
    })
  }

  get f() {
    return this.withdrawal.controls;
  }

  onSubmit() {
    this.load.createWithdrawal = true;
    this.submitted = true;
    if (this.withdrawal.invalid) {
      return;
    }

    var ammount = this.withdrawal.get("ammount").value;

    if (ammount > this.dataAccount.ammount) {
      this.toastr.warning(null, 'No tienes suficientes fondos para realizar esta operación');
      this.load.createWithdrawal = false;
      return;
    }

    if (ammount > 0) {
      ammount = -ammount;
    }

    var dataTransaction = {
      ammount: ammount,
      account_id: this.dataAccount.account_id,
      transaction_type_id: 3,
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
          this.toastr.error(null, error.error.error);
        });
  }

  createTransaction(data) {
    this.apiBank.createTransaction(data)
      .subscribe((data: HttpErrorResponse) => {
        this.toastr.success(null, 'Transacción realizada con éxito');
        this.clearForm();
        this.getAccount();
        this.load.createWithdrawal = false;
      },
        (error: HttpErrorResponse) => {
          this.toastr.error(null, error.error.error);
          this.load.createWithdrawal = false;
        });
  }

  clearForm() {
    this.withdrawal.reset();
    this.submitted = false;
  }


}
