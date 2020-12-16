import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bankoffice',
  templateUrl: './header-bankoffice.component.html',
  styleUrls: ['./header-bankoffice.component.css']
})
export class HeaderBankofficeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  closeSession(){
    localStorage.removeItem("user");
    localStorage.removeItem("ammount_account");
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
