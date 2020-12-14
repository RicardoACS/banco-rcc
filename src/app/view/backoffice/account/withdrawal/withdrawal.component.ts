import { HttpErrorResponse } from '@angular/common/http';
import { ApiBankService } from './../../../../services/api-bank.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {

  user: any;
  dataAccount: any;
  withdrawal: FormGroup;
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

    var request = { ammount: 0 };
    var ammount = this.withdrawal.get("ammount").value;

    if (ammount > this.dataAccount.ammount) {
      console.log("Tirar Error");
      return;
    }

    if (ammount > 0) {
      ammount = -ammount;
    }
    request.ammount = ammount;
    
    var dataTransaction = {
      ammount: this.withdrawal.get("ammount").value,
      transaction_type_id: 3,
      account_id: this.dataAccount["account_id"]
    }

    this.updateAmmount(this.dataAccount.number, request, dataTransaction);
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
