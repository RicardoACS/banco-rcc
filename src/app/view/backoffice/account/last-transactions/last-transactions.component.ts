import { HttpErrorResponse } from '@angular/common/http';
import { ApiBankService } from './../../../../services/api-bank.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-last-transactions',
  templateUrl: './last-transactions.component.html',
  styleUrls: ['./last-transactions.component.css']
})
export class LastTransactionsComponent implements OnInit {

  user:any;
  dataLastMovements:any;
  dataAccount: any;

  constructor(private apiBank: ApiBankService, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("user") == undefined || localStorage.getItem("user") == null) {
      this.router.navigate(["/"]);
    }
    this.getLastMovements();
    this.getAccount();
  }

  getLastMovements() {
    this.apiBank.getLastMovements(this.user["user_id"])
      .subscribe((data: HttpErrorResponse) => {
        console.log(data);
        this.dataLastMovements = data["data"];
        console.log(this.dataLastMovements)
      },
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }

  getAccount() {
    this.apiBank.getAccountByRut(this.user["rut"])
      .subscribe((data: HttpErrorResponse) => {
        this.dataAccount = data["data"][0];
      },
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }

}
