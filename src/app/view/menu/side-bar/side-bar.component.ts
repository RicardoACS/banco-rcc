import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  status = {
    account: undefined,
    accountType: 'none',
    transaction: undefined,
    transactionType: 'none',
  }
  sidebarMenu = {
    class: "",
    status: undefined
  };


  constructor(private router: Router) { 
  }

  ngOnInit(): void {
  }

  openDropDown(name) {
    if (name == "account") {
      this.status.account = this.status.account == undefined ?  false : this.status.account ?  false : true;
      this.status.accountType = this.status.account == undefined ?  'block' : this.status.account ? 'none' : 'block';
    } else if (name == "transaction") {
      this.status.transaction = this.status.transaction == undefined ?  false : this.status.transaction ?  false : true;
      this.status.transactionType = this.status.transaction == undefined ?  'block' : this.status.transaction ? 'none' : 'block';
    }
  }

  closeSession(){
    localStorage.removeItem("user");
    localStorage.removeItem("ammount_account");
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  sideBar(){
    this.sidebarMenu.status = undefined;
    this.sidebarMenu.class = "";    
    this.sidebarMenu.class = this.sidebarMenu.status == undefined ? "open" : this.sidebarMenu.status ? "" : "open";
  }

}
