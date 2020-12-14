import { ApiBankService } from './../../../services/api-bank.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from './../../../class/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  dataAccount: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiBank: ApiBankService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("user") == undefined || localStorage.getItem("user") == null) {
      this.router.navigate(["/"]);
    }
    this.getAccount();
  }

  getAccount() {
    this.apiBank.getAccountByRut(this.user["rut"])
      .subscribe((data: HttpErrorResponse) => {
        console.log(data);
        this.dataAccount = data["data"];
      },
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }

}
