import { ApiBankService } from './services/api-bank.service';
import { ModalService } from './view/modals/service/modal.service';
import { DashboardComponent } from './view/backoffice/dashboard/dashboard.component';
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng9RutModule  } from 'ng9-rut';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { PreLoadComponent } from './view/backoffice/pre-load/pre-load.component';
import { SideBarComponent } from './view/menu/side-bar/side-bar.component';
import { HomeComponent } from './view/home/home/home.component';
import { HeaderHomeComponent } from './view/home/header-home/header-home.component';
import { FooterHomeComponent } from './view/home/footer-home/footer-home.component';
import { LoginComponent } from './view/home/login/login.component';
import { LastTransactionsComponent } from './view/backoffice/account/last-transactions/last-transactions.component';
import { TransfersComponent } from './view/backoffice/transfers/transfers.component';
import { RechargeComponent } from './view/backoffice/account/recharge/recharge.component';
import { WithdrawalComponent } from './view/backoffice/account/withdrawal/withdrawal.component';
import { NewDestinationComponent } from './view/modals/new-destination/new-destination.component';
import { NumberFormatPipe } from './utils/number-format.pipe';
import { NewTransferComponent } from './view/modals/new-transfer/new-transfer.component';
import { FilterNameDestinationPipe } from './utils/filter-name-destination.pipe';
import { HeaderLoginRegisterComponent } from './view/home/header-login-register/header-login-register.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PreLoadComponent,
    SideBarComponent,
    HomeComponent,
    HeaderHomeComponent,
    FooterHomeComponent,
    LoginComponent,
    DashboardComponent,
    LastTransactionsComponent,
    TransfersComponent,
    RechargeComponent,
    WithdrawalComponent,
    NewDestinationComponent,
    NumberFormatPipe,
    NewTransferComponent,
    FilterNameDestinationPipe,
    HeaderLoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    Ng9RutModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [ModalService, NumberFormatPipe, ApiBankService],
  bootstrap: [AppComponent],
  exports: [ NumberFormatPipe]
})
export class AppModule { }
