import { ToastrService } from 'ngx-toastr';
import { User } from './../../../class/user';
import { Account } from 'src/app/class/account';
import { Destination } from './../../../class/destination';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiBankService } from './../../../services/api-bank.service';
import { ModalService } from './../../modals/service/modal.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css'],
  providers: []
})
export class TransfersComponent implements OnInit {

  filter: string = "";
  user: User;
  dataAccount: Account;
  dataDestination: Destination[] = [];
  load = {
    account: false,
    destinations: false
  }

  constructor(private _ModalService: ModalService,
    private apiBank: ApiBankService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user == undefined || this.user == null) {
      this.router.navigate(["/"]);
    }
    this.getAccount();
    this.getDestination();
    this._ModalService.close();
  }

  openModal(data, nameModal) {
    this._ModalService.open(data, nameModal);
  }

  getAccount() {
    this.load.account = false;
    this.apiBank.getAccountById(this.user.user_id)
      .subscribe((data: Account) => {
        this.dataAccount = data;
        localStorage.setItem("ammount_account", data.ammount.toString())
        this.load.account = true;
      },
        (error: HttpErrorResponse) => {
          this.toastr.error(null, error.error.error);
        });
  }

  getDestination() {
    this.apiBank.getDestinations(this.user.account[0].account_id)
      .subscribe((data: Destination[]) => {   
        this.dataDestination = data;
        this.load.destinations = true;
      },
        (error: HttpErrorResponse) => {
          this.toastr.error(null, error.error.error);
        });
  }

}
