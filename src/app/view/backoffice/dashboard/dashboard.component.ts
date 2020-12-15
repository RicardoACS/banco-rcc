import { User } from './../../../class/user';
import { ApiBankService } from './../../../services/api-bank.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/class/account';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  dataAccount: Account = new Account();
  isAccount:boolean = false

  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiBank: ApiBankService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user == undefined || this.user == null) {
      this.router.navigate(["/"]);
    }
    this.getAccount();
  }

  getAccount() {
    this.apiBank.getAccountById(this.user["account"][0]["account_id"])
      .subscribe((data: Account) => {
        this.dataAccount = data;
        this.isAccount = true;
      },
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }

}
