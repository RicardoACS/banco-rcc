import { ApiBankService } from './../../../../services/api-bank.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  user: any;
  dataAccount: any;
  recharge: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
    private router: Router, private apiBank: ApiBankService) {
  }

  ngOnInit(): void {
    this.loginValidator();
    this.user = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("user") == undefined || localStorage.getItem("user") == null) {
      this.router.navigate(["/"]);
    }
    this.getAccount();
  }

  loginValidator() {
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

    var dataTransaction = {
      ammount: this.recharge.get("ammount").value,
      transaction_type_id: 2,
      account_id: this.dataAccount["account_id"]
    }

    this.updateAmmount(this.dataAccount.number, this.recharge.value, dataTransaction);
  }

  getAccount() {
    this.apiBank.getAccountByRut(this.user["rut"])
      .subscribe((data: HttpErrorResponse) => {
        console.log(data);
        this.dataAccount = data["data"][0];
      },
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }

  updateAmmount(ammount, data, dataTransaction) {
    this.apiBank.updateAmmount(ammount, data)
      .subscribe((data: HttpErrorResponse) => {
        this.createTransaction(dataTransaction)
        this.getAccount();
      },
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }

  createTransaction(data) {
    this.apiBank.createTransaction(data)
      .subscribe((data: HttpErrorResponse) => {
      },
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }

}
