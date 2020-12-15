import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/class/account';
import { User } from './../../../../class/user';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiBankService } from './../../../../services/api-bank.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/class/transaction';

@Component({
  selector: 'app-last-transactions',
  templateUrl: './last-transactions.component.html',
  styleUrls: ['./last-transactions.component.css']
})
export class LastTransactionsComponent implements OnInit {

  user: User = new User;
  dataLastMovements: Transaction[];
  dataAccount: Account = new Account;
  load = {
    account: false,
    lastTransactions: false
  }
  constructor(private apiBank: ApiBankService, private router: Router, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user)
    if (this.user == undefined || this.user == null) {
      this.router.navigate(["/"]);
    }
    this.getLastMovements();
    this.getAccount();
  }

  getLastMovements() {
    this.apiBank.getLastMovements(this.user.user_id)
      .subscribe((data: Transaction[]) => {
        console.log(data);
        this.dataLastMovements = data;
        this.load.lastTransactions = true;
      },
        (error: HttpErrorResponse) => {
          this.toastr.error(null, error.error.error);
        });
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

}
